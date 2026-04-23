# Design System Document: Technical Atelier

## 1. Overview & Creative North Star: "The Curated Manuscript"

This design system is built upon the concept of **The Curated Manuscript**. It rejects the cold, sterile nature of standard digital frameworks in favor of a "Technical Atelier" aesthetic—combining the precision of an architectural draft with the tactile, high-end feel of a boutique editorial publication.

**The Creative North Star:** We are not building an interface; we are composing a physical object. The system moves beyond the "standard grid" by utilizing intentional asymmetry, generous whitespace, and tonal layering. The experience should feel like light catching on high-grade stone or fine parchment—warm, precise, and authoritative.

**Visual Signature:**
*   **Intentional Asymmetry:** Use off-center alignments for headlines to create a sense of movement.
*   **Tactile Depth:** Objects do not "float" with heavy shadows; they "sit" on layers of paper.
*   **Technical Clarity:** Data and labels are treated with the precision of a blueprint, using `Space Grotesk` to provide a modernist, engineered edge.

---

## 2. Colors

The palette is a sophisticated evolution of Nordic earth tones, shifted toward a luminous, neutral core.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be established through color-blocking or background shifts. To separate a sidebar from a main content area, transition from `surface` to `surface-container-low`. The UI must feel like a singular, carved piece of stone, not a collection of outlined boxes.

### Surface Hierarchy & Nesting
Treat the UI as physical layers. Use the tiers to guide the eye:
*   **Base Layer:** `surface` (#fcf9ef) or `background`.
*   **Secondary Content:** `surface-container-low` (#f6f4ea).
*   **Interactive Cards:** `surface-container-highest` (#e5e2d9) or `surface-container-lowest` (#ffffff) for a "lifted paper" effect.

### Glass & Gradient Rule
To prevent the design from feeling "flat" or "web 1.0," apply a subtle **Atmospheric Gradient** to primary CTAs. Instead of a flat #625c3d, use a linear gradient from `primary` (#625c3d) to `primary_container` (#7c7554) at a 135-degree angle. For floating navigation or overlays, use **Glassmorphism**: a fill of `surface` at 80% opacity with a `24px` backdrop-blur.

---

## 3. Typography

The typographic system creates a dialogue between the technical (`Space Grotesk`) and the human (`Manrope`).

*   **Display & Headlines (Space Grotesk):** These are your architectural elements. Use `display-lg` for hero moments with tight letter-spacing (-0.02em). The geometric nature of Space Grotesk provides the "Technical" in "Technical Atelier."
*   **Body & Titles (Manrope):** This is your editorial voice. `Manrope` provides high legibility and a premium feel. Use `body-lg` for primary reading experiences to ensure an expansive, high-end feel.
*   **Labels (Manrope):** Use `label-md` in All Caps with +0.05em tracking for metadata, mimicking the annotations on a technical drawing.

---

## 4. Elevation & Depth

We move away from traditional Material Design shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` (#ffffff) card placed on a `surface-container-low` (#f6f4ea) background creates a natural, soft lift.
*   **Ambient Shadows:** If a shadow is required for a floating menu, use the **"Nordic Ambient"** style: 
    *   `box-shadow: 0 20px 40px rgba(28, 28, 22, 0.04);` 
    *   Note: The shadow color is a 4% opacity tint of `on_surface`, not pure black.
*   **The Ghost Border:** For input fields or essential containment, use the `outline_variant` token at 20% opacity. It should be barely visible—a "ghost" of a line that suggests structure without clutter.

---

## 5. Components

### Buttons
*   **Primary:** A gradient fill (`primary` to `primary_container`). `0.25rem` (sm) corner radius. Label in `label-md` bold, white.
*   **Secondary:** No fill. A `Ghost Border` (outline-variant @ 20%). On hover, shift background to `surface_container_high`.
*   **Tertiary:** Text only in `primary`. No container. Use for low-emphasis actions.

### Cards & Lists
*   **The Rule of No Dividers:** Never use a horizontal line to separate list items. Use vertical whitespace (16px or 24px) or a subtle alternate row tint using `surface-container-low`.
*   **Cards:** Use `surface-container-lowest` with a `0.5rem` (lg) radius. Avoid shadows; let the color contrast against the `surface` background do the work.

### Input Fields
*   **Styling:** Fields should be "Soft Wells." Use `surface_container_low` as the background fill. Use a bottom-only "Ghost Border" to suggest an editorial underline rather than a boxed-in technical field.
*   **States:** On focus, the bottom border transitions to `primary` (#625c3d) at 1px thickness.

### Signature Component: The "Technical Detail" Chip
Use these for tags or categories. Fill: `secondary_container` (#f8e0b1). Type: `label-sm` in `on_secondary_container`. Radius: `none` (0px) to lean into the "Atelier" blueprint aesthetic.

---

## 6. Do's and Don'ts

### Do
*   **Do** use extreme whitespace. If you think there is enough margin, add 16px more.
*   **Do** align text-heavy sections to a 12-column grid but break the grid with "Editorial Insets" (e.g., pulling a pull-quote or image 1 column into the margin).
*   **Do** use `primary_fixed_dim` for subtle decorative elements or background shapes.

### Don't
*   **Don't** use pure black (#000000) for text. Always use `on_surface` (#1c1c16) to maintain the "paper" feel.
*   **Don't** use standard 1px borders or heavy drop shadows. They break the "Technical Atelier" illusion.
*   **Don't** use fully rounded (pill) buttons for primary actions; keep the `0.25rem` radius for a more architectural, precise look.
*   **Don't** crowd the interface. If a screen feels busy, move secondary information to a "Details" layer using a `surface-container` shift.