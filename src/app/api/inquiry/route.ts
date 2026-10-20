import {NextRequest, NextResponse} from 'next/server';
import {supabaseAdmin, notify, isConfigured, answersToText} from '@/lib/backend';

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : v == null ? '' : String(v).trim());
const orNull = (v: unknown) => str(v) || null;

// Polja bez kojih upit poslodavca nema smisla (ne znamo ko je poslao)
const REQUIRED_EMPLOYER = ['company', 'contact_person', 'contact'] as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.consent !== true && body.kind !== 'contact') {
      return NextResponse.json({ok: false, error: 'consent_required'}, {status: 400});
    }
    const kind = body.kind === 'contact' ? 'contact' : 'employer';
    if (kind === 'employer') {
      const missing = REQUIRED_EMPLOYER.filter(k => !str(body[k]));
      if (missing.length) {
        return NextResponse.json({ok: false, error: 'missing_fields', fields: missing}, {status: 400});
      }
    }
    if (!isConfigured()) {
      return NextResponse.json({ok: false, error: 'not_configured'}, {status: 503});
    }
    const basics = {
      kind,
      company: orNull(body.company),
      industry: orNull(body.industry),
      role: orNull(body.role),
      headcount: body.headcount ? Number(body.headcount) : null,
      contact_person: orNull(body.contact_person),
      contact: orNull(body.contact),
      locale: body.locale ?? 'me'
    };
    const answers: Record<string, string> = {};
    for (let i = 1; i <= 22; i++) if (body[`q${i}`]) answers[`q${i}`] = String(body[`q${i}`]);

    const sb = supabaseAdmin();
    if (sb) {
      const {error} = await sb.from('inquiries').insert({...basics, answers});
      if (error) throw error;
    }
    const subj = kind === 'contact'
      ? `Kontakt sa sajta — ${basics.contact_person ?? ''}`
      : `Novi upit poslodavca — ${basics.company ?? ''} (${basics.role ?? ''})`;
    await notify(subj, answersToText({...basics, ...answers}));
    return NextResponse.json({ok: true});
  } catch (e) {
    console.error('inquiry error', e);
    return NextResponse.json({ok: false, error: 'server_error'}, {status: 500});
  }
}
