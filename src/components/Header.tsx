'use client';
import {useState, useEffect} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import Logo from './Logo';

const links = [
  ['/', 'nav_home'], ['/o-nama', 'nav_about'], ['/usluge', 'nav_services'],
  ['/reference', 'nav_ref'], ['/za-poslodavce', 'nav_emp'],
  ['/za-kandidate', 'nav_cand'], ['/kontakt', 'nav_contact']
] as const;

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', f); f();
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="wrap nav">
        <Link className="brand" href="/" aria-label="Hirin’ Hero" style={{color: 'var(--ink)'}}>
          <Logo height={22} />
        </Link>
        <nav className={'menu' + (open ? ' open' : '')}>
          {links.map(([href, k]) => (
            <Link key={k} className="nl" href={href} onClick={() => setOpen(false)}>{t(k)}</Link>
          ))}
        </nav>
        <div className="nav-right">
          <div className="lang">
            <Link href={pathname} locale="me" className={locale === 'me' ? 'on' : ''}>CG</Link>
            <Link href={pathname} locale="en" className={locale === 'en' ? 'on' : ''}>EN</Link>
          </div>
          <button className="burger" onClick={() => setOpen(o => !o)} aria-label="Meni">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
