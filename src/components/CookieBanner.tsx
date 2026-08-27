'use client';
import {useState, useEffect} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function CookieBanner() {
  const t = useTranslations();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('hh-cookie-consent')) setShow(true);
  }, []);
  const decide = (v: 'all' | 'essential') => {
    localStorage.setItem('hh-cookie-consent', v);
    setShow(false);
    /* MIRKO: ako se doda analitika (npr. Plausible/GA), ucitati je samo kada je consent === 'all' */
  };
  if (!show) return null;
  return (
    <div className="cookiebar" role="dialog" aria-live="polite">
      <p>{t('cookie_txt')} <Link href="/privatnost">{t('cookie_more')}</Link></p>
      <div className="cb-btns">
        <button className="btn btn-ghost" onClick={() => decide('essential')}>{t('cookie_decline')}</button>
        <button className="btn btn-primary" onClick={() => decide('all')}>{t('cookie_accept')}</button>
      </div>
    </div>
  );
}
