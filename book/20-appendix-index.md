# 20. Appendix: Index

An A–Z of the terms, identifiers, and settings this book uses, each pointing to the chapter(s) that cover it. Use it when you know the name and want the page. For definitions, see [19 - Appendix: Glossary](./19-appendix-glossary.md); for a symptom-first route, see [How to Find Things](./00b-how-to-find-things.md).

Numbers in brackets are chapters. The first is the primary treatment.

## A

- `AddUmbracoHybridCache()` — [7](./07-hybrid-cache-engine.md), [8](./08-nucache-vs-hybrid-cache.md)
- `AppCaches` — [6](./06-published-cache-and-load-balancing.md), [12](./12-small-local-cache-example-with-tags.md), [16](./16-reading-the-cache-code.md)
- Azure API Management — [5](./05-edge-cache-in-front-of-the-cda.md)
- Azure Blob Storage — [13](./13-storage-providers-and-media-caching.md)
- Azure Front Door — [5](./05-edge-cache-in-front-of-the-cda.md)

## B

- Blob metadata cache — [13](./13-storage-providers-and-media-caching.md)
- Browser / proxy cache — [1](./01-the-big-picture.md)

## C

- `Cache-Control` — [1](./01-the-big-picture.md), [3](./03-website-output-caching.md)
- Cache refresher — see `ICacheRefresher`
- Cache seeding — [6](./06-published-cache-and-load-balancing.md), [11](./11-cache-settings-talks-and-field-notes.md)
- Cloudflare — [5](./05-edge-cache-in-front-of-the-cda.md)
- Cold start / warm-up — [11](./11-cache-settings-talks-and-field-notes.md), [15](./15-lessons-from-the-issue-tracker.md)
- Compatibility seam — [8](./08-nucache-vs-hybrid-cache.md)
- Content Delivery API (CDA) — [4](./04-the-content-delivery-api.md), edge in front: [5](./05-edge-cache-in-front-of-the-cda.md)
- `ContentCacheNode` — [7](./07-hybrid-cache-engine.md)
- `ContentCacheRefresher` — [9](./09-cache-busting-and-invalidation.md)
- `ContentTypeRebuildMode` — [11](./11-cache-settings-talks-and-field-notes.md)

## D

- `DatabaseCacheRepository` — [7](./07-hybrid-cache-engine.md)
- Deploy (Umbraco) — [10](./10-hq-extensions-and-cache.md)
- Distributed invalidation — [9](./09-cache-busting-and-invalidation.md)
- `DistributedCache` (Umbraco, invalidation messenger) — [9](./09-cache-busting-and-invalidation.md), [1](./01-the-big-picture.md)
- `DocumentCacheService` — [7](./07-hybrid-cache-engine.md), [16](./16-reading-the-cache-code.md)

## E

- Edge cache — [5](./05-edge-cache-in-front-of-the-cda.md)
- Element cache (Umbraco 18) — [8](./08-nucache-vs-hybrid-cache.md), [2](./02-the-published-object.md)
- Element vs content — [2](./02-the-published-object.md)
- `EvictByTagAsync` / `IDeliveryApiOutputCacheManager` — [4](./04-the-content-delivery-api.md), [5](./05-edge-cache-in-front-of-the-cda.md)
- Examine — [14](./14-examine-indexes-and-cache-adjacent-querying.md)

## F

- Forms (Umbraco) — [10](./10-hq-extensions-and-cache.md)

## G

- Generation counter — [7](./07-hybrid-cache-engine.md)
- `GetOrCreateAsync` — [7](./07-hybrid-cache-engine.md)

## H

- `HybridCache` (Microsoft) — [7](./07-hybrid-cache-engine.md)
- Hybrid Cache (Umbraco published-content engine) — [7](./07-hybrid-cache-engine.md), [6](./06-published-cache-and-load-balancing.md)
- `HybridCacheSerializer` — [7](./07-hybrid-cache-engine.md)

## I

- `IAppCache` — [16](./16-reading-the-cache-code.md), [6](./06-published-cache-and-load-balancing.md)
- `ICacheRefresher` — [9](./09-cache-busting-and-invalidation.md), [16](./16-reading-the-cache-code.md)
- `IContent` — [2](./02-the-published-object.md)
- `IDistributedCache` (Microsoft, storage) — [7](./07-hybrid-cache-engine.md)
- `IMemoryCache` — [1](./01-the-big-picture.md), [7](./07-hybrid-cache-engine.md)
- ImageSharp cache — [13](./13-storage-providers-and-media-caching.md)
- `IPublishedContent` — [2](./02-the-published-object.md), [6](./06-published-cache-and-load-balancing.md)
- `IPublishedContentQuery` — [14](./14-examine-indexes-and-cache-adjacent-querying.md)
- `IPublishedElement` — [2](./02-the-published-object.md)
- `IsolatedCaches` — [6](./06-published-cache-and-load-balancing.md)
- `IWebsiteOutputCache*` providers (RequestFilter, DurationProvider, TagProvider, EvictionProvider, VaryByProvider) — [3](./03-website-output-caching.md)

