---
name: umbraco-cache-for-intelligent-dummies
description: Work on any Umbraco cache task using the book Umbraco Cache for Intelligent Dummies, eagerly looking up facts in the public GitHub book before answering. Use for manuscript writing, research integration, source-checking, chapter restructuring, diagrams, cross-references, explanations, diagnosis, triage, debugging, stale pages, stale published content, incorrect website output cache, stale Content Delivery API or headless JSON responses, IPublishedContent and element-cache confusion, browser/CDN cache confusion, load-balanced cache mismatch, distributed invalidation, cache refreshers, Hybrid Cache, legacy NuCache naming, media or blob cache behaviour, Examine and Umbraco Search, slow warm-up, seeding, rebuilds, reindexing, upgrade-related cache symptoms, or any question that asks which cache layer stores a value and what should invalidate it.
---

# Umbraco Cache for Intelligent Dummies

Use this skill to help a user write, research, source-check, explain, diagnose, or debug Umbraco cache behaviour with the book `Umbraco Cache for Intelligent Dummies`.

The book is beginner-friendly but evidence-led. Its central rule is:

> Cache busting and invalidation matter at least as much as cache creation.

## GitHub Book Lookup Rule

Eagerly look up facts in the public GitHub book before answering.

For any factual, diagnostic, writing, restructuring, or source-checking task:

1. Open the most relevant GitHub book chapter or appendix entry before making claims from the book.
2. Use the GitHub chapter as the working source of truth for what the book currently says.
3. Prefer `book/17-appendix-sources.md` when a claim needs source IDs, footnotes, or provenance.
4. Link the exact GitHub chapter or appendix page used in the answer.
5. If the GitHub book content is unavailable, say that clearly and fall back to local files, official docs, or source code.
6. If local files and GitHub differ, explain which one was used and avoid pretending the difference is resolved.

Do not answer from memory when the answer depends on what the book says today. The skill is allowed to classify the likely layer first, but it should then read the corresponding GitHub chapter before giving the substantive answer.

## Operating Stance

Start from the user's symptom, not from a generic caching lecture.

Every useful answer should quickly identify:

1. The stale, missing, over-fresh, or expensive value.
2. The cache layer or index most likely involved.
3. Where that value is stored.
4. What signal should invalidate, refresh, evict, rebuild, or bypass it.
5. Whether the problem is local, distributed, client-side, deployment-related, or version-specific.
6. The smallest evidence that would confirm or disprove the diagnosis.

Avoid "clear the cache" as a first answer. If clearing is part of the fix, name the cache, explain why that clear reaches the stale value, and say what should have invalidated it automatically.

## Fast Diagnostic Loop

For troubleshooting, run this loop:

1. Restate the symptom in concrete terms.
2. State the version assumption: Umbraco 17 by default, with Umbraco 18 or `main` only when relevant.
3. Classify the layer using `Layer Classifier`.
4. Open the matching GitHub chapter and, when needed, the source appendix.
5. Separate storage from invalidation.
6. Decide whether the issue is local or distributed.
7. Request only discriminating evidence: headers, logs, content keys, server role, cache settings, output-cache tags, notification handlers, index state, source snippets, or deployment details.
8. Give the next practical check or fix.
9. Link the relevant book chapter and, for technical claims, the relevant official docs, source, or appendix source family.

If the user asks for explanation rather than debugging, keep the same structure but spend more time on the mental model and less on evidence collection.

## Layer Classifier

Use this table to route the question. Prefer one primary layer first, then mention secondary layers only when they genuinely change the diagnosis.

The book's reader-facing [How to Find Things](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/00b-how-to-find-things.md) page mirrors this table and the `Symptom Shortcuts` below. When you change the routing logic here, update that page too so the skill and the book stay in sync.

