---
name: umbraco-cache-for-intelligent-dummies
description:
	Use when debugging, diagnosing, troubleshooting, triaging, or explaining Umbraco cache behaviour with the book Umbraco Cache for Intelligent Dummies. Trigger for stale pages, stale published content, incorrect output cache, Content Delivery API cache, browser/CDN cache confusion, load-balanced cache mismatch, distributed invalidation, cache refresher, Hybrid Cache, NuCache naming, media/blob cache, Examine, Umbraco Search, slow warm-up, seeding, reindexing, upgrade-related cache issues, or any real-world question that asks which cache layer stores a value and what should invalidate it.
---

# Umbraco Cache for Intelligent Dummies

Use this skill to debug Umbraco cache problems with help from the book `Umbraco Cache for Intelligent Dummies`.

The book is for developers who are stuck, frustrated, or debugging real Umbraco cache errors and need a clear path through why the cache does what it does. It is fact-based, source-backed, and built around one central idea:

> Cache busting and invalidation matter at least as much as cache creation.

## Mission

Help the user find the cache issue.

The user may arrive with a symptom, not a perfect cache vocabulary. Turn that symptom into a narrow diagnosis path:

1. Name what is stale, missing, too fresh, or too expensive.
2. Identify the cache layer most likely involved.
3. Identify what stores the value.
4. Identify what should invalidate or refresh it.
5. Ask for or inspect the smallest evidence that can confirm the path.
6. Use only the relevant book chapter, docs, and GitHub source links.

## Hard Rules

DO:

- Start with the user's exact symptom.
- Pick the likely cache layer.
- Separate storage from invalidation.
- Check whether the issue is local or load-balanced.
- Use the smallest relevant part of the book.
- Link aggressively to GitHub chapters, official docs, and source.
- Say when evidence is missing.

DO NOT:

- Dump the whole book.
- Say "the cache" without naming the layer.
- Recommend clearing caches before explaining which cache and why.
- Blur Umbraco 17, Umbraco 18, and `main`.
- Treat NuCache and Hybrid Cache as equal current choices in Umbraco 17.
- Hide uncertainty behind vague phrases such as "it depends".

## Debug Loop

Use this loop for real troubleshooting:

1. **Symptom**: What is wrong? Stale page, stale published content, wrong search result, missing media, slow warm-up, load-balanced mismatch, or custom cache not clearing?
2. **Scope**: Does it happen for one URL, one content item, one node, one server, all servers, backoffice only, frontend only, or only after publish?
3. **Layer**: Decide whether this is published-content cache, website output cache, HTTP/CDN/browser cache, media/storage cache, application cache, distributed invalidation, Examine, or Umbraco Search.
4. **Storage**: Find where the stale value is stored.
5. **Invalidation**: Find the event, notification, tag, refresher, distributed message, index rebuild, or deployment action that should remove or refresh it.
6. **Evidence**: Ask for logs, headers, content keys, server role, cache settings, notification handlers, output-cache tags, index status, or source snippets only when they discriminate between likely causes.
7. **Fix path**: Suggest the smallest fix or next check, then link the exact book chapter and official docs/source.

## Core Rule

Do not pour the whole book into every answer.

Start from the user's concrete use case, identify the cache layer involved, then use only the book sections and primary sources needed to answer that use case well. Give the user the relevant path through the book, not a tour of every chapter.

Use GitHub links generously. When you rely on the book, link to the relevant chapter in the public repository. When you rely on official Umbraco or Microsoft material, link to the official docs or source as well.

Canonical book links:

- Book repository: <https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies>
- Chapter list and install notes: <https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/README.md>
- Source appendix: <https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/14-appendix-sources.md>

## Route by Use Case

First classify the user's problem. Then read or cite the smallest useful chapter set.

