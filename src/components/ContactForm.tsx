'use client';
import {useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';

export default function ContactForm() {
  const t = useTranslations();
  const locale = useLocale();
  const [f, setF] = useState({name: '', email: '', message: ''});
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const submit = async () => {
    setState('sending');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({kind: 'contact', contact_person: f.name, contact: f.email, q1: f.message, locale})
      });
      if (!res.ok) throw new Error();
      setState('done');
    } catch { setState('error'); }
  };
  if (state === 'done') return <div className="panel"><div className="wz-done"><div className="big">{t('wz_done_h')}</div><p>{t('em_done')}</p></div></div>;
  return (
    <div className="panel">
      <div className="field"><label>{t('co_f1')}</label><input type="text" value={f.name} onChange={e => setF({...f, name: e.target.value})} /></div>
      <div className="field"><label>{t('co_f2')}</label><input type="email" value={f.email} onChange={e => setF({...f, email: e.target.value})} /></div>
      <div className="field"><label>{t('co_f3')}</label><textarea value={f.message} onChange={e => setF({...f, message: e.target.value})} /></div>
      {state === 'error' && <p className="wz-err">{t('wz_err')}</p>}
      <button className="btn btn-primary" disabled={state === 'sending'} onClick={submit}>{state === 'sending' ? t('wz_sending') : t('co_submit')}</button>
    </div>
  );
}