| Layer | Typical symptom | Stored value | Invalidation or refresh path | Start chapter |
| --- | --- | --- | --- | --- |
| Published-content cache | Published data, navigation, block content, media, or member data looks old inside server-rendered code | Read-model objects such as `IPublishedContent`, `IPublishedElement`, media, or members | Publish/unpublish, refreshers, distributed cache messages, rebuilds, seeding, version-specific Hybrid Cache behaviour | [06 - Published Content Cache, AppCaches, and Load Balancing](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/06-published-cache-and-load-balancing.md) |
| Published object model | User confuses `IContent`, `IPublishedContent`, blocks, elements, documents, or media | The read model used by delivery/rendering APIs, not the write model | Published snapshot/cache refresh, element-specific changes in v18 | [02 - The Published Object](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/02-the-published-object.md) |
| Website output cache | Old HTML after publish, route-specific staleness, wrong variation, cache hit headers | Server-side rendered HTTP responses | Output-cache policy, tags, content-derived eviction, vary rules, publish/unpublish events | [03 - Website Output Caching](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/03-website-output-caching.md) |
| Content Delivery API output cache | Stale JSON or headless response after publish | Server-side JSON responses for CDA endpoints | CDA output-cache tags, vary rules, publish/unpublish eviction | [04 - The Content Delivery API](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/04-the-content-delivery-api.md) |
| Browser, proxy, or CDN cache | User sees stale response but server may already be correct | Client/intermediary HTTP response copies | HTTP cache headers, CDN purge/versioning, URL changes | [01 - The Big Picture](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/01-the-big-picture.md) and the specific server-side chapter |
| Edge cache in front of the CDA (Cloudflare, Azure API Management, Azure Front Door) | Headless JSON correct inside Umbraco but stale at the edge | Whole CDA JSON responses cached outside Umbraco | Vendor-specific purge call from a publish/unpublish notification handler | [Edge Cache in Front of the CDA](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/05-edge-cache-in-front-of-the-cda.md) |
| Application cache | Custom data, expensive computed values, or runtime objects do not clear | `IAppCache`, `AppCaches`, runtime cache, request cache, isolated caches, or custom `HybridCache` entries | Custom keys, tags, notification handlers, refreshers, explicit removal | [12 - Small Local Cache Example with Tags](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/12-small-local-cache-example-with-tags.md) |
| Distributed invalidation | One node is correct and another is stale | Per-node cache entries or published-content state | Cache refreshers, server messenger, distributed cache messages, load-balancing role/configuration | [09 - Cache Busting and Invalidation](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/09-cache-busting-and-invalidation.md) |
| Media/storage cache | Media file, blob, image URL, or storage-backed asset is stale or missing | File/blob content, derived media, CDN/browser copies | Storage provider behaviour, URL/versioning, CDN/browser expiry or purge | [13 - Storage Providers and Media Caching](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/13-storage-providers-and-media-caching.md) |
| Examine or Umbraco Search | Search result is old, missing, duplicated, or query is slow | Search index or Umbraco Search database/index state | Reindexing, indexing notifications, provider sync, rebuild lag | [14 - Examine, Indexes, and Cache-Adjacent Querying](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/14-examine-indexes-and-cache-adjacent-querying.md) |
| Seeding, warm-up, or rebuild | First request is slow, rebuild is expensive, broad traversal hurts | Cache entries populated deliberately or by request paths | Seeding strategy, seed-key provider, rebuild flow, traversal cost | [11 - Cache Settings, Talks, and Field Notes](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/11-cache-settings-talks-and-field-notes.md) |
| NuCache naming or migration history | The user sees NuCache names and assumes an active v17 alternative | Legacy setting names, enum names, SQL template names, comments, helper names | Explain history; anchor active v17 behaviour in Hybrid Cache source | [08 - NuCache vs Hybrid Cache](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/08-nucache-vs-hybrid-cache.md) |
| Source-level investigation | The user wants the implementation truth | Umbraco source code, Microsoft source/docs, appendix entries | Read the smallest relevant source path; label inferences | [16 - Reading the Cache Code](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/16-reading-the-cache-code.md) |

## Symptom Shortcuts

Use these as hypotheses, not conclusions.

| Symptom | First hypothesis | Best evidence |
| --- | --- | --- |
| Old HTML after publish | Website output cache or client/CDN cache | Response headers, output-cache tags, URL, publish timing, same URL from server-side bypass |
| Old CDA/headless JSON | CDA output cache or published-content cache underneath it | CDA cache setting, response headers, content key, publish/unpublish event, tag eviction evidence |
| Old content only on one front-end server | Distributed invalidation or server role/configuration | Node identity, load balancer route, server role, refresher logs, distributed cache settings |
| Backoffice is correct but frontend is stale | Published-content cache, output cache, or client cache | Compare preview/backoffice, server-rendered output, headers, publish event, invalidation logs |
| Custom data does not clear | Application cache key/tag/notification mismatch | Cache key, tag, handler registration, notification fired?, distributed broadcast needed? |
| Search finds old or missing content | Index freshness rather than cache freshness | Index status, provider, reindex time, indexing notification logs, direct content lookup |
| Media URL shows old file | CDN/browser/storage provider path or versioning | URL/version, headers, storage provider, CDN purge state, direct blob/file check |
| Slow first request or rebuild | Seeding/traversal cost or broad cache population | Seed strategy, request path, content tree size, traversal code, rebuild logs |
| Upgrade created cache confusion | Version-specific behaviour or legacy NuCache vocabulary | Exact Umbraco version, changed settings, old names in config/code, relevant source branch |

