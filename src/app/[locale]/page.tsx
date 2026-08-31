import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import TrustStrip from '@/components/TrustStrip';
import Partnerships from '@/components/Partnerships';
import Testimonials from '@/components/Testimonials';
import LogoWall from '@/components/LogoWall';

const Check = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
);

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="eyebrow reveal">{t('hero_eyebrow')}</div>
          <h1 className="reveal" style={{whiteSpace: 'pre-line'}}>{t('hero_h1')}</h1>
          <p className="lead reveal" style={{whiteSpace: 'pre-line'}}>{t('hero_lead')}</p>
          <div className="hero-cta reveal">
            <Link className="btn btn-primary" href="/za-poslodavce">{t('hero_cta1')}</Link>
            <Link className="btn btn-ghost" href="/za-kandidate">{t('hero_cta2')}</Link>
          </div>
          <div className="hero-meta reveal">
            <div><b>15+</b> <span>{t('hero_m1')}</span></div>
            <div><b>700+</b> <span>{t('hero_m2')}</span></div>
            <div><b>60+</b> <span>{t('hero_m3')}</span></div>
            <div><b>12+</b> <span>{t('hero_m4')}</span></div>
          </div>
        </div>
      </section>

      <section className="stats" style={{padding: '60px 0'}}>
        <div className="wrap">
          <div className="grid">
            <div className="stat"><div className="n" data-count="60">60<span className="accent">+</span></div><div className="l">{t('s1')}</div></div>
            <div className="stat"><div className="n" data-count="700">700<span className="accent">+</span></div><div className="l">{t('s2')}</div></div>
            <div className="stat"><div className="n" data-count="20">20<span className="accent">+</span></div><div className="l">{t('s3')}</div></div>
            <div className="stat"><div className="n" data-count="12">12<span className="accent">+</span></div><div className="l">{t('s4')}</div></div>
            <div className="stat"><div className="n">15.5k<span className="accent">+</span></div><div className="l">{t('s5')}</div></div>
            <div className="stat"><div className="n">5</div><div className="l">{t('s6')}</div></div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">{t('svc_eyebrow')}</div>
            <h2>{t('svc_h2')}</h2>
            <p>{t('svc_p')}</p>
          </div>
          <div className="cards">
            {[1, 2, 3].map(i => (
              <div className="card reveal" key={i}>
                <div className="ic">{['①', '②', '③'][i - 1]}</div>
                <h3>{t(`c${i}_h`)}</h3>
                <p>{t(`c${i}_p`)}</p>
                <Link className="more" href="/usluge">{t('more')}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="why">
        <div className="wrap why-grid">
          <div className="reveal">
            <div className="eyebrow">{t('why_eyebrow')}</div>
            <div className="big">{t('why_big')}</div>
            <p>{t('why_p')}</p>
          </div>
          <ul className="reveal">
            {[1, 2, 3, 4, 5].map(i => (
              <li key={i}><Check /><span>{t(`why_${i}`)}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head reveal" style={{textAlign: 'center', margin: '0 auto 40px'}}>
            <div className="eyebrow">{t('ref_eyebrow')}</div>
            <h2>{t('ref_h2')}</h2>
          </div>
          <LogoWall />
          <Testimonials />
        </div>
      </section>

      <section style={{paddingTop: 0}}>
        <div className="wrap">
          <div className="ai reveal">
            <div>
              <span className="badge">{t('ai_badge')}</span>
              <h2>{t('ai_h2')}</h2>
              <p>{t('ai_p')}</p>
            </div>
            <div className="side">
              <button className="btn btn-gold" type="button">{t('ai_cta1')}</button>
            </div>
          </div>
        </div>
      </section>

      <Partnerships />

      <section className="why" style={{padding: '80px 0'}}>
        <div className="wrap">
          <div className="sec-head reveal" style={{marginBottom: 40}}>
            <div className="eyebrow">{t('proc_eyebrow')}</div>
            <h2 style={{whiteSpace: 'pre-line'}}>{t('proc_h2')}</h2>
          </div>
          <div className="steps">
            {[1, 2, 3, 4].map(i => (
              <div className="step reveal" key={i}><h4>{t(`p${i}_h`)}</h4><p>{t(`p${i}_p`)}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
