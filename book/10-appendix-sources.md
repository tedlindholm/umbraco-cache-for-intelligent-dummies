# 10. Appendix: Sources

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

- [Umbraco Storage Providers](https://docs.umbraco.com/umbraco-dxp/packages/storage-providers)

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

- [Umbraco Search installation](https://docs.umbraco.com/umbraco-search/installation/installation)

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

- `umbraco-v17` cloned from `release/17.5.1`

### C2. Umbraco 18 source checkout

- `umbraco-v18` cloned from `release/18.0.2`

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

Survey backing [chapter 14](./13-lessons-from-the-issue-tracker.md). All issues were read in full, including comments, on 30 June 2026. State is captured as of that date.

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
- [Published Content Cache: defensive hardening against race conditions (merged)](https://github.com/umbraco/Umbraco-CMS/pull/22393)
- [Add a scope-level cache version tier to reduce database hits in bulk operations (merged into v17)](https://github.com/umbraco/Umbraco-CMS/pull/22563)
- [Reduce NuCache memory allocations with `StringPool`/`ArrayPool` (closed without merging)](https://github.com/umbraco/Umbraco-CMS/pull/15808)