## Evidence Prompts

Ask for the smallest piece of evidence that separates the top two hypotheses. Good prompts include:

- "Which Umbraco version and hosting shape is this: single server, load-balanced, Umbraco Cloud, or custom?"
- "Is the stale value HTML, JSON, `IPublishedContent` data, media bytes, a search result, or custom computed data?"
- "Does the same URL differ between two servers or only between browser and server?"
- "Can you share the response headers for a stale and fresh request?"
- "Which content key/node changed, and was it publish, unpublish, save, deploy, or rebuild?"
- "Do logs show cache refresher, distributed cache, output-cache eviction, or indexing activity?"
- "Is there custom notification-handler, output-cache policy, app-cache key, tag, or seeding code involved?"

Prefer inspection over speculation when files, logs, config, or source code are available.

## Version and Naming Rules

- Treat Umbraco 17.5.1 source and Umbraco 17.latest docs as the book's primary target.
- Use Umbraco 18.0.2 and `main` only for relevant forward-looking changes, especially the separate element cache and element cache-busting.
- Treat Hybrid Cache as the active published-content cache implementation in Umbraco 17+.
- Treat NuCache as the older published-content cache architecture.
- Explain lingering `NuCache` names as legacy vocabulary unless the source proves otherwise.
- Never present NuCache and Hybrid Cache as equal current alternatives in Umbraco 17.
- Preserve external identifiers exactly, including API names, config keys, class names, enum values, and repository paths.

## Source Discipline

Prefer sources in this order:

1. Umbraco source code.
2. Microsoft official docs and source for Microsoft `HybridCache`.
3. Umbraco official documentation.
4. Umbraco official blog posts.
5. High-quality talks, slides, PDFs, and explainer articles.
6. Local decompilation or field notes when official source is unavailable.

For implementation-specific claims, prefer code over marketing language. If the evidence is partial, say so. If a statement is an inference, label it as an inference.

Important hubs:

- Book repository: <https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies>
- Chapter list: <https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/README.md>
- Source appendix: <https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/17-appendix-sources.md>
- Umbraco docs: <https://docs.umbraco.com/>
- Umbraco CMS source: <https://github.com/umbraco/Umbraco-CMS>
- Umbraco Storage Providers source: <https://github.com/umbraco/Umbraco.StorageProviders>
- Umbraco Search source: <https://github.com/umbraco/Umbraco.Cms.Search>
- Microsoft HybridCache docs: <https://learn.microsoft.com/en-us/aspnet/core/performance/caching/hybrid>

When working inside the book repository, local files are useful for editing, but GitHub is still the preferred lookup target for reader-facing answers:

- `README.md` for chapter order and scope.
- `AGENTS.md` for project rules.
- `book/17-appendix-sources.md` for source IDs.
- `book/18-appendix-umbfyi-archive-notes.md` for UMB.FYI archive notes.

## Answer Shapes

### Narrow troubleshooting answer

Use this shape when the user has a concrete problem:

1. "This sounds like [layer], not [nearby layer], because [reason]."
2. "The value is stored in [store]. It should be invalidated by [signal/path]."
3. "Check [one to three evidence items] next."
4. "If confirmed, the smallest fix is [fix/check]."
5. Link the GitHub chapter opened for the answer and the strongest source.

### Teaching answer

Use this shape when the user asks how something works:

1. Start with a plain-language mental model.
2. Name the layer and version.
3. Explain storage, invalidation, and distribution separately.
4. Add a Mermaid diagram when it clarifies the flow.
5. Link the smallest useful GitHub chapter set.

### Source-check answer

Use this shape when the user asks "is this true?" or wants accuracy:

