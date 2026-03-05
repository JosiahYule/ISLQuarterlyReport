# Weekly Planner: Minimal + High-Utility Improvement Ideas

These recommendations are based on the current `weekly-planner.html` implementation and are scoped to **simple, immediate upgrades** that keep the UI minimal while making it more useful for a marketing coordinator.

## 1) High-impact quick wins (implement first)

1. **Add campaign objective + KPI fields per post**
   - Add two small fields in the post editor: `Objective` (dropdown) and `KPI target` (text/number).
   - Why: right now each post captures scheduling and execution details, but not outcome intent.
   - Outcome: every post moves from “task” to “measurable marketing action.”

2. **Show “Overdue” and “Due this week” for recurring tasks/projects**
   - You already store `deadline` and `dueDate`; add simple badges in the tile render functions.
   - Why: improves prioritization without adding UI complexity.
   - Outcome: better weekly decision-making at a glance.

3. **Add lightweight filters in Calendar (platform + status)**
   - Add 2 tiny filter chips above the calendar board.
   - Why: days can contain multiple posts; filter avoids visual overload.
   - Outcome: quick “what's pending?” and “what's on LinkedIn?” views.

4. **Create a weekly “focus strip” in hero**
   - Show top 3 auto-generated indicators: `Pending approvals`, `Ready to post`, `No link added`.
   - Why: your stats are currently high-level completion numbers, but not blockers.
   - Outcome: faster daily triage.

5. **Add one-click duplicate post**
   - Add duplicate icon on post tiles.
   - Why: marketing coordinators often adapt similar posts across days/brands.
   - Outcome: faster planning and consistency.

## 2) Design refinements (minimalistic, not busy)

1. **Reduce visual intensity on secondary surfaces**
   - Tone down shadows and glass contrast for cards below the hero.
   - Keep one visual emphasis area (hero/stats) and flatten everything else.

2. **Use one semantic color per status family across all modules**
   - Reuse the same color language for post status, project status, and recurring status.
   - This improves scanability and lowers mental load.

3. **Improve spacing rhythm in dense sections**
   - Increase vertical spacing in To Do + Projects by 2–4px and reduce border contrast slightly.
   - Helps readability while preserving compactness.

4. **Add optional “Compact mode” toggle**
   - Use a single class on `<body>` to reduce paddings/font-size ~10%.
   - Useful when coordinating many campaigns in one view.

5. **Use icon-only affordances consistently**
   - Keep delete/duplicate actions icon-sized, but ensure consistent placement and hover style.

## 3) Marketing-coordinator functionality upgrades

1. **Post funnel stages (idea → draft → scheduled → posted → reported)**
   - Extend current `status` options to reflect marketing workflow.
   - Tie stats to these stages.

2. **Content pillar/tag field on post**
   - Add chips like `Hiring`, `Culture`, `Thought Leadership`, `Urgent Roles`.
   - This enables weekly mix balancing by pillar.

3. **Approval tracking**
   - Add a simple boolean: `Needs approval` + optional `Approver` text.
   - Auto-highlight items still blocked.

4. **UTM/link hygiene check**
   - If post has a link but no `utm_`, show small warning in tile/editor.
   - Keeps measurement quality high with almost no UI overhead.

5. **Cross-brand replication helper**
   - In post modal, add “Copy to AS/AD” checkboxes.
   - You already have multi-brand architecture; this leverages it directly.

## 4) Data + reporting features (still simple)

1. **Export week summary to clipboard**
   - Generate plaintext/markdown summary: priorities, scheduled posts by day, open tasks.
   - Great for Slack/email standups.

2. **CSV export for posts**
   - Fields: brand, date/day, time, title, platform, status, type, link.
   - Makes handoff to reporting tools easy.

3. **Weekly carry-over assistant**
   - On week change, prompt: carry over unfinished todos/recurring items?
   - Reduces planner reset friction.

4. **Simple completion trend**
   - Keep last 4 weeks of completion percentages and display tiny sparkline/text trend.
   - Gives momentum signal without heavy analytics.

## 5) Accessibility + UX quality upgrades

1. **Add clear empty states**
   - For calendar days with no posts: “No posts planned.”
   - For projects/todos: suggest first action.

2. **Improve keyboard shortcuts**
   - Example: `n` new post, `t` new task, `p` new project, `/` focus current modal input.

3. **Add subtle toast on autosave**
   - You already update save text; a small non-intrusive toast can confirm structural actions (delete/reset/duplicate).

4. **Confirm destructive actions with context**
   - Include item name in delete confirmations to reduce mistakes.

## 6) Suggested implementation order (fastest ROI)

- Phase 1 (same day):
  - Overdue badges
  - Duplicate post
  - Calendar filters
  - Objective + KPI fields
- Phase 2 (1–2 days):
  - Approval/UTM checks
  - Cross-brand copy
  - Weekly summary export
- Phase 3 (optional polish):
  - Compact mode
  - Trend snapshot
  - Keyboard shortcuts

## 7) Notes from current implementation that these ideas build on

- You already have strong structure for:
  - Multi-brand state separation (`is`, `as`, `ad`)
  - Persisted local data
  - Modular editors for posts/projects/todos/recurring tasks
  - Existing completion stats

That means most of the recommendations above can be added incrementally without a redesign or framework migration.
