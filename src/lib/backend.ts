import {createClient} from '@supabase/supabase-js';
import {Resend} from 'resend';

/* Backend pomocnici — svaka usluga je opciona (env-gated), da sajt radi i prije pune konfiguracije. */

export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {auth: {persistSession: false}});
}

export async function notify(subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!apiKey || !to) return false;
  const resend = new Resend(apiKey);
  const {error} = await resend.emails.send({
    from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
    to, subject, text
  });
  // Resend ne baca izuzetak za API-nivo greske (npr. rate limit, neverifikovan
  // domen) — vec ih vraca kao `error` polje. Bez ove provjere greska ostaje
  // nevidljiva i mejl jednostavno ne stigne, bez traga u logovima.
  if (error) {
    console.error('resend error', error);
    return false;
  }
  return true;
}

export function isConfigured() {
  return Boolean((process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) ||
    (process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL));
}

export function answersToText(obj: Record<string, unknown>, skip: string[] = []) {
  return Object.entries(obj)
    .filter(([k, v]) => !skip.includes(k) && v !== '' && v != null && k !== 'consent' && k !== 'locale')
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join('\n');
}