| User use case | Start with | Add when needed |
| --- | --- | --- |
| "I need the big picture" | [01 - The Big Picture](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/01-the-big-picture.md) | [10 - NuCache vs Hybrid Cache](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/10-nucache-vs-hybrid-cache.md) |
| Website page output is stale or over-cached | [02 - Website Output Caching](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/02-website-output-caching.md) | [04 - Cache Busting and Invalidation](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/04-cache-busting-and-invalidation.md) |
| Published content is stale, especially on multiple servers | [03 - Published Content Cache, AppCaches, and Load Balancing](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/03-published-cache-and-load-balancing.md) | [04 - Cache Busting and Invalidation](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/04-cache-busting-and-invalidation.md), [13 - Reading the Cache Code](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/13-reading-the-cache-code.md) |
| Custom invalidation, refreshers, or distributed messages | [04 - Cache Busting and Invalidation](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/04-cache-busting-and-invalidation.md) | [13 - Reading the Cache Code](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/13-reading-the-cache-code.md) |
| HQ extension behaviour, Forms, Engage, Commerce, Deploy | [05 - HQ Extensions and Cache](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/05-hq-extensions-and-cache.md) | [14 - Appendix: Sources](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/14-appendix-sources.md) |
| Cache settings, seeding, warm-up, talks, and field notes | [06 - Cache Settings, Talks, and Field Notes](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/06-cache-settings-talks-and-field-notes.md) | [09 - Future Hybrid Cache Architecture](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/09-future-hybrid-cache-architecture.md) |
| Small local application cache with tags | [07 - Small Local Cache Example with Tags](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/07-small-local-cache-example-with-tags.md) | [04 - Cache Busting and Invalidation](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/04-cache-busting-and-invalidation.md) |
| Media, blob storage, or CDN cache behaviour | [08 - Storage Providers and Media Caching](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/08-storage-providers-and-media-caching.md) | [14 - Appendix: Sources](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/14-appendix-sources.md) |
| Hybrid Cache future direction | [09 - Future Hybrid Cache Architecture](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/09-future-hybrid-cache-architecture.md) | [10 - NuCache vs Hybrid Cache](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/10-nucache-vs-hybrid-cache.md) |
| NuCache naming, history, or migration confusion | [10 - NuCache vs Hybrid Cache](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/10-nucache-vs-hybrid-cache.md) | [13 - Reading the Cache Code](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/13-reading-the-cache-code.md) |
| Examine, Umbraco Search, indexes, and cache-adjacent querying | [11 - Examine, Indexes, and Cache-Adjacent Querying](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/11-examine-indexes-and-cache-adjacent-querying.md) | [12 - Lessons from the Issue Tracker](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/12-lessons-from-the-issue-tracker.md) |
| Known bugs, sharp edges, and issue-tracker lessons | [12 - Lessons from the Issue Tracker](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/12-lessons-from-the-issue-tracker.md) | [14 - Appendix: Sources](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/14-appendix-sources.md) |
| Reading Umbraco cache source code | [13 - Reading the Cache Code](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/13-reading-the-cache-code.md) | [14 - Appendix: Sources](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/14-appendix-sources.md) |

## Symptom Router

Use this when the user describes a symptom rather than naming a cache layer.

| Symptom | Likely first check | Relevant book path |
| --- | --- | --- |
| Page shows old HTML after publish | Response headers, output-cache tags, content-change eviction | [02 - Website Output Caching](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/02-website-output-caching.md), [04 - Cache Busting and Invalidation](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/04-cache-busting-and-invalidation.md) |
| Published content differs between servers | Server role, distributed cache messages, refresher path | [03 - Published Content Cache, AppCaches, and Load Balancing](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/03-published-cache-and-load-balancing.md), [04 - Cache Busting and Invalidation](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/04-cache-busting-and-invalidation.md) |
| Custom cached data does not clear | Cache key, notification handler, refresher, distributed broadcast | [07 - Small Local Cache Example with Tags](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/07-small-local-cache-example-with-tags.md), [04 - Cache Busting and Invalidation](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/04-cache-busting-and-invalidation.md) |
| Media or blobs appear stale | Storage provider, CDN/browser headers, media URL/versioning | [08 - Storage Providers and Media Caching](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/08-storage-providers-and-media-caching.md) |
| Search results are stale or wrong | Index state, Examine/Umbraco Search provider, reindex path | [11 - Examine, Indexes, and Cache-Adjacent Querying](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/11-examine-indexes-and-cache-adjacent-querying.md) |
| A cache issue appears after upgrade | Version, legacy NuCache naming, changed Hybrid Cache behaviour | [10 - NuCache vs Hybrid Cache](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/10-nucache-vs-hybrid-cache.md), [13 - Reading the Cache Code](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/13-reading-the-cache-code.md) |
| Warm-up, seeding, or rebuild is slow | Cache settings, seeding strategy, traversal cost | [06 - Cache Settings, Talks, and Field Notes](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/06-cache-settings-talks-and-field-notes.md), [09 - Future Hybrid Cache Architecture](https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/09-future-hybrid-cache-architecture.md) |

## Answer Shape

For most user questions, answer in this order:

