# demo-store.svelte.ts — 2026-10-13

Stand-in for the future backend. One `$state` object persisted to `localStorage` under `lezzonz-demo-v2` (v2 since the catalogue was cut to 10 courses) (bump the key when the shape changes; old data is then ignored and reseeded).

- **Seed** gives a believable persona (Sofie Lund) out of the box: two completed courses (AI, gin) with certificates, one upcoming booking, one received gift card, three favourites. Seed dates are relative to first visit.
- `completeFinishedBookings` runs on load: bookings whose end time has passed get certificates automatically, mirroring the real flow (host marks attendance → certificates sent).
- `completeBooking` powers the "Simulér gennemført" demo button; certificates use the session date as `completedAt`, not "now".
- `seatsTaken` subtracts the visitor's own bookings from static `spotsLeft`, so booking visibly reduces availability.
- `SAMPLE_CERTIFICATE_ID` / `SAMPLE_GIFT_CARD_CODE` are referenced in the UI as try-it codes; keep them in the seed.
- Every storage access is wrapped in try/catch (private mode, blocked storage); the app works without persistence.
- Limitation: links to certificates/gift cards created in one browser do not resolve elsewhere. Real verification needs the backend (M3).
