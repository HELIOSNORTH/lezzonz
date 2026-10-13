# Milestones

## M1 — Clickable demo · done 2026-10-13

Front-end only, Danish UI, light/dark, mobile → desktop. Covers inspiration/browse, course page, checkout (MobilePay/Apple Pay/card/gift card), ticket with QR + .ics, certificates (print, verify, LinkedIn), gift cards (online + 12 in-store QR displays), customer area, host pitch + application, host dashboard (check-in → certificates). Verified with `pnpm check`, `pnpm build`, and a headless click-through of booking → payment → certificate → gift card with zero console errors; no horizontal overflow at 390 px.

## M1.1 — Client feedback round 1 · done 2026-10-13

Light mode only; text cut to titles/prices/actions across all pages; real course photos replace generated art; catalogue cut to 10 courses (pizza, flødeboller, gin, bartending, racing, mushroom walk, flower binding, knitting, music production, AI) covering all six categories. The brief's "12 selected businesses" now maps to the 10 hosts; add two more courses/hosts if the client wants exactly 12.

## M2 — Client design review · next

- Walk the client through the flows in README "What you can click through".
- Collect feedback on brand (name mark, accent orange `#f0541e`), categories, copy, card layout.
- Decide the open business values listed in README (fee, cancellation window, gift card validity).
- Replace Unsplash demo photos with the hosts' own photos before launch (see `CourseCover` CVF).

## M3 — Backend · later

Planned shape (to be confirmed): Rust API (or TS where tooling wins, e.g. payment SDKs) + Postgres. Map from demo:

| Demo piece | Real implementation |
|---|---|
| `src/lib/data/*` | courses/hosts/sessions tables + host admin |
| `demo-store` bookings | bookings + seat reservation with locking |
| `PaymentSheet` | MobilePay / card acquirer (e.g. Nets/Stripe) with webhooks |
| certificates | signed, server-stored, public verify endpoint at `/bevis/:id` |
| gift cards | ledger with balance + redemption, QR links per partner |
| dashboard | host auth, check-in, payouts, exports |

Add health checks and resource monitoring (memory/disk over time) with the first server process.
