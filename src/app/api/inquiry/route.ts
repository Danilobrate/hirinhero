import {NextRequest, NextResponse} from 'next/server';
import {supabaseAdmin, notify, isConfigured, answersToText} from '@/lib/backend';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.consent !== true && body.kind !== 'contact') {
      return NextResponse.json({ok: false, error: 'consent_required'}, {status: 400});
    }
    if (!isConfigured()) {
      return NextResponse.json({ok: false, error: 'not_configured'}, {status: 503});
    }
    const kind = body.kind === 'contact' ? 'contact' : 'employer';
    const basics = {
      kind,
      company: body.company ?? null,
      industry: body.industry ?? null,
      role: body.role ?? null,
      headcount: body.headcount ? Number(body.headcount) : null,
      contact_person: body.contact_person ?? null,
      contact: body.contact ?? null,
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
