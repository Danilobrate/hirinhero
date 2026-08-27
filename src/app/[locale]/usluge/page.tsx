import {getTranslations, setRequestLocale} from 'next-intl/server';

export default async function Services({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <div className="eyebrow">{t('sv_eyebrow')}</div>
          <h1>{t('sv_h1')}</h1>
          <p className="lead">{t('sv_lead')}</p>
        </div>
      </section>
      <section style={{paddingTop: 30}}>
        <div className="wrap">
          <div className="svc-detail">
            <div className="panel">
              <div className="tag">{t('sv1_tag')}</div>
              <h3>{t('sv1_h')}</h3>
              <ol>{[1, 2, 3, 4, 5].map(i => <li key={i}>{t(`sv1_${i}`)}</li>)}</ol>
              <div className="row"><span>{t('sv_guarantee')}</span><b>{t('sv1_g')}</b></div>
              <div className="row"><span>{t('sv_invest')}</span><b>{t('sv1_i')}</b></div>
            </div>
            <div className="panel dark">
              <div className="tag">{t('sv2_tag')}</div>
              <h3>{t('sv2_h')}</h3>
              <ol>{[1, 2, 3, 4].map(i => <li key={i}>{t(`sv2_${i}`)}</li>)}</ol>
              <div className="row"><span>{t('sv_guarantee')}</span><b>{t('sv2_g')}</b></div>
              <div className="row"><span>{t('sv2_adv_l')}</span><b>{t('sv2_adv')}</b></div>
              <div className="row"><span>{t('sv_invest')}</span><b>{t('sv2_i')}</b></div>
            </div>
          </div>
          <div className="panel" style={{marginTop: 24}}>
            <div className="tag">{t('sv3_tag')}</div>
            <h3>{t('sv3_h')}</h3>
            <p>{t('sv3_p')}</p>
            <div className="row"><span>{t('sv3_price_l')}</span><b>{t('sv3_price')}</b></div>
          </div>
        </div>
      </section>
    </>
  );
}
