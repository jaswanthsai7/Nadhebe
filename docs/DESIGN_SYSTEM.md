# DESIGN SYSTEM

## Nadhebe UI Standards

This document establishes the UI patterns, color tokens, typography rules, and design constraints for Nadhebe. All UI developments must align with this design system to maintain visual consistency.

---

## 1. Visual Atmosphere

Nadhebe follows a premium, editorial, minimalist aesthetic inspired by **Apple.com**, **Linear.app**, **Vercel**, and **OpenAI**. 

* **Theme**: Sleek dark and clean light modes with high contrast.
* **Feel**: calm, confident, luxury, clean.
* **Layout**: Generous whitespace, comfortable text widths, and clear hierarchies. No gaming or neon layouts.

---

## 2. Design Tokens

### Color Palette
Color values are mapped as Tailwind variables.

| Token | Light Value | Dark Value | Purpose |
| :--- | :--- | :--- | :--- |
| `bg` | `#FAFAFA` | `#0A0A0A` | Page base background |
| `surface` | `#FFFFFF` | `#141414` | Primary cards / blocks |
| `surface2`| `#F5F5F5` | `#1E1E1E` | Secondary containers |
| `border` | `#E5E5E5` | `#262626` | Subtle dividers and outlines |
| `ink` | `#0A0A0A` | `#FAFAFA` | Primary titles and body text |
| `ink2` | `#525252` | `#A3A3A3` | Secondary descriptions |
| `muted` | `#A3A3A3` | `#525252` | Captions, dates, meta info |
| `accent` | `#5E6AD2` | `#818CF8` | Primary interactive / links |

---

## 3. Typography

Nadhebe uses a highly readable, premium typeface stack.

* **Display Typeface**: `"Geist Sans"`, `-apple-system`, `sans-serif`
  - Applied to H1 titles and hero headers.
  - Letter spacing: `-0.025em` / `-0.02em` for displays.
* **Sans Typeface**: `Inter`, `-apple-system`, `sans-serif`
  - Applied to body copy, navigation links, and descriptions.
* **Mono Typeface**: `"JetBrains Mono"`, `ui-monospace`, `monospace`
  - Applied to tags, reading time, file paths, and metadata.

### Sizes and Line Heights
* **Display**: `48px` (desktop) / `36px` (mobile), Line-height: `1.08`
* **Body Large**: `17px`, Line-height: `1.6` (optimized for readability)
* **Body Normal**: `15px`, Line-height: `1.65`
* **Caption / Meta**: `13px` / `12px`, Line-height: `1.5`

---

## 4. Layout Constraints

* **Maximum Widths**:
  - Main Page Content Wrapper: `max-w-content` (`1120px`)
  - Long-Form Article Body: `max-w-article` (`720px`)
  - Sidebar: `w-sidebar` (`224px`)
* **Spacers and Padding**:
  - Grid gutters: `24px` / `32px` / `48px`
  - Standard section margins: `80px` (desktop) / `48px` (mobile)

---

## 5. UI Components Guidelines

### Card Styles
* Rounded borders: `12px` (`rounded-card` / `rounded-12`).
* Outline: `1px solid var(--border)` with subtle card drop shadow.
* Hover states: Translate up slightly (`hover:translate-y-[-2px]`), border shifts to active state, smooth ease transition (`transition-all duration-200`).

### Buttons
* Primary: Fully rounded shape (`rounded-full`), accent background with white text, and translation effects on hover.
* Secondary: Fully rounded outline button (`border-border`), dark text, and subtle hover backgrounds.

---

## 6. CSS Guidelines

* Prefer **Tailwind Utility Classes** backed by configured theme tokens.
* Keep style modifications modular and scoped inside Astro `<style>` blocks when defining specialized component aesthetics (e.g., custom animations, gradients).
* Avoid inline styles except when binding dynamic parameters (e.g., dynamic progress bars, rating percentages).
