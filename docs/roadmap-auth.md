# Roadmap auth — cârlige pregătite (inactive by default)

> Extensii Better Auth pregătite pentru viitor. Sunt **dezactivate** acum ca să nu adauge
> complexitate/coloane nefolosite. Mai jos, pașii concreți de activare pentru fiecare.
> Vezi și [auth-audit.md](./auth-audit.md). Config: `src/lib/auth.ts` (server) + `src/lib/auth-client.ts` (client).

Reguli generale la activarea oricărui plugin care adaugă tabele:

1. Adaugă plugin-ul în `plugins: [...]` din `src/lib/auth.ts` (+ varianta client în `auth-client.ts`).
2. Regenerează schema: `DATABASE_URL=postgres://x:x@localhost:5432/x npx @better-auth/cli generate --config src/lib/auth.ts --output src/lib/server/auth-schema.ts -y`
3. Generează migrația: `npm run db:generate` → comite `drizzle/00XX_*`.
4. Aplică pe dev: `node --env-file=.env scripts/migrate.mjs` (pe prod rulează automat la deploy).

Flag-uri rezervate (în `.env.example` / `src/env.d.ts`): `ENABLE_2FA`, `ENABLE_ORGANIZATIONS`,
`PUBLIC_SIGNUP` (acesta e deja activ — controlează signup-ul public, default OFF).

---

## 1. Organizații (multi-tenant pentru clienți)

**Scop:** fiecare client să aibă propriul „workspace" cu membri și roluri proprii (zona de proiect/rapoarte).

**Activare:**
- `src/lib/auth.ts`:
  ```ts
  import { organization } from 'better-auth/plugins';
  // în plugins: [...]
  organization({
    allowUserToCreateOrganization: false, // doar adminul creează org-uri
    // schimbă în funcție de nevoi: invitări, roluri per-org etc.
  }),
  ```
- `src/lib/auth-client.ts`:
  ```ts
  import { organizationClient } from 'better-auth/client/plugins';
  // în plugins: [...] → organizationClient(),
  ```
- Regenerează schema + migrație (adaugă tabelele `organization`, `member`, `invitation`).
- UI: ecran de gestiune org-uri + asociere `client` ↔ organizație (de construit la activare).

## 2. Autentificare în doi pași (2FA / TOTP)

**Scop:** al doilea factor (cod TOTP) pentru conturile sensibile (admin), opțional per user.

**Activare:**
- `src/lib/auth.ts`:
  ```ts
  import { twoFactor } from 'better-auth/plugins';
  // în plugins: [...]
  twoFactor({ issuer: 'Simplead Admin' }),
  ```
- `src/lib/auth-client.ts`:
  ```ts
  import { twoFactorClient } from 'better-auth/client/plugins';
  // în plugins: [...] → twoFactorClient(),
  ```
- Regenerează schema + migrație (adaugă tabelul `twoFactor` + câmpul `user.twoFactorEnabled`).
- UI în `/admin/cont`: enroll (QR), verificare cod, backup codes. Poate fi impus pe rol `admin`.
- Poți găta activarea în spatele `ENABLE_2FA`.

## 3. Passkeys (WebAuthn)

**Scop:** login fără parolă, cu cheia dispozitivului (FaceID/Touch/Windows Hello).

**Activare:**
- Dependență: deja inclusă în `better-auth/plugins` (`passkey`).
- `src/lib/auth.ts`: `import { passkey } from 'better-auth/plugins';` → `passkey()` în plugins.
- `src/lib/auth-client.ts`: `import { passkeyClient } from 'better-auth/client/plugins';` → `passkeyClient()`.
- Regenerează schema + migrație (tabelul `passkey`).
- UI în `/admin/cont`: „Adaugă passkey" + login cu passkey pe `/admin/login`.

## 4. OAuth Google — DEJA ACTIV

Login cu Google e deja configurat (`socialProviders.google` în `src/lib/auth.ts`, citit din
`GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` sau din `/admin/integrari`). Redirect URI:
`${SITE_URL}/api/auth/callback/google`. Alți provideri (GitHub, Microsoft) se adaugă analog în
`socialProviders` + butoane în `AdminLoginForm.tsx`.

## 5. Restrângerea domeniului la Google (opțional)

Azi orice cont Google care trece prin flux primește rol `client` (fără acces /admin). Dacă vrei să
permiți doar `@simplead.ro`, adaugă un `databaseHooks.user.create.before` care respinge emailurile
din afara domeniului permis, sau o verificare în `signIn.social` callback.

---

## Notă despre bootstrap & signup

- Primul admin: `POST /api/auth/setup` (self-locking, doar când 0 useri) — creează userul programatic
  prin `auth.$context`, deci merge și cu `PUBLIC_SIGNUP=OFF`.
- Conturi noi: din `/admin/utilizatori` (admin creează + trimite invitație pe email).
- Signup public: dezactivat (`disableSignUp`) cât timp `PUBLIC_SIGNUP !== 'true'`.
