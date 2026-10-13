# catalog.ts — 2026-10-13

Read-only query layer over `src/lib/data/*`; the seam where an API client will go (M3). Pages never read the data arrays' internals directly except via these helpers.

- Sessions store `dayOffset` + `start` (HH:MM), resolved against **today** in `dateFromOffset`. Fixed dates would make the demo look abandoned within weeks.
- `courseContext` / `hostContext` back the `+page.ts` loaders (404 via `error()` when missing) so detail, booking, display and host pages share one lookup.
- `filterCourses` search is accent/case-insensitive (`NFKD` + `da-DK` lowercasing), all terms must match across title, summary, venue, city, host and category.
- "populaer" sort = `reviewCount × rating`.
