---
title: 'Backup, update-uri, securitate: ghidul practic al unui site sănătos'
description: 'Rutina concretă de întreținere a unui site, pas cu pas: ce actualizezi și în ce ordine, cum faci backup corect, ce verifici la securitate și ce monitorizezi lunar.'
pubDate: 2026-06-10
tags: ['Mentenanță website', 'Securitate', 'Ghid practic']
draft: true
---

În [articolul despre mentenanța lunară](/blog/de-ce-mentenanta-lunara) am explicat *de ce* are nevoie site-ul tău de întreținere. Aici intrăm în *cum*: rutina concretă, pas cu pas, pe care o poți face singur dacă ai timp și răbdare. E același schelet de proces pe care îl folosim și noi, povestit fără jargon.

Un avertisment prietenos înainte: nimic de mai jos nu e greu, dar totul cere disciplină. Dacă știi despre tine că „o să o faci luna viitoare", sări direct la finalul articolului.

## Pasul 0: backup ÎNAINTE de orice

Regula de aur a oricărei intervenții pe site: întâi copia de siguranță, apoi modificarea. Orice actualizare poate strica ceva; cu un backup proaspăt, „stricat" înseamnă zece minute de restaurare, nu un weekend de panică.

Un backup corect are trei proprietăți:

- **E complet:** și fișierele site-ului, și baza de date. Multe „backup-uri" salvează doar una dintre ele, ceea ce la restaurare e o surpriză neplăcută.
- **E în altă parte:** o copie păstrată pe același server cu site-ul dispare odată cu serverul. Salveaz-o în alt loc (alt server, cloud, descărcată local).
- **E testat:** o dată la câteva luni, încearcă efectiv să restaurezi backup-ul undeva (un subdomeniu de test e suficient). O copie pe care n-ai restaurat-o niciodată e o presupunere, nu o plasă de siguranță.

Frecvența sănătoasă: săptămânal pentru un site de prezentare, zilnic pentru un magazin online sau orice site în care se introduc date în fiecare zi.

## Pasul 1: actualizările, în ordinea corectă

Actualizările există în primul rând ca să astupe găuri de securitate, deci nu sunt opționale. Dar nici nu se aplică „toate, pe repede înainte". Ordinea care minimizează riscul:

1. **Citește ce actualizezi.** La fiecare componentă, aruncă un ochi pe notele de versiune. Te interesează cuvintele „security fix" (urgent) și „major version" (atenție, pot apărea incompatibilități).
2. **Una câte una, nu toate deodată.** Dacă actualizezi zece lucruri simultan și site-ul se strică, nu știi care e vinovatul. Pe rând, cu o verificare scurtă după fiecare.
3. **Verifică ce contează după fiecare rundă:** se încarcă paginile principale? Funcționează formularul de contact? Dar coșul și plata, dacă ai magazin?
4. **Nu uita fundația:** versiunea de PHP de pe server și certificatul SSL nu se actualizează singure peste tot. Certificatul expirat e felul în care site-ul tău le spune vizitatorilor „pleacă de aici" cu un avertisment roșu pe tot ecranul.

Ritm sănătos: o trecere pe lună, plus imediat când apare o actualizare de securitate la o componentă importantă.

## Pasul 2: igiena de securitate

Pe lângă actualizări, o listă scurtă de igienă elimină majoritatea riscurilor comune:

- **Conturi:** șterge utilizatorii care nu mai au treabă cu site-ul (foști colaboratori, agenții vechi). Fiecare cont în plus e o ușă în plus.
- **Parole:** lungi, unice, ținute într-un manager de parole. Iar contul de administrator nu se numește „admin": e primul nume pe care îl încearcă orice script de atac.
- **Autentificare în doi pași** acolo unde platforma o permite: chiar și un SMS e mai bun decât nimic.
- **Plugin-uri și teme nefolosite: șterse, nu doar dezactivate.** Codul dezactivat tot pe server stă și tot vulnerabil poate fi.
- **Acces pe HTTPS peste tot,** inclusiv panoul de administrare.

Nimic exotic; exact lucrurile „mărunte" care, neglijate un an, transformă un site obișnuit într-o țintă ușoară.

## Pasul 3: monitorizarea, ca să afli tu primul

Diferența dintre un incident minor și o catastrofă e, de cele mai multe ori, **cine află primul**: tu sau clienții tăi. De-asta partea de monitorizare e, pentru noi, inima întregului serviciu de [mentenanță](/mentenanta).

Minimul pe care merită să-l urmărești:

- **Site-ul răspunde?** (uptime) Există servicii care verifică asta la câteva minute și trimit alertă când pagina nu mai răspunde.
- **Cât de repede se încarcă?** O degradare lentă a vitezei e simptomul clasic al unei probleme care crește.
- **Certificatul SSL e valid și departe de expirare?**
- **Formularele chiar trimit?** Un test manual pe lună e suficient și prinde una dintre cele mai tăcute defecțiuni posibile: formularul care arată perfect și nu livrează nimic.

## Rutina, pe scurt

Ca să ai totul pe o singură pagină:

**Săptămânal:** backup automat (zilnic la magazine), un ochi pe alertele de monitorizare.
**Lunar:** actualizări în ordinea de la Pasul 1, test de formulare, o privire pe viteza site-ului.
**Trimestrial:** test de restaurare a backup-ului, curățenie de conturi/plugin-uri, schimbarea parolelor critice.

Pus în calendar, totul înseamnă câteva ore pe lună. Nepus în calendar, înseamnă (mai devreme sau mai târziu) un weekend pierdut și clienți care au prins site-ul căzut.

## Dacă preferi să nu te ocupi tu

E exact serviciul nostru de [mentenanță website](/mentenanta): rutina de mai sus, făcută disciplinat, cu monitorizare permanentă printr-o aplicație internă și intervenții incluse, de la un abonament lunar predictibil. Tu primești rapoarte și un site de care nu trebuie să-ți mai amintești; noi ne ocupăm de restul. [Scrie-ne](/contact) dacă vrei să preluăm noi grija asta.
