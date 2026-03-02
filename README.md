# ISL Quarterly Report

A static, GitHub Pages-friendly reporting site for Integrated Staffing marketing performance.

## What’s in this repo

This project currently includes multiple report views:

- **Paid media quarterly dashboard (primary)**: `index.html`
  - Loads report data from a Google Apps Script endpoint.
  - Supports switching report versions with a URL query parameter (for example, `?report=islq2`).
- **Website performance dashboard**: `web/index.html`
  - Also reads from a Google Apps Script endpoint.
- **Quarter-specific archived pages**:
  - `2026q1/q1.html` + local dataset `2026q1/2026-q1.json`
  - `2026q2/q2.html` (endpoint-driven)
- **Additional report shells**:
  - `as/as.html`
  - `ads/ads.html`

## Project structure

```text
.
├── index.html                # Primary quarterly digital media report
├── web/
│   ├── index.html            # Website report
│   └── web-data.json         # Local web dataset (fallback/archive)
├── 2026q1/
│   ├── q1.html               # Q1 page
│   └── 2026-q1.json          # Q1 local data
├── 2026q2/
│   └── q2.html               # Q2 page (endpoint-driven)
├── as/
│   └── as.html               # Additional report page
└── ads/
    └── ads.html              # Additional report page
```

## How data is loaded

Most active pages now load JSON from remote Google Apps Script endpoints directly in the page JavaScript.

- In `index.html`, the selected report key is read from `?report=` and sent to the endpoint.
- In `web/index.html`, data is requested from its own endpoint.
- In `2026q1/q1.html`, data is loaded from the local `2026-q1.json` file.

## Updating reports

### 1) Update endpoint URLs (if needed)

If your Apps Script deployment changes, update the endpoint constants in the relevant HTML files:

- `index.html`
- `web/index.html`
- `2026q2/q2.html`

### 2) Update quarter options and labels

When rolling into a new quarter, update:

- Quarter dropdown links/labels in each affected page
- Hero/metadata labels (quarter, date range, generated date)

### 3) Update local JSON files (for archived/local pages)

For pages that still use local JSON, update files in-place (for example `2026q1/2026-q1.json`, `web/web-data.json`).

## Local preview

Because these pages use `fetch`, run a simple local server instead of opening files directly:

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000/` (primary report)
- `http://localhost:8000/web/` (website report)

## Deployment

This repository is intended for static hosting (for example GitHub Pages). Push to your publishing branch and the site will update once the branch is deployed.
