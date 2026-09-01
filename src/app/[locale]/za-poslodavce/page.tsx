import {getTranslations, setRequestLocale} from 'next-intl/server';
import Wizard from '@/components/Wizard';
import {employerWizard} from '@/components/wizardConfigs';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const title = t('em_h1').split('\n').join(' ');
  const description = t('em_lead');
  const path = (locale === 'me' ? '' : '/en') + '/za-poslodavce';
  return {
    title: t('nav_emp'),
    description,
    openGraph: {title, description, url: path},
    twitter: {card: 'summary_large_image', title, description},
    alternates: {canonical: path}
  };
}

export default async function Employers({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <div className="eyebrow">{t('em_eyebrow')}</div>
          <h1>{t('em_h1')}</h1>
          <p className="lead">{t('em_lead')}</p>
        </div>
      </section>
      <section style={{paddingTop: 34}}>
        <div className="wrap">
          <Wizard config={employerWizard} />
        </div>
      </section>
    </>
  );
}
