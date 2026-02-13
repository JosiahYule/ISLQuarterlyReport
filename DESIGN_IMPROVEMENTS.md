# Design, Usability, and Accessibility Improvement Plan

This document proposes practical improvements to make the quarterly report UI clearer, more intuitive, and more accessible.

## 1) Information architecture and clarity

### 1.1 Make quarter navigation explicit and consistent
**Current observation**
- Quarter choices are in a custom dropdown (`.pill-menu`) with mixed destinations (Q1/Q2 social + website report) that can feel like mode-switching inside one control.

**Recommendation**
- Split report type and period into two controls:
  - **Report Type:** Social / Website
  - **Quarter:** Q1 / Q2 / Q3 / Q4
- Keep state visible in the header (e.g., “Social • Q2 • Dec–Feb 2026”).

**Why it helps**
- Reduces cognitive load and avoids surprises when jumping between fundamentally different dashboards.

### 1.2 Add a sticky in-page section nav
**Recommendation**
- Add anchor links near top: Summary, Quarter Totals, Platform Breakdown, Top Posts, Insights.

**Why it helps**
- Long dashboards become easier to scan and navigate, especially for keyboard and screen magnifier users.

---

## 2) Visual hierarchy and readability

### 2.1 Increase text contrast for muted labels
**Current observation**
- The interface uses many muted labels and helper text colors, which may be low contrast against white cards.

**Recommendation**
- Raise contrast of secondary text and small labels to meet WCAG AA for normal text.
- Validate key text styles with a contrast checker.

### 2.2 Improve KPI comparability
**Recommendation**
- Standardize KPI formatting and include compact trend context:
  - Add tiny sparkline or previous-quarter value under each KPI.
  - Keep number formatting consistent (thousands separators, decimal precision rules).

**Why it helps**
- Users can compare at a glance without mentally reconstructing trends from delta badges alone.

### 2.3 Reduce visual noise in decorative effects
**Recommendation**
- Tone down heavy glows/shadows in hero/cards by ~15–25%.
- Keep emphasis on data, not chrome.

**Why it helps**
- Improves focus and readability, especially for users with visual sensitivity.

---

## 3) Interaction design improvements

### 3.1 Use robust menu semantics for quarter selector
**Current observation**
- Menu opens/closes on click/Escape, but keyboard roving/focus behavior is minimal.

**Recommendation**
- Either:
  1) Replace custom menu with native `<select>` for maximal accessibility, or
  2) Implement full ARIA menu-button pattern:
     - Arrow key navigation between options
     - Focus moved into menu on open
     - Focus restored to button on close
     - `aria-controls` + active descendant state

### 3.2 Add visible focus states globally
**Recommendation**
- Ensure all interactive elements (links, buttons, KPI cards if interactive, chart toggles) have a strong `:focus-visible` indicator.
- Avoid relying only on color changes.

### 3.3 Respect reduced-motion preferences
**Recommendation**
- Add `@media (prefers-reduced-motion: reduce)` to disable/soften animations (hero glow, hover transforms, transitions).

**Why it helps**
- Supports vestibular-sensitive users and aligns with accessibility best practices.

---

## 4) Data-viz accessibility and comprehension

### 4.1 Don’t rely on color alone for deltas
**Current observation**
- Positive/negative states are color-coded and symbol-coded with ▲/▼.

**Recommendation**
- Keep symbols and add text labels for assistive clarity (e.g., “Up 23.6%”, “Down 4.1%”).
- Ensure screen readers get full meaning via `aria-label`.

### 4.2 Improve chart accessibility
**Recommendation**
- Add concise chart summaries before each chart (“LinkedIn leads reach this quarter…”).
- Provide data tables or downloadable CSV equivalents for chart data.
- Ensure canvas charts have adjacent textual equivalents for non-visual access.

---

## 5) Content and microcopy consistency

### 5.1 Unify terminology
**Recommendation**
- Use one term consistently for each metric (e.g., “Link Clicks” vs “Page Clicks”, “Engagement Rate” naming).
- Add a “Metric Definitions” help link or glossary drawer.

### 5.2 Make empty states explicit
**Recommendation**
- When data is zero or missing, show explanatory empty states (e.g., “No data uploaded for Q3 yet”) instead of plain `—`.

**Why it helps**
- Distinguishes “no activity” from “load/format problem.”

---

## 6) Recommended implementation order (high impact first)

1. **Accessibility baseline**
   - Focus-visible styles everywhere
   - Reduced motion support
   - Quarter menu keyboard semantics
2. **Clarity and IA**
   - Split report type vs quarter selector
   - Add sticky section nav
3. **Data comprehension**
   - Chart text summaries + accessible data table fallback
   - Delta labels not color-only
4. **Visual polish**
   - Contrast tuning
   - Lighten decorative effects

---

## 7) Definition of done (UX + a11y)

- Keyboard-only user can navigate all controls and menus without traps.
- All interactive items have visible focus indicators.
- Core text meets WCAG AA contrast requirements.
- Motion is reduced when OS preference is enabled.
- Charts are understandable without relying on color or canvas-only rendering.
- Navigation between Social vs Website reports is obvious and predictable.
