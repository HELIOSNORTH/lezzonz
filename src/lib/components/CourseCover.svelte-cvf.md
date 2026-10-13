# CourseCover.svelte — 2026-10-13

Covers are generated art (3-stop mesh gradient per course + large emoji + grain) instead of photos. Reasons: no licensed photography exists yet, the build environment could not reach image hosts to vet stock photos, and hot-linking unverified URLs risks broken images in a client demo. The art is consistent, theme-aware and weighs nothing.

To switch to photography: add an optional `image` field to `Course`, render an `<img>` (object-cover) here when present, keep the gradient as the loading/fallback layer. Every card, hero and ticket uses this component, so it is the only place to change.

`emojiClass` positions the emoji (e.g. right-aligned in the homepage spotlight so it does not sit under the headline).
