import {getTranslations} from 'next-intl/server';

/* Traka povjerenja: Company Wall AA+ i Fond za inovacije */
export default async function TrustStrip() {
  const t = await getTranslations();
  return (
    <div className="trust">
      <div className="wrap">
        <div className="tt">{t('tr_title')}</div>
        <div className="trust-row">
          {/* MIRKO: umjesto stilizovanog bedza moze zvanicni CW web baner (URL iz CW emaila):
              <a href="https://www.companywall.me/" target="_blank"><img src="https://www.companywall.me/image/bonitet?id=XXXXX&type=1&y=2026" width="600" height="100"/></a> */}
          <a className="tbadge" href="https://www.companywall.me/" target="_blank" rel="noopener noreferrer">
            <span className="aa"><em>AA</em>+</span>
            <span className="tb-txt"><b>{t('tr_cw')}</b><small>{t('tr_cw_s')}</small></span>
          </a>
          {/* MIRKO: zamijeniti inline SVG zvanicnim PNG logom Fonda (public/fond.png) kad stigne */}
          <a className="tbadge" href="https://www.fondzainovacije.me/" target="_blank" rel="noopener noreferrer">
            <svg width="26" height="56" viewBox="0 0 40 88" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="20" cy="13" r="12" fill="#654C9F" />
              <path d="M20,32 C31,32 34,44 27,52 C34,60 31,72 20,72 C9,72 6,60 13,52 C6,44 9,32 20,32 Z" fill="#4FB18C" />
            </svg>
            <span className="tb-txt"><b>{t('tr_fond')}</b><small>{t('tr_fond_s')}</small></span>
          </a>
        </div>
      </div>
    </div>
  );
}
