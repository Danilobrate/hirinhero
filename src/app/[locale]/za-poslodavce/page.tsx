import {getTranslations, setRequestLocale} from 'next-intl/server';
import Wizard from '@/components/Wizard';
import {employerWizard} from '@/components/wizardConfigs';

export async function generateMetadata() {
  const t = await getTranslations();
  return {title: t('nav_emp')};
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
