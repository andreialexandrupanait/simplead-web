# Audit autentificare — pregătire migrare la Better Auth

> Faza 0 din planul „Sistem de useri & roluri (tip WordPress)". Document de inventar +
> decizie, scris înainte de orice cod de producție. Data: 2026-06-14.

## TL;DR

Auth-ul actual e un sistem **custom** construit și deployat chiar azi: sesiuni HMAC **stateless**
(cookie `sa_admin`), tabel `admin_users` (scrypt), `password_reset_tokens`, Google OAuth scris manual,
reset/recuperare parolă pe email și un UI de gestiune utilizatori. Modelul e **plat** (orice admin =
acces total) și sesiunile **nu** sunt revocabile per-device.

Decizia aprobată: **înlocuire completă cu Better Auth** (sesiuni în DB revocabile, plugin `admin` +
access control, schelet org/2FA/passkeys), peste **Postgres-ul existent** și **Drizzle**, cu emailuri
prin **Postmark** (abstracția `sendEmail`), pe un **branch dedicat** (`claude/better-auth-users-roles`).

## Stack real (verificat în repo)

| Aspect | Realitate | Notă |
|---|---|---|
| Astro | **6.4.2** | promptul spunea „Astro 5"; Better Auth merge oricum (handler pe endpoint) |
| Runtime | React 19, Node ≥20 | islands React pentru UI interactiv |
| Adapter | `@astrojs/node` `standalone` | doar pe build (`isDev ? undefined : node()`); dev rulează nativ |
| Output | hibrid (static + `prerender=false` pe `/admin` & `/api`) | Better Auth are nevoie de rute server — OK |
| Securitate | `security.checkOrigin: true` + `allowedDomains` (simplead.ro) | bază CSRF deja prezentă |
| DB | PostgreSQL 16, Drizzle `postgres-js` | `src/lib/server/db.ts` (`getDb()`), `drizzle.config.ts` |
| Migrații | `drizzle/` (0000→0010), rulate auto la pornirea containerului prod | `scripts/migrate.mjs` în CMD |
| Email | **Postmark** prin `src/lib/server/email.ts` (`sendEmail`) | fără Resend; fallback log în consolă în dev |
| `better-auth` | **NU e instalat** | se adaugă în Faza 1 |

> Dev: Andrei rulează nativ `npm run dev` (4321) conectat la DB-ul de dev de pe rudolf.
> `docker-compose.yml` are un serviciu `db` (postgres:16) dar nu e folosit pentru dev.

## Ce există azi (concret, cu căi)

| Fișier | Rol |
|---|---|
| `src/lib/server/auth.ts` | token HMAC stateless (`createSessionToken`/`getSessionPayload`), `verifyAdminCredentials` (DB+env), reset tokens, rate-limit in-memory, `isGoogleConfigured` |
| `src/lib/server/admin-users.ts` | CRUD pe `admin_users` + `upsertGoogleAdmin`, anti-lockout |
| `src/lib/server/oauth-google.ts` | flux Google manual (userinfo + validare domeniu) |
| `src/lib/server/crypto.ts` | scrypt + AES-256-GCM + mascare secrete (**folosit și de integrări**) |
| `src/middleware.ts` | guard pe `/admin` + `/api/admin`, cookie `sa_admin`, `locals.isAdmin` |
| `src/pages/admin/login.astro` | login split-screen (email/parolă + Google) |
| `src/pages/admin/recuperare-parola.astro`, `reset-parola.astro` | flux reset parolă |
| `src/pages/admin/utilizatori/index.astro` | gestiune utilizatori (creare/ban-ish/reset) |
| `src/layouts/AuthLayout.astro`, `src/components/ui/AuthAside.astro`, `src/styles/auth.css` | UI auth |
| `src/pages/api/auth/google/{start,callback}.ts` | OAuth Google |
| `src/pages/api/admin/logout.ts` | logout |
| `src/lib/server/schema.ts` | tabele `adminUsers`, `passwordResetTokens` (migrația `0010`) |
| `src/lib/server/email.ts` | trimitere email (Postmark) |

