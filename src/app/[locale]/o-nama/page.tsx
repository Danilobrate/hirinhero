import {getTranslations, setRequestLocale} from 'next-intl/server';

export default async function About({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <div className="eyebrow">{t('ab_eyebrow')}</div>
          <h1>{t('ab_h1')}</h1>
          <p className="lead">{t('ab_lead')}</p>
        </div>
      </section>

      <section style={{paddingTop: 30, paddingBottom: 40}}>
        <div className="wrap svc-detail">
          <div className="panel reveal">
            <div className="tag">{t('ms_tag')}</div>
            <h3>{t('ms_h')}</h3>
            <p>{t('ms_p')}</p>
          </div>
          <div className="panel dark reveal">
            <div className="tag">{t('vs_tag')}</div>
            <h3>{t('vs_h')}</h3>
            <p style={{color: 'rgba(255,255,255,.85)'}}>{t('vs_p')}</p>
          </div>
        </div>
      </section>

      <section className="why" style={{padding: '80px 0'}}>
        <div className="wrap">
          <div className="sec-head reveal" style={{marginBottom: 26}}>
            <div className="eyebrow">{t('pr_eyebrow')}</div>
            <h2>{t('pr_h2')}</h2>
          </div>
          <p className="lead reveal" style={{maxWidth: 820, whiteSpace: 'pre-line'}}>{t('pr_p')}</p>
          <div className="vals">
            {[1, 2, 3].map(i => (
              <div className="val reveal" key={i}><h4>{t(`pv${i}_h`)}</h4><p>{t(`pv${i}_p`)}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section style={{paddingTop: 70}}>
        <div className="wrap why-grid">
          <div className="panel">
            <div className="tag">{t('ab_founder_tag')}</div>
            <h3>Danilo Popović</h3>
            <p style={{whiteSpace: 'pre-line'}}>{t('ab_founder_p')}</p>
          </div>
          <div>
            <div className="eyebrow">{t('ab_val_eyebrow')}</div>
            <ul style={{listStyle: 'none', display: 'grid', gap: 14, padding: 0}}>
              {[1, 2, 3, 4].map(i => (
                <li key={i} style={{display: 'flex', gap: 12}}><b className="accent">—</b><span>{t(`ab_v${i}`)}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
