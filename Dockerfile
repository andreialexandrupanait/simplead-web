# syntax=docker/dockerfile:1

# --- Production image for the Simplead Astro SSR site (@astrojs/node standalone).
# Multi-stage: dev-deps + build in a full Debian image (native modules like
# @resvg/resvg-js need it), then a slim runtime with prod-only deps as non-root.
# Node 22 LTS on purpose: Node 24 stalls Vite's SSR module-runner in this setup;
# Debian (not alpine) avoids sharp/resvg native-binary issues with astro:assets.

# ---------- Stage 1: build ----------
FROM node:22-bookworm AS build

ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    CI=1
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# Manifests first for a cached dependency layer.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Sources (build context is trimmed by .dockerignore — no .env, .git, dist…).
COPY . .

# `pnpm run build` = astro check && astro build. No secrets are baked in:
# runtime config is read from process.env by src/lib/server/env.ts.
RUN pnpm run build

# Strip dev dependencies, keeping the already-built native prod binaries.
RUN pnpm prune --prod

# ---------- Stage 2: runtime ----------
FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321 \
    UPLOADS_DIR=/app/uploads

WORKDIR /app

# curl is required by Coolify's container healthcheck (hits /api/health).
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

# Only what the server needs at runtime — no sources, no dev deps.
# COPY --chown sets ownership at copy time (no extra layer duplicating node_modules).
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/drizzle ./drizzle
COPY --from=build --chown=node:node /app/scripts/migrate.mjs ./scripts/migrate.mjs
COPY --from=build --chown=node:node /app/package.json ./package.json

# Persistent uploads dir (mounted as a Coolify volume) owned by the non-root user.
RUN mkdir -p /app/uploads && chown node:node /app/uploads
USER node

EXPOSE 4321

# Apply pending Drizzle migrations (no-op without DATABASE_URL, never destructive),
# then start the standalone Astro server.
CMD ["sh", "-c", "node scripts/migrate.mjs && node dist/server/entry.mjs"]
