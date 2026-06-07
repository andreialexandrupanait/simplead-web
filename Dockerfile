# Dev image for the Simplead Astro site.
# Debian-based Node 22 LTS (NOT alpine — avoids sharp/native issues with astro:assets;
# NOT node:24 — Vite's SSR module-runner stalls/crashes under Node 24 in this setup).
FROM node:22

# Enable pnpm via corepack (no global install needed).
RUN corepack enable

WORKDIR /app

# Copy only manifests first so `pnpm install` is cached across source changes.
# pnpm-lock.yaml is optional on first run (the * keeps COPY from failing if absent).
COPY package.json pnpm-lock.yaml* ./

# Install dependencies into the image. At runtime a named volume mounts over
# /app/node_modules, and the compose command re-syncs with `pnpm install`.
RUN pnpm install

# Source is bind-mounted at runtime (see docker-compose.yml), so no COPY . . here.

EXPOSE 4321

CMD ["pnpm", "dev", "--host", "0.0.0.0"]
