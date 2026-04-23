# Redesign — Nordic Precision / Technical Atelier

## Vad som ska byggas

Komplett ombyggnad av app-skalet på alla ~35 HTML-filer. Nuvarande design stämmer inte med mockuparna.

Mockupar finns i `/redesign`-mappen.

---

## Nytt app-skal (tre zoner)

```
┌──────────────┬────────────────────────────────────────────────┐
│  SIDEBAR     │  TOP BAR (h-16, backdrop-filter blur)          │
│  256px fast  │  Studieguiden · Kurser / Bibliotek / Framsteg  │
│              ├────────────────────────────────────────────────┤
│  ○ Dashboard │                                                │
│  ● Kurser    │  SIDINNEHÅLL                                   │
│  ○ Studiepl. │                                                │
│  ○ Resurser  │                                                │
│  ○ Certif.   │                                                │
│              │                                                │
│  [Ny session]│                                                │
└──────────────┴────────────────────────────────────────────────┘
  < 900 px → sidebar dold, mobile bottom-nav visas
```

---

## Fas 1 — style.css (komplett rewrite)

- [x] Importera Space Grotesk + Manrope + Material Symbols Outlined (Google Fonts)
- [x] CSS-variabler: mörkt `:root`, ljust `body.light` (se tokens nedan)
- [x] `border-radius: 0.25rem` globalt (sänks från 1rem)
- [x] Nya layout-klasser: `.app-sidebar`, `.app-header`, `.app-content`, `.mobile-nav`
- [x] `.app-nav-item` — ikon + label, active = left-border 3px `--primary`
- [x] `.sidebar-cta-btn` — gradient-knapp längst ner i sidebar
- [x] `.bento-grid` — 12-kolumns CSS grid
- [x] `.course-card-lg` (col-span 7) + `.course-card-sm` (col-span 5) med bildoverlay
- [x] `.chapter-timeline` + `.timeline-item` — vertikal lista med connector-linje
- [x] `.info-panel` + `.progress-ring-fill` — SVG `stroke-dasharray/stroke-dashoffset`
- [x] Behåll befintliga klassnamn (`.card`, `.section`, `.quiz-opt`, etc.) — ändra bara värden
- [x] Responsivt: sidebar collapse < 900px, grid-justeringar < 1100px / 700px

### Tokens (mörkt läge)
```
--bg: #121416   --bg-low: #1a1c1e   --bg-card: #1e2022
--bg-high: #282a2c   --bg-highest: #333537
--text: #e2e2e5   --muted: #cbc6b9
--primary: #d0c7a0   --primary-dim: #99916e   --primary-bright: #ece3bb
--secondary: #dbc497   --secondary-bg: #544522   --secondary-text: #c9b387
--border: #959084   --border-subtle: #49473d
```

### Tokens (ljust läge)
```
--bg: #fcf9ef   --bg-low: #f6f4ea   --bg-card: #f1eee4
--bg-high: #ebe8de   --text: #1c1c16   --muted: #7b776b
--primary: #625c3d   --primary-dim: #7c7554
--secondary: #6e5c37   --secondary-bg: #e8e0cc   --secondary-text: #4a3e1e
--border: #7b776b   --border-subtle: #cbc6b9
```

---

## Fas 2 — index.html (komplett rebuild)

- [x] Nytt app-skal: `<aside class="app-sidebar">` + `<div class="app-content">` + `<header class="app-header">`
- [x] Sidebar: 5 nav-poster med Material Symbol-ikoner (dashboard, menu_book, event_note, folder_open, verified)
- [x] Sidebar CTA: "Ny studiesession" gradient-knapp
- [x] Hero: "Välj kurs & specialisering." med kursiv em
- [x] Bento-grid: Ellära (col-span 7, bild `ellara/images/ek_kabel.png` + text) + Installationsteknik (col-span 5, bild + text)
- [x] Bildoverlay: grayscale + mix-blend-multiply color overlay
- [x] Bottom CTA-rad med "Boka möte" + "Kontakta oss"
- [x] Mobile bottom-nav

---

## Fas 3 — ellara/index.html (komplett rebuild)

- [x] Nytt app-skal (samma som Fas 2)
- [x] Tvåkolumns layout: `grid-template-columns: 1fr 300px`
- [x] Vänster: `.chapter-timeline` med 11 `.timeline-item`
  - Klart (1–2): grön cirkel + bockikon
  - Aktiv (3 Kretsar): guld cirkel + "Fortsätt" knapp
  - Kommande (4–11): grå cirkel
  - Connector-linje via `::before` pseudo-element
- [x] Höger `.info-panel` (sticky):
  - SVG progress-ring: `r=36`, `circumference≈226px`, 27% (3 av 11)
  - Milstolpar-timeline med dot + linje
  - Study tip-kort
  - Stats-grid (studietimmar, quiz-score, streak)

---

## Fas 4 — Kapitelinnehållssidor (ellara/[kapitel].html, ~29 filer)

- [x] Ersätt `<nav>` + `<aside class="sidebar">` med nytt app-skal
- [x] Breadcrumb `Ellära` i header (via `.app-breadcrumb`)
- [x] Kalkylator- och quiz-sektioner behålls oförändrade (plockar upp nya tokens automatiskt)
- [x] Batch-uppdatering via Python-script (batch_update_ellara.py) — 29 filer uppdaterade

---

## Fas 5 — installationsteknik/index.html

- [x] Nytt app-skal (samma som Fas 2)
- [x] Kapitelgrid med 9 kort (samma innehåll, ny design)

---

## Fas 6 — script.js

- [x] Sidebar mobile toggle (hamburger-knapp → overlay slide-in)
- [x] Mörkt som default: `apply(saved === 'light')`
- [x] Söklogik oförändrad

---

## Verifiering

- [ ] `index.html` matchar `redesign_light/.../v_lj_kurs_nordic_precision_light/screen.png`
- [ ] `ellara/index.html` matchar `redesign_light/.../ell_ra_kapitel_versikt.../screen.png`
- [ ] Klicka ett kapitel — kalkylator fungerar
- [ ] Dark/light toggle fungerar på alla sidor
- [ ] Mobilvy < 900px — sidebar dold, bottom-nav visas
- [ ] Sökfunktion fungerar
