# 19. Appendix: Glossary

Plain-language definitions for the terms this book uses most. Each entry points to the chapter that explains it in full. Identifiers are written exactly as they appear in the source — `IPublishedContent`, not "IPublished content".

For a lookup that goes the other way — "which chapter covers this?" — see [20 - Appendix: Index](./20-appendix-index.md). For a symptom-first route in, see [How to Find Things](./00b-how-to-find-things.md).

## A

**`AppCaches`** — Umbraco's own helper object for general application caching, reached when you cache custom data in your own code. It exposes three caches: `RuntimeCache` (lives for the application's lifetime), `RequestCache` (lives for one HTTP request), and `IsolatedCaches` (per-entity, one cache per entity type). See [Chapter 6](./06-published-cache-and-load-balancing.md) and [Chapter 12](./12-small-local-cache-example-with-tags.md).

## B

**Blob metadata cache** — Instead of asking Azure for a file's size and last-modified date on every request, Umbraco remembers them for a short while, turning a repeated remote round-trip to blob storage into a cheap in-memory lookup. See [Chapter 13](./13-storage-providers-and-media-caching.md).

**Browser / proxy / CDN cache** — Ordinary HTTP caching outside the server. When a response is served from here it never reaches Umbraco at all. Controlled with `Cache-Control` headers; the Umbraco docs call this "Response Caching". See [Chapter 1](./01-the-big-picture.md).

## C

**Cache busting / invalidation** — Deciding when to throw a cached value away so nothing stale is served. The book's central claim is that this is harder, and matters at least as much, as storing the value. See [Chapter 9](./09-cache-busting-and-invalidation.md).

**Cache refresher (`ICacheRefresher`)** — The Umbraco contract for telling *every* server "this thing changed — clear or refresh the matching cache entries." One implementation exists per entity type (content, media, members, and so on). See [Chapter 9](./09-cache-busting-and-invalidation.md) and [Chapter 16](./16-reading-the-cache-code.md).

**Cache seeding** — Deliberately populating selected cache entries at start-up so the first request to important content is a hit, not a miss. Seeded entries can be given their own, longer durations. See [Chapter 6](./06-published-cache-and-load-balancing.md) and [Chapter 11](./11-cache-settings-talks-and-field-notes.md).

**Compatibility seam** — A spot where an old name lingers after the thing behind it changed: a setting, comment, SQL template, or API still carrying the `NuCache` name while Hybrid Cache does the actual work. See [Chapter 8](./08-nucache-vs-hybrid-cache.md).

**Content Delivery API (CDA)** — Umbraco's built-in headless JSON API. Its server-side output cache stores ready-made JSON responses, varied by route and Delivery API headers, and is invalidated by tags on publish. See [Chapter 4](./04-the-content-delivery-api.md).

**`ContentCacheNode`** — The serialised payload Umbraco stores for a published item in the Hybrid Cache. Kept compact with a MessagePack + LZ4 serialiser. See [Chapter 7](./07-hybrid-cache-engine.md).

## D

**`DistributedCache` (Umbraco)** — An *invalidation messenger*, **not** storage. Umbraco broadcasts refresh/remove instructions to every server, and each server clears or refreshes its own local caches in response. Do not confuse it with Microsoft's `IDistributedCache`. See [Chapter 9](./09-cache-busting-and-invalidation.md).

**`DocumentCacheService`** — The key class in the Hybrid Cache module: a large, content-aware read-through that turns a document lookup into an `IPublishedContent`, wrapping Microsoft's `HybridCache`. See [Chapter 7](./07-hybrid-cache-engine.md) and [Chapter 16](./16-reading-the-cache-code.md).

## E

**Edge cache** — A CDN, API gateway, or edge network sitting *outside* Umbraco in front of the CDA (for example Cloudflare, Azure Front Door, or Azure API Management). It caches whole JSON responses and needs its own purge signal on publish, because Umbraco's tag eviction stops at the edge. See [Chapter 5](./05-edge-cache-in-front-of-the-cda.md).

**Element vs content** — An *element* is content that only ever lives inside something else (a block in a grid). *Content* can stand on its own at a URL. Every piece of content is an element, but not every element is content. From Umbraco 18, elements get their own cache and cache-busting. See [Chapter 2](./02-the-published-object.md).

**Examine** — A search index, **not** a cache. It stores a derived, searchable copy of content so you can *find* things fast across a large set. Reach for it when the hard part is discovery, not remembering one computed result. See [Chapter 14](./14-examine-indexes-and-cache-adjacent-querying.md).

## G

**Generation counter** — A monotonic number the cache bumps whenever it changes. A slow read-through records the value when it starts; if a publish moves it meanwhile, the read still returns its answer but declines to write its now-stale result back, so a fresh entry is never clobbered. See [Chapter 7](./07-hybrid-cache-engine.md).