1. State the claim narrowly.
2. Say whether it is directly sourced, inferred, version-specific, or unsupported.
3. Cite the strongest source family.
4. Explain any contradiction between docs, source, old naming, or blog language.

## Chapter Map

Use the smallest useful chapter set. Do not summarize unrelated chapters.

| Need | Chapter |
| --- | --- |
| Point a reader at the book's own symptom/layer/task lookup hub | [How to Find Things](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/00b-how-to-find-things.md) |
| Big picture, layers, and mental model | [01 - The Big Picture](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/01-the-big-picture.md) |
| `IPublishedContent`, `IPublishedElement`, documents, blocks, read model vs write model | [02 - The Published Object](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/02-the-published-object.md) |
| Website HTML output cache | [03 - Website Output Caching](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/03-website-output-caching.md) |
| Content Delivery API and headless JSON output cache | [04 - The Content Delivery API](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/04-the-content-delivery-api.md) |
| Edge cache in front of the CDA: Cloudflare, Azure API Management, Azure Front Door, purge-on-publish | [Edge Cache in Front of the CDA](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/05-edge-cache-in-front-of-the-cda.md) |
| Published-content cache, AppCaches, load balancing | [06 - Published Content Cache, AppCaches, and Load Balancing](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/06-published-cache-and-load-balancing.md) |
| How the Hybrid Cache engine works: layers, seeding, tags, rebuild, generation counter | [07 - How the Hybrid Cache Engine Works](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/07-hybrid-cache-engine.md) |
| NuCache history, legacy naming, v18 element cache | [08 - NuCache vs Hybrid Cache](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/08-nucache-vs-hybrid-cache.md) |
| Cache busting, invalidation, refreshers, distributed messages | [09 - Cache Busting and Invalidation](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/09-cache-busting-and-invalidation.md) |
| HQ extensions such as Forms, Engage, Commerce, Deploy | [10 - HQ Extensions and Cache](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/10-hq-extensions-and-cache.md) |
| Settings, seeding, warm-up, talks, field notes | [11 - Cache Settings, Talks, and Field Notes](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/11-cache-settings-talks-and-field-notes.md) |
| Small local cache example with tags | [12 - Small Local Cache Example with Tags](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/12-small-local-cache-example-with-tags.md) |
| Storage providers, media, blobs, CDN-adjacent behaviour | [13 - Storage Providers and Media Caching](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/13-storage-providers-and-media-caching.md) |
| Examine, Umbraco Search, indexes, cache-adjacent querying | [14 - Examine, Indexes, and Cache-Adjacent Querying](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/14-examine-indexes-and-cache-adjacent-querying.md) |
| Known bugs and issue-tracker lessons | [15 - Lessons from the Issue Tracker](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/15-lessons-from-the-issue-tracker.md) |
| Reading source code for cache truth | [16 - Reading the Cache Code](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/16-reading-the-cache-code.md) |
| Canonical source register | [17 - Appendix: Sources](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/17-appendix-sources.md) |
| UMB.FYI archive notes | [18 - Appendix: UMB.FYI Archive Notes](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/18-appendix-umbfyi-archive-notes.md) |
| Definition of a cache term | [19 - Appendix: Glossary](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/19-appendix-glossary.md) |
| Which chapter covers a term or identifier | [20 - Appendix: Index](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/20-appendix-index.md) |

## Diagram Guidance

Use Mermaid diagrams when they reduce ambiguity, especially for:

- request flow
- publish, refresh, broadcast, and eviction flow
- local vs distributed invalidation
- output cache vs published-content cache
- Content Delivery API cache flow
- rebuild and seeding timelines
- NuCache history vs Hybrid Cache architecture

Keep diagrams small enough to teach one thing. Prefer a narrow, true diagram over a large diagram that quietly mixes layers.

## Quality Bar

Before finalising an answer, check:

- Did you name the cache layer instead of saying "the cache"?
- Did you separate storage from invalidation?
- Did you handle local vs distributed behaviour?
- Did you avoid blurring Umbraco 17, Umbraco 18, and `main`?
- Did you treat NuCache as old architecture and Hybrid Cache as the active v17+ implementation?
- Did you ask only for evidence that changes the next step?
- Did you open and link the smallest relevant GitHub chapter and strongest available source?
- Did you use British English for project-owned prose while preserving external identifiers exactly?
