import type { APIRoute } from 'astro';
import { clearSessionCookie } from '../../../lib/server/auth';

export const prerender = false;

export const POST: APIRoute = ({ cookies, redirect }) => {
  clearSessionCookie(cookies);
  return redirect('/admin/login', 303);
};
