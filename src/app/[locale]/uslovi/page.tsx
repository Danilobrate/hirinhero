import {setRequestLocale} from 'next-intl/server';

/* NAPOMENA: nacrt teksta — prije objave dati pravniku na pregled. */
const C = {
  me: {
    title: 'Uslovi korišćenja',
    updated: 'Posljednje ažuriranje: jul 2026.',
    sections: [
      ['Opšte odredbe', 'Korišćenjem sajta hirinhero.me prihvatate ove uslove. Sajt vodi Hirin’ Hero Co d.o.o., Podgorica. Sadržaj sajta je informativnog karaktera i ne predstavlja ponudu u pravnom smislu — konkretni uslovi saradnje definišu se ugovorom.'],
      ['Usluge', 'Agencija pruža usluge regrutacije i selekcije, head-huntinga i HR konsaltinga. Slanje upitnika preko sajta ne zasniva ugovorni odnos, već predstavlja upit na osnovu kojeg vas kontaktiramo.'],
      ['Intelektualna svojina', 'Sadržaj sajta (tekstovi, logotip, vizuelni identitet, upitnici) vlasništvo je Agencije i ne smije se kopirati niti koristiti bez prethodne pisane saglasnosti, osim u informativne svrhe uz navođenje izvora.'],
      ['Tačnost informacija', 'Trudimo se da su svi podaci na sajtu tačni i ažurni, ali ne garantujemo potpunost i preciznost svih informacija u svakom trenutku. Reference i brojke odražavaju stanje u trenutku objave.'],
      ['Ograničenje odgovornosti', 'Agencija ne odgovara za štetu nastalu korišćenjem sajta ili nemogućnošću njegovog korišćenja, uključujući privremenu nedostupnost. Linkovi ka sajtovima trećih strana dati su informativno — Agencija ne odgovara za njihov sadržaj.'],
      ['Mjerodavno pravo', 'Na ove uslove primjenjuje se pravo Crne Gore. Za sporove je nadležan stvarno nadležni sud u Podgorici.']
    ]
  },
  en: {
    title: 'Terms of Use',
    updated: 'Last updated: July 2026',
    sections: [
      ['General', 'By using hirinhero.me you accept these terms. The site is operated by Hirin’ Hero Co d.o.o., Podgorica. The content is informational and does not constitute a legal offer — specific terms of cooperation are defined by contract.'],
      ['Services', 'The Agency provides recruitment and selection, head-hunting and HR consulting services. Submitting a questionnaire through the site does not create a contractual relationship; it is an inquiry based on which we contact you.'],
      ['Intellectual Property', 'Site content (texts, logo, visual identity, questionnaires) is the property of the Agency and may not be copied or used without prior written consent, except for informational purposes with attribution.'],
      ['Accuracy of Information', 'We strive to keep all information accurate and up to date, but do not guarantee the completeness and precision of all information at all times. References and figures reflect the state at the time of publication.'],
      ['Limitation of Liability', 'The Agency is not liable for damage arising from the use of, or inability to use, the site, including temporary unavailability. Links to third-party sites are provided for information — the Agency is not responsible for their content.'],
      ['Governing Law', 'These terms are governed by the law of Montenegro. The competent court in Podgorica has jurisdiction over disputes.']
    ]
  }
};

export default async function Terms({params}: {params: Promise<{locale: string}>}) {
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
