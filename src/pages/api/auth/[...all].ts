import type { APIRoute } from 'astro';
import { auth } from '../../../lib/auth';

export const prerender = false;

/** Handler-ul Better Auth pentru toate rutele /api/auth/* (sign-in, sign-out,
 * callback social, reset parolă, sesiuni etc.). */
export const ALL: APIRoute = ({ request }) => auth.handler(request);
