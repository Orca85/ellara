# Bilder från note_images/new — vad som gjordes

**Datum:** 2026-04-02
**Källa:** 31 bilder (IMG_0755–IMG_0785) i `ellara/note_images/new/`
**Metod:** Bilderna tolkades och omvandlades till HTML i sidans stilsystem — inga bilder bäddades in.

---

## Bildkatalog

| Bild(er) | Innehåll | Åtgärd |
|---|---|---|
| 0755 | Handskrivet: trefasmotorer, rotorer/statorer, symmetrisk/osymmetrisk last, 120° fasförskjutning | Inarbetat i 5k (Y/D-beräkningar) och 5l (motorstart) |
| 0756 | Handskrivet: Magnetism, effekttyper P/Q/S, fasförskjutning | **Hoppat** — P/Q/S täcks redan i avsnitt 5i |
| 0757 | Handskrivet: Reaktans XL/XC, Y/D-motorstart, startström | Inarbetat i nytt avsnitt **5l Y/D-motorstart** |
| 0758 | Handskrivet: Verkningsgrad η — diagram, η < 1.0, jämförelsetabell | Inarbetat i nytt avsnitt **5j Verkningsgrad** |
| 0759 | Handskrivet: Trefas L1/L2/L3-diagram, Uf × √3 = UH, toppvärde vs effektivvärde | **Hoppat** — täcks redan i avsnitt 5d (Generatorn, 230/325/400V-kortet) |
| 0760 | Handskrivet: Delta/Y-diagram med tabell (Y: 8A, D: 14A, faktor √3) | Inarbetat i nytt avsnitt **5k Y/D-beräkningar** |
| 0761 | Tryckt: Perioden — vad är en period, trefas L1/L2/L3-sinuskurvor | **Hoppat** — period/frekvens täcks i avsnitt 5d |
| 0762 | Tryckt: Aktiv effekt P, reaktiv Q, skenbar S med grafer | **Hoppat** — täcks i avsnitt 5i |
| 0763 | Tryckt: Beräkning av resistiv belastning, I-beräkning trefas | **Hoppat** — täcks av 5k-exempelen |
| 0764 | Tryckt (upp-och-ned): Spolen — beskrivning, induktans L, tillämpningar | **Hoppat** — täcks i avsnitt 5f |
| 0765 | Tryckt (upp-och-ned): Självinduktiont | **Hoppat** — täcks i avsnitt 5f |
| 0766 | Tryckt (upp-och-ned): Ideal spole i växelströmskrets, 90° fasförskjutning | **Hoppat** — täcks i avsnitt 5h |
| 0767 | Tryckt (upp-och-ned): Vad är fasförskjutning? | **Hoppat** — täcks i avsnitt 5h |
| 0768 | Tryckt (upp-och-ned): Seriekopplade kondensatorer — formel + räkneexempel | Inarbetat i **kretsar.html** → kondensatorer i serie/parallell |
| 0769 | Tryckt (upp-och-ned): Parallellkopplade kondensatorer — formel + räkneexempel | Inarbetat i **kretsar.html** → kondensatorer i serie/parallell |
| 0770 | Tryckt (upp-och-ned): Induktiv reaktans, fasförskjutning, Pythagoras Z | **Hoppat** — täcks i avsnitt 5f och 5h |
| 0771 | Tryckt: XL = 2π·f·L — räkneexempel radio 104 MHz | **Hoppat** — täcks i avsnitt 5f |
| 0772 | Tryckt (snett): Begrepp i växelströmslära — referenstabell del 1 | **Hoppat** — innehåll spritt i 5d–5i, täcks |
| 0773 | Tryckt (snett): Referenstabell del 2 — XC, XL formler | **Hoppat** — täcks i 5f och 5g |
| 0774 | Tryckt (snett): Impedans Z, effekttriangeln, sin/cos/tan | **Hoppat** — täcks i 5f och 5i |
| 0775 | Tryckt (snett): Effektfaktorn cos φ | **Hoppat** — täcks i avsnitt 5i |
| 0776 | Tryckt: Exempel Y-koppling — 100Ω, beräkning steg för steg | Inarbetat i nytt avsnitt **5k Y/D-beräkningar** |
| 0777 | Tryckt: Exempel D-koppling — 100Ω, beräkning steg för steg | Inarbetat i nytt avsnitt **5k Y/D-beräkningar** |
| 0778 | Tryckt: Fasförskjutning i seriella och parallella kretsar (tabell del 1) | Inarbetat i nytt avsnitt **5m RLC-kretsar** |
| 0779 | Tryckt: Fasförskjutning i parallella kretsar (tabell del 2) | Inarbetat i nytt avsnitt **5m RLC-kretsar** |
| 0780 | Tryckt: Serie- och parallellkopplade kondensatorer (översikt) | Dubblett av 0768/0769 — hoppat |
| 0781 | Tryckt: Serie- och parallellkopplade induktorer (översikt) | Inarbetat i **kretsar.html** → induktorer i serie/parallell |
| 0782 | Tryckt: Fasförskjutning seriella kretsar (sämre foto, dubblett av 0778) | Dubblett — hoppat |
| 0783 | Tryckt: Fasförskjutning parallella kretsar (sämre foto, dubblett av 0779) | Dubblett — hoppat |
| 0784 | Tryckt: Serie/parallell kondensatorer (dubblett av 0780) | Dubblett — hoppat |
| 0785 | Tryckt: Serie/parallell induktorer (dubblett av 0781) | Dubblett — hoppat |

