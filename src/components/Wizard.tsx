'use client';
import {useMemo, useRef, useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import type {WizardConfig, Field} from './wizardConfigs';

const MAX_CV = 5 * 1024 * 1024;
const CV_TYPES = ['.pdf', '.docx'];

export default function Wizard({config}: {config: WizardConfig}) {
  const t = useTranslations();
  const locale = useLocale();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [cv, setCv] = useState<File | null>(null);
  const [cvErr, setCvErr] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [consentErr, setConsentErr] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const allFields = useMemo(() => config.steps.flatMap(s => s.fields), [config]);
  const total = allFields.length;
  const filled = allFields.filter(f =>
    f.type === 'file' ? !!cv :
    f.type === 'checkbox' ? values[f.name] === true :
    typeof values[f.name] === 'string' && (values[f.name] as string).trim() !== ''
  ).length;
  const pct = Math.round((filled / total) * 100);

  const set = (name: string, v: string | boolean) => setValues(p => ({...p, [name]: v}));
  const scrollTop = () => boxRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
  const go = (i: number) => { setStep(i); scrollTop(); };

  const onCv = (f: File | null) => {
    setCvErr('');
    if (!f) { setCv(null); return; }
    const ext = f.name.slice(f.name.lastIndexOf('.')).toLowerCase();
    if (!CV_TYPES.includes(ext)) { setCvErr(t('cv_type_err')); return; }
    if (f.size > MAX_CV) { setCvErr(t('cv_size_err')); return; }
    setCv(f);
  };

  const submit = async () => {
    if (values['consent'] !== true) { setConsentErr(true); return; }
    setConsentErr(false); setState('sending');
    try {
      let res: Response;
      if (config.endpoint === '/api/apply') {
        const fd = new FormData();
        Object.entries(values).forEach(([k, v]) => fd.append(k, String(v)));
        fd.append('locale', locale);
        if (cv) fd.append('cv', cv);
        res = await fetch(config.endpoint, {method: 'POST', body: fd});
      } else {
        res = await fetch(config.endpoint, {
          method: 'POST', headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({...values, locale})
        });
      }
      if (!res.ok) throw new Error(String(res.status));
      setState('done'); scrollTop();
    } catch { setState('error'); }
  };

  const last = step === config.steps.length - 1;

  if (state === 'done') return (
    <div className="panel wizard" ref={boxRef}>
      <div className="wz-done">
        <div className="big">{t('wz_done_h')}</div>
        <p>{t(config.doneKey)}</p>
      </div>
    </div>
  );

  return (
    <div className="panel wizard" ref={boxRef}>
      <div className="wz-top">
        <div className="wz-info">
          <b>{t('wz_step')} {step + 1} {t('wz_of')} {config.steps.length}</b>
          <span className="wz-pct">{pct}%</span>
        </div>
        <div className="wz-bar"><i style={{width: `${pct}%`}} /></div>
      </div>
      <div className="wz-body">
        {config.steps.map((s, i) => (
          <div key={s.titleKey} className={'wz-step' + (i === step ? ' active' : '')}>
            <h3>{t(s.titleKey)}</h3>
            {s.subKey && <p className="wz-sub">{t(s.subKey)}</p>}
            <div className={s.grid ? 'form-grid' : undefined}>
              {s.fields.map(f => <FieldEl key={f.name} f={f} values={values} set={set}
                cv={cv} cvErr={cvErr} onCv={onCv} t={t} />)}
            </div>
          </div>
        ))}
      </div>
      {consentErr && <p className="wz-err">{t('wz_consent_req')}</p>}
      {state === 'error' && <p className="wz-err">{t('wz_err')}</p>}
      <div className="wz-nav">
        <button type="button" className="btn btn-ghost"
          style={{visibility: step === 0 ? 'hidden' : 'visible'}}
          onClick={() => go(step - 1)}>{t('wz_back')}</button>
        {!last && <button type="button" className="btn btn-primary" onClick={() => go(step + 1)}>{t('wz_next')}</button>}
        {last && <button type="button" className="btn btn-gold" disabled={state === 'sending'}
          onClick={submit}>{state === 'sending' ? t('wz_sending') : t(config.submitKey)}</button>}
      </div>
    </div>
  );
}

function FieldEl({f, values, set, cv, cvErr, onCv, t}: {
  f: Field; values: Record<string, string | boolean>;
  set: (n: string, v: string | boolean) => void;
  cv: File | null; cvErr: string; onCv: (f: File | null) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const v = values[f.name];
  if (f.type === 'checkbox') return (
    <label className="consent" style={{marginTop: 16}}>
      <input type="checkbox" checked={v === true} onChange={e => set(f.name, e.target.checked)} />
      <span>{t(f.k)}</span>
    </label>
  );
  if (f.type === 'radio') return (
    <div className="field">
      <label>{t(f.k)}</label>
      <div className="status-opts">
        {f.options!.map(o => (
          <label key={o.value}>
            <input type="radio" name={f.name} checked={v === o.value} onChange={() => set(f.name, o.value)} />
            <span><b>{t(o.k)}</b>{o.dk && <small>{t(o.dk)}</small>}</span>
          </label>
        ))}
      </div>
    </div>
  );
  if (f.type === 'file') return (
    <div className="field">
      <label>{t(f.k)}</label>
      <label className="file" style={{display: 'block'}}>
        <input type="file" accept=".pdf,.docx" style={{display: 'none'}}
          onChange={e => onCv(e.target.files?.[0] ?? null)} />
        {cv ? <>{t('cv_chosen')} <b>{cv.name}</b></> : <>⬆ {t('cv_pick')}</>}
      </label>
      {cvErr && <p className="wz-err">{cvErr}</p>}
    </div>
  );
  if (f.type === 'select') return (
    <div className="field">
      <label>{t(f.k)}</label>
      <select value={(v as string) || ''} onChange={e => set(f.name, e.target.value)}>
        {f.options!.map(o => <option key={o.k} value={o.value}>{t(o.k)}</option>)}
      </select>
    </div>
  );
  if (f.type === 'textarea') return (
    <div className="field">
      <label>{t(f.k)}</label>
      {f.helpKey && <p className="wz-help">{t(f.helpKey)}</p>}
      <textarea value={(v as string) || ''} onChange={e => set(f.name, e.target.value)} />
    </div>
  );
  return (
    <div className="field">
      <label>{t(f.k)}</label>
      {f.helpKey && <p className="wz-help">{t(f.helpKey)}</p>}
      <input type={f.type} min={f.type === 'number' ? 1 : undefined}
        value={(v as string) || ''} onChange={e => set(f.name, e.target.value)} />
    </div>
  );
}
