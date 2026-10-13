# CourseCover.svelte — 2026-10-13

Single place that renders a course image (cards, hero, ticket, thumbnails, store display). Loads `/photos/<slug>.webp`, so every course in `src/lib/data/courses.ts` needs a matching file in `static/photos/`. The parent decides size/shape via `class`; `eager` for above-the-fold images, everything else lazy-loads.

History: first version used generated gradient + emoji art because image hosts were unreachable; the client asked for real, natural-looking photos (2026-10-13).

Photos: Unsplash, fetched as `https://images.unsplash.com/photo-<id>?w=1400&h=1050&fit=crop&crop=entropy&q=70&fm=webp`, each checked by eye for subject and a natural (non-staged) look.

| slug | Unsplash id |
|---|---|
| napolitansk-pizza | 1574071318508-1cdbab80d002 |
| floedeboller | 1549007994-cb92caebd54b |
| gin-smagning | 1609951651556-5334e2706168 |
| cocktails-bartending | 1470337458703-46ad1756a187 |
| banekursus | 1568605117036-5fe5e7bab0b7 |
| svampetur | 1441974231531-c6227db76b6e |
| blomsterbinding | 1563241527-3004b7be0ffd |
| strik-sweater | 1584992236310-6edddc08acff |
| beats-ableton | 1598488035139-bdbb2231ce04 |
| ai-i-hverdagen | 1522202176988-66273c2fd55f |

For production, replace with the hosts' own photos (same filenames).
