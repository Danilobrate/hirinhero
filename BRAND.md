# Hirin' Hero — brend standard

Ovo je jedini izvor istine za boje, font i logo/mark. Sve novo (sajt, email potpisi,
prezentacije, nalozi na trećim servisima poput CompanyWall-a i sl.) treba da se
poziva na ovaj fajl, ne da se izmišlja iznova.

## Boje

| Naziv          | Hex       | Upotreba                                  |
|----------------|-----------|--------------------------------------------|
| Navy           | `#16304f` | Primarna — pozadina marka, tekst, dugmad   |
| Navy 2         | `#1f3a5f` | Sekundarna teget nijansa (hover, akcenti)  |
| Ink (tekst)    | `#15233a` | Naslovi, tamni tekst na svijetloj pozadini |
| Body (tekst)   | `#3c4859` | Tijelo teksta                              |
| Gold / Accent  | `#c9a24b` | Zlatni apostrof, akcenti, ikonice          |
| Gold dark      | `#a8842f` | Zlatan tekst na bijeloj pozadini (kontrast)|
| Line           | `#e7ebf1` | Linije, separatori                         |

CSS varijable su definisane u `src/app/globals.css` (`--navy`, `--navy-2`, `--ink`,
`--body`, `--accent`, `--accent-d`, `--line`). Uvijek koristiti varijable u kodu
sajta, ne hardkodovati hex vrijednosti.

## Font

**Inter** (Google Fonts, weights 400/500/600/700/800) — jedini font na sajtu i u svim
brend materijalima (logo, email potpisi, prezentacije). Logo i naslovi koriste
weight **800** i `letter-spacing: -0.02em`.

## Logo (wordmark)

`src/components/Logo.tsx` — živi tekst "Hirin' Hero" u Inter 800, ne vektorska
slika. Apostrof između "Hirin" i "Hero" je UVIJEK zlatan (`var(--accent)`),
ostatak teksta nasljeđuje boju iz konteksta (`currentColor`) — teget na svijetloj
pozadini (header), bijelo na tegetnoj pozadini (footer).

Ne regenerisati logo kao vektor/sliku — tekstualna verzija garantuje da je logo
zauvijek u istom fontu kao ostatak sajta, bez ručnog usklađivanja.

## Mark (mala kvadratna ikonica — "H'H")

Standard za svaku situaciju gdje treba mali kvadratni brend simbol (favicon,
avatar, značka u email potpisu, app ikonica i sl.):

- Kvadrat/zaobljeni kvadrat, tegetna pozadina (`#16304f`, bez gradijenta)
- Sadržaj: **H** (bijelo) + **'** (zlatno, `#c9a24b`) + **H** (bijelo)
- Font: Inter (ili Arial/sans-serif fallback), weight 800
- Border-radius: ~27% širine (npr. 34px kvadrat → 9px radius; 44px → 12px)

Referentna implementacija:
- `src/app/icon.svg` — favicon, plain SVG (izvor istine za tačan izgled)
- `src/components/Mark.tsx` — React komponenta za upotrebu unutar sajta
- Email potpisi (`hirinhero_signatures.html`) — isti spec, ručno rađen HTML
  badge jer email klijenti ne podržavaju SVG/React

Kad god se mark koristi bilo gdje novom (nalog na trećem servisu, prezentacija,
štampani materijal), koristiti tačno ovaj spec — ne "samo H", ne gradijent, ne
druga boja apostrofa.

## Slogan

"Hand-picked talent. Every time." — italic, zlatno (`accent-d` `#a8842f` na
bijeloj pozadini radi kontrasta, `accent` `#c9a24b` na tamnoj pozadini).