---

## Nytt innehåll som lades till

### `trefas.html` — 4 nya avsnitt

| Avsnitt | ID | Innehåll |
|---|---|---|
| 5j | `#verkningsgrad` | η = P_ut/P_in, alltid < 1. Exempel motor 80%. Jämförelsetabell (transformator 99%, elmotor 85–95%, lysrör 25–40%, bensinmotor 30%, glödlampa 5%). Not om η ≠ cos φ. |
| 5k | `#yd-berakningar` | Y-koppling (100Ω, 2,3A, 1590W) och D-koppling (100Ω, 4A, 4800W) med fullständiga beräkningar och kontroll via trefasformeln. Förklaring 3× effektskillnad. |
| 5l | `#yd-start` | Y/D-motorstart — steg 1 (Y, 230V, 1/3 startström) och steg 2 (D, 400V, full drift). Varför Y/D-start används, tumregel ≥ 4 kW, not om frekvensomriktare. |
| 5m | `#rlc-kretsar` | L+C serie, R+L+C serie (|Z|, fasförskjutning, cos φ), R+L+C parallell (strömgrenar, I_tot). Resonansformel f₀ = 1/(2π√LC). |

Också: 4 nya snabblänkar i intro-navigationsgrid.

### `kretsar.html` — 2 nya innehållskort

| ID | Innehåll |
|---|---|
| `#kondensatorer-koppling` | Serie: 1/C_tot = 1/C1+1/C2+… (kapacitansen minskar). Parallell: C_tot = C1+C2+… Räkneexempel serie (8+4+2 µF → 1,14 µF) och parallell (2+4+6+16 = 28 µF). Minnesregel (omvänt mot R). |
| `#induktorer-koppling` | Serie: L_tot = L1+L2+… Parallell: 1/L_tot = 1/L1+1/L2+… Minnesregel (samma som R). |

Också: 2 nya snabblänkar i intro-navigationsgrid.

---

## Innehåll som INTE lades till (med motivering)

- **P/Q/S-effekter** — täcks redan grundligt i avsnitt 5i
- **Spole och självinduktiont** — täcks i avsnitt 5f
- **Fasförskjutning (grundbegrepp)** — täcks i avsnitt 5h
- **XL och XC formler** — täcks i 5f och 5g
- **Toppvärde/effektivvärde** — täcks i avsnitt 5d (230/325/400V-kortet)
- **Period och frekvens** — täcks i avsnitt 5d
- **Impedans Z-grunderna** — täcks i 5f
- **Dubblettbilder** — 0780=0784, 0781=0785, 0782≈0778, 0783≈0779
