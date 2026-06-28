import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';
import { getDb } from './server/db';
import { serverEnv } from './server/env';
import { sendEmail } from './server/email';
import * as authSchema from './server/auth-schema';
import { ac, roles } from './permissions';

/**
 * Instanța Better Auth (server), inițializată LAZY. Sesiuni în DB (revocabile),
 * email+parolă + Google, peste Postgres-ul existent prin adapterul Drizzle.
 * Emailurile trec prin `sendEmail` (Postmark). Provider-ul Google e citit din env
 * (schimbarea credențialelor cere restart).
 *
 * De ce lazy: middleware-ul rulează la build pentru paginile prerandate, iar
 * build-ul prod nu are `DATABASE_URL`. Dacă am crea instanța la nivel de modul,
 * importul middleware-ului ar arunca la build. Cu `getAuth()` instanța se naște
 * doar la runtime (primul request), când `DATABASE_URL` există.
 */
function createAuth() {
  const db = getDb();
  if (!db) {
    throw new Error('[auth] DATABASE_URL este necesar pentru Better Auth.');
  }

  const googleClientId = serverEnv('GOOGLE_CLIENT_ID');
  const googleClientSecret = serverEnv('GOOGLE_CLIENT_SECRET');

  return betterAuth({
    appName: 'Simplead Admin',
    baseURL: serverEnv('BETTER_AUTH_URL') || serverEnv('SITE_URL') || 'http://localhost:4321',
    secret: serverEnv('BETTER_AUTH_SECRET') || serverEnv('SESSION_SECRET'),
    database: drizzleAdapter(db, { provider: 'pg', schema: authSchema }),

    emailAndPassword: {
      enabled: true,
      minPasswordLength: 10,
      requireEmailVerification: false,
      // Înregistrare publică OFF by default (PUBLIC_SIGNUP=true o activează).
      // Nu afectează crearea de către admin (createUser) sau bootstrap-ul.
      disableSignUp: serverEnv('PUBLIC_SIGNUP') !== 'true',
      sendResetPassword: async ({ user, url }) => {
        await sendEmail({
          to: user.email,
          subject: 'Resetare parolă · Admin Simplead',
          text: `Salut,\n\nAi cerut resetarea parolei pentru contul tău Simplead.\nDeschide linkul de mai jos ca să setezi o parolă nouă:\n\n${url}\n\nDacă nu tu ai cerut asta, ignoră acest email.\n\nSimplead`,
        });
      },
    },

    emailVerification: {
      sendOnSignUp: false,
      sendVerificationEmail: async ({ user, url }) => {
        await sendEmail({
          to: user.email,
          subject: 'Confirmă adresa de email · Simplead',
          text: `Salut,\n\nConfirmă adresa de email pentru contul Simplead deschizând linkul:\n\n${url}\n\nDacă nu tu ai creat contul, ignoră acest email.\n\nSimplead`,
        });
      },
    },

    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 zile
      updateAge: 60 * 60 * 24, // reîmprospătează zilnic
      cookieCache: { enabled: true, maxAge: 5 * 60 },
    },

    account: {
      accountLinking: { enabled: true, trustedProviders: ['google'] },
    },

    socialProviders:
      googleClientId && googleClientSecret
        ? { google: { clientId: googleClientId, clientSecret: googleClientSecret } }
        : {},

    advanced: {
      cookiePrefix: 'simplead',
      useSecureCookies: import.meta.env.PROD,
    },

    plugins: [
      admin({ ac, roles, defaultRole: 'client', adminRoles: ['admin'] }),
      // Cârlige pregătite (inactive) — vezi docs/roadmap-auth.md pentru activare:
      //   twoFactor({ issuer: 'Simplead Admin' }),        // 2FA TOTP
      //   organization({ allowUserToCreateOrganization: false }), // multi-tenant clienți
      //   passkey(),                                       // WebAuthn / passkeys
      // (la activare: adaugă importul, regenerează schema + migrația, adaugă varianta client)
    ],
  });
}

let _auth: ReturnType<typeof createAuth> | undefined;

/** Instanța Better Auth, memoizată (creată lazy la primul apel runtime). */
export function getAuth() {
  _auth ??= createAuth();
  return _auth;
}

export type Auth = ReturnType<typeof createAuth>;
