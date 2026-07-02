# 17. Appendix: Sources

This appendix is the book's source register.

The main chapters use footnotes to point here when a claim depends on a specific source or source family.

## How to read this appendix

- Microsoft sources explain the base `HybridCache` platform.
- Umbraco docs explain supported behaviour and configuration.
- Umbraco source code shows how the platform is actually wired together.
- Supporting talks and articles help explain trade-offs and mental models.

## Microsoft sources

### M1. Caching in .NET

- [Caching in .NET](https://learn.microsoft.com/en-us/dotnet/core/extensions/caching)

### M2. ASP.NET Core HybridCache

- [HybridCache in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/performance/caching/hybrid?view=aspnetcore-10.0)

### M3. ASP.NET Core caching overview

- [Caching overview in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/performance/caching/overview?view=aspnetcore-10.0)

### M4. Hybrid Cache is now GA

- [HybridCache is now GA (blog post)](https://devblogs.microsoft.com/dotnet/hybrid-cache-is-now-ga/)

### M5. `HybridCacheEntryOptions`

- [HybridCacheEntryOptions API](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.caching.hybrid.hybridcacheentryoptions?view=net-11.0-pp)

### M6. `HybridCacheOptions`

- [HybridCacheOptions API](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.caching.hybrid.hybridcacheoptions?view=net-11.0-pp)

### M7. ASP.NET Core in .NET 9 release notes — new `HybridCache` library

- [What's new in ASP.NET Core in .NET 9 — new HybridCache library](https://learn.microsoft.com/en-us/aspnet/core/release-notes/aspnetcore-9.0?view=aspnetcore-10.0#miscellaneous)
- Establishes the timeline: `HybridCache` was introduced in .NET 9 (shipping in preview) and shipped GA in a later `Microsoft.Extensions.Caching.Hybrid` release. Contains the canonical `IDistributedCache`-boilerplate-vs-`HybridCache` before/after comparison and the `TState` overload.

### M8. `HybridCacheEntryFlags` enum

- [HybridCacheEntryFlags enum API](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.caching.hybrid.hybridcacheentryflags?view=net-11.0-pp)
- Documents the per-call flags that disable reading or writing of the local (L1) or distributed (L2) layer, bypass the underlying data store, or disable compression: `DisableLocalCacheRead/Write`, `DisableDistributedCacheRead/Write`, `DisableUnderlyingData`, `DisableCompression`.

### M9. `HybridCache` reference source

- [`HybridCache.cs` on source.dot.net](https://source.dot.net/#Microsoft.Extensions.Caching.Abstractions/Hybrid/HybridCache.cs,8c0fe94693d1ac8d)
- The abstract base class and the default implementation — the ground truth for stampede coalescing and layer coordination.

### M10. `HybridCache` API proposal

- [Hybrid Cache API proposal (GitHub dotnet/aspnetcore issue #54647)](https://github.com/dotnet/aspnetcore/issues/54647)
- The original design discussion; useful for the "why" behind the API shape.

### M11. `IBufferDistributedCache`

- [IBufferDistributedCache API](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.caching.distributed.ibufferdistributedcache)
- The `byte[]`-allocation-avoiding L2 interface implemented by the newer Redis, SQL Server, and Postgres cache packages that `HybridCache` can exploit.

### M12. FusionCache as a custom `HybridCache` implementation

- [FusionCache — Microsoft HybridCache integration](https://github.com/ZiggyCreatures/FusionCache/blob/main/docs/MicrosoftHybridCache.md)
- Evidence that `HybridCache` is an abstract contract with swappable implementations, not a single sealed class.

### M13. .NET diagnostic tools overview

- [.NET diagnostic tools](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/tools-overview)
- The CLI toolbox: `dotnet-counters`, `dotnet-trace`, `dotnet-monitor`, `dotnet-dump`, `dotnet-gcdump`, `dotnet-stack`.

### M14. `dotnet-counters`

- [Investigate performance counters (dotnet-counters)](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/dotnet-counters)
- Live counter monitoring; observes both the `EventCounter` and `System.Diagnostics.Metrics` `Meter` APIs.

### M15. Metrics and collection in .NET

- [Built-in metrics in .NET](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/built-in-metrics)
- [Collect metrics](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/metrics-collection)
- The `System.Diagnostics.Metrics` API and how to export it (OpenTelemetry, `dotnet-counters`). EF Core's `compiled_query_cache_hits` / `compiled_query_cache_misses` live here too.

### M16. EventSource, EventPipe, and specialized diagnostics

- [Specialized diagnostics (EventSource, EventPipe, dumps)](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/specialized-diagnostics-overview)
- [Well-known EventCounters in .NET](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/available-counters)
- The low-level tracing bus underneath the CLI tools, plus the runtime/GC counters useful when a cache is a memory suspect.

### M17. Azure Cache for Redis monitoring data reference

- [Azure Cache for Redis monitoring data reference](https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/monitor-cache-reference#metrics)
- L2-side metrics — `cachehits`, `cachemisses`, `cachemissrate`, `evictedkeys`, `connectedclients` — exposed through Azure Monitor when Redis is the secondary cache.

## Umbraco docs

### U1. Caching overview

- [Caching overview (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/develop-with-umbraco/caching)

### U2. Response caching

- [Response caching (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/develop-with-umbraco/caching/response-caching)

### U3. Website output caching

- [Website output caching (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/develop-with-umbraco/caching/website-output-caching)

### U4. Cache settings for Umbraco 17

- [Cache settings (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/develop-with-umbraco/configuration/cache-settings)

### U5. Current cache settings page

- [Cache settings (latest)](https://docs.umbraco.com/umbraco-cms/develop-with-umbraco/configuration/cache-settings)

### U6. Server-side extensions cache docs

- [Server-side cache extensions (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/extend-your-project/server-side-extensions/cache)

### U7. Application cache docs

- [Application cache (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/extend-your-project/server-side-extensions/cache/application-cache)

### U8. Cache seeding docs

- [Cache seeding (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/extend-your-project/server-side-extensions/cache/cache-seeding)

### U9. Custom seed-key provider example

- [Custom seed key provider example](https://docs.umbraco.com/umbraco-cms/extend-your-project/server-side-extensions/cache/examples/creating-custom-seed-key-provider)

### U10. Tags example

- [Cache tags example](https://docs.umbraco.com/umbraco-cms/extend-your-project/server-side-extensions/cache/examples/tags)

### U11. Deploy: handling cache refresher notifications

- [Handling cache refresher notifications (Deploy)](https://docs.umbraco.com/umbraco-deploy/extending/handling-cache-refresher-notifications)

### U12. Deploy settings

- [Deploy settings](https://docs.umbraco.com/umbraco-deploy/getting-started/deploy-settings)

### U13. Deploy troubleshooting

- [Deploy troubleshooting](https://docs.umbraco.com/umbraco-deploy/troubleshooting)

### U14. Storage Providers docs

- [Umbraco Storage Providers](https://docs.umbraco.com/marketplace-and-integrations/packages/storage-providers)

### U15. Examine overview

- [Examine](https://docs.umbraco.com/umbraco-cms/develop-with-umbraco/application-code/examine)

### U16. Examine management

- [Examine management](https://docs.umbraco.com/umbraco-cms/develop-with-umbraco/application-code/examine/examine-management)

### U17. Examine `ISearcher` API

- [Examine ISearcher API](https://shazwazza.github.io/Examine/api/Examine.ISearcher.html)

### U18. Umbraco Forms docs

- [Umbraco Forms docs](https://docs.umbraco.com/umbraco-forms)

### U19. Umbraco Engage docs

- [Umbraco Engage docs](https://docs.umbraco.com/umbraco-engage)

### U20. Umbraco Commerce docs

- [Umbraco Commerce docs](https://docs.umbraco.com/umbraco-commerce)

### U21. Umbraco Search overview

- [Umbraco Search overview](https://docs.umbraco.com/umbraco-search)

### U22. Umbraco Search installation

- [Umbraco Search installation](https://docs.umbraco.com/umbraco-search/installation)

### U23. Umbraco Search database cache for index values

- [Database Cache for Index Values](https://docs.umbraco.com/umbraco-search/extending/database-cache-for-index-values)

### U24. Umbraco Search reindexing content

- [Reindexing Content](https://docs.umbraco.com/umbraco-search/extending/reindexing-content-programmatically)

### U25. Umbraco Search indexing notification handling

- [Indexing Notification Handling](https://docs.umbraco.com/umbraco-search/extending/indexing-notification-handling)

### U26. Umbraco Search Examine provider

- [The Examine Search Provider](https://docs.umbraco.com/umbraco-search/getting-started/examine-search-provider)

## Umbraco source code

### C1. Umbraco 17 source checkout

- `umbraco-v17` on branch `release/17.5.1`; local shallow HEAD during this audit was `d48a8c1f` (`release-17.5.0` tag)

### C2. Umbraco 18 source checkout

- `umbraco-v18` on branch `release/18.0.2`; local shallow HEAD during this audit was `c087ce9f` (`release-18.0.0` tag)

### C3. Umbraco main branch source checkout

- `umbraco-main`

### C4. `Umbraco.PublishedCache.HybridCache` on `main`

- `umbraco-main/src/Umbraco.PublishedCache.HybridCache`

### C5. `CLAUDE.md` for `Umbraco.PublishedCache.HybridCache`

- `umbraco-main/src/Umbraco.PublishedCache.HybridCache/CLAUDE.md`

### C6. Website output-cache implementation

- `umbraco-v17/src/Umbraco.Web.Website/Caching`

### C7. Core cache types and refreshers

- `umbraco-v17/src/Umbraco.Core/Cache`

### C8. v18 and main NuCache vocabulary audit

- Local source search across `umbraco-v18` and `umbraco-main` for `NuCache`, `PublishedSnapshot`, `NuCacheSettings`, `NuCacheSerializerType`, `NuCacheDatabaseDataSource`, and `RefreshAllPublishedSnapshot`
- Main paths checked:
  - `src/Umbraco.Core/Configuration/Models`
  - `src/Umbraco.Core/Cache/DistributedCacheExtensions.cs`
  - `src/Umbraco.Core/Constants-SqlTemplates.cs`
  - `src/Umbraco.PublishedCache.HybridCache`
  - `src/Umbraco.Web.UI.Client/src/assets/lang`

### C9. `IAppCache` interface path (v17)

- `umbraco-v17/src/Umbraco.Core/Cache/IAppCache.cs`

### C10. `AppCaches` implementation path (v17)

- `umbraco-v17/src/Umbraco.Core/Cache/AppCaches.cs`

### C11. `ICacheRefresher` interface path (v17)

- `umbraco-v17/src/Umbraco.Core/Cache/Refreshers/ICacheRefresher.cs`

### C12. `DistributedCache` implementation path (v17)

- `umbraco-v17/src/Umbraco.Core/Cache/DistributedCache.cs`

### C13. `DocumentCacheService` path (v17 HybridCache)

- `umbraco-v17/src/Umbraco.PublishedCache.HybridCache/Services/DocumentCacheService.cs`

### C14. v17 HybridCache registration, serialiser, and service wiring

Verified against a local Umbraco v17 checkout (`.NET 10.0` target) on 1 July 2026:

- `umbraco-v17/src/Umbraco.PublishedCache.HybridCache/DependencyInjection/UmbracoBuilderExtensions.cs` — `AddUmbracoHybridCache`: `AddHybridCache` with `MaximumPayloadBytes = 1024 * 1024 * 100` (100 MB, with an inline comment about languages/blocks exceeding the 1 MB default), `AddSerializer<ContentCacheNode, HybridCacheSerializer>()`, and the `IPublishedContentCache → DocumentCache` / `IPublishedMediaCache → MediaCache` / `IDatabaseCacheRepository → DatabaseCacheRepository` singleton bindings.
- `umbraco-v17/src/Umbraco.PublishedCache.HybridCache/Extensions/HybridCacheExtensions.cs` — the `TryGetValueAsync<T>` / `ExistsAsync<T>` extensions built on `GetOrCreateAsync` + `RemoveAsync` under a per-key `SemaphoreSlim` (filling the absent `TryGet` on Microsoft's API).
- `umbraco-v17/src/Umbraco.PublishedCache.HybridCache/Serialization/HybridCacheSerializer.cs` — `IHybridCacheSerializer<ContentCacheNode>` using MessagePack `ContractlessStandardResolver` with `MessagePackCompression.Lz4BlockArray` and `MessagePackSecurity.UntrustedData`.
- `DocumentCacheService.cs` specifics: `GetCacheKey` (`$"{key}+draft"` for preview), `GenerateTags` / `ContentTypeIdTag` (`"content"` + `$"ct:{contentTypeId}"`, with the negative-entry rationale in the XML doc), and `GetEntryOptions` / `GetSeedEntryOptions` mapping `RemoteCacheDuration`/`LocalCacheDuration`/`SeedCacheDuration` onto `Expiration`/`LocalCacheExpiration`.

### C15. Content Delivery API output-cache implementation

- `umbraco-v17/src/Umbraco.Core/Constants-DeliveryApi.cs` - Delivery API output-cache tag constants.
- `umbraco-v17/src/Umbraco.Cms.Api.Delivery/Caching/DeliveryApiOutputCachePolicyBase.cs` - response tagging before Delivery API output-cache storage.
- `umbraco-v17/src/Umbraco.Cms.Api.Delivery/Caching/DeliveryApiDocumentOutputCacheEvictionHandler.cs` - document-driven Delivery API output-cache eviction by tag.
- `umbraco-v17/src/Umbraco.Web.Common/Caching/RelationOutputCacheEvictionHandlerBase.cs` - relation-aware eviction for responses that embed or reference changed content.
- `umbraco-v18/src/Umbraco.Web.Website/Caching/WebsiteElementOutputCacheEvictionHandler.cs` - v18 element-aware output-cache eviction comparison point.

## Storage Providers source

### S1. `Umbraco.StorageProviders` repository

- [Umbraco.StorageProviders on GitHub](https://github.com/umbraco/Umbraco.StorageProviders)

### S2. `Umbraco.Cms.Search` repository

- [Umbraco.Cms.Search on GitHub](https://github.com/umbraco/Umbraco.Cms.Search)

## Edge and CDN vendor sources

Backing [the edge-cache chapter](./05-edge-cache-in-front-of-the-cda.md). These are official vendor and Microsoft docs, not Umbraco sources — they describe the edge products a self-hosted site can put in front of the CDA, generalised from the Cloudflare setup Umbraco Cloud runs in production.

### E1. Cloudflare — Umbraco case study

- [Umbraco](https://www.cloudflare.com/case-studies/umbraco/)
- Describes Umbraco Cloud's production use of Cloudflare Workers (auth routing, image processing), Argo Smart Routing, SSL for SaaS, and DNS.

### E2. Cloudflare — Cache Rules settings

- [Cache Rules settings](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/)

### E3. Cloudflare — Default Cache Behavior

- [Default Cache Behavior](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/)

### E4. Cloudflare — Purge Cache

- [Purge Cache](https://developers.cloudflare.com/cache/how-to/purge-cache/)
- Single-file purge rate limits, Purge Everything's shared API rate-limit bucket, and Enterprise-only Cache Tags.

### E5. Umbraco Cloud — CDN Caching and Optimizations

- [CDN Caching and Optimizations](https://docs.umbraco.com/umbraco-cloud/optimize-and-maintain-your-site/optimize-performance/manage-cdn-caching)
- Documents Umbraco Cloud's own Cache Everything/cookie-stripping warning and plan-gated minimum TTLs.

### E6. Umbraco Cloud — Manage Hostnames

- [Manage Hostnames](https://docs.umbraco.com/umbraco-cloud/go-live/manage-hostnames)
- DNS (CNAME/anycast) and TLS (Cloudflare-issued, 90-day auto-renewed) setup for custom hostnames.

### E7. Azure API Management — Caching overview

- [Caching overview](https://learn.microsoft.com/azure/api-management/caching-overview)
- Per-region cache isolation in multi-region deployments, Consumption-tier limitation, and security guidance against caching sensitive data.

### E8. Azure API Management — `cache-lookup` / `cache-store` policies

- [Get from cache](https://learn.microsoft.com/azure/api-management/cache-lookup-policy)
- [Store to cache](https://learn.microsoft.com/azure/api-management/cache-store-policy)
- GET-only caching, `duration` attribute, policy-expression TTLs derived from origin `Cache-Control`, and the recommendation to pair with `rate-limit`.

### E9. Azure API Management — custom caching (`cache-lookup-value` / `cache-store-value` / `cache-remove-value`)

- [Custom caching in Azure API Management](https://learn.microsoft.com/azure/api-management/api-management-sample-cache-by-key)
- The key-based cache primitives needed to build publish-driven purge, since the whole-response `cache-store`/`cache-lookup` pair has no purge call of its own.

### E10. Azure Front Door — Caching with Azure Front Door (Standard/Premium)

- [Caching with Azure Front Door](https://learn.microsoft.com/azure/frontdoor/front-door-caching)
- Cache-expiration header precedence and the random 1-3 day default when no header is present; `private`/`no-cache`/`no-store` always honoured; `Authorization` requests not cached by default; query-string cache-key behaviour; request headers (including `Accept-Language` and `Vary`) stripped before reaching the origin when caching is enabled.

### E11. Azure Front Door — Purge cache

- [Purge cache in Azure Front Door](https://learn.microsoft.com/azure/frontdoor/cache-purge)
- Portal/CLI/PowerShell purge, case-insensitive and query-string-agnostic behaviour, and propagation time.

### E12. Azure Front Door vs Azure CDN comparison

- [Comparison between Azure Front Door and Azure Content Delivery Network](https://learn.microsoft.com/azure/frontdoor/front-door-cdn-comparison)
- Confirms Front Door Standard/Premium as the current SKU family, with Front Door (classic) as the legacy predecessor.

### E13. Umbraco Cloud CDN field reports

Community and issue-tracker observations of Umbraco Cloud's Cloudflare layer, used in [the edge-cache chapter](./05-edge-cache-in-front-of-the-cda.md) for behaviour not stated in the official caching doc. These are field notes, not primary implementation sources; captured on 2 July 2026.

- [Cloudflare caching on Umbraco Cloud does not seem to work for v7 and v8 (issue #657)](https://github.com/umbraco/Umbraco.Cloud.Issues/issues/657) — source for the `Uc-Cache-Status` response header and its `HIT`/`MISS`/`BYPASS`/`EXPIRED` values, and for the "content pages return `BYPASS` until full-response caching is enabled" symptom.
- [Cloudflare on Umbraco Cloud not supporting Vary by Accept headers (issue #656)](https://github.com/umbraco/Umbraco.Cloud.Issues/issues/656) — source for the limitation that the edge does not vary the cache by `Accept`-family headers by default.
- [Purge Cache in the Cloud Portal not working? (issue #919)](https://github.com/umbraco/Umbraco.Cloud.Issues/issues/919) — operational context on purge behaviour and limits.

### E14. Community CDN purge packages

Community packages **studied for technique, not endorsed**, cited in [the edge-cache chapter](./05-edge-cache-in-front-of-the-cda.md). They are field examples of the purge-on-publish pattern; evaluate any of them against your own security and maintenance requirements before depending on one. Source read on 2 July 2026.

- [Umbraco.Community.FrontDoorCache](https://github.com/Gibe/Umbraco.Community.FrontDoorCache) — purges Azure Front Door on content/media save. Observations from reading the source:
  - Authenticates with `ClientSecretCredential` (tenant ID, client ID, client secret from an Entra ID app registration) and drives the purge through the Azure Resource Manager SDK: `ArmClient` → `FrontDoorEndpointResource.CreateResourceIdentifier(subscriptionId, resourceGroup, frontDoorName, endpointName)` → `PurgeContentAsync(WaitUntil.Started, content)`.
  - `WaitUntil.Started` makes the purge fire-and-forget — it does not block on propagation.
  - URL resolution iterates each item's cultures, resolves the absolute URL via `IPublishedUrlProvider`, reduces it to the path with `UriBuilder`, skips the `#` no-URL sentinel, and skips drafts (`IsDraft()`).
  - Purge modes `All` (`/*`), `Self`, and `SelfAndAncestors` — the last walks `.Parent` up the content tree with a dedup guard (content only; media ignores ancestors).
  - Media purge resolves the media URL, drops the filename, and purges the containing folder with a `/*` wildcard to catch generated variants.
  - Ships an `IHealthCheck` that calls the Front Door API to verify connectivity.
  - **Gap worth noting:** it hooks `ContentSavedNotification` / `MediaSavedNotification` only — there is no unpublish or delete handler, so removed content is not purged from the edge, and API failures are caught and logged but not surfaced or retried.
- [CloudPurge](https://github.com/anth12/CloudPurge) — Umbraco backoffice extension to purge Cloudflare CDN cache on content-saving events, with a content-tree context-menu action for on-demand purge by page.
- [UmbracoFlare](https://our.umbraco.com/packages/backoffice-extensions/umbracoflare/) — purges Cloudflare cache from the Umbraco backoffice on publish, by URL (wildcards supported), for content and media.

The first-party server-side equivalent — evicting the CDA's *own* output cache rather than a downstream edge — is `IDeliveryApiOutputCacheManager` (`EvictContentAsync`, `EvictMediaAsync`, `EvictByTagAsync`, `EvictAllContentAsync`, `EvictAllMediaAsync`, `EvictAllAsync`), see [C15](#c15-content-delivery-api-output-cache-implementation).

## Umbraco blog posts

### B1. Umbraco 15 Release

- [Umbraco 15 release](https://umbraco.com/blog/umbraco-15-release/)

### B2. Umbraco 15 Release Candidate

- [Umbraco 15 release candidate](https://umbraco.com/blog/umbraco-15-release-candidate/)

### B3. Umbraco 17 Beta is out

- [Umbraco 17 beta](https://umbraco.com/blog/umbraco-17-beta-is-out/)

### B4. Umbraco 18 Release Candidate

- [Umbraco 18 release candidate](https://umbraco.com/blog/umbraco-18-release-candidate/)

### B5. Umbraco Product Update - August 2024

- [Umbraco product update — August 2024](https://umbraco.com/blog/umbraco-product-update-august-2024/)

### B6. Umbraco Product Update - Q1 2025

- [Umbraco product update — Q1 2025](https://umbraco.com/blog/product-update-q1-2025/)

### B7. Umbraco 12.3 release

- [Umbraco 12.3 release](https://umbraco.com/blog/umbraco-123-release/)

### B8. Umbraco Product Update - November 2023

- [Umbraco product update — November 2023](https://umbraco.com/blog/umbraco-product-update-november-2023/)

## Supporting talks, PDFs, and explainer articles

### T1. Releasing HybridCache into the Wild with Umbraco

- [Hybrid Cache förändrar allt — Umbraco Kalaset session (YouTube)](https://www.youtube.com/watch?v=JyXlvDoreS8)

### T2. Hybrid Cache förändrar allt PDF

- [Hybrid Cache förändrar allt — Umbraco Kalaset slides (PDF)](https://www.umbracokalaset.se/media/ccvhwzvs/hybrid-cache-forandrar-allt.pdf)

### T3. Microsoft-side HybridCache explainer by Milan Jovanovic

- [HybridCache in ASP.NET Core — Milan Jovanović](https://www.milanjovanovic.tech/blog/hybrid-cache-in-aspnetcore-new-caching-library)

### T4. Enkelmedia article

- [Hybrid Cache Changes Everything — Codegarden talk (Enkelmedia blog)](https://www.enkelmedia.se/blogg/2026/6/7/codegarden-talk-hybrid-cache-changes-everything)

### T5. Enkelmedia PDF

- [Hybrid Cache Changes Everything — Codegarden slides (PDF)](https://www.enkelmedia.se/media/joudvcbm/hybrid-cache-changes-everything.pdf)

## Community reports and issue threads

### F1. Website significantly slower since upgrading from v13 to v16

- [Website significantly slower since upgrading from v13 to v16 (Umbraco forum)](https://forum.umbraco.com/t/website-significantly-slower-since-upgrading-from-v13-to-v16/6049)
- Specific reply referenced in chapter 11:
  - [Website significantly slower — comment #11](https://forum.umbraco.com/t/website-significantly-slower-since-upgrading-from-v13-to-v16/6049/11)

### F2. Failed to acquire write lock for id: -333

- [Failed to acquire write lock for id: -333](https://github.com/umbraco/Umbraco-CMS/issues/14714)

### F3. `umbraco/oauth_complete?code=...` stuck after `umbraco/logout`

- [`umbraco/oauth_complete?code=...` stuck after `umbraco/logout`](https://github.com/umbraco/Umbraco-CMS/issues/18334)

### F4. Open cache issue survey (v17/v18)

Survey backing [chapter 15](./15-lessons-from-the-issue-tracker.md). All issues were read in full, including comments, on 30 June 2026. State is captured as of that date.

URL and routing cache (`DocumentUrlService`):

- [Published documents losing their links](https://github.com/umbraco/Umbraco-CMS/issues/23234)
- [`umbracoUrlAlias` saved values breaking published routing](https://github.com/umbraco/Umbraco-CMS/issues/23206)
- [Cannot change a content item's `Key` because of the `umbracoDocumentUrl` foreign key](https://github.com/umbraco/Umbraco-CMS/issues/21131)
- [`DocumentUrlService` `SqlBulkCopy` runs while a DataReader is open](https://github.com/umbraco/Umbraco-CMS/issues/22782)
- [Preview does not refresh for a custom `UrlProvider`](https://github.com/umbraco/Umbraco-CMS/issues/21820)

Cold start, upgrade, and migration:

- [Pages 404 after upgrade migrations](https://github.com/umbraco/Umbraco-CMS/issues/22581)
- [Content blank after 13.13 to 17.2.2 upgrade](https://github.com/umbraco/Umbraco-CMS/issues/22322)
- [Cold boot rebuilds Examine on every Azure Linux restart](https://github.com/umbraco/Umbraco-CMS/issues/22947)
- [Always loading content from the database on Azure Linux App Service](https://github.com/umbraco/Umbraco-CMS/issues/13909)
- [Content not displayed after 17.1 to 17.2 upgrade (closed)](https://github.com/umbraco/Umbraco-CMS/issues/21863)

Distributed invalidation and load balancing:

- [Publisher stops writing cache instructions after failing to acquire MainDom](https://github.com/umbraco/Umbraco-CMS/issues/23219)
- [Transient Delivery API 404s during Save and Publish in a split v17 setup](https://github.com/umbraco/Umbraco-CMS/issues/22328)
- [Unpublished content can be reached / publish notifications race the cache](https://github.com/umbraco/Umbraco-CMS/issues/17393)
- [Index rebuild does not propagate to front-end servers](https://github.com/umbraco/Umbraco-CMS/issues/8060)

HybridCache internals — locking, traversal, and config:

- [v15+ sitemap approach warms the whole HybridCache](https://github.com/umbraco/Umbraco-CMS/issues/20552)
- [`Failed to acquire read lock for id: -332` from HybridCache](https://github.com/umbraco/Umbraco-CMS/issues/21164)
- [Rapid content-type updates deadlock the site](https://github.com/umbraco/Umbraco-CMS/issues/17550)
- [Option to disable the members database cache](https://github.com/umbraco/Umbraco-CMS/issues/23070)

Historical NuCache `.db` pain:

- [Process cannot access `NuCache.Content.db` during upgrade](https://github.com/umbraco/Umbraco-CMS/issues/15634)
- [NuCache `.db` (de)serialisation allocates large amounts of memory at start-up](https://github.com/umbraco/Umbraco-CMS/issues/15809)

### F5. Cache-related fixes and pull requests

Merge states verified against the GitHub API on 30 June 2026.

- [Prevent changing the `Key` property on existing entities (merged into v18)](https://github.com/umbraco/Umbraco-CMS/pull/21374)
- [Document URL Cache: ensure URLs are rebuilt after upgrade and prevent duplicate initialisation (merged into v17.2)](https://github.com/umbraco/Umbraco-CMS/pull/21379)
- [Database Cache: fix full database cache rebuild dropping variant and composed property values (merged into v17.2.1)](https://github.com/umbraco/Umbraco-CMS/pull/21890)
- [Published Content Cache: defensive hardening against race conditions (merged)](https://github.com/umbraco/Umbraco-CMS/pull/22393)
- [Add a scope-level cache version tier to reduce database hits in bulk operations (merged into v17)](https://github.com/umbraco/Umbraco-CMS/pull/22563)
- [Reduce NuCache memory allocations with `StringPool`/`ArrayPool` (closed without merging)](https://github.com/umbraco/Umbraco-CMS/pull/15808)

### F6. Closed cache issue survey (v17/v18)

Closed cache-issue sample used in [chapter 15](./15-lessons-from-the-issue-tracker.md), captured from GitHub issue search on 1 July 2026.

Query:

- [Umbraco CMS closed issues matching `cache`](https://github.com/umbraco/Umbraco-CMS/issues?q=is%3Aissue%20is%3Aclosed%20cache)

Representative closed issues referenced in chapter 15:

- [#22587 - Published Content routinely falls out of Memory Cache on startup](https://github.com/umbraco/Umbraco-CMS/issues/22587)
- [#23001 - Thousands of queries on start](https://github.com/umbraco/Umbraco-CMS/issues/23001)
- [#22883 - Content Delivery API returns inconsistent results on startup](https://github.com/umbraco/Umbraco-CMS/issues/22883)
- [#21337 - After upgrade from v13 to v17, document URL cache is not populated correctly](https://github.com/umbraco/Umbraco-CMS/issues/21337)
- [#21882 - Rebuilding Database Cache from scratch leads to empty property values](https://github.com/umbraco/Umbraco-CMS/issues/21882)
- [#23106 - Subscriber cache sync stops permanently if `Sync()` hangs](https://github.com/umbraco/Umbraco-CMS/issues/23106)
- [#23214 - Document URLs not persisted during distributed-cache-only notification dispatch](https://github.com/umbraco/Umbraco-CMS/issues/23214)
- [#22570 - ReadOnly database issues for subscribers due to `ContentCacheRefresher` exceptions](https://github.com/umbraco/Umbraco-CMS/issues/22570)
- [#22646 - Severe performance regression in tree traversal in v17](https://github.com/umbraco/Umbraco-CMS/issues/22646)
- [#22250 - `ContentTypeRepository` deep clone cost on cache read](https://github.com/umbraco/Umbraco-CMS/issues/22250)
- [#22933 - NuCache rebuild errors are not logged](https://github.com/umbraco/Umbraco-CMS/issues/22933)

### F7. Distributed cache field reports (v17)

Community reports used as field notes in [chapter 9](./09-cache-busting-and-invalidation.md). These are not primary implementation sources; they are operational examples of how stale distributed-cache instructions surface in real projects.

- [U17 - Distributed cache is not updated](https://forum.umbraco.com/t/u17-distributed-cache-is-not-updated/7212/7)
- [Distributed cache is not updated (U17)](https://forum.umbraco.com/t/distributed-cache-is-not-updated-u17/7358)

Useful details captured on 1 July 2026:

- both reports involved Umbraco 17.1.0 and repeated `DISTRIBUTED CACHE IS NOT UPDATED` log entries
- the stronger report traced the problem to staging and local environments sharing a database, with old rows left in `umbracoCacheInstruction`
- clearing the offending instruction row, or clearing the table as a recovery action, stopped the repeated errors in the reported cases

### F8. UMB.FYI cache and search archive trail

Archive sweep performed on 1 July 2026. UMB.FYI is a community newsletter, not an implementation source. It is useful here as a discovery trail for community articles, videos, package announcements, and public announcements that fit this book's cache/index theme.

Main archive:

- [UMB.FYI archive](https://umb.fyi/archive)

Most relevant cache and index entries:

- [2026-07-01 - Umbraco Search replaces existing search in Umbraco 19](https://umb.fyi/2026-07-01)
  - Points to [Umbraco announcement issue 36](https://github.com/umbraco/Announcements/issues/36)
  - Useful for future-facing wording: Umbraco Search is planned to replace existing Examine search handling and core indexes in Umbraco 19, while existing Examine implementations can still coexist during the transition.
- [2026-06-10 - CodeGarden-talk: Hybrid Cache changes everything](https://umb.fyi/2026-06-10)
  - Points to [Hybrid Cache Changes Everything - Enkelmedia blog](https://www.enkelmedia.se/blogg/2026/6/7/codegarden-talk-hybrid-cache-changes-everything)
  - Useful for the book's central warning that HybridCache improves memory/start-up characteristics but makes broad traversal and content-loading habits more visible.
- [2026-05-27 - Umbraco Search Explained](https://umb.fyi/2026-05-27)
  - Points to [Umbraco Search Explained - Umbraco India Meetup](https://www.youtube.com/watch?v=wwQBvBDGhPE)
  - Useful as a video explainer for provider-agnostic search, including Algolia, Elasticsearch, and Examine-shaped integrations.
- [2025-09-17 - Tailored indexing for Umbraco Search](https://umb.fyi/2025-09-17)
  - Points to [Tailored indexing for Umbraco Search](https://kjac.dev/posts/tailored-indexing-for-umbraco-search/)
  - Useful for property value handlers, content indexers, and notifications as indexing control points.
- [2025-09-10 - Umbraco's New Search in Alpha](https://umb.fyi/2025-09-10)
  - Points to [Umbraco's New Search in Alpha](https://www.youtube.com/watch?v=7NCwIvgbdHM)
  - Useful for explaining the search abstraction and reduced dependency on direct Examine usage.
- [2025-09-03 - Trying out the new Umbraco Search](https://umb.fyi/2025-09-03)
  - Points to [Trying out the new Umbraco Search](https://kjac.dev/posts/trying-out-the-new-umbraco-search/)
  - Useful for the beginner distinction between search features such as full-text search, sorting, faceting, and provider-backed querying.
- [2025-01-15 - RFC 0027, The Future of Search](https://umb.fyi/2025-01-15)
  - Points to [RFC 0027 - The Future of Search](https://github.com/umbraco/rfcs/discussions/43)
  - Useful for historical transition framing: a proposed search and indexing abstraction intended to replace the current Examine-based implementation.
- [2024-11-27 - So you want to cache all the things?](https://umb.fyi/2024-11-27)
  - Points to [So you want to cache all the things?](https://kjac.dev/posts/so-you-want-to-cache-all-the-things/)
  - Useful for v15+ cache warm-up framing: on-demand loading, deliberate seeding, and avoiding "cache everything" instincts.
- [2024-08-28 - Facetted search and string sorting with Examine](https://umb.fyi/2024-08-28)
  - Points to [Facetted search with Examine - Umbraco 13](https://dev.to/jemayn/facetted-search-with-examine-umbraco-13-k7i) and [How to sort on a string field in Umbraco Examine](https://www.debasish.tech/blogs/how-to-sort-on-a-string-field-in-umbraco-examine)
  - Useful as practical examples of shaping an index for filtering, faceting, sorting, and query ergonomics.
- [2024-08-07 - An Examine fix for Umbraco index corruption](https://umb.fyi/2024-08-07)
  - Points to [An Examine fix for Umbraco index corruption](https://shazwazza.com/post/an-examine-fix-for-umbraco-index-corruption/)
  - Useful for the operational side of indexes: corruption, health checks, main/local index synchronisation, Azure-style environments, and rebuild overhead.

### F9. 24days caching field notes

24days articles are community field notes, not primary implementation sources. They are useful for historical examples, practical edge-cache language, and older Umbraco patterns around asset busting, CDN delivery, partial/macro caching, routing caches, and static output.

Tag index checked on 1 July 2026:

- [24days caching tag page](https://24days.in/umbraco-cms/tags/caching)

Most relevant articles:

- [Bust a cache](https://archive.24days.in/umbraco-cms/2013/cache-busting/) - static asset cache busting with file last-write-time query strings and long browser cache lifetimes.
- [Using a CDN with Umbraco](https://archive.24days.in/umbraco-cms/2015/using-a-cdn-with-umbraco/) - CDN origins, `Cache-Control`, conditional requests, query-string versioning, media crops, and dynamic-content freshness notes.
- [Get More Out of Umbraco Using Server-Side Caching Strategies](https://archive.24days.in/umbraco-cms/2013/get-more-out-of-umbraco-using-server-side-caching-strategies/) - historical partial/model caching, custom clearing on publish, and load-balanced invalidation cautions.
- [Static website with Umbraco Heartcore](https://archive.24days.in/umbraco-cms/2020/static-website-with-umbraco-heartcore/) - first-request static HTML generation, subsequent static-file serving, and webhook-driven deletion after content changes.
- [Self-host your static assets with a TagHelper](https://24days.in/umbraco-cms/2022/static-assets-taghelper/) - self-hosting third-party assets, local file reuse, explicit versions, and delete-to-refresh behaviour.
- [Optimising Umbraco for speed](https://archive.24days.in/umbraco-cms/2012/optimise-for-speed/) - historical macro caching and image-compression advice.
- [Modify Umbraco URLs with the UrlProvider and ContentFinder](https://archive.24days.in/umbraco-cms/2014/urlprovider-and-contentfinder/) - custom URL lookup caching and explicit cache clearing on publish.
- [Performance Boosts for Umbraco](https://archive.24days.in/umbraco-cms/2017/the-one-with-performance/performance-boosts-for-umbraco/) - historical `CachedPartial`, Web API output-cache, and package-level cache advice.

Useful but broader sustainability/front-end context:

- [Eco-Friendly Web Development: Harnessing SSG and Prerendering for a Sustainable Tomorrow](https://24days.in/umbraco-cms/2023/eco-friendly-web-development/) - static-site generation, prerendering, CDN distribution, and sustainability framing.
- [Green Code: A Blueprint for Eco-Friendly Websites](https://24days.in/umbraco-cms/2023/green-code/) - sustainability, lazy loading, CDNs, MiniProfiler, and performance measurement.
- [10 tips to make your Umbraco site more sustainable](https://24days.in/umbraco-cms/2025/sustainability-tips/) - CDN caching, Cloudflare-style full-page edge caching, image optimisation, static front ends, and scale-to-zero infrastructure.
- [Turbo charging websites with PJAX](https://archive.24days.in/umbraco-cms/2015/turbo-charging-websites-with-pjax/) - partial-page loading as a bandwidth/perceived-performance pattern rather than a server cache implementation.

### F10. Kenn Jacobsen Umbraco repository field notes

Kenn Jacobsen's public repositories were checked on 1 July 2026 from [kjac on GitHub](https://github.com/kjac?tab=repositories). These are community/package/example sources rather than primary Umbraco CMS implementation sources. They are useful because Kenn works in the Umbraco ecosystem and several repositories show practical Delivery API, search, headless, indexing, preview, and static-front-end patterns.

Repository profile details observed:

- profile lists Kenn Jacobsen as an Umbraco CMS Developer associated with `@umbraco`
- public repository count observed: 58
- recent original repositories cluster around Umbraco Search, Delivery API, headless preview, static/headless examples, and search-provider experiments

Most relevant repositories:

- [NoCode.DeliveryApi](https://github.com/kjac/NoCode.DeliveryApi) - no-code/configuration package for Delivery API filters, sorters, CORS policies, and preview/published links. README note: after filter or sorter changes, newly created content sees the change immediately, but existing content must be republished or `DeliveryApiContentIndex` rebuilt from Examine Management.
- [Kjac.SearchProvider.Typesense](https://github.com/kjac/Kjac.SearchProvider.Typesense) - alternative Umbraco Search provider for Typesense. README note: custom content indexes should use provider registration helpers, especially in load-balanced setups.
- [Kjac.SearchProvider.Elasticsearch](https://github.com/kjac/Kjac.SearchProvider.Elasticsearch) - alternative Umbraco Search provider for Elasticsearch. README note: custom content indexes should use provider registration helpers, especially in load-balanced setups.
- [Kjac.SearchProvider.Algolia](https://github.com/kjac/Kjac.SearchProvider.Algolia) - alternative Umbraco Search provider for Algolia.
- [Kjac.SearchProvider.PostgreSql](https://github.com/kjac/Kjac.SearchProvider.PostgreSql) - alternative Umbraco Search provider for PostgreSQL. README note: functional provider, but not expected to match document/search engines such as Elasticsearch and Typesense on larger content sets; benchmark your solution.
- [UmbracoSearchDemo](https://github.com/kjac/UmbracoSearchDemo) - demo site for trying out Umbraco Search.
- [UmbracoSearchInMemory](https://github.com/kjac/UmbracoSearchInMemory) - example of running Umbraco Search in memory.
- [Kjac.HeadlessPreview](https://github.com/kjac/Kjac.HeadlessPreview) - backoffice preview package for Umbraco and Delivery API consumers.
- [UmbracoAzureCloudflare](https://github.com/kjac/UmbracoAzureCloudflare) - demo of hosting an Umbraco Delivery API in Azure and consuming it in Cloudflare Pages; links to posts about Jamstack/static-site use and editor preview for static websites.
- [UmbracoMiniSearch](https://github.com/kjac/UmbracoMiniSearch) - Node.js/MiniSearch service using Umbraco webhooks to provide search-index content.
- [UmbracoDeliveryApiRazor](https://github.com/kjac/UmbracoDeliveryApiRazor) - Delivery API rendered with Razor templates. README note: the Delivery API index must be rebuilt from Examine Management for the demo to work.

Relevant linked articles from the repository sweep:

- [So you want to cache all the things?](https://kjac.dev/posts/so-you-want-to-cache-all-the-things/) - explains Umbraco 15's shift from loading everything at boot to seeding selected content and loading the rest on demand; includes a background document-cache warm-up example and warns that broad warm-up can be memory and CPU intensive.
- [Trying out the new Umbraco Search](https://kjac.dev/posts/trying-out-the-new-umbraco-search/) - introduces the new Umbraco Search alpha, including full-text search, filtering, faceting, sorting, languages, segments, protected documents, extension points, and multiple simultaneous search providers.
- [Tailored indexing for Umbraco Search](https://kjac.dev/posts/tailored-indexing-for-umbraco-search/) - explains property value handlers, custom content indexers, and `IndexingNotification` as extension points for shaping index data.
- [In-memory Umbraco Search](https://kjac.dev/posts/in-memory-umbraco-search/) - shows how to configure Umbraco Search/Examine to use in-memory indexes and warns about memory footprint, startup time, database pressure, and load-balanced multiplication of rebuild cost.
- [Building a search service from scratch](https://kjac.dev/posts/building-a-search-service-from-scratch/) - builds a Node.js/MiniSearch service fed by Umbraco webhooks; publish events add or replace index documents, unpublish/delete events discard them, and the index is persisted to disk.
- [Jamstack for free with Azure and Cloudflare](https://kjac.dev/posts/jamstack-for-free-with-azure-and-cloudflare/) - uses Umbraco Delivery API as a headless source for an Astro/Cloudflare Pages site; Cloudflare deploy hooks are triggered by Umbraco content-published webhooks.
- [Content editor preview for static websites](https://kjac.dev/posts/content-editor-preview-for-static-websites/) - separates static production generation from a server-rendered preview environment that fetches Delivery API preview content with an API key and `Preview` header.

Repository search details captured during the sweep:

- GitHub code search for `"load balanced" user:kjac` returned relevant README hits in `Kjac.SearchProvider.Typesense` and `Kjac.SearchProvider.Elasticsearch`, plus an older `FormEditor` storage note about Lucene index storage in load-balanced/cloud environments.
- GitHub code search for `"DeliveryApiContentIndex" user:kjac` returned README hits in `NoCode.DeliveryApi` and `UmbracoDeliveryApiRazor`, plus provider code references in the Typesense and Elasticsearch repositories.
- Non-fork repository star ordering at the time of the sweep placed `FormEditor`, `NoCode.DeliveryApi`, `Kjac.HeadlessPreview`, `UmbracoSearchDemo`, `UmbracoAzureCloudflare`, and Delivery API/headless examples among the more visible original repositories.

Broader repository inventory observed in the sweep:

- Search, indexing, and provider work: `Examine` fork, `Kjac.SearchProvider.Typesense`, `Kjac.SearchProvider.PostgreSql`, `Kjac.SearchProvider.Algolia`, `Kjac.SearchProvider.Elasticsearch`, `UmbracoSearchInMemory`, `Kjac.SearchExtension.MediaToText`, `UmbracoSearchMediaAzureAiVision`, `UmbracoSearchDemo`, `UmbracoMiniSearch`, `UmbracoLunr`.
- Delivery API, headless, preview, and static/front-end examples: `NoCode.DeliveryApi`, `Kjac.HeadlessPreview`, `UmbracoHeadlessPreview`, `UmbracoDeliveryApiSecureTokens`, `NextJsUmbracoExampleExtended`, `NoCode.HeadlessMode`, `UmbracoSpa`, `NextJsUmbracoExample`, `UmbracoDeliveryApiRazor`, `UmbracoDeliveryApiExtensions`, `UmbracoDeliveryApiCustomData`, `UmbracoAzureCloudflare`, `AstroUmbracoBlog`, `UmbracoDeliveryApiAuthDemo`, `DeliveryApiDataApplication`.
- Backoffice, content, property-editor, and package examples: `PersonalisationGroupsAsSegments`, `UmbracoCustomPropertyValueFallback`, `UmbracoMemberGroupSegments`, `UmbracoCustomAuth`, `UmbracoManagementApiCleanStarterKit`, `UmbracoManagementApiClientCredentials`, `UmbracoBlockGridCG23`, `UmbracoBlockGridDemo`, `Our.Umbraco.ReusableContentPicker`, `Our.Umbraco.HelpfulEditors`, `tech-talk-vuhf-demo`, `FormEditor`, `Umbracian-Frontend-Editing`.
- Forks, docs, and older/general repositories observed: `UmbracoDocs`, `Umbraco.Community.Site.Resources`, `next.js`, `schemastore`, `Dazinator.Extensions.FileProviders`, `Umbraco-CMS`, `CanConUmbrackathon`, `codegarden-2020-group-image`, `Docs`, `scriban`, `Archetype`, `awesome-umbraco`, `umbraco-nested-content`, `Umbraco-Core-Property-Value-Converters`, `testing-stuff`, `Stupid-Table-Plugin`.

Useful interpretation for the book:

- these repositories are field examples of derived surfaces, not evidence for Umbraco's internal cache implementation
- the common theme is that search indexes, Delivery API indexes, headless previews, static front ends, and CDN/edge consumers need explicit refresh, rebuild, preview, webhook, or purge paths
- the examples support the book's distinction between published-content cache, output cache, search/index projections, and browser/CDN/static edges

### F11. Matt Brailsford — Introducing Umbraco AI Search

- [Introducing Umbraco AI Search](https://mattbrailsford.dev/introducing-umbraco-ai-search) — Matt Brailsford, April 2026.

`Umbraco.AI.Search` is a beta add-on that replaces keyword-based Examine/Lucene search with semantic vector search. The indexer implements `IIndexer` and `ISearcher` from the `Umbraco.Cms.Search` framework, making it a provider-agnostic implementation in the same architectural position as Kenn Jacobsen's Typesense, Elasticsearch, Algolia, and PostgreSQL providers.

Key technical details relevant to Chapter 14:

- at publish time, content is extracted, chunked, and converted to high-dimensional vectors via an embedding model
- at query time the same model embeds the search phrase; cosine similarity then finds the nearest content vectors
- the default storage backend is database-backed via EF Core; SQL Server 2025 uses native `VECTOR_DISTANCE()` functions, older versions fall back to .NET cosine similarity
- the storage interface is designed to be swapped for external services (Qdrant, Pinecone, Azure AI Search)
- culture-aware indexing, access-protection enforcement at query time, and AI agent integration are included

Cited in Chapter 14 as a field example of the same "provider-agnostic index" architecture applied to a semantic/vector discovery model rather than keyword frequency — a different kind of index, not a different type of tool.

### F12. Shannon Deminick — Examine field notes

Shannon Deminick (Shazwazza) is the creator and maintainer of Examine, an Umbraco MVP, and a long-standing Umbraco HQ contributor. His blog is a primary source on Examine internals and operations. Posts checked from [shazwazza.com](https://shazwazza.com/) on 1 July 2026. These are index/search operational sources; they are cache-adjacent in the sense used throughout Chapter 14.

- [An Examine fix for Umbraco index corruption](https://shazwazza.com/post/an-examine-fix-for-umbraco-index-corruption/) — 31 July 2024. Documents the Examine 3.3.0 fix for `Lucene.Net.Index.CorruptIndexException` on sites using the default `SyncedFileSystemDirectoryFactory`. Root cause: the factory syncs an index between Azure's fast local drive (`C:\%temp%`) and slower shared network storage, with no safeguard against corruption in the main copy (misconfiguration, network latency, or a killed process). The fix adds health checks — restore main from local if only main is corrupt; delete and rebuild if both are unhealthy; always sync main to local afterwards. An optional repair mode ships disabled by default because it can lose documents. This is the primary source behind the corruption trail also noted via UMB.FYI in [F8](#f8-umbfyi-cache-and-search-archive-trail).
- [Can I disable Examine indexes on Umbraco front-end servers?](https://shazwazza.com/post/can-i-disable-examine-indexes-on-umbraco-front-end-servers/) — 2023. In load-balanced Azure App Service setups, each worker rebuilds Lucene indexes on startup, taking database content locks that can cause SQL timeouts when many workers start at once. Recommends hosted search (ExamineX) if the front-end uses Examine APIs, or disabling indexing otherwise: an in-memory `RAMDirectory` index factory, `EnableDefaultEventHandler = false`, and no-op index populators. Warns that `RAMDirectory` memory scales with index size, so it suits front-end/replica servers, not large content servers.
- [Searching with `IPublishedContentQuery` in Umbraco](https://shazwazza.com/post/searching-with-ipublishedcontentquery-in-umbraco/) — explains `IPublishedContentQuery`, the front-end query component that replaced search methods removed from `UmbracoHelper` in v8. It wraps Examine and returns strongly-typed `PublishedSearchResult` items (an `IPublishedContent` plus a relevance `Score`) rather than raw `ISearchResults`. Notes the `skip`/`take` paging overloads (to avoid iterating over very large result sets) and that culture defaults to the ambient culture with invariant fields included.
- [Configuring a Suggester with ExamineX and Azure AI Search](https://shazwazza.com/post/configuring-a-suggester-with-examinex-and-azure-ai-search/) — 1 May 2024. ExamineX is Shannon's commercial provider that swaps Examine's local Lucene storage for Azure AI Search behind the standard Examine interfaces, so existing `IPublishedContentQuery`/searcher code keeps working. The post demonstrates the Azure AI Search typeahead *suggester* API (configured via the `CreatingOrUpdatingIndex` event; requires fields on the Standard Analyzer).

Cited in Chapter 14 for the operational index gotchas (corruption/repair and front-end rebuild costs), for how Umbraco surfaces Examine via `IPublishedContentQuery`, and as another provider-agnostic hosted-index example alongside [F10](#f10-kenn-jacobsen-umbraco-repository-field-notes) and [F11](#f11-matt-brailsford-introducing-umbraco-ai-search).

### F13. Delivery API empty-response and index-reset field reports

Backing the "empty API responses right after startup" troubleshooting note in [chapter 11](./11-cache-settings-talks-and-field-notes.md). These GitHub issues and forum threads were located through web search and read from their public pages on 1 July 2026; unlike [F4](#f4-open-cache-issue-survey-v17v18) and [F6](#f6-closed-cache-issue-survey-v17v18), they were not exhaustively re-read comment by comment, so treat the one-line summaries as pointers rather than verified reproductions. They matter because they show a repeated theme: the `DeliveryApiContentIndex` can look healthy in Examine Management and still serve an empty response, so "rebuild the index" is both the first-time setup step and a recurring operational remedy.

Where a cause or fix is recorded on the thread it is noted below; two of these are diagnosed, one is fixed, and two remain undiagnosed.

- [#22883 - Content Delivery API returns inconsistent/empty results on startup](https://github.com/umbraco/Umbraco-CMS/issues/22883) - **cause (diagnosed):** the `RebuildOnStartupHandler` runs on `UmbracoRequestBeginNotification` and does not `await` the rebuild, so Delivery API requests can be served before the index has finished building — a cold-boot race. **Proposed solution:** make the handler async on `UmbracoApplicationStartingNotification` and block startup on `RebuildIndexesAsync()`. Open at the time of writing, sprint candidate for v17.6.0 (AB#68826); also listed in [F6](#f6-closed-cache-issue-survey-v17v18). This is the sharpest "empty right after startup" cause in the set.
- [#8060 - Index rebuild does not propagate to front-end servers](https://github.com/umbraco/Umbraco-CMS/issues/8060) - **cause (diagnosed by reporter):** a rebuild triggered from Examine Management is a *local* operation and is not broadcast to other servers, unlike a publish, so front-end/replica nodes keep the old or empty index. A normal publish *does* update the front-end index; only the manual bulk rebuild fails to travel. **Solution/workaround:** rebuild (or delete to force regeneration) on each server, with per-server temp storage. Open/stale; also listed under distributed invalidation in [F4](#f4-open-cache-issue-survey-v17v18).
- [#20370 - Publishing items in bulk programmatically does not properly update the Delivery API content index](https://github.com/umbraco/Umbraco-CMS/issues/20370) - **cause:** `IContentService.PublishBranch()` did not raise the indexing notifications that single-item publish raises, so bulk-published items stayed "unpublished" in the index while core content showed them as published. **Fixed** by [PR #20462](https://github.com/umbraco/Umbraco-CMS/pull/20462) (release/16.4.0 and release/17.0.0); before the fix, rebuild the index or re-save the items. A concrete example of a derived surface with its own update path, as discussed in [chapters 6](./09-cache-busting-and-invalidation.md) and [13](./14-examine-indexes-and-cache-adjacent-querying.md).
- [#21716 - Content Delivery API intermittently returns 0 items while the index is populated (17.1.0, Azure Web Apps, multi-instance)](https://github.com/umbraco/Umbraco-CMS/issues/21716) - no exceptions logged, `umbracoLastSynced` correct, index healthy in the backoffice; rebuilding the index on the Content Management instance restores results within minutes. **Cause undetermined** (assigned, triage-tagged 17.3.0, AB#65102); the reporter suspects multi-instance Examine/Lucene synchronisation. Complements [#22883](https://github.com/umbraco/Umbraco-CMS/issues/22883) and [#8060](https://github.com/umbraco/Umbraco-CMS/issues/8060).
- [#17209 - `DeliveryApiContentIndex` gets reset](https://github.com/umbraco/Umbraco-CMS/issues/17209) - the index intermittently drops to a document count of 0 (reported on v13, "a few times a month"), correlated with content editors updating items. **Cause undetermined; no linked fix.** Manual rebuild restores it.
- [#14354 - Delivery API content endpoint always returns empty response](https://github.com/umbraco/Umbraco-CMS/issues/14354) - the classic first-run case: the API is enabled but the index has not been rebuilt, so the multiple-items endpoint returns nothing. **Solution:** rebuild `DeliveryApiContentIndex` once.
- [Forum: "the delivery api is not enabled, no indexing will be performed for the delivery api content index"](https://our.umbraco.com/forum/using-umbraco-and-getting-started/113733-the-delivery-api-is-not-enabled-no-indexing-will-performed-for-the-delivery-api-content-index) - the log warning that appears when `Umbraco:CMS:DeliveryApi:Enabled` is not set; the index is not maintained until the API is enabled.
- [Forum: DeliveryApiContentIndex "Rebuild" greyed out](https://our.umbraco.com/forum/using-umbraco-and-getting-started/112262-content-delivery-api-deliveryapicontentindex-rebuild-greyed-out) - the rebuild button is disabled when the Delivery API is not enabled in configuration; enabling it (`Enabled: true`, optionally `PublicAccess: true`) re-enables the button.

The database-cache side of the same troubleshooting note is already covered elsewhere in this appendix: [#21882](https://github.com/umbraco/Umbraco-CMS/issues/21882) (rebuilding the database cache from an empty `cmsContentNu` produced empty property values) in [F6](#f6-closed-cache-issue-survey-v17v18), fixed by [PR #21890](https://github.com/umbraco/Umbraco-CMS/pull/21890) (merged into v17.2.1) in [F5](#f5-cache-related-fixes-and-pull-requests). A reader on v17.2.1 or later — including the v17.5 baseline of this book — should not hit that specific regression.
