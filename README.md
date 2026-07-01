# Umbraco Cache for Intelligent Dummies

This repository is a working book project about caching in Umbraco.

It is written for intelligent beginners and keeps one idea front and centre:

cache busting and invalidation matter at least as much as cache creation.

## Scope

- Primary focus: Umbraco 17.5.1 code and Umbraco 17.latest documentation.
- Secondary focus: useful and relevant changes observed in Umbraco 18.0.2 and `main`.
- Canonical source register: [10 - Appendix: Sources](./book/10-appendix-sources.md).

## Chapters

- [01 - The Big Picture](./book/01-the-big-picture.md)
- [02 - Website Output Caching](./book/02-website-output-caching.md)
- [03 - Published Content Cache, AppCaches, and Load Balancing](./book/03-published-cache-and-load-balancing.md)
- [04 - Cache Busting and Invalidation](./book/04-cache-busting-and-invalidation.md)
- [05 - HQ Extensions and Cache](./book/05-hq-extensions-and-cache.md)
- [06 - Cache Settings, Talks, and Field Notes](./book/06-cache-settings-talks-and-field-notes.md)
- [07 - Small Local Cache Example with Tags](./book/07-small-local-cache-example-with-tags.md)
- [08 - Storage Providers and Media Caching](./book/08-storage-providers-and-media-caching.md)
- [09 - Future Hybrid Cache Architecture](./book/09-future-hybrid-cache-architecture.md)
- [10 - Appendix: Sources](./book/10-appendix-sources.md)
- [11 - NuCache vs Hybrid Cache](./book/11-nucache-vs-hybrid-cache.md)
- [12 - Examine, Indexes, and Cache-Adjacent Querying](./book/12-examine-indexes-and-cache-adjacent-querying.md)
- [13 - Lessons from the Issue Tracker](./book/13-lessons-from-the-issue-tracker.md)
- [14 - Reading the Cache Code](./book/14-reading-the-cache-code.md)

## Primary Sources

- Umbraco documentation:
  - [Caching overview (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/develop-with-umbraco/caching.md)
  - [Response caching (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/develop-with-umbraco/caching/response-caching.md)
  - [Website output caching (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/develop-with-umbraco/caching/website-output-caching.md)
  - [Cache settings (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/develop-with-umbraco/configuration/cache-settings.md)
  - [Cache settings (latest)](https://docs.umbraco.com/umbraco-cms/develop-with-umbraco/configuration/cache-settings.md)
  - [Server-side cache extensions (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/extend-your-project/server-side-extensions/cache.md)
  - [Application cache (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/extend-your-project/server-side-extensions/cache/application-cache.md)
  - [Cache seeding (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/extend-your-project/server-side-extensions/cache/cache-seeding.md)
  - [Custom seed key provider example](https://docs.umbraco.com/umbraco-cms/extend-your-project/server-side-extensions/cache/examples/creating-custom-seed-key-provider.md)
  - [Cache tags example](https://docs.umbraco.com/umbraco-cms/extend-your-project/server-side-extensions/cache/examples/tags.md)
  - [Examine](https://docs.umbraco.com/umbraco-cms/develop-with-umbraco/application-code/examine)
  - [Examine management](https://docs.umbraco.com/umbraco-cms/develop-with-umbraco/application-code/examine/examine-management)
  - [Handling cache refresher notifications (Deploy)](https://docs.umbraco.com/umbraco-deploy/extending/handling-cache-refresher-notifications.md)
  - [Deploy settings](https://docs.umbraco.com/umbraco-deploy/getting-started/deploy-settings.md)
  - [Deploy troubleshooting](https://docs.umbraco.com/umbraco-deploy/troubleshooting.md)
  - [Umbraco Forms docs](https://docs.umbraco.com/umbraco-forms)
  - [Umbraco Engage docs](https://docs.umbraco.com/umbraco-engage)
  - [Umbraco Commerce docs](https://docs.umbraco.com/umbraco-commerce)
  - [Umbraco Search docs](https://docs.umbraco.com/umbraco-search)
  - [Umbraco Storage Providers](https://docs.umbraco.com/umbraco-dxp/packages/storage-providers)
  - [Umbraco.Cms.Search](https://github.com/umbraco/Umbraco.Cms.Search)

- Microsoft documentation:
  - [Caching in .NET](https://learn.microsoft.com/en-us/dotnet/core/extensions/caching)
  - [HybridCache in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/performance/caching/hybrid?view=aspnetcore-10.0)
  - [Caching overview in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/performance/caching/overview?view=aspnetcore-10.0)
  - [HybridCache is now GA (blog post)](https://devblogs.microsoft.com/dotnet/hybrid-cache-is-now-ga/)
  - [HybridCacheEntryOptions API](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.caching.hybrid.hybridcacheentryoptions?view=net-11.0-pp)
  - [HybridCacheOptions API](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.caching.hybrid.hybridcacheoptions?view=net-11.0-pp)

- Umbraco source checkouts:
  - `umbraco-v17` from `release/17.5.1`
  - `umbraco-v18` from `release/18.0.2`
  - `umbraco-main`

- Supporting material:
  - [Hybrid Cache förändrar allt — Umbraco Kalaset session (YouTube)](https://www.youtube.com/watch?v=JyXlvDoreS8)
  - [Hybrid Cache förändrar allt — Umbraco Kalaset slides (PDF)](https://www.umbracokalaset.se/media/ccvhwzvs/hybrid-cache-forandrar-allt.pdf)
  - [Examine ISearcher API](https://shazwazza.github.io/Examine/api/Examine.ISearcher.html)
