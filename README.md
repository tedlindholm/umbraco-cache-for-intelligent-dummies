# Umbraco Cache for Intelligent Dummies

[![skills.sh install count](https://skills.sh/b/tedlindholm/umbraco-cache-for-intelligent-dummies)](https://skills.sh/tedlindholm/umbraco-cache-for-intelligent-dummies)

Install the agent skill:

```bash
npx skills add tedlindholm/umbraco-cache-for-intelligent-dummies -g
```

Use it when you want an AI agent to reason about Umbraco cache problems from a
source-backed book instead of guessing from generic caching advice.

The core idea is simple:

> Cache busting and invalidation matter at least as much as cache creation.

This repository is both:

- a reader-facing AI skill for Umbraco cache explanation, triage, source-checking,
  and debugging
- a working book project about caching in Umbraco, written for intelligent
  beginners who want implementation truth without getting lost in old names,
  half-remembered cache lore, or "just clear the cache" advice

The book separates published-content cache, output cache, browser/CDN cache,
media/storage cache, application cache, distributed invalidation, and
search/index freshness. It focuses on Umbraco 17, with carefully labelled notes
for Umbraco 18 and current `main` where they change the mental model.

## Install the Skill

The skill lives here:

- [umbraco-cache-for-intelligent-dummies](./skills/umbraco-cache-for-intelligent-dummies/SKILL.md)

Install it globally with the `skills` CLI:

```bash
npx skills add tedlindholm/umbraco-cache-for-intelligent-dummies -g
```

Skills are reusable capabilities for AI agents. The
[skills.sh documentation](https://www.skills.sh/docs) describes them as
procedural knowledge that helps agents perform specific tasks more effectively.
`npx` downloads and runs the CLI on demand, so there is no separate install step;
you only need Node.js with npm/npx available.

After installation, ask your agent to use
`$umbraco-cache-for-intelligent-dummies` for an Umbraco cache question:

```text
Use $umbraco-cache-for-intelligent-dummies to diagnose why one front-end node
still serves old content after publish.
```

## What the Skill Helps With

Use the skill when you want an AI agent to help with:

- stale pages, stale published content, or stale headless JSON
- load-balanced mismatches and distributed invalidation
- output-cache tags, vary rules, and cache bypass decisions
- custom `IAppCache`, `HybridCache`, or tag-based cache code
- media, blob, CDN, and ImageSharp cache confusion
- slow warm-up, seeding, traversal cost, rebuilds, and reindexing
- NuCache naming versus the active Hybrid Cache implementation

The skill routes the agent to the smallest relevant chapter, asks it to check
the public GitHub book before making factual claims, and keeps cache storage
separate from cache invalidation.

## Scope

- Primary focus: Umbraco 17.5.1 code and Umbraco 17.latest documentation.
- Secondary focus: useful and relevant changes observed in Umbraco 18.0.2 and `main`.
- Canonical source register: [17 - Appendix: Sources](./book/17-appendix-sources.md).

## Chapters

Start here for lookup: [How to Find Things](./book/00b-how-to-find-things.md) — symptom, layer, and task tables plus a "which cache am I looking at?" diagram.

**Part I — Foundations**

- [01 - The Big Picture](./book/01-the-big-picture.md)
- [02 - The Published Object (`IPublishedContent`)](./book/02-the-published-object.md)

**Part II — The output caches**

- [03 - Website Output Caching](./book/03-website-output-caching.md)
- [04 - The Content Delivery API](./book/04-the-content-delivery-api.md)
- [05 - Edge Cache in Front of the Content Delivery API](./book/05-edge-cache-in-front-of-the-cda.md) — Cloudflare, Azure API Management, and Azure Front Door, generalised from Umbraco Cloud's own architecture

**Part III — The published-content engine**

- [06 - Published Content Cache, AppCaches, and Load Balancing](./book/06-published-cache-and-load-balancing.md)
- [07 - How the Hybrid Cache Engine Works](./book/07-hybrid-cache-engine.md)
- [08 - NuCache vs Hybrid Cache](./book/08-nucache-vs-hybrid-cache.md)

**Part IV — Invalidation**

- [09 - Cache Busting and Invalidation](./book/09-cache-busting-and-invalidation.md)

**Part V — Extensions and operations**

- [10 - HQ Extensions and Cache](./book/10-hq-extensions-and-cache.md)
- [11 - Cache Settings, Talks, and Field Notes](./book/11-cache-settings-talks-and-field-notes.md)

**Part VI — Adjacent caches and data**

- [12 - Small Local Cache Example with Tags](./book/12-small-local-cache-example-with-tags.md)
- [13 - Storage Providers and Media Caching](./book/13-storage-providers-and-media-caching.md)
- [14 - Examine, Indexes, and Cache-Adjacent Querying](./book/14-examine-indexes-and-cache-adjacent-querying.md)

**Part VII — Diagnosis and reference**

- [15 - Lessons from the Issue Tracker](./book/15-lessons-from-the-issue-tracker.md)
- [16 - Reading the Cache Code](./book/16-reading-the-cache-code.md)
- [17 - Appendix: Sources](./book/17-appendix-sources.md)
- [18 - Appendix: UMB.FYI Archive Notes for Cache and Index Topics](./book/18-appendix-umbfyi-archive-notes.md)
- [19 - Appendix: Glossary](./book/19-appendix-glossary.md)
- [20 - Appendix: Index](./book/20-appendix-index.md)

## PDF Export

Run `node generate-pdf-chrome.js` to build `book/umbraco-cache-for-intelligent-dummies.pdf`.

The build has no npm dependencies. It uses only Node's built-in modules plus your
installed Google Chrome. Markdown parsing and Mermaid diagram rendering run as
vendored browser bundles (`vendor/markdown-it.min.js`, `vendor/mermaid.min.js`)
executed by Chrome itself, headlessly, the same way `Cmd+P > Save as PDF` would.
Set the `CHROME_PATH` environment variable if Chrome isn't in the default location
for your OS.

A GitHub Actions workflow (`.github/workflows/build-pdf.yml`) rebuilds the PDF
automatically on every push to `book/**.md` and publishes it to the `latest-pdf`
release.

### Diagram Notes

Some Mermaid diagrams are large enough to be split by page breaks. This repository
includes print helpers for that:

- chapter-level wrappers (`.pdf-keep-together`) around large diagrams
- a shared print stylesheet: `book/pdf-export.css`

If a single diagram is taller than one printed page, no break rule can keep it
intact — either split the diagram into two smaller ones, or replace it with a
hand-made SVG in `book/assets/` (see `flow-cda-request.svg` for an example).

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
