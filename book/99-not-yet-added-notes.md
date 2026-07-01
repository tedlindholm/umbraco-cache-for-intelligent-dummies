# 99. Notes Not Yet Added To The Book

This file is a working backlog.

It tracks where source-backed observations have landed in the main chapters, and what (if anything) is still genuinely missing.

## Already woven into chapters

Most of the original notes are now covered. Quick index of where they live:

- General cache families and the "not one cache" framing → [Chapter 1](./01-the-big-picture.md)
- Microsoft `HybridCache` stack (`IMemoryCache`, `IDistributedCache`, `HybridCache`) → [Chapter 1](./01-the-big-picture.md) and [Chapter 9](./09-future-hybrid-cache-architecture.md)
- NuCache vs Hybrid Cache, plus the lingering v17 names → [Chapter 11](./11-nucache-vs-hybrid-cache.md) (now with comparison and leftovers tables)
- Future Hybrid Cache architecture: L0 hot lane, serialised entries, database-backed source, generation counter, negative-cache tagging, seeding, deferred rebuilds, serialiser-change rebuilds → [Chapter 9](./09-future-hybrid-cache-architecture.md)
- Cache busting and invalidation, refresh types, broad refreshers → [Chapter 4](./04-cache-busting-and-invalidation.md)
- Publish vs Deploy vs output-cache eviction (the three busting paths) → [Chapter 4](./04-cache-busting-and-invalidation.md)
- HQ extensions (Forms, Deploy, Engage, Commerce) and their cache differences → [Chapter 5](./05-hq-extensions-and-cache.md)
- Website output caching → [Chapter 2](./02-website-output-caching.md)
- Storage providers and media caching (CDN URLs, blob metadata via `HybridCache`, ImageSharp cache) → [Chapter 8](./08-storage-providers-and-media-caching.md)
- Talks, PDFs, and blog framing → [Chapter 6](./06-cache-settings-talks-and-field-notes.md) and the [appendix](./10-appendix-sources.md)

## Diagrams now added

- Cache architecture timeline, v7 to v18 → [Chapter 1](./01-the-big-picture.md) (`cache-timeline.svg`)
- How the cache families relate: engine vs Umbraco layers vs invalidation → [Chapter 1](./01-the-big-picture.md) (`cache-layers.svg`)

## Still worth expanding later

The big-ticket backlog items are done. What remains is lower-priority polish:

- A focused audit of every NuCache-named leftover in v18 `main`, confirming which are still only names versus which now drive behaviour (the v17 view is captured in [Chapter 11](./11-nucache-vs-hybrid-cache.md)).
- A worked, end-to-end example tracing a single publish through every layer it touches, with real key values.
- A configuration reference: every cache-related setting and its effect, gathered in one place.

## Nice quotes or concepts to maybe reuse later

- "Microsoft built the cache engine; Umbraco built a published-content pipeline around it."
- "The cache busting path is the real architecture."
- "NuCache is the older alternative; Hybrid Cache is the active one."
- "The middleware/output-cache layer and the published-content layer solve different problems."

## Source families now in use

- Microsoft docs and blog
- Umbraco docs
- Umbraco blog
- Umbraco source code
- Umbraco.StorageProviders repository
- talks and PDFs
