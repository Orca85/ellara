# Installationsteknik Nivå 1 — Byggplan

> Ordningen här är ett **förslag** — flytta om kapitel fritt när läraren lägger upp kursen.
> Varje kapitel bygger vi som en HTML-sida under en ny `/installationsteknik/`-mapp.

---

## Infrastruktur (gör en gång)

- [x] Skapa `/installationsteknik/`-mapp med egen `index.html` (kapitelöversikt)
- [x] Kopiera och anpassa gemensam layout (nav, sidebar, style) från Ellära
- [x] Aktivera "Installationsteknik – Nivå 1"-kortet på startsidan (`index.html`)
- [x] Lägg till kurs i sökmotorn (`script.js`)

---

## Kapitel 1 — Ledningar & Installationer
*Förläggning och anslutning av ledningar, reparation, ombyggnad, befintliga kretsar.*

- [ ] Förläggningssätt: tabell A1/A2/B1/B2/C/E/F med förklaringar och bilder
- [ ] Kabelrör-typer: PVC, räfflat, pansar — egenskaper och användning
- [ ] Kabelkanal och kabelstege — när används vad?
- [ ] Bockning av rör — grundprinciper
- [ ] Märkning av kablar i installation
- [ ] Quiz: `ledningar_test.html`

---

## Kapitel 2 — Material & Kapslingsklasser
*Installationsmaterial, IP-klasser, kapslingsklasser.*

- [ ] IP-koden förklarad: första siffra (damm), andra siffra (vatten)
- [ ] IP-tabell med alla klasser (IP20 → IP68) + typiska användningsområden
- [ ] IK-kod (stöttålighet) — kort avsnitt
- [ ] Interaktiv IP-lookup: välj miljö → rekommenderad IP-klass
- [ ] Quiz: `material_kapsling_test.html`

---

## Kapitel 3 — Motorer & Styrning
*Enklare start- och kopplingsutrustning, hållkretsar, relästyrning, apparatskåp.*

- [ ] Reläets uppbyggnad och funktion
- [ ] Kontaktor vs relä — skillnaden
- [ ] Hållkrets (självhållande krets) — schema + förklaring
- [ ] Start/stopp-koppling med kontaktor
- [ ] Motorskyddsrelä (termiskt)
- [ ] Enklare apparatskåp — komponenter och layout
- [ ] Interaktivt schema: animera hållkretsen (spänningssätts/frånkopplas)
- [ ] Quiz: `motorer_test.html`

---

## Kapitel 4 — Elsystem
*TN-, TT-, IT-system, TN-C vs TN-S, skyddsledarens funktion.*

> **OBS:** Grundinnehåll finns redan i Ellära (`ellara/installation.html`).
> Skapa en ny sida som fokuserar på det praktiska perspektivet och hänvisar till Ellära för djupgående teori.

- [ ] Sammanfattningssida med länk till Ellära-kapitlet
- [ ] Tilläggsavsnitt: skyddsledarens (PE) praktiska funktion och krav
- [ ] Quiz: `elsystem_test.html` (kan återanvända frågor från `installation_test.html`)

---

## Kapitel 5 — Praktiskt arbete & Mätning
*Anslutning, losskoppling, funktionsprovning, mätning, kontroll före idrifttagning.*

- [ ] Steg-för-steg: anslutning av uttag och belysning
- [ ] Isolationsmätning — vad mäts, hur tolkas värden
- [ ] Kontinuitetsprovning (PE-ledaren)
- [ ] Jordfelsimulation (RCD-test)
- [ ] Kontroll-checklista före idrifttagning (interaktiv bocklista)
- [ ] Mätning med multimeter — DC/AC-spänning, ström, resistans
- [ ] Quiz: `matning_test.html`

---

## Kapitel 6 — Säkerhet & Regler
*Personligt skydd, standarder, lagar, auktorisationskrav.*

- [ ] Elsäkerhetslagen (2016:732) — vem får göra vad
- [ ] ELSÄK-FS — Elsäkerhetsverkets föreskrifter
- [ ] AFS 2017:3 — arbete nära spänning
- [ ] Auktorisation: behörighetsregler (A, B, C-behörighet)
- [ ] Personlig skyddsutrustning (PSU) vid elarbete
- [ ] 5-stegsprincipen (säker arbetsprocedur)
- [ ] Quiz: `sakerhet_test.html`

---

## Kapitel 7 — Dokumentation & Ritningar
*Tolkning av ritningar och scheman, dokumentation av eget arbete.*

- [ ] Symboler i installationsscheman (uttag, brytare, lampa, motor…)
- [ ] Läsa en installationsritning — övning med riktigt schema
- [ ] Skillnad: principschema vs installations­schema vs kopplingsschema
- [ ] Dokumentationskrav — vad ska dokumenteras och varför
- [ ] Interaktivt: identifiera symboler i ett schema
- [ ] Quiz: `ritningar_test.html`

---

## Kapitel 8 — Felsökning & Underhåll
*Felsökning i befintliga anläggningar, underhåll av elutrustning.*

- [ ] Systematisk felsökningsmetodik
- [ ] Vanliga fel: avbrott, kortslutning, jordsfel, felaktig fas
- [ ] Mätning som felsökningsverktyg
- [ ] Underhållsintervall och rutiner
- [ ] Interaktivt felsökningsscenario (välj symptom → diagnos)
- [ ] Quiz: `felsökning_test.html`

---

## Kapitel 9 — Hållbarhet
*Återvinning av elmaterial, hållbarhetsarbete i installationsbranschen.*

- [ ] Återvinning: kopparkabel, PVC, elektronik (WEEE-direktivet)
- [ ] Miljömärkningar och val av material
- [ ] Energieffektivisering i installationer
- [ ] Hållbarhetsarbete — branschen och framtiden
- [ ] Quiz: `hallbarhet_test.html`

---

## Studieverktyg (samma som Ellära)

- [ ] Flashcards per kapitel
- [ ] Sammanlagt prov (blandade frågor från alla kapitel)
- [ ] Formelblad för installationsteknik
- [ ] Progress-spårning (localStorage, samma system som Ellära)

---

## Prioriteringsordning (förslag)

```
Klar att ändra — detta är bara ett utgångsläge:

1. Infrastruktur (aktivera kortet, skapa mapp)
2. Kapitel 2 — IP-klassning        (avgränsat, bra tjuvstart)
3. Kapitel 1 — Ledningar           (grundläggande, praktiskt)
4. Kapitel 6 — Säkerhet & regler   (viktigt, prov-vanligt)
5. Kapitel 4 — Elsystem            (bygg på Ellära)
6. Kapitel 3 — Motorer & styrning  (mest djupgående)
7. Kapitel 5 — Mätning             (kräver praktik-erfarenhet)
8. Kapitel 7 — Ritningar           (bra när du jobbat med scheman)
9. Kapitel 8 — Felsökning          (kräver helhetsförståelse)
10. Kapitel 9 — Hållbarhet         (kortare kapitel, bygg sist)
```