**`GetOrCreateAsync` (read-through)** — A *read-through* cache is one you always ask first; on a miss it calls your *factory* to fetch the real value, stores it, and hands it back. `GetOrCreateAsync` is that single door in Microsoft's `HybridCache`. See [Chapter 7](./07-hybrid-cache-engine.md).

## H

**`HybridCache` (Microsoft)** — Microsoft's higher-level cache API that combines a fast local memory layer (L1) with an optional distributed second level (L2), plus stampede protection, tags, and configurable serialisation. It is the engine Umbraco's published-content cache is built on. See [Chapter 7](./07-hybrid-cache-engine.md).

## I

**`IAppCache`** — The interface behind `AppCaches` and its runtime/request/isolated caches. See [Chapter 16](./16-reading-the-cache-code.md).

**`IContent` vs `IPublishedContent`** — `IContent` is the editable write model (drafts, saving). `IPublishedContent` is the read model served to the front-end and Delivery API. The caches in this book are built around the read model. See [Chapter 2](./02-the-published-object.md).

**`IDistributedCache` (Microsoft)** — A *storage* abstraction for the shared L2 layer (Redis, SQL, and so on). It holds bytes; it does not tell other servers to forget anything. Contrast with Umbraco's `DistributedCache`. See [Chapter 7](./07-hybrid-cache-engine.md).

**`IMemoryCache`** — Plain in-process memory caching, the lowest of the Microsoft primitives beneath `HybridCache`. See [Chapter 1](./01-the-big-picture.md).

**`IPublishedContent`** — The materialised read-model object for a published document, media item, or member — the thing the published-content cache exists to produce. See [Chapter 2](./02-the-published-object.md).

## L

**L0 / L1 / L2** — The layers a document lookup falls through. **L0** is Umbraco's in-process cache of already-converted `IPublishedContent` objects (the cheapest hit, tried first). **L1** is `HybridCache`'s in-memory store of serialised nodes. **L2** is the optional shared distributed store. Beneath them sits the database-backed cache source. See [Chapter 7](./07-hybrid-cache-engine.md).

## M

**Materialised object** — Turning raw cached data into a ready-to-use `IPublishedContent` — deserialisation, property-value conversion, and wiring up the object. It is not free, which is why the L0 fast lane exists to skip it. See [Chapter 2](./02-the-published-object.md).

**`MaximumPayloadBytes`** — The cap on how large a single serialised cache entry may be; a larger entry is not stored. Microsoft's `HybridCache` defaults this to 1 MB, but Umbraco raises it to 100 MB because a document with a few languages and blocks easily exceeds 1 MB. See [Chapter 11](./11-cache-settings-talks-and-field-notes.md).

**MessagePack + LZ4** — The serialisation format and compression Umbraco registers for `ContentCacheNode`, chosen to keep payloads small. Changing the serialiser is a database-cache rebuild event, not a trivial toggle. See [Chapter 7](./07-hybrid-cache-engine.md).

## N

**NuCache** — The *older* published-content cache architecture (Umbraco 8–14). Its engine was retired in v15; only its vocabulary survives in settings, serialiser options, SQL template names, and comments. It is not a second engine you can switch back to. See [Chapter 8](./08-nucache-vs-hybrid-cache.md).

## O

**Output cache (website)** — Umbraco 17's server-side cache of rendered HTML responses, built on ASP.NET Core output caching, opt-in and tag-driven. Distinct from the CDA output cache (JSON) and the published-content cache. See [Chapter 3](./03-website-output-caching.md).

## P

**Published-content cache** — The cache that holds published data ready to assemble into `IPublishedContent`. In Umbraco 17 it is built on Microsoft's `HybridCache`. Not the same thing as output caching. See [Chapter 6](./06-published-cache-and-load-balancing.md).

## R

**Refresh types (`RefreshNode`, `RefreshBranch`, `Remove`, `RefreshAll`)** — The granularities a cache refresher can act at: a single node, a node and its descendants, a removal, or everything. Choosing the right one is the difference between surgical and blunt invalidation. See [Chapter 9](./09-cache-busting-and-invalidation.md).

## S

**Stampede protection** — When many requests miss the same key at once, `HybridCache` runs the factory *once* and shares the result, rather than letting every caller hit the source. It is per process, not per cluster. See [Chapter 7](./07-hybrid-cache-engine.md).

**`SuppressCacheRefresherNotifications`** — A Deploy setting controlling whether cache refresher notifications are emitted automatically after a batch operation. See [Chapter 10](./10-hq-extensions-and-cache.md).

## T

**Tag-based invalidation (`ct:`, `et:`)** — Umbraco tags each cached entry (for example `ct:{contentTypeId}` for documents, `et:{elementTypeId}` for elements) so a whole content type can be invalidated in one call. In `HybridCache` this is a logical timestamp gate, not a physical sweep, so it is cheap. See [Chapter 7](./07-hybrid-cache-engine.md); applied to responses in [Chapter 4](./04-the-content-delivery-api.md) and [Chapter 9](./09-cache-busting-and-invalidation.md).
