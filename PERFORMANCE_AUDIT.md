# Performance Review (Simple Version)

Date: 2026-02-26

## What I reviewed

I checked these pages for speed and performance issues:

- `index.html`
- `web/index.html`
- `2026q2/q2.html`
- `as/as.html`
- `ads/ads.html`

This is a code review only. I did not run live browser speed tests in this report.

## Main problems (in plain language)

1. **Charts load too early**
   - Every page loads Chart.js in the `<head>` right away.
   - That can slow down how fast the page first appears, especially on slower phones.

2. **Pages are very large files**
   - Current file sizes:
     - `index.html`: 84,030 bytes
     - `2026q2/q2.html`: 79,319 bytes
     - `as/as.html`: 63,287 bytes
     - `ads/ads.html`: 63,307 bytes
     - `web/index.html`: 57,151 bytes
   - Big HTML files with lots of inline CSS/JS take longer to download, read, and run.

3. **Data is always fetched fresh (`no-store`)**
   - The code tells the browser not to use cache.
   - So repeat visits are slower because data is re-downloaded every time.

4. **Large sections are rebuilt often**
   - Many parts use `innerHTML = ...` to redraw whole sections.
   - This can make filtering and toggling feel less smooth.

5. **Charts are recreated instead of updated**
   - Some chart actions destroy old charts and build new ones.
   - This can add extra work and cause lag on lower-end devices.

6. **Some pages are almost duplicates**
   - `as/as.html` and `ads/ads.html` are very similar.
   - Because shared code is repeated, users download and run similar code more than once.

## What to do first

### Quick wins (do these first)

1. **Load non-critical scripts later**
   - Add `defer` to Chart.js script tags when possible.
   - If charts are below the top of the page, initialize them after core content loads.

2. **Allow caching for normal data loads**
   - Don’t use `cache: "no-store"` by default.
   - Let normal browser caching work, and only force refresh when needed.

3. **Avoid full redraws for small updates**
   - Update only the specific elements that changed instead of replacing large blocks.

### Next improvements

4. **Move shared CSS/JS into shared files**
   - Example: `/assets/report.css` and `/assets/report.js`.
   - This improves caching and makes pages easier to maintain.

5. **Update existing charts in place**
   - Use `chart.update()` where possible instead of destroy + recreate.

6. **Reduce duplicate page code**
   - Reuse one shared report template and keep only data differences per page.

## How to measure improvements

After updates, check:

1. Lighthouse mobile scores (LCP, TBT, CLS, FCP)
2. DevTools Performance during filter/toggle actions
3. First load vs repeat load timing (to confirm caching helps)

## Expected result

If you do the quick wins first, pages should load faster and feel smoother.
The next improvements should give bigger long-term gains and easier maintenance.
