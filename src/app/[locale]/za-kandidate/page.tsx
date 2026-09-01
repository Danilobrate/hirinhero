import {getTranslations, setRequestLocale} from 'next-intl/server';
import Wizard from '@/components/Wizard';
import {candidateWizard} from '@/components/wizardConfigs';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const title = t('ca_h1').split('\n').join(' ');
  const description = t('ca_lead');
  const path = (locale === 'me' ? '' : '/en') + '/za-kandidate';
  return {
    title: t('nav_cand'),
    description,
    openGraph: {title, description, url: path},
    twitter: {title, description},
    alternates: {canonical: path}
  };
}

export default async function Candidates({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <div className="eyebrow">{t('ca_eyebrow')}</div>
          <h1 style={{whiteSpace: 'pre-line'}}>{t('ca_h1')}</h1>
          <p className="lead">{t('ca_lead')}</p>
        </div>
      </section>
      <section style={{paddingTop: 34}}>
        <div className="wrap">
          <Wizard config={candidateWizard} />
        </div>
      </section>
    </>
  );
}
