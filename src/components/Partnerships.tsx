import {getTranslations} from 'next-intl/server';

export default async function Partnerships() {
  const t = await getTranslations();
  return (
    <section style={{paddingTop: 0}}>
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">{t('pn_eyebrow')}</div>
          <h2>{t('pn_h2')}</h2>
          <p>{t('pn_p')}</p>
        </div>
        <div className="svc-detail">
          <div className="panel reveal">
            <div className="tag">Recrewty</div>
            <h3>{t('pn1_h')}</h3>
            <p>{t('pn1_p')}</p>
            <a className="more" href="https://recrewty.com" target="_blank" rel="noopener noreferrer">recrewty.com →</a>
          </div>
          <div className="panel reveal">
            <div className="tag">tvojtim.me</div>
            <h3>{t('pn2_h')}</h3>
            <p>{t('pn2_p')}</p>
            <a className="more" href="https://tvojtim.me" target="_blank" rel="noopener noreferrer">tvojtim.me →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
