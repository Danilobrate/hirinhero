import type {Metadata} from 'next';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getTranslations, getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import ScrollFx from '@/components/ScrollFx';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map(locale => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://hirinhero.me';
  const homePath = locale === 'me' ? '/' : '/en';
  return {
    metadataBase: new URL(base),
    title: {default: t('meta_title'), template: '%s - Hirin’ Hero'},
    description: t('meta_desc'),
    openGraph: {
      title: t('meta_title'), description: t('meta_desc'), url: homePath,
      siteName: 'Hirin’ Hero', locale: locale === 'me' ? 'sr_ME' : 'en_US', type: 'website'
    },
    twitter: {card: 'summary_large_image', title: t('meta_title'), description: t('meta_desc')},
    alternates: {canonical: homePath, languages: {'sr-ME': '/', en: '/en'}}
  };
}

const orgLd = {
  '@context': 'https://schema.org', '@type': 'Organization',
  name: 'Hirin’ Hero Co d.o.o.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://hirinhero.me',
  email: 'info@hirinhero.me',
  address: {'@type': 'PostalAddress', streetAddress: 'Oktobarske revolucije 86', addressLocality: 'Podgorica', addressCountry: 'ME'}
};

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale === 'me' ? 'sr-ME' : 'en'}>
      {/* MIRKO: na Vercelu se moze presjeci na next/font/google (build-time optimizacija);
          ovdje je klasican link zbog offline builda */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(orgLd)}} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
          <ScrollFx />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