**Roluri/permisiuni:** nu există niciun concept de rol/capability azi — model plat, orice admin
autentificat are acces total la `/admin/*`.

## Reutilizabil vs înlocuit

**Reutilizăm:**
- Postgres + Drizzle: `src/lib/server/db.ts` (`getDb()`), `drizzle.config.ts`, fluxul `db:generate` /
  `scripts/migrate.mjs`.
- `src/lib/server/crypto.ts` — rămâne (criptarea secretelor din `/admin/integrari` depinde de el).
- `src/lib/server/email.ts` (`sendEmail`, Postmark) — îl conectăm la callback-urile Better Auth.
- `AuthLayout.astro` + `AuthAside.astro` + `auth.css` — UI-ul de login/reset se refolosește.
- Integrarea Google din `/admin/integrari` (clientId/secret) — alimentează provider-ul social Better Auth.

**Înlocuim / scoatem:**
- `src/lib/server/auth.ts`, `oauth-google.ts`, `admin-users.ts` → logica Better Auth.
- `src/pages/api/auth/google/{start,callback}.ts` → catch-all `/api/auth/[...all]` (Better Auth oferă
  `/api/auth/sign-in/social`).
- Logica de sesiune din `src/middleware.ts` → guard nou pe sesiunea Better Auth + capabilities.
- `login` / `recuperare-parola` / `reset-parola` / `utilizatori` → rescrise peste `authClient` + plugin admin.
- Tabelele `admin_users` / `password_reset_tokens` → datele (1 cont) migrate în schema Better Auth,
  apoi tabelele vechi se renunță (migrație separată, după validarea cutover-ului).

## Riscuri & mitigări

1. **Cutover de sesiune pe prod.** Trecem de la HMAC stateless (`sa_admin`) la sesiuni în DB →
   sesiunile curente devin invalide, e nevoie de re-login (practic doar Andrei). Mitigare: cutover la
   un merge controlat în `main` + `maintenance.sh` dacă e nevoie.
2. **Suprapunere cu sesiunea Claude paralelă.** Chatul alăturat are necomis pe `middleware.ts`,
   `BaseLayout.astro`, `public-settings.ts`. Migrarea atinge `middleware.ts`. Mitigare: lucrăm pe branch
   dedicat, NU atingem fișierele lor; rezolvăm suprapunerea pe `middleware.ts` la merge (după ce landează ei).
3. **Provider Google din DB.** Better Auth configurează provider-ele la init. Citim clientId/secret din
   `getIntegration('google')` (DB→env) la pornire; schimbarea lor cere un restart al serverului (acceptabil).
4. **node_modules parțial local** (lipsesc `vitest`, plugin-uri eslint) → testele/lint cer `pnpm install`.
   Aplicarea migrației pe DB-ul partajat de pe rudolf e blocată în sandbox → o rulează Andrei.

## Plan propus (pe faze)

- **Faza 1 — Fundație:** `better-auth` + adapter Drizzle pe Postgres-ul existent; `src/lib/auth.ts`
  (email+parolă, sesiuni DB, social Google), schema generată (`0011_*`), `/api/auth/[...all]`,
  `src/lib/auth-client.ts`, seed admin. Scoatem rutele Google custom.
- **Faza 2 — Roluri & permisiuni:** `createAccessControl` cu capabilities granulare; roluri
  `admin/editor/author/client`; plugin `admin`; helper unic `can()` (server + React).
- **Faza 3 — Admin useri:** rescriere `/admin/utilizatori` (listă/creare/editare/ban/impersonare/
  soft-delete) + `audit_log` + `logAudit`.
- **Faza 4 — Cont self-service:** profil, schimbare parolă, sesiuni active + revocare, reset+verify
  email, invitații, `PUBLIC_SIGNUP=OFF`.
- **Faza 5 — Scaffolding:** `organization`, `twoFactor`, passkeys, OAuth — pregătite & flag-uite +
  `docs/roadmap-auth.md`.

**STOP aici** — aștept go explicit înainte de Faza 1 (cod de producție).
