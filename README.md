# Lezzonz — demo website

Updated 2026-10-13.

Lezzonz is a marketplace for **physical, in-person courses and workshops** in Denmark: pizza, flødeboller, gin tasting, bartending, racing, flower arranging, knitting, music, IT and more. Visitors get inspired, book and pay; hosts get registrations, payouts, gift cards and **automatic certificates of completion** (the original pain point came from racing courses, where proof of completion was hard to manage).

This repository is a **clickable front-end demo with no backend**. It looks and behaves like the finished product so the client can review and iterate on design before any backend work. All UI copy is Danish.

## Run it

```bash
nix develop          # Node 24 LTS + pnpm (flake pinned to nixos-26.05)
pnpm install
pnpm dev             # http://localhost:5173
pnpm check           # svelte-check + TypeScript
pnpm build           # static site in build/ (SPA, index.html fallback)
```

Without Nix: any Node ≥ 22 with pnpm works.

Deploy: upload `build/` to any static host. Unknown paths must serve `index.html` (Cloudflare Pages does this by default; nginx: `try_files $uri /index.html`).

## What you can click through

| Flow | Where |
|---|---|
| Inspiration: hero search, categories, popular carousel, "Sker snart", spotlight | `/` |
| Browse + search + filter (category, city, price, sort), state in URL | `/kurser?kategori=mad-drikke&by=Aarhus` |
| Course page: facts, sessions with live seat counts, host, reviews, certificate teaser | `/kurser/napolitansk-pizza` |
| Checkout: participants (names go on certificates), MobilePay / Apple Pay / card, gift card redemption | `/kurser/<slug>/book` |
| Ticket with QR, add-to-calendar (.ics), "Simulér gennemført" → certificates | `/booking/<id>` |
| Certificate of completion: printable A4, verifiable ID + QR, LinkedIn add | `/bevis/LZ-4F7K-9QX2`, verify at `/bevis` |
| Gift cards: amount / course / specific store, 4 designs, live preview, redeem | `/gavekort`, `/gavekort/GAVE-7HMK-Q3PD` |
| In-store QR display (the 12 partner shops), printable A5 | `/display/pizzaskolen-aarhus` |
| Host profile | `/undervisere/<slug>` |
| Customer area: upcoming, completed + certificates, gift cards, favourites, reset demo | `/mine` |
| Host pitch, earnings calculator, application form | `/for-undervisere` |
| Host dashboard: revenue chart, sessions, check-in roster → send certificates, payouts | `/dashboard` |

Demo codes: gift card `GAVE-7HMK-Q3PD` (1.000 kr.), certificate `LZ-4F7K-9QX2`. Test card hint is shown in checkout.

## Stack and key decisions

- **SvelteKit 3 + Svelte 5 runes + Tailwind CSS 4**, TypeScript, `adapter-static` SPA (`ssr = false`). CSR only, per owner preference; a static build also makes the demo trivially hostable. Details: [vite.config.ts-cvf.md](vite.config.ts-cvf.md).
- **No backend, no network calls.** Catalogue is typed static data; user actions persist to `localStorage`. See [src/lib/demo-store.svelte.ts-cvf.md](src/lib/demo-store.svelte.ts-cvf.md) and [src/lib/catalog.ts-cvf.md](src/lib/catalog.ts-cvf.md).
- **Dates are relative to today**, so the demo never looks stale.
- **Design:** Apple-style (SF system font with Inter fallback, Liquid Glass header/tab bar, large radii, spring easing), light + dark via `prefers-color-scheme`, mobile-first with a floating tab bar. Tokens and why normalize/sanitize.css are not used: [src/app.css-cvf.md](src/app.css-cvf.md).
- **Course art instead of photos** (gradient + emoji covers). Reason and how to switch to photography: [src/lib/components/CourseCover.svelte-cvf.md](src/lib/components/CourseCover.svelte-cvf.md).
- **Names are fictional.** All hosts, people, addresses and numbers are invented; real-world inspirations from the brief (the Aarhus pizza teacher, a flødebolle shop) are represented by fictional stand-ins.
- No code comments; context lives in `*-cvf.md` files next to the code.

## Project map

```
src/app.css                 design tokens + glass/button/field utilities
src/lib/types.ts            domain model (Course, Session, Host, Booking, Certificate, GiftCard)
src/lib/data/               categories, 30 hosts (12 gift-card partners), 31 courses, reviews
src/lib/catalog.ts          queries over static data (filter/sort, relative session dates)
src/lib/demo-store.svelte.ts  persisted demo state (bookings, certificates, gift cards, favourites)
src/lib/format.ts           Danish formatting (da-DK prices, dates, durations)
src/lib/components/         Header, TabBar, Footer, CourseCard, CourseCover, GiftCardVisual, QrCode, PaymentSheet, …
src/routes/                 pages listed above
docs/milestones.md          milestones and open decisions
```

## Open business decisions (placeholders in the demo)

These values are invented for realism and must be confirmed by the client before launch:

- Platform fee **12 %** (`/for-undervisere` calculator, `COMMISSION_RATE`).
- Free cancellation **until 48 hours** before start.
- Gift card validity **3 years** (matches the Danish general limitation period, but confirm with legal).
- Weekly payouts, prices, ratings, revenue figures on the dashboard.

## Resources and health

Static site: ~0.9 MB build, no server process, no runtime memory/disk growth to monitor. `localStorage` usage is a few KB per visitor. A health check and resource monitoring become relevant with the backend (milestone M3).

## Known demo limitations

- Data lives in one browser: a certificate or gift card link opened on another device shows "not found" (except the seeded samples).
- Payment, e-mail and calendar reminders are simulated; `.ics` download and print-to-PDF are real.
- Dashboard numbers are static for the fictional Pizzaskolen Aarhus.

See [docs/milestones.md](docs/milestones.md) for what comes next.