1. Restate the symptom in concrete terms.
2. Name the likely cache layer and version assumption.
3. Give the short practical diagnosis or next check.
4. Explain what stores the data and what should invalidate it.
5. List the smallest evidence needed to confirm or disprove the diagnosis.
6. Link to the relevant book chapter on GitHub.
7. Link to the relevant official docs, source, or appendix entry.
8. Mention the next chapter only if it genuinely helps the user's use case.

Do not add unrelated chapter summaries, general caching theory, or every source in the appendix. If the user asks a narrow question, keep the answer narrow and well linked.

## How to Think About a Cache Question

When you ask an agent about an Umbraco cache problem, make it identify four things before it suggests a fix:

- which cache layer stores the data
- what makes the data stale
- which signal, refresher, tag, event, or message invalidates it
- whether the behaviour is local to one server or distributed across a load-balanced environment

If the answer says only "clear the cache", ask which cache and why that clear operation reaches every place stale data may exist.

## Keep the Cache Layers Separate

Do not let an answer blur these layers together:

- published-content cache
- website output cache and Content Delivery API output cache
- browser, proxy, CDN, and HTTP response cache
- media and storage-provider cache behaviour
- application-level caches such as `IAppCache`, `AppCaches`, runtime cache, request cache, and isolated caches
- distributed invalidation through refreshers, `DistributedCache`, server messengers, and cache-refresher notifications

If a paragraph says "the cache", tighten the question until the layer is unmistakable.

## Version Rules

- Treat Umbraco 17 as the primary target for the book.
- Use Umbraco 18 and `main` for relevant forward-looking changes only.
- Treat NuCache as the older published-content cache architecture.
- Treat Hybrid Cache as the active published-content cache implementation in Umbraco 17+.
- Remember that `NuCache` names can remain in settings, enum names, SQL templates, comments, and helper names even when the implementation is Hybrid Cache.
- Do not present NuCache and Hybrid Cache as equally current alternatives in Umbraco 17.

## Source Hierarchy

Prefer sources in this order:

1. Umbraco source code.
2. Microsoft official docs and blog posts for Microsoft `HybridCache`.
3. Umbraco official documentation.
4. Umbraco official blog posts.
5. High-quality secondary material such as talks, slides, PDFs, and explainer articles.
6. Local decompilation or field notes when official source is unavailable.

For implementation-specific claims, prefer source code over docs or marketing language. If evidence is partial, say so. If a statement is an inference, label it as an inference.

Important source hubs:

- Umbraco docs: <https://docs.umbraco.com/>
- Umbraco CMS source: <https://github.com/umbraco/Umbraco-CMS>
- Umbraco Storage Providers source: <https://github.com/umbraco/Umbraco.StorageProviders>
- Umbraco Search source: <https://github.com/umbraco/Umbraco.Cms.Search>
- Microsoft HybridCache docs: <https://learn.microsoft.com/en-us/aspnet/core/performance/caching/hybrid>
- Book source appendix: <https://github.com/tedlindholm/umbraco-cache-for-intelligent-dummies/blob/main/book/14-appendix-sources.md>

When possible, prefer a direct docs or GitHub source link over a vague phrase such as "the docs say".

## Useful Reader Questions

Use prompts like these when working through the book with an agent:

- "Which cache layer is involved here?"
- "What stores the value, and what invalidates it?"
- "Is this invalidation local, distributed, or both?"
- "Which Umbraco version does this claim describe?"
- "Is this NuCache history, Hybrid Cache behaviour, or legacy naming?"
- "What primary source supports this claim?"
- "Can you draw the publish, refresh, and cache-bust flow as Mermaid?"

## Fact-Checking Checklist

Before trusting an answer about Umbraco caching, check:

- It distinguishes storage from invalidation.
- Claims about Microsoft `HybridCache` come from Microsoft sources or are clearly tied to Umbraco's use of it.
- Claims about Umbraco implementation are backed by source paths, official docs, or book appendix entries.
- Umbraco 17, Umbraco 18, and `main` are not blurred together.
- NuCache naming is explained as legacy naming where appropriate.
- British English spelling is used for project-owned prose, while external API names and identifiers are preserved exactly.

## Good Diagram Targets

Ask for Mermaid diagrams when they make the explanation clearer. Good fits include:

- request paths
- invalidation paths
- publish, refresh, broadcast, and eviction flows
- timelines for architecture changes across versions
- comparison charts for NuCache versus Hybrid Cache