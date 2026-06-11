# Pagina „Pachete & Prețuri" — specificație pentru implementare

> Spec pentru Claude Code. Pagină nouă `/pachete` pe site-ul Simplead (vezi `Simplead_Website_Brief_Continut.md` pentru design tokens, dark theme, voce de brand).
> Toate prețurile sunt FIXE și se afișează ca atare. Monedă: EUR. ‹de confirmat cu contabilul: mențiunea TVA›.

---

## Hero

- **Titlu:** Pachete clare, fără surprize
- **Subtitlu:** Servicii cu preț fix și abonamente de mentenanță. Știi de la început ce primești și cât costă.

---

## Secțiunea 1 — Tarife orare (transparență, stil „calculator")

Afișate vizibil, ca grilă simplă. Mesaj introductiv: „Lucrările în afara pachetelor se tarifează orar, transparent — de la 35€/oră."

| Serviciu | Tarif |
|---|---|
| Servicii grafică | 35€ / oră |
| Consultanță marketing | 60€ / oră |
| Development | 75€ / oră |

---

## Secțiunea 2 — Pachete web (principale, primele pe pagină)

### Card 1: Site de prezentare — **1.500€**
Site complet, construit custom, gata de lansare.
- Până la 6 pagini (pagină extra: 100€)
- Design custom, responsive
- Optimizare SEO tehnic + viteză
- Formular de contact + analytics
- Lansare inclusă
- CTA: „Cere ofertă →"

### Card 2: Magazin online — **2.500€**
Magazin funcțional, cu plăți online active din prima zi.
- WooCommerce, până la 50 de produse încărcate
- Plăți online integrate
- Configurare metode de livrare
- Training de administrare (1h)
- CTA: „Cere ofertă →"

### Card 3: UX/UI Redesign — **900€**
Site-ul tău, regândit: mai rapid, mai clar, mai modern.
- Redesign complet pe structura existentă
- Optimizare viteză + SEO tehnic
- Migrare conținut
- CTA: „Cere ofertă →"

---

## Secțiunea 3 — Pachete grafică & marketing (secundare, sub cele web)

### Card 4: Identitate vizuală — **450€**
Identitate vizuală coerentă, construită în jurul logo-ului tău.
- Paletă de culori și tipografie
- Brand kit livrat (fișiere editabile)
- Aplicare pe materiale de bază

> **PRECIZARE OBLIGATORIE pe card (text vizibil, nu footnote):**
> „Nu creăm logo-uri. Dacă ai nevoie de un logo nou, te conectăm cu specialiști în logo design cu care colaborăm — iar noi construim identitatea vizuală în jurul lui."
> Ton: asumat, nu defensiv. E o alegere de focus, nu o lipsă.

### Card 5: Grafică publicitară — **350€**
Materiale pentru campaniile tale: bannere, social media, print.
- 10 vizualuri (formate web + print)
- Două runde de revizii incluse
- Livrare în fișiere finale + editabile

### Card 6: Strategie marketing — **900€**
Plan complet, aplicabil, nu teorie.
- Analiză poziționare + concurență
- Canale recomandate + plan de acțiune
- Document livrat + sesiune de prezentare
- Pentru consultanță recurentă: 60€/oră

---

## Secțiunea 4 — Abonamente de mentenanță

Intro: „Site-ul tău, actualizat, salvat și sub supraveghere, lună de lună."

### Mentenanță Standard — **75€/lună**
- Backup săptămânal
- Actualizări CMS
- Securitate
- 1h modificări incluse

### Mentenanță Premium — **120€/lună**
- Monitorizare continuă
- Securitate avansată
- 3h modificări incluse
- Priority support

**Banner sub carduri:** „🎁 Prima lună de mentenanță gratuită la orice site nou construit de noi."

### Opțiuni suplimentare (rând de chip-uri/badge-uri)
| Opțiune | Preț |
|---|---|
| +2 ore suport tehnic | +40€ |
| SEO continuu | +150€/lună |
| Găzduire premium dedicată | +30€/lună |
| Raportare avansată Analytics | +25€/lună |

---

## Note de implementare

1. Ordinea secțiunilor pe pagină: Hero → Pachete web → Grafică & marketing → Mentenanță → Tarife orare → CTA final.
2. Pachetele web vizual dominante (carduri mari); grafica & marketing pe rând secundar, mai compact.
3. Fiecare card are CTA „Cere ofertă →" către `/contact` (cu pachetul preselectat în formular, dacă se poate).
4. Precizarea despre logo NU se omite și NU se ascunde în tooltip — face parte din poziționare.
5. Niciun preț „de la" — toate fixe. Singura excepție: tarifele orare, introduse cu „de la 35€/oră".
6. Voce de brand: clară, directă, caldă, fără jargon (vezi brief). Propoziții scurte.
7. CTA final de pagină: „Nu știi ce pachet ți se potrivește? Scrie-ne — îți răspundem cu o recomandare concretă, nu cu un call de vânzări."
