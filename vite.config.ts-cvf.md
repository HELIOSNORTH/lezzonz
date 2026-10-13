# vite.config.ts — 2026-10-13

- SvelteKit **3**: kit config lives inside `sveltekit({...})` in Vite config; there is no `svelte.config.js`.
- `adapter-static` with `fallback: 'index.html'` + `ssr = false` in `src/routes/+layout.ts` = pure SPA. Nothing is prerendered, so `index.html` cannot collide with a prerendered homepage (the adapter docs' warning does not apply).
- Kit 3 gotchas hit while building:
  - `$lib` is gone; use `package.json` `imports` (`#lib/*`). Imports **must include the extension** (`#lib/catalog.ts`, `#lib/components/X.svelte`) or TS/Vite cannot resolve them.
  - `$app/environment` → `$app/env`.
  - `goto` options: `replace` (not `replaceState`), `reset: false` (replaces `noScroll`/`keepFocus`); link attribute `data-sveltekit-reset="false"`.
- Tailwind 4 via `@tailwindcss/vite`; no `tailwind.config`.
