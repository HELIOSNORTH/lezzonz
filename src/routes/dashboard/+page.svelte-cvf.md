# dashboard/+page.svelte — 2026-10-13

Static showcase of the host side for the fictional Pizzaskolen Aarhus (brief: a real Aarhus pizza teacher makes ~280.000 kr./month at 700 kr./person ≈ 400 participants). KPI and revenue numbers are hard-coded to tell that story; rosters are generated deterministically from name lists.

Chart: single series → one colour, no legend (title names it), 4 px rounded bar tops, hover tooltip, recessive grid, screen-reader table. Bar colour `#f0541e` passed the dataviz palette validator in light and dark; the lighter dark-mode brand `#ff6a33` failed the dark lightness band, so the chart keeps `#f0541e` in both modes. Gridline offset constants (`248 / 272`, `24px`) are tied to the container height `h-[17rem]` and `pb-6`; change them together.

The check-in → "Afslut hold og send beviser" flow is local component state only (resets on reload).
