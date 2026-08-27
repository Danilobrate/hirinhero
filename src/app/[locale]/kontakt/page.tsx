import {getTranslations, setRequestLocale} from 'next-intl/server';
import ContactForm from '@/components/ContactForm';

export default async function Contact({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <div className="eyebrow">{t('co_eyebrow')}</div>
          <h1>{t('co_h1')}</h1>
        </div>
      </section>
      <section style={{paddingTop: 30}}>
        <div className="wrap why-grid">
          <ContactForm />
          <div>
            <h3 style={{marginBottom: 18}}>Hirin’ Hero Co d.o.o.</h3>
            <p style={{marginBottom: 8}}><b className="accent">✉</b> danilo365days@gmail.com</p>
            <p style={{marginBottom: 8}}><b className="accent">☎</b> +382 69 595 669</p>
            <p style={{marginBottom: 8}}><b className="accent">⌖</b> Oktobarske revolucije 86, Podgorica</p>
            <p style={{marginBottom: 8}}><b className="accent">in</b> linkedin.com/in/danilomontenegro</p>
            <p className="note" style={{marginTop: 18}}>PIB: 03637689 · PDV: 30/31-27186-9</p>
          </div>
        </div>
      </section>
    </>
  );
}
