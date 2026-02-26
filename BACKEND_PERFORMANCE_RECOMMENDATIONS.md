# Backend performance improvements for smoother dashboard loading

This repository’s dashboards are static front-end pages that fetch data from Google Apps Script endpoints (`index.html`, `web/index.html`, and `2026q2/q2.html`). The best way to reduce lag is to improve the API behavior behind those endpoints.

## Current bottlenecks seen in the client

1. **Every request bypasses cache** by appending `nocache=1` and using `cache: "no-store"`, which forces full endpoint execution on each load.
2. **Large all-in-one payload patterns** likely return more fields/rows than each view needs.
3. **Potential full recomputation at request time** if Apps Script reads and aggregates source sheets on every call.
4. **No explicit graceful degradation path** (stale-but-valid response while fresh data is rebuilding).

---

## Priority improvements (highest impact first)

## 1) Add server-side caching in Apps Script (TTL cache)

**Why**: Apps Script cold starts + repeated sheet reads are usually the largest latency contributor.

**How**:
- Use `CacheService.getScriptCache()`.
- Cache each report response by key, e.g. `report:islq2`.
- TTL target: `300–900` seconds for dashboards (5–15 min freshness).
- On cache hit, return JSON immediately.
- On cache miss, build payload once, store in cache, and return.

**Expected impact**: typically cuts repeat response times from seconds to sub-second.

---

## 2) Pre-aggregate and persist computed metrics

**Why**: Recomputing campaign summaries, platform totals, and chart series at request time causes lag under concurrent access.

**How**:
- Add a scheduled Apps Script trigger (every 15/30/60 minutes) that:
  - reads source sheets,
  - computes all dashboard aggregates,
  - writes a compact JSON blob to a dedicated “materialized” sheet or `PropertiesService`.
- Runtime endpoint then only reads this precomputed blob.

**Expected impact**: predictable response time and lower timeout risk.

---

## 3) Split endpoint payloads by dashboard section

**Why**: One large response delays first meaningful render and increases parse time.

**How**:
- Keep a lightweight `summary` endpoint (top KPI cards + key metadata).
- Separate heavy sections (`channels`, `charts`, `creative/posts`, `raw-table`) into optional endpoints.
- Load summary first, lazy-load secondary sections in parallel.

**Expected impact**: faster initial render and better perceived performance.

---

## 4) Add HTTP cache validation (ETag/Last-Modified semantics)

**Why**: Returning unchanged payloads wastes Apps Script execution and network bandwidth.

**How**:
- Include `version` and `updatedAt` in every payload.
- Allow client to send `ifVersion=<lastVersion>`; return minimal `{ notModified: true }` when unchanged.
- If moving from Apps Script to Cloud Run/Functions later, implement true `ETag`/`304` headers.

**Expected impact**: near-zero payload cost on repeat views.

---

## 5) Reduce payload size aggressively

**Why**: JSON transfer + browser parse time can lag on lower-end devices.

**How**:
- Return only fields needed by each card/chart.
- Shorten verbose keys if payload is very large.
- Round long-decimal numeric fields server-side.
- Omit null/unused sections.
- If migrating off Apps Script, enable gzip/brotli compression.

**Expected impact**: lower TTFB+download+parse time.

---

## 6) Add backend time budgets and fallbacks

**Why**: One slow upstream dependency should not freeze the dashboard.

**How**:
- Set strict internal time budgets per data source.
- Return partial data with `warnings` metadata if a non-critical source is slow.
- Keep last known good snapshot and serve it when fresh rebuild fails.

**Expected impact**: improved reliability and fewer “blank dashboard” incidents.

---

## 7) Add observability for latency and failures

**Why**: You can’t optimize what you can’t measure.

**How**:
- Log per-request metrics: report key, cache hit/miss, compute time, payload size, status.
- Track p50/p95 latency and endpoint error rate.
- Add a small health endpoint returning build timestamp and data freshness.

**Expected impact**: quicker diagnosis of lag regressions.

---

## Suggested target SLOs

- **p50 latency**: `< 500ms`
- **p95 latency**: `< 1500ms`
- **error rate**: `< 1%`
- **payload size**: summary `< 100KB`, full view `< 400KB` (before compression)

---

## Implementation roadmap

### Phase 1 (1–2 days)
- Add Apps Script cache (TTL 10 min).
- Remove unnecessary full recomputation on each request.
- Emit timing + payload-size logs.

### Phase 2 (2–4 days)
- Create scheduled pre-aggregation job.
- Split summary vs heavy sections.
- Add client `version` handshake to avoid unchanged payload transfer.

### Phase 3 (optional, higher scale)
- Move API layer to Cloud Run/Functions for stronger caching headers, concurrency, and compression.
- Keep static dashboard hosting on GitHub Pages.

---

## Quick wins specific to current repository

- `index.html` currently appends `nocache=1` and uses `cache: "no-store"`; keep this only for emergency debugging, not normal production traffic.
- `web/index.html` does the same cache bypass pattern; switch to version-aware fetching.
- `2026q2/q2.html` uses `cache: "no-store"` for two endpoints; introduce shared cache keys and prebuilt post datasets on the backend.

These three changes alone should noticeably reduce lag for repeat dashboard opens.
