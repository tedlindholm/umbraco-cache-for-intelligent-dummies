# 18. Appendix: UMB.FYI Archive Notes for Cache and Index Topics

> **Start here.** This appendix is a discovery trail through the UMB.FYI community newsletter archive: the talks, package announcements, and field reports that pointed this book toward topics before they were checked against code and official docs. It is not proof by itself. Use it to find further reading on a theme, or to see where a claim made elsewhere in the book was first spotted in the wild.

UMB.FYI is a community newsletter, not an implementation authority for Umbraco caching. It is a map of community writing, talks, package announcements, public announcements, and operational field notes that orbit caching, indexing, search, media delivery, and performance. The sweep behind this appendix was performed on 1 July 2026 and is registered as [F8](./17-appendix-sources.md#f8-umbfyi-cache-and-search-archive-trail) in the source appendix. The main teaching chapters prefer code, official docs, and Microsoft or Umbraco sources for claims about how the system works; this appendix exists so the discovery trail stays visible after a claim has been checked and folded into a chapter.

## How to use these notes

- Treat UMB.FYI as a signpost, not proof. Follow the linked article, video, RFC, package, or announcement before repeating a claim from it.
- Cite [F8](./17-appendix-sources.md#f8-umbfyi-cache-and-search-archive-trail) when referring to this archive sweep.
- Prefer an existing, stronger source ID — such as `U15`, `U21`, `S2`, `T4`, `T5`, or `F4` — when one already covers the same claim.

## Archive themes that fit the book

The archive reinforces six book themes.

1. HybridCache changed the cost model. The newsletter points repeatedly to material about lower start-up cost, lower memory pressure, deliberate cache warming, and the danger of broad traversal.
2. Search is becoming an abstraction. The Umbraco Search trail shows a move from direct Examine-shaped search towards provider-backed search abstractions.
3. Examine remains important, but more precisely named. It is an index provider and search technology, not the general-purpose cache.
4. Indexes have operational freshness risks. Rebuilds, corruption, health checks, local/main index synchronisation, and provider storage matter.
5. Media delivery has its own cache stack. Blob storage, CDN delivery, image processing, responsive images, and static fallbacks sit beside the published-content cache rather than inside it.
6. Performance is often a flow problem, not a single cache problem. Cloud deployments, logging, Delivery API usage, headless front ends, search providers, and sustainability all surface cache-adjacent trade-offs.

## HybridCache and deliberate warm-up

UMB.FYI points to two especially important cache-architecture ideas, both developed fully in [Chapter 11](./11-cache-settings-talks-and-field-notes.md) and [Chapter 7](./07-hybrid-cache-engine.md).

First, the v15+ direction moved away from loading all published content into memory at boot. Startup now seeds a deliberately chosen subset of content, and everything outside that subset loads on the first request that needs it instead of during boot.[^17-cache-warmup]

Second, the HybridCache talk material warns that the cost this removes from startup has not vanished — it moved. Broad tree traversal, large in-memory filtering, and casual "load everything, then filter" patterns become far more visible and far more expensive. That fits this book's central argument that cache busting and invalidation matter at least as much as cache creation. Seeding and query shape (see [Chapter 14](./14-examine-indexes-and-cache-adjacent-querying.md)) decide whether the cache can be trusted and afforded once it exists.[^17-hybrid-talk]

## Search, Examine, and provider-backed indexing

The archive has a clear search timeline:

- January 2025: RFC 0027 proposed a future search and indexing abstraction.
- September 2025: alpha/devrel material showed Umbraco Search becoming a practical abstraction.
- September 2025: tailored indexing material described property value handlers, content indexers, and notifications.
- May and June 2026: talks and package entries showed provider-agnostic search becoming part of the public conversation.
- July 2026: the archive points to a public announcement that Umbraco Search is planned to replace existing core Examine search handling in Umbraco 19.

The lesson for this book is not "Examine is gone". The lesson is sharper:

- `Examine` is an important index/search provider.
- `Umbraco Search` is the newer abstraction around search behaviour.
- Provider-backed search lets projects choose technologies such as Examine, Elasticsearch, Azure AI Search, Typesense, Algolia-style providers, or vector/semantic providers where appropriate.
- Search and indexing solve discovery-shaped problems; they do not replace the published-content cache or `RuntimeCache`.

[Chapter 14](./14-examine-indexes-and-cache-adjacent-querying.md) covers this in full, with a forward-looking note in [Chapter 7](./07-hybrid-cache-engine.md). The source register entries are [S2](./17-appendix-sources.md#s2-umbracocmssearch-repository), [U21 to U26](./17-appendix-sources.md#u21-umbraco-search-overview), and [F8](./17-appendix-sources.md#f8-umbfyi-cache-and-search-archive-trail).

## Practical index shaping

Several UMB.FYI entries are especially good beginner examples because they show that an index is not just "a faster list".

Faceted search and string sorting both require the indexed fields to be shaped for the query. A field used for faceting, filtering, or sorting may need different handling from a field used only for full-text matching. Tailored indexing in Umbraco Search extends the same idea: projects may need property value handlers, custom content indexers, and notification handling to keep the search model aligned with the feature.[^17-index-shape]

That is the central beginner lesson:

> If the feature asks "find the right things", design the index for that question. Do not walk the published tree and hope a cache will make the wrong query shape cheap forever.

## Operational index risks

The archive also surfaces the unglamorous side of indexes:

- index corruption can happen
- main and local indexes can drift
- Azure-style file-system and multi-instance hosting can make rebuild behaviour more important
- health checks and rebuild overhead are part of the operational cost
- packages such as ExamineX exist partly because search/index storage becomes a scaling and reliability question

This belongs in the book because it mirrors the cache-invalidation story: a derived read model is only trustworthy when its refresh, rebuild, and repair paths are understood.[^17-index-ops] Both the index-shaping lesson above and these operational risks are developed in [Chapter 14](./14-examine-indexes-and-cache-adjacent-querying.md); the rebuild and corruption failure modes also recur as real bug reports in [Chapter 15](./15-lessons-from-the-issue-tracker.md).

## Media, CDN, and image caching

The archive contains several media-performance entries that belong beside [Chapter 13 - Storage Providers and Media Caching](./13-storage-providers-and-media-caching.md) rather than the published-content cache chapters, with a narrower slice touching [Chapter 3's](./03-website-output-caching.md) separate response/output-cache layer.

The useful theme is layered delivery:

- store media efficiently
- generate or optimise variants intentionally
- use blob storage where it fits the hosting model
- use a CDN for repeated public delivery
- preserve query-string-sensitive image variants
- consider static or fallback delivery for resilience

Relevant entries include Azure Blob Storage/CDN/Key Vault guidance, external image optimisation with Cloudflare Workers and Cloudinary, responsive images/lazy loading with Slimsy, custom media path migration notes, Delivery API media model changes, and static-backup style packages.[^17-media]

## Delivery API, headless, and cache-adjacent flows

The archive has many Delivery API and headless entries. Not all are caching sources, but they matter to the book's mental model, and they belong beside [Chapter 9 - Cache Busting and Invalidation](./09-cache-busting-and-invalidation.md) and [Chapter 13 - Storage Providers and Media Caching](./13-storage-providers-and-media-caching.md).

A headless site often moves rendering and delivery into another process. That changes where repeated work happens:

- the CMS may provide content through the Delivery API
- the front end may cache API responses, generated pages, or static output
- preview URLs and protected media/content need explicit freshness and access rules
- webhooks can become the bridge from content change to downstream invalidation

This is cache-adjacent rather than published-content-cache implementation detail. The boundary it explains is this: Umbraco can bust its internal caches correctly while a downstream front end, CDN, static host, or API client still needs its own invalidation story.[^17-headless]

## Cloud operations and performance field notes

The archive also points to operational material that is not cache-specific but helps beginners diagnose real performance work:

- Kudu log browsing helps find failures when the site is down.
- Cloud performance and traffic insights help make bottlenecks visible.
- Slow deployment notes remind us that compression, build, and deploy pipelines have their own costs.
- Umbraco Commerce scaling advice mentions asynchronous processing, effective caching, autoscaling, and efficient logging.
- Sustainability material repeatedly links performance, lower transfer, and lower compute with better operational outcomes.

The book treats these as field notes, not cache architecture. They help answer one question: where should you look before assuming a symptom is a cache bug?[^17-ops]

## Full archive catalogue

This is the fuller, chronological catalogue of UMB.FYI entries from the archive sweep that fit the book's cache/index/performance perimeter. Not every row is discussed above; browse by date if you want the raw trail rather than the curated themes.

| Date | Entry | Why it matters |
| --- | --- | --- |
| 2026-07-01 | [Umbraco Search replaces existing search in Umbraco 19](https://umb.fyi/2026-07-01) | Future search abstraction, core Examine search handling transition, provider choice. |
| 2026-07-01 | [Krebil.UmbracoAzureSearch](https://umb.fyi/2026-07-01) | Azure AI Search provider for Umbraco Search; filtering, faceting, sorting, culture/segment variants. |
| 2026-06-24 | [Running Umbraco in a Changing World](https://umb.fyi/2026-06-24) | Cloud operations, automated traffic, performance optimisation, multi-cloud direction. |
| 2026-06-24 | [Build. Scale. Grow.](https://umb.fyi/2026-06-24) | Agency-scale operations and Cloud operational insights. |
| 2026-06-24 | [Our Roadmap, Your CMS](https://umb.fyi/2026-06-24) | Roadmap signal for elements, Delivery API, and performance improvements. |
| 2026-06-24 | [Lait.Umbraco.Search.Typesense](https://umb.fyi/2026-06-24) | Typesense provider signal for search abstraction. |
| 2026-06-17 | [Umbraco.AI.Search](https://umb.fyi/2026-06-17) | Vector search provider; useful to distinguish semantic search from content caching. |
| 2026-06-10 | [Hybrid Cache changes everything](https://umb.fyi/2026-06-10) | Main community-facing HybridCache performance and traversal warning. |
| 2026-06-10 | [Umbraco.Cms.Search.Core](https://umb.fyi/2026-06-10) | Package-level signal for provider-backed search abstraction. |
| 2026-06-10 | [SplatDev ExamineExtensions](https://umb.fyi/2026-06-10) | Query helpers, result transformers, and index utilities. |
| 2026-06-10 | [Tweets plugin](https://umb.fyi/2026-06-10) | Simple example of local scheduled caching outside the core CMS cache. |
| 2026-06-03 | [More Visibility, More Control](https://umb.fyi/2026-06-03) | Cloud traffic/performance insights and operational visibility. |
| 2026-06-03 | [Umbraco 18 Release Candidate](https://umb.fyi/2026-06-03) | Performance improvements, elements, and Delivery API/OpenAPI direction. |
| 2026-06-03 | [Speed up slow deployments to Umbraco Cloud](https://umb.fyi/2026-06-03) | Deployment-performance field note. |
| 2026-06-03 | [Azure Search provider for Umbraco Search](https://umb.fyi/2026-06-03) | Provider implementation signal for Umbraco Search. |
| 2026-05-27 | [Browsing Umbraco Logs in Kudu](https://umb.fyi/2026-05-27) | Operational diagnosis when cache/index/deploy problems surface in Cloud. |
| 2026-05-27 | [Personalisation Groups as segments](https://umb.fyi/2026-05-27) | Runtime segments and Delivery API rendering; useful for cache-key and variation thinking. |
| 2026-05-27 | [Umbraco Search Explained](https://umb.fyi/2026-05-27) | Provider-agnostic search explainer. |
| 2026-05-20 | [Future of Search in Umbraco Starts Here](https://umb.fyi/2026-05-20) | Event signal for search abstraction education. |
| 2026-05-13 | [AI Semantic Ranking with ExamineX and Azure Search](https://umb.fyi/2026-05-13) | Semantic ranking after keyword retrieval; relevance layer on top of index/search. |
| 2026-05-13 | [Umbraco.Community.AI.Chatbot](https://umb.fyi/2026-05-13) | Public search/chat pattern; only cache-adjacent. |
| 2026-04-15 | [Introducing Umbraco AI Search](https://umb.fyi/2026-04-15) | Semantic/vector search add-on using Umbraco.Cms.Search. |
| 2025-12-17 | [Umbraco Search is coming to town](https://umb.fyi/2025-12-17) | Search abstraction introduction and decoupling from direct Examine dependency. |
| 2025-12-03 | [Umbraco 17 LTS final release](https://umb.fyi/2025-12-03) | Performance, scalability, and load-balancing context. |
| 2025-12-03 | [Unboxing Umbraco 17 LTS](https://umb.fyi/2025-12-03) | Release overview with performance/scaling themes. |
| 2025-12-03 | [Umbraco Commerce Scaling](https://umb.fyi/2025-12-03) | Effective caching, autoscaling, asynchronous processing, and logging. |
| 2025-12-03 | [our.umbraco.fulltextsearch for v17](https://umb.fyi/2025-12-03) | Search package signal. |
| 2025-10-22 | [Mix and match search providers](https://umb.fyi/2025-10-22) | Running multiple search providers, including Elasticsearch and Examine. |
| 2025-10-22 | [Searching file content with Umbraco Search](https://umb.fyi/2025-10-22) | Indexing PDF, Markdown, and text file content through Umbraco Search. |
| 2025-10-01 | [Mix and match search providers](https://umb.fyi/2025-10-01) | Same provider-choice theme; useful if following chronology. |
| 2025-09-17 | [Tailored indexing for Umbraco Search](https://umb.fyi/2025-09-17) | Property value handlers, content indexers, and indexing notifications. |
| 2025-09-10 | [Umbraco's New Search in Alpha](https://umb.fyi/2025-09-10) | Search abstraction and reduced direct dependency on Examine. |
| 2025-09-03 | [Trying out the new Umbraco Search](https://umb.fyi/2025-09-03) | Full-text search, sorting, faceting, and provider-backed querying. |
| 2025-07-23 | [ExamineX for v16](https://umb.fyi/2025-07-23) | External search/index provider package signal. |
| 2025-07-23 | [Preventing search engine indexing of private documents](https://umb.fyi/2025-07-23) | HTTP/header indexing, not Examine; useful distinction between search engines and application indexes. |
| 2025-01-15 | [RFC 0027 - The Future of Search](https://umb.fyi/2025-01-15) | Historical proposal for search/indexing abstraction. |
| 2025-01-15 | [Our.Umbraco.NuCacheExplorer](https://umb.fyi/2025-01-15) | Historical NuCache tooling signal. |
| 2025-01-08 | [Rebuilding a package for Umbraco 15](https://umb.fyi/2025-01-08) | Package upgrade and API/client generation; cache-adjacent only. |
| 2024-11-27 | [So you want to cache all the things?](https://umb.fyi/2024-11-27) | Key v15+ warm-up and "do not cache everything blindly" article. |
| 2024-11-27 | [Azure Blob Storage, CDN, and Key Vault](https://umb.fyi/2024-11-27) | Media delivery, blob storage, CDN, and performance. |
| 2024-11-27 | [Examine 3.5.0 released](https://umb.fyi/2024-11-27) | Examine release signal. |
| 2024-11-27 | [AI in Umbraco with ExamineX](https://umb.fyi/2024-11-27) | Search/index provider plus AI experiment. |
| 2024-08-28 | [Facetted search with Examine - Umbraco 13](https://umb.fyi/2024-08-28) | Facet-shaped index use. |
| 2024-08-28 | [How to sort on a string field in Umbraco Examine](https://umb.fyi/2024-08-28) | Field type and sorting configuration; rebuild/query implications. |
| 2024-08-28 | [CSP manager 1.4.0](https://umb.fyi/2024-08-28) | Distributed cache clearing in a package context. |
| 2024-08-07 | [An Examine fix for Umbraco index corruption](https://umb.fyi/2024-08-07) | Index corruption, health checks, main/local sync, Azure rebuild overhead. |
| 2024-08-07 | [Tips when upgrading Umbraco from 10 to 13](https://umb.fyi/2024-08-07) | Upgrade practice and reviewing custom indexing logic. |
| 2024-08-07 | [Optimising external images](https://umb.fyi/2024-08-07) | Cloudflare Workers, Cloudinary, media performance, and image delivery. |
| 2024-08-07 | [Umbraco 13 search tutorials with Examine](https://umb.fyi/2024-08-07) | Beginner search-service examples using Examine, filtering, and pagination. |
| 2024-02-07 | [Searching and Indexing with Examine](https://umb.fyi/2024-02-07) | Official training signal for Examine as search/index topic. |
| 2024-02-07 | [Elastic Search with ExamineX preview](https://umb.fyi/2024-02-07) | External provider/scaling signal. |
| 2024-01-03 | [Umbraco 13 performance review](https://umb.fyi/2024-01-03) | Upgrade/performance measurement context. |
| 2023-11-29 | [Umbraco performance on mini PCs](https://umb.fyi/2023-11-29) | Measurement and hardware/runtime context, not cache-specific. |
| 2023-11-29 | [Measure it to manage it](https://umb.fyi/2023-11-29) | Performance measurement mindset. |
| 2023-11-23 | [Umbraco Cloud efficiency and scalability](https://umb.fyi/2023-11-23) | Cloud deployment and scale context. |
| 2023-11-15 | [Custom IMediaPathScheme for migrated media](https://umb.fyi/2023-11-15) | Media URL/path migration; cache-key and CDN-path implications. |
| 2023-11-15 | [uMarketingSuite headless update](https://umb.fyi/2023-11-15) | Headless personalisation and analytics; cache-key variation concerns. |
| 2023-11-15 | [Codegarden 2023 Delivery API content](https://umb.fyi/2023-11-15) | Delivery API context for downstream caching. |
| 2023-11-08 | [Umbraco 12.3 release](https://umb.fyi/2023-11-08) | Boot-time setting for large websites and Delivery API improvements. |
| 2023-11-08 | [Adding a custom Webhook Type to Umbraco v13](https://umb.fyi/2023-11-08) | Webhooks as downstream invalidation hooks. |
| 2023-11-08 | [Searching and Indexing with Examine training](https://umb.fyi/2023-11-08) | Examine training/release signal. |
| 2023-11-08 | [Examine 3.2.0 and 4.0.0 beta](https://umb.fyi/2023-11-08) | Examine release signal. |
| 2023-11-01 | [Index PDFs on their pages in Umbraco](https://umb.fyi/2023-11-01) | File/PDF indexing example. |
| 2023-11-01 | [Composability and sustainability](https://umb.fyi/2023-11-01) | Reduced data transfer, performance, and composable delivery. |
| 2023-10-25 | [Climate Action umbraCoffee special](https://umb.fyi/2023-10-25) | Sustainability/performance context. |
| 2023-10-18 | [Umbraco Heartcore update](https://umb.fyi/2023-10-18) | Headless performance enhancements and rate limits. |
| 2023-10-11 | [Umbraco CI/CD Flow](https://umb.fyi/2023-10-11) | Deployment flow, cache-adjacent operational concern. |
| 2023-10-11 | [Introducing the Umbraco Sustainability Challenge](https://umb.fyi/2023-10-11) | Performance and lower environmental impact as a neighbouring theme. |
| 2023-10-11 | [FullTextSearch 4.0.0 close to release](https://umb.fyi/2023-10-11) | Search package signal. |
| 2023-10-04 | [Delivery API media model changes](https://umb.fyi/2023-10-04) | Media output customisation and API-shape boundaries. |

## What not to over-claim

The archive is valuable, but it is mixed. Avoid over-claiming these points:

- A newsletter summary is not proof of implementation behaviour.
- A package listing does not mean the package is a recommended architecture.
- A performance article may describe one project, hosting model, or version only.
- Search-engine indexing, Examine indexing, Umbraco Search indexing, and browser/CDN caching are different systems.
- AI/vector search entries are search-relevance material unless they explicitly describe cache or index freshness.

## In a nutshell

- UMB.FYI is a discovery trail, not an implementation authority: good for finding community talks, packages, and field reports, not for citing as proof of behaviour.
- The archive reinforces six themes this book already teaches from primary sources: HybridCache's new cost model, search becoming an abstraction, Examine's narrower and more precise role, index freshness risk, a separate media-delivery cache stack, and performance as a flow problem rather than a single cache.
- The full chronological catalogue exists so you can browse by date; the themed sections above show which chapter actually teaches each idea from checked sources.

### Three takeaways

- A newsletter mention is a lead, not proof — the main chapters kept only the claims that survived a check against code or official docs.
- Search, Examine, and cache are three different systems. The archive repeatedly blurs them in casual writing, so keep the vocabulary precise when citing it.
- Media, CDN, headless, and cloud-operations material sit beside the caching story rather than inside it; do not fold them into the published-content cache mental model.

### Where to go next

- [Chapter 11 - Cache Settings, Talks, and Field Notes](./11-cache-settings-talks-and-field-notes.md) for HybridCache warm-up and operational settings.
- [Chapter 13 - Storage Providers and Media Caching](./13-storage-providers-and-media-caching.md) for the media/CDN cache stack.
- [Chapter 14 - Examine, Indexes, and Cache-Adjacent Querying](./14-examine-indexes-and-cache-adjacent-querying.md) for the search/Examine/index story.
- [Chapter 17 - Appendix: Sources](./17-appendix-sources.md) for the canonical `F8` register entry this appendix expands on.

[^17-cache-warmup]: See [F8](./17-appendix-sources.md#f8-umbfyi-cache-and-search-archive-trail), especially the 27 November 2024 entry.
[^17-hybrid-talk]: See [F8](./17-appendix-sources.md#f8-umbfyi-cache-and-search-archive-trail), especially the 10 June 2026 entry, plus [T4](./17-appendix-sources.md#t4-enkelmedia-article) and [T5](./17-appendix-sources.md#t5-enkelmedia-pdf).
[^17-index-shape]: See [F8](./17-appendix-sources.md#f8-umbfyi-cache-and-search-archive-trail), especially the 28 August 2024, 3 September 2025, and 17 September 2025 entries.
[^17-index-ops]: See [F8](./17-appendix-sources.md#f8-umbfyi-cache-and-search-archive-trail), especially the 7 August 2024 and 23 July 2025 entries.
[^17-media]: See [F8](./17-appendix-sources.md#f8-umbfyi-cache-and-search-archive-trail), especially the 4 October 2023, 15 November 2023, 7 August 2024, and 27 November 2024 entries.
[^17-headless]: See [F8](./17-appendix-sources.md#f8-umbfyi-cache-and-search-archive-trail), especially the 8 November 2023, 15 November 2023, and 18 October 2023 entries.
[^17-ops]: See [F8](./17-appendix-sources.md#f8-umbfyi-cache-and-search-archive-trail), especially the 3 June 2026, 27 May 2026, and 3 December 2025 entries.
