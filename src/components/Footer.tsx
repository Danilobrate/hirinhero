import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import Logo from './Logo';

export default async function Footer() {
  const t = await getTranslations();
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <div className="fbrand"><Logo height={25} className="fwm" /></div>
            <div className="fslogan">Hand-picked talent. Every time.</div>
            <p style={{maxWidth: 340}}>{t('ft_tag')}</p>
          </div>
          <div>
            <h4>{t('ft_nav')}</h4>
            <Link href="/o-nama">{t('nav_about')}</Link>
            <Link href="/usluge">{t('nav_services')}</Link>
            <Link href="/reference">{t('nav_ref')}</Link>
            <Link href="/objave">{t('nav_posts')}</Link>
            <Link href="/kontakt">{t('nav_contact')}</Link>
          </div>
          <div>
            <h4>{t('ft_cta')}</h4>
            <Link href="/za-poslodavce">{t('nav_emp')}</Link>
            <Link href="/za-kandidate">{t('nav_cand')}</Link>
            <span style={{display: 'block', padding: '5px 0', opacity: .74}}>{t('ft_coach')}</span>
            <h4 style={{marginTop: 18}}>{t('ft_legal')}</h4>
            <Link href="/privatnost">{t('nav_privacy')}</Link>
            <Link href="/uslovi">{t('nav_terms')}</Link>
          </div>
        </div>
        <div className="fbottom">
          <span>© {new Date().getFullYear()} Hirin’ Hero Co d.o.o.</span>
          <span>PIB: 03637689 · Podgorica, Crna Gora</span>
        </div>
      </div>
    </footer>
  );
}
