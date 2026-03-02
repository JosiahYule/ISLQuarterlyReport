# Social Media Plan Landing Page Roadmap

This document outlines practical improvements to evolve `social-media-plan.html` from a weekly planner into a full strategy + project tracking landing page that stays simple while handling high data volume.

## 1) Product direction

### Core outcome
Build one page that helps a marketing team:
- Set quarterly/weekly goals.
- Plan and publish content.
- Track production tasks and ownership.
- Measure performance and learnings.

### UX principle
Use a **progressive disclosure layout**:
- Keep the top-level view simple (summary cards, filters, current priorities).
- Reveal detail only when needed (drawers/modals for deep post/task metadata).

## 2) Front-end improvements

## Information architecture
Refactor the page into clear zones:
1. **Header + Global Filters**
   - Brand, date range, campaign filter, platform filter, owner filter.
2. **Strategy strip**
   - Goals, target audience, campaign themes, KPI targets.
3. **Execution board**
   - Calendar/kanban hybrid with statuses (`Backlog`, `Drafting`, `Design`, `Scheduled`, `Posted`, `Repurpose`).
4. **Task tracking**
   - Dependency-aware tasks tied to posts and campaigns.
5. **Analytics snapshot**
   - Reach, engagement, CTR, conversions vs targets.
6. **Insights + next actions**
   - Weekly wins, blockers, experiments.

## Data density without clutter
- Add a **compact/list mode toggle** for dense editing and a card mode for readability.
- Add **column-level collapse** (hide optional fields by default).
- Use **sticky headers + frozen key columns** in tabular views.
- Provide **saved views** (e.g., “This week”, “By owner”, “Paid campaigns only”).

## Navigation and usability
- Add a left sidebar with anchors: `Strategy`, `Calendar`, `Tasks`, `Performance`, `Retrospective`.
- Support keyboard shortcuts:
  - `N` = new post
  - `T` = new task
  - `/` = focus search/filter
- Add universal search across post title, caption, tags, owner, and campaign.

## Better post/task cards
For each post, include:
- Objective (awareness/leads/hiring).
- Audience segment.
- Funnel stage (TOFU/MOFU/BOFU).
- Content pillar.
- UTM-ready link.
- Asset checklist (copy, design, approval, legal).

For each task, include:
- Owner, due date, SLA risk, blocker flag.
- Linked post/campaign.
- Priority and effort estimate.

## Collaboration and workflow
- Add inline comments and @mentions per post/task.
- Add approval states (`Draft`, `Needs Review`, `Approved`, `Scheduled`).
- Add lightweight audit trail (“who changed what and when”).

## Accessibility and reliability
- Ensure contrast and focus states meet WCAG AA.
- Add aria labels to dynamic controls and announce save/status updates.
- Add optimistic UI with retry queue for flaky network saves.

## 3) Back-end improvements

## API and domain model
Move from localStorage-only data to a service-backed model.

Suggested entities:
- `organizations`, `brands`, `users`
- `campaigns`
- `posts`
- `tasks`
- `approvals`
- `metrics_daily`
- `insights`

Recommended relationships:
- Campaign has many posts/tasks.
- Post has many tasks, approvals, and daily metric rows.
- Task can link to a post and an owner.

## Suggested API surface
- `GET /dashboard?brand=&range=` (summary + KPIs)
- `GET /posts` / `POST /posts` / `PATCH /posts/:id`
- `GET /tasks` / `POST /tasks` / `PATCH /tasks/:id`
- `POST /approvals`
- `GET /metrics?postId=&range=`
- `POST /insights`

Design notes:
- Cursor pagination for large lists.
- ETag/version field for conflict detection.
- Bulk endpoints for fast board updates.

## Data and performance architecture
- Use indexed queries on `(brand_id, date, status, owner_id)`.
- Add read models/materialized views for dashboard aggregates.
- Cache summary endpoints (short TTL).
- Build event ingestion pipeline for platform metrics sync.

## Integrations
- Scheduler integration (native queues or cron workers).
- Social APIs (LinkedIn, Meta, etc.) for publish status + metrics pull.
- Web analytics/CRM integration for conversion attribution.

## Security and governance
- Role-based access (`Admin`, `Editor`, `Approver`, `Viewer`).
- Field-level history for compliance-sensitive edits.
- Soft deletes + restore window.
- Signed URLs for media assets.

## 4) Metrics and reporting improvements

Track both execution and outcome:
- Execution: on-time rate, approval cycle time, blocked tasks.
- Outcome: engagement rate, CTR, conversion rate, cost per result.
- Learning: experiment success rate by pillar/platform/audience.

Add these dashboard components:
- KPI cards with variance vs target.
- Trend charts by week/month.
- Heatmap by day/time performance.
- “What changed” narrative card (auto-generated from deltas).

## 5) Suggested phased implementation

### Phase 1 (quick wins)
- Introduce global filters, saved views, compact mode.
- Add richer post/task schema in UI.
- Add search and keyboard shortcuts.

### Phase 2 (foundational backend)
- Build normalized database schema.
- Replace localStorage with API persistence.
- Add auth + roles.

### Phase 3 (automation + analytics)
- Integrate publish status + metrics sync.
- Add attribution and experiment reporting.
- Add alerts for overdue tasks and underperforming campaigns.

## 6) Recommended technical stack changes

Front-end:
- Keep HTML prototype, then migrate UI to component architecture (React/Vue/Svelte) when feature growth demands it.
- Use a state/query layer (TanStack Query or equivalent) for caching and synchronization.
- Add schema validation for forms (Zod/Yup).

Back-end:
- Node/TypeScript or Python/FastAPI service.
- PostgreSQL with migration tooling.
- Background jobs (BullMQ/Celery/Sidekiq equivalent).
- Observability (structured logs + error tracking + APM).

## 7) Definition of “intuitive, simple, and data-rich”

Use these acceptance checks:
- New user can add a campaign, a post, and a task in < 3 minutes.
- Power user can edit 20+ items quickly in compact mode.
- Dashboard answers “Are we on track this week?” in < 10 seconds.
- No critical action requires more than 2 clicks from the main page.
