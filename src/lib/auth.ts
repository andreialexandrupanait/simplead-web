import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';
import { getDb } from './server/db';
import { serverEnv } from './server/env';
import { sendEmail } from './server/email';
import * as authSchema from './server/auth-schema';

/**
 * Instanța Better Auth (server). Sesiuni în DB (revocabile), email+parolă +
 * Google, peste Postgres-ul existent prin adapterul Drizzle. Emailurile trec
 * prin `sendEmail` (Postmark). Provider-ul Google e citit din env la pornire
 * (schimbarea credențialelor cere restart).
 *
 * Better Auth are nevoie de DB: în dev `.env` și în prod containerul setează
 * mereu `DATABASE_URL`. Modulul e importat doar de cod server (rute /api/auth,
 * middleware), niciodată de pagini prerandate.
 */
const db = getDb();
if (!db) {
  throw new Error('[auth] DATABASE_URL este necesar pentru Better Auth.');
}

const googleClientId = serverEnv('GOOGLE_CLIENT_ID');
const googleClientSecret = serverEnv('GOOGLE_CLIENT_SECRET');

export const auth = betterAuth({
  appName: 'Simplead Admin',
  baseURL: serverEnv('BETTER_AUTH_URL') || serverEnv('SITE_URL') || 'http://localhost:4321',
  secret: serverEnv('BETTER_AUTH_SECRET') || serverEnv('SESSION_SECRET'),
  database: drizzleAdapter(db, { provider: 'pg', schema: authSchema }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Resetare parolă — Admin Simplead',
        text: `Salut,\n\nAi cerut resetarea parolei pentru contul tău Simplead.\nDeschide linkul de mai jos ca să setezi o parolă nouă:\n\n${url}\n\nDacă nu tu ai cerut asta, ignoră acest email.\n\n— Simplead`,
      });
    },
  },

  emailVerification: {
    sendOnSignUp: false,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Confirmă adresa de email — Simplead',
        text: `Salut,\n\nConfirmă adresa de email pentru contul Simplead deschizând linkul:\n\n${url}\n\nDacă nu tu ai creat contul, ignoră acest email.\n\n— Simplead`,
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

  plugins: [admin()],
});
