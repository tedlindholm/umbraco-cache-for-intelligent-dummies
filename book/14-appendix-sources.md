# 14. Appendix: Sources

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

## Storage Providers source

### S1. `Umbraco.StorageProviders` repository

- [Umbraco.StorageProviders on GitHub](https://github.com/umbraco/Umbraco.StorageProviders)

### S2. `Umbraco.Cms.Search` repository

- [Umbraco.Cms.Search on GitHub](https://github.com/umbraco/Umbraco.Cms.Search)

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
- Specific reply referenced in chapter 6:
  - [Website significantly slower — comment #11](https://forum.umbraco.com/t/website-significantly-slower-since-upgrading-from-v13-to-v16/6049/11)

### F2. Failed to acquire write lock for id: -333

- [Failed to acquire write lock for id: -333](https://github.com/umbraco/Umbraco-CMS/issues/14714)

### F3. `umbraco/oauth_complete?code=...` stuck after `umbraco/logout`

- [`umbraco/oauth_complete?code=...` stuck after `umbraco/logout`](https://github.com/umbraco/Umbraco-CMS/issues/18334)

### F4. Open cache issue survey (v17/v18)

Survey backing [chapter 12](./12-lessons-from-the-issue-tracker.md). All issues were read in full, including comments, on 30 June 2026. State is captured as of that date.

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

Closed cache-issue sample used in [chapter 12](./12-lessons-from-the-issue-tracker.md), captured from GitHub issue search on 1 July 2026.

Query:

- [Umbraco CMS closed issues matching `cache`](https://github.com/umbraco/Umbraco-CMS/issues?q=is%3Aissue%20is%3Aclosed%20cache)

Representative closed issues referenced in chapter 12:

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

Community reports used as field notes in [chapter 4](./04-cache-busting-and-invalidation.md). These are not primary implementation sources; they are operational examples of how stale distributed-cache instructions surface in real projects.

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
