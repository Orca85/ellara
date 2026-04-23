# Design Specification: Nordic Precision (Light & Dark)

This document provides the visual and technical specifications for the "Nordic Precision" design system, intended for implementation by Claude Code or other development agents.

## 1. Design Philosophy: "The Technical Atelier"
The aesthetic is a fusion of a high-end technical workshop and a curated manuscript. It values:
- **Precision:** Clean lines, generous white space, and a clear grid.
- **Warmth:** Using muted earth tones to make technical content feel approachable and premium.
- **Clarity:** A strong visual hierarchy that guides the student through complex technical information.

## 2. Color Palettes

### Nordic Precision Light (Primary)
- **Background:** `#F6F4EA` (Warm Stone/Parchment)
- **Surface:** `#FCF9EF` (Off-white/Paper)
- **Primary Accent:** `#87805E` (Muted Olive)
- **Secondary Accent:** `#B09B71` (Sand/Tan)
- **Tertiary Accent:** `#D8CCA3` (Light Straw)
- **Text (Primary):** `#1C1C16` (Deep Charcoal)
- **Text (Secondary):** `#625C3D` (Aged Bronze)

### Nordic Precision Dark (Alternative)
- **Background:** `#121416` (Deep Obsidian)
- **Surface:** `#1A1C1E` (Dark Slate)
- **Primary Accent:** `#D0C7A0` (Pale Gold/Olive)
- **Secondary Accent:** `#959084` (Muted Grey/Sage)
- **Tertiary Accent:** `#49473D` (Dark Bronze)
- **Text (Primary):** `#E2E2E5` (Off-white)
- **Text (Secondary):** `#959084` (Soft Grey)

## 3. Typography
- **Primary Font:** `Space Grotesk` (For headings and brand elements - adds a technical, modern feel).
- **Secondary Font:** `Manrope` (For body text and UI elements - high legibility and professional look).

## 4. UI Components & Style
- **Corners:** `ROUND_FOUR` (4px radius) – clean and precise, avoiding the "bubbly" look.
- **Navigation:** A dual-navigation system. A global top bar for utility and a contextual side bar for deep focus on course content.
- **Visual Effects:** Subtle tonal shifts between surfaces instead of heavy borders or shadows.

## 5. How to Implement
1. **HTML Structure:** Use semantic HTML5 elements. Navigation should be consistent across all views.
2. **CSS/Tailwind:** Use the hex codes above. For "glass" effects, use backdrop filters with low-opacity versions of the surface colors.
3. **Images:** Use high-end architectural or technical photography with muted, desaturated tones to match the "Nordic" aesthetic.