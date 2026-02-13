# Proposed Maintenance Tasks

## 1) Typo Fix Task: Normalize Q2 range punctuation in `web/web-data.json`

**Issue observed**
- `web/web-data.json` uses `"Dec-Feb 2026"` while other quarter labels in the repo use an en dash (`Dec–Feb 2026`).

**Task**
- Update `meta.rangeLabel` from `Dec-Feb 2026` to `Dec–Feb 2026` for consistency and cleaner presentation.

**Acceptance criteria**
- `meta.rangeLabel` in `web/web-data.json` uses an en dash.
- Quarter labels are visually consistent across `web/web-data.json` and `data/q2.json`.

---

## 2) Bug Fix Task: Remove duplicate `.brand-mark::after` CSS rule in `web/index.html`

**Issue observed**
- `web/index.html` defines `.brand-mark::after` twice.
- The first definition includes `pointer-events:none`, but the later duplicate rule omits it.
- Because the later rule wins in the cascade, the pseudo-element can intercept clicks and break expected interaction on the brand mark.

**Task**
- Consolidate `.brand-mark::after` into a single rule that preserves `pointer-events:none`.

**Acceptance criteria**
- Only one `.brand-mark::after` rule remains.
- Brand mark remains clickable and keyboard-focusable.
- No visual regressions in the topbar gloss effect.

---

## 3) Documentation Discrepancy Task: Clarify data update instructions in `README.md`

**Issue observed**
- README currently says data updates are done by editing only `report-data.json`.
- The web dashboard at `web/index.html` loads `web/web-data.json`, so the current documentation is incomplete.

**Task**
- Update README with separate data-update instructions for:
  - Social report (`report-data.json`)
  - Website report (`web/web-data.json`)

**Acceptance criteria**
- README explicitly lists both JSON files and which page/report each one powers.
- New contributors can update either dashboard without inspecting JavaScript source.

---

## 4) Test Improvement Task: Add a data contract validation check for report JSON files

**Issue observed**
- The repo currently has no automated checks for JSON structure compatibility.
- Rendering logic accepts mixed key styles (`linkClicks` and `linkclicks`, `avgEngagementRate` and `avgengagementrate`), so regressions can be introduced silently.

**Task**
- Add a lightweight validation script/test (e.g., Node script run in CI) that checks:
  - Required top-level keys exist.
  - Expected key names are present for each report type.
  - Optional backward-compatible aliases are intentionally supported.

**Acceptance criteria**
- A repeatable command validates `report-data.json` and `web/web-data.json`.
- Validation fails with actionable errors when keys are missing/mis-typed.
- Validation command is documented in README.
