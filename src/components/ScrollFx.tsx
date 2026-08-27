'use client';
import {useEffect} from 'react';
import {usePathname} from '@/i18n/navigation';

/* Reveal animacije + animirani brojaci (port iz prototipa) */
export default function ScrollFx() {
  const pathname = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), {threshold: .12});
    document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));

    const cio = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement; cio.unobserve(el);
      const target = +(el.dataset.count || 0); let n = 0;
      const step = Math.ceil(target / 40);
      const iv = setInterval(() => {
        n += step; if (n >= target) { n = target; clearInterval(iv); }
        if (el.firstChild) el.firstChild.textContent = String(n);
      }, 22);
    }), {threshold: .4});
    document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

    return () => { io.disconnect(); cio.disconnect(); };
  }, [pathname]);
  return null;
}