## L

- L0 / L1 / L2 layers — [7](./07-hybrid-cache-engine.md)
- Load balancing — [6](./06-published-cache-and-load-balancing.md), [9](./09-cache-busting-and-invalidation.md)
- `LocalCacheDuration` — [11](./11-cache-settings-talks-and-field-notes.md)
- LZ4 compression — [7](./07-hybrid-cache-engine.md)

## M

- Materialised object — [2](./02-the-published-object.md), [6](./06-published-cache-and-load-balancing.md)
- `MaximumKeyLength` — [7](./07-hybrid-cache-engine.md)
- `MaximumPayloadBytes` — [11](./11-cache-settings-talks-and-field-notes.md), [7](./07-hybrid-cache-engine.md)
- Media caching — [13](./13-storage-providers-and-media-caching.md)
- MessagePack — [7](./07-hybrid-cache-engine.md)

## N

- NuCache (history, legacy names) — [8](./08-nucache-vs-hybrid-cache.md)
- `NuCacheSettings` / `NuCacheSerializerType` — [8](./08-nucache-vs-hybrid-cache.md), [11](./11-cache-settings-talks-and-field-notes.md)

## O

- Output cache — website (HTML): [3](./03-website-output-caching.md); CDA (JSON): [4](./04-the-content-delivery-api.md)

## P

- Partial view cache — [3](./03-website-output-caching.md), [6](./06-published-cache-and-load-balancing.md)
- Preview vs published keys (`+draft`) — [7](./07-hybrid-cache-engine.md)
- Published-content cache — [6](./06-published-cache-and-load-balancing.md), engine: [7](./07-hybrid-cache-engine.md)

## R

- Rebuild (database cache source) — [7](./07-hybrid-cache-engine.md), [11](./11-cache-settings-talks-and-field-notes.md)
- `RefreshAll` / `RefreshBranch` / `RefreshNode` / `Remove` — [9](./09-cache-busting-and-invalidation.md)
- `RefreshAllPublishedSnapshot()` — [8](./08-nucache-vs-hybrid-cache.md)
- `RemoteCacheDuration` — [11](./11-cache-settings-talks-and-field-notes.md)
- `RemoveByTagAsync` — [7](./07-hybrid-cache-engine.md)
- Response caching — [1](./01-the-big-picture.md), [3](./03-website-output-caching.md)
- `RequestCache` — [6](./06-published-cache-and-load-balancing.md)
- `RuntimeCache` — [6](./06-published-cache-and-load-balancing.md), [12](./12-small-local-cache-example-with-tags.md), [14](./14-examine-indexes-and-cache-adjacent-querying.md)

## S

- Search — see Examine, Umbraco Search
- `SeedCacheDuration` — [11](./11-cache-settings-talks-and-field-notes.md)
- Seed key provider — [6](./06-published-cache-and-load-balancing.md), [11](./11-cache-settings-talks-and-field-notes.md)
- Stampede protection — [7](./07-hybrid-cache-engine.md)
- Storage providers — [13](./13-storage-providers-and-media-caching.md)
- `SuppressCacheRefresherNotifications` (Deploy) — [10](./10-hq-extensions-and-cache.md)

## T

- Tag-based eviction (`ct:`, `et:`) — mechanism: [7](./07-hybrid-cache-engine.md); applied: [4](./04-the-content-delivery-api.md), [9](./09-cache-busting-and-invalidation.md)
- Traversal cost — [6](./06-published-cache-and-load-balancing.md), [15](./15-lessons-from-the-issue-tracker.md)

## U

- Umbraco Commerce — [10](./10-hq-extensions-and-cache.md)
- Umbraco Engage — [10](./10-hq-extensions-and-cache.md)
- Umbraco Search / `Umbraco.Cms.Search` — [10](./10-hq-extensions-and-cache.md), [14](./14-examine-indexes-and-cache-adjacent-querying.md)

## V

- Vary rules (output cache) — [3](./03-website-output-caching.md), [4](./04-the-content-delivery-api.md)

## W

- Warm-up — [11](./11-cache-settings-talks-and-field-notes.md), [15](./15-lessons-from-the-issue-tracker.md)
- Website output cache — [3](./03-website-output-caching.md)
