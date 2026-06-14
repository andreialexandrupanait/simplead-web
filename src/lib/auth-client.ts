import { createAuthClient } from 'better-auth/client';
import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import type { Auth } from './auth';
import { ac, roles } from './permissions';

/**
 * Client Better Auth pentru islands React (sign-in/out, sesiune, acțiuni admin).
 * `baseURL` implicit = origin-ul curent. `inferAdditionalFields` aduce tipurile
 * câmpurilor custom (role/banned etc.) din configul server.
 */
export const authClient = createAuthClient({
  plugins: [
    adminClient({ ac, roles }),
    inferAdditionalFields<Auth>(),
    // Cârlige pregătite (inactive) — vezi docs/roadmap-auth.md:
    //   twoFactorClient(), organizationClient(), passkeyClient()
  ],
});

export const { signIn, signOut, signUp, useSession } = authClient;
