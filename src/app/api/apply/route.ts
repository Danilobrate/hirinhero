import {NextRequest, NextResponse} from 'next/server';
import {supabaseAdmin, notify, isConfigured, answersToText} from '@/lib/backend';

const MAX_CV = 5 * 1024 * 1024;
const ALLOWED = ['pdf', 'docx'];

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();
    const get = (k: string) => {
      const v = fd.get(k);
      return typeof v === 'string' ? v : '';
    };
    if (get('consent') !== 'true') {
      return NextResponse.json({ok: false, error: 'consent_required'}, {status: 400});
    }
    if (!isConfigured()) {
      return NextResponse.json({ok: false, error: 'not_configured'}, {status: 503});
    }
    const basics = {
      full_name: get('full_name'), birth_year: get('birth_year'),
      phone: get('phone'), email: get('email'),
      work_status: get('work_status'), urgency: get('urgency'),
      locale: get('locale') || 'me'
    };
    const answers: Record<string, string> = {};
    for (let i = 1; i <= 20; i++) if (get(`q${i}`)) answers[`q${i}`] = get(`q${i}`);

    // CV validacija + upload
    const cv = fd.get('cv');
    let cvPath: string | null = null;
    const sb = supabaseAdmin();
    if (cv && typeof cv !== 'string' && cv.size > 0) {
      const ext = cv.name.split('.').pop()?.toLowerCase() || '';
      if (!ALLOWED.includes(ext)) return NextResponse.json({ok: false, error: 'cv_type'}, {status: 400});
      if (cv.size > MAX_CV) return NextResponse.json({ok: false, error: 'cv_size'}, {status: 400});
      if (sb) {
        const safe = cv.name.replace(/[^\w.\-]+/g, '_');
        cvPath = `${Date.now()}_${safe}`;
        const {error} = await sb.storage.from('cvs').upload(cvPath, Buffer.from(await cv.arrayBuffer()), {
          contentType: cv.type || 'application/octet-stream'
        });
        if (error) throw error;
      }
    }
    if (sb) {
      const {error} = await sb.from('candidates').insert({...basics, answers, cv_path: cvPath});
      if (error) throw error;
    }
    await notify(
      `Nova prijava kandidata — ${basics.full_name}`,
      answersToText({...basics, ...answers, cv: cvPath ? `u Supabase storage-u: cvs/${cvPath}` : 'nije prilozen'})
    );
    return NextResponse.json({ok: true});
  } catch (e) {
    console.error('apply error', e);
    return NextResponse.json({ok: false, error: 'server_error'}, {status: 500});
  }
}
