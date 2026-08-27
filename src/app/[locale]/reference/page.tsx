import {getTranslations, setRequestLocale} from 'next-intl/server';
import Testimonials from '@/components/Testimonials';
import LogoWall from '@/components/LogoWall';

export default async function References({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <div className="eyebrow">{t('rf_eyebrow')}</div>
          <h1>{t('rf_h1')}</h1>
          <p className="lead">{t('rf_lead')}</p>
        </div>
      </section>
      <section style={{paddingTop: 30}}>
        <div className="wrap">
          <div className="eyebrow reveal">{t('rf_clients')}</div>
          <LogoWall start />
          <Testimonials />
        </div>
      </section>
      <div className="partners">
        <div className="wrap">
          <div className="tt">{t('pt_title')}</div>
          <div className="prow">
            <a className="p" href="https://www.fondzainovacije.me/" target="_blank" rel="noopener noreferrer">{t('pt1')}</a>
            <a className="p" href="https://www.companywall.me/" target="_blank" rel="noopener noreferrer">{t('pt2')}</a>
            <a className="p" href="https://recrewty.com" target="_blank" rel="noopener noreferrer">{t('pt3')}</a>
            <a className="p" href="https://tvojtim.me" target="_blank" rel="noopener noreferrer">{t('pt4')}</a>
          </div>
        </div>
      </div>
    </>
  );
}
