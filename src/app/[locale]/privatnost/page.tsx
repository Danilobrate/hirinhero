import {setRequestLocale} from 'next-intl/server';

/* NAPOMENA: nacrt teksta — prije objave dati pravniku na pregled. */
const C = {
  me: {
    title: 'Politika privatnosti',
    updated: 'Posljednje ažuriranje: jul 2026.',
    sections: [
      ['Rukovalac podacima', 'Rukovalac vašim ličnim podacima je Hirin’ Hero Co d.o.o., PIB 03637689, sa sjedištem na adresi Oktobarske revolucije 86, Podgorica, Crna Gora (u daljem tekstu: „Agencija“). Za sva pitanja u vezi sa obradom podataka možete nam pisati na info@hirinhero.me.'],
      ['Koje podatke prikupljamo', 'Prikupljamo podatke koje nam sami dostavite: podatke iz upitnika za kandidate (ime i prezime, godište, kontakt, radno iskustvo, preferencije i očekivanja) i priloženi CV; podatke iz upitnika za poslodavce (podaci o kompaniji, poziciji i kontakt osobi); podatke iz kontakt forme. Sajt koristi neophodne kolačiće za osnovni rad, a analitičke kolačiće samo uz vašu saglasnost.'],
      ['Svrha i pravni osnov obrade', 'Podatke obrađujemo isključivo u svrhu profilisanja kandidata, posredovanja pri zapošljavanju i pripreme konsultantskog angažmana - na osnovu vaše saglasnosti koju dajete prilikom slanja forme. Podatke ne koristimo ni u jednu drugu svrhu i ne dijelimo ih sa trećim licima, osim sa poslodavcem u procesu posredovanja i to uz vaše prethodno znanje.'],
      ['Čuvanje podataka', 'Podaci se čuvaju u zaštićenoj bazi (infrastruktura našeg pružaoca usluge hostinga baze podataka) dok traje svrha obrade, odnosno do opoziva vaše saglasnosti. CV dokumenti se čuvaju u privatnom skladištu, nedostupnom javnosti.'],
      ['Vaša prava', 'U svakom trenutku imate pravo da zatražite: pristup svojim podacima, ispravku netačnih podataka, brisanje podataka („pravo na zaborav“), ograničenje obrade i opoziv saglasnosti. Zahtjev pošaljite na info@hirinhero.me - postupamo bez odlaganja, a najkasnije u roku od 15 dana.'],
      ['Kolačići', 'Neophodni kolačići omogućavaju osnovne funkcije sajta (izbor jezika, sesija) i ne mogu se isključiti. Analitički kolačići (mjerenje posjeta) aktiviraju se samo ako ih prihvatite u obavještenju o kolačićima. Izbor možete promijeniti brisanjem kolačića u svom pretraživaču.'],
      ['Izmjene politike', 'Politiku privatnosti možemo povremeno ažurirati. Važeća verzija je uvijek objavljena na ovoj stranici, sa datumom posljednje izmjene.']
    ]
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: July 2026',
    sections: [
      ['Data Controller', 'The controller of your personal data is Hirin’ Hero Co d.o.o., PIB 03637689, Oktobarske revolucije 86, Podgorica, Montenegro (the “Agency”). For any questions regarding data processing, write to info@hirinhero.me.'],
      ['Data We Collect', 'We collect data you provide yourself: candidate questionnaire data (name, year of birth, contact details, work experience, preferences and expectations) and the attached CV; employer questionnaire data (company, role and contact person details); contact form data. The site uses essential cookies for basic operation, and analytics cookies only with your consent.'],
      ['Purpose and Legal Basis', 'We process data solely for candidate profiling, recruitment mediation and preparing consulting engagements - based on the consent you give when submitting a form. We do not use the data for any other purpose and do not share it with third parties, except with an employer during the mediation process and with your prior knowledge.'],
      ['Data Retention', 'Data is stored in a protected database (our database hosting provider’s infrastructure) for as long as the processing purpose lasts, or until you withdraw consent. CV documents are kept in private storage, inaccessible to the public.'],
      ['Your Rights', 'At any time you may request: access to your data, correction of inaccurate data, deletion (“right to be forgotten”), restriction of processing and withdrawal of consent. Send your request to info@hirinhero.me - we act without delay, and within 15 days at the latest.'],
      ['Cookies', 'Essential cookies enable core site functions (language choice, session) and cannot be disabled. Analytics cookies (visit measurement) are activated only if you accept them in the cookie notice. You can change your choice by clearing cookies in your browser.'],
      ['Changes to This Policy', 'We may update this policy from time to time. The current version is always published on this page, with the date of the last change.']
    ]
  }
};

export default async function Privacy({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const c = C[locale as 'me' | 'en'] ?? C.me;
  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <h1>{c.title}</h1>
          <p className="note" style={{marginTop: 12}}>{c.updated}</p>
        </div>
      </section>
      <section style={{paddingTop: 30}}>
        <div className="wrap" style={{maxWidth: 820}}>
          {c.sections.map(([h, p]) => (
            <div key={h} style={{marginBottom: 28}}>
              <h3 style={{marginBottom: 8}}>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
