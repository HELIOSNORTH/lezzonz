# app.css — 2026-10-13

- Tokens are CSS variables on `:root`, swapped under `prefers-color-scheme: dark`, then exposed to Tailwind via `@theme inline` (`bg-surface`, `text-label-2`, …). Change colours here only.
- `--accent` (text-safe) vs `--brand` (fills): brand orange `#f0541e` on white is 3.5:1, too low for small text, so text uses `--accent` `#c2410c` (5.2:1). Dark mode accent `#ff7a45` on `#1c1c1e` ≈ 6.6:1. Primary CTAs are label-coloured (black/white) pills; `btn-brand` only for the main conversion buttons with bold text.
- Tailwind preflight is used instead of normalize.css + sanitize.css (owner's usual stack). Reason: preflight already normalizes and Tailwind utilities assume it; stacking all three duplicates/conflicts. Revisit only if dropping Tailwind.
- `:where(.grid) > * { min-width: 0 }`: grid items default to `min-width: auto`, so `truncate` text inside cards widened single-column grids beyond 390 px on phones. Keep it.
- `body { overflow-x: clip }` is a safety net for decorative blurred blobs; still size blobs within the viewport (`w-[min(60rem,100vw)]`) since iOS can ignore body overflow.
- `glass` / `glass-strong` = Liquid Glass approximation: translucent fill + `backdrop-filter: blur saturate` + inner top highlight + hairline edge.
- `noise` adds a grain overlay via `::after`; the element must be positioned (`relative`). The utility deliberately does not set `position`, because that overrode `absolute` on covers.
