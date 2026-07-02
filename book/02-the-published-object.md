# 02. The Published Object — `IPublishedContent`

> **Start here.** Almost every cache in this book exists to do one of two things: *build* a published object, or *serve* one as JSON. This chapter introduces that object — `IPublishedContent` — before we cache anything. Get it straight now and the rest of the book has a spine: you will always know *what* is being cached, not just *where*.

If Chapter 1 gave you the family of caches, this chapter gives you the thing they all fuss over.

> "Umbraco cache" is a family of caches — but they nearly all serve the same guest: a published object.

Here is the one idea to carry forward:

> Content in Umbraco has two faces. There is the **write model** editors change in the backoffice, and there is the **read model** your site serves to the world. `IPublishedContent` is the read model — and it is what gets cached.

## Two faces of content: `IContent` vs `IPublishedContent`

Umbraco keeps a strict separation between editing and delivery.

- `IContent` is the **write model**. It is mutable, it knows about draft versions, and it is what the backoffice, `ContentService`, and your import scripts work with. It can be saved without being published.
- `IPublishedContent` is the **read model**. It is read-only, it represents the *published* state of a node, and it is what your templates, queries, and the Content Delivery API hand back.

You almost never cache `IContent`. You cache `IPublishedContent`, because it is the thing served on the hot path, over and over, to everyone.

## How the cache and `IPublishedContent` relate

Let us be precise about the relationship, because "the cache holds the content" is true only in a loose sense — and the loose sense is exactly where stale-content bugs like to hide.

Think of `IPublishedContent` as the **currency** the caches deal in. Different layers just hold it in different states:

- The **published content cache** is the one that genuinely deals in `IPublishedContent` objects. It is the *producer*: you ask it for a node and it hands back a live object ([Chapter 6](./06-published-cache-and-load-balancing.md)).
- The **website output cache** and the **Content Delivery API cache** never hold an `IPublishedContent` at all. They hold a *projection* of one — HTML in the first case ([Chapter 3](./03-website-output-caching.md)), JSON in the second ([Chapter 4](./04-the-content-delivery-api.md)) — rendered from a published object at some earlier moment and kept around.

So a single edited node radiates outward into several caches at once: the object itself in the content cache, its rendered HTML in the output cache, its projected JSON in the CDA cache, and maybe its fields in an Examine index ([Chapter 14](./14-examine-indexes-and-cache-adjacent-querying.md)). That is why "just clear the cache" is never a complete instruction — there is no single shelf that holds the node.

What ties those scattered copies together is the object's **key**. You resolve a published object once, and then the same GUID turns up as the invalidation handle in every other layer:

```csharp
// One published object, resolved from the published content cache…
IPublishedContent? page = umbracoHelper.Content(key);
Guid id = page!.Key;                       // its identity — a GUID

// …and that same GUID is the handle every other layer is keyed by:
//
//   published content cache   GetById(id)                        → the object
//   Content Delivery API      tag  "umb-dapi-content-" + id       → its JSON
//   website output cache      a content-change tag carrying id    → its HTML
//   Examine index             document with "__Key" == id         → its fields
//
// Invalidation is therefore "evict everything stamped with this key",
// not "wipe the cache". Miss one layer's key and that projection goes stale.
```

The picture to hold on to is a simple one: *the object has a single identity, and each cache keeps a differently-shaped copy stamped with it.* Nearly every invalidation chapter that follows is, underneath, a variation on evicting by that key ([Chapter 9](./09-cache-busting-and-invalidation.md)).

Two more things are worth knowing before we move on:

- **The cache does not hold a live object.** Apart from the in-process fast lane we will meet shortly, what is stored is a *serialised* form. Turning it back into a usable `IPublishedContent` — **materialising** it — costs real work. That cost is the subject of *Serialised, then materialised*, later in this chapter.
- **Only the published state is ever cached.** Saving a draft changes nothing downstream; cache entries appear and are invalidated at *publish*, not *save*. So if an edit is not showing up, the first question is always: was it actually published?

> **Rule of thumb.** When something is stale, do not ask "how do I clear the cache?" Ask "*which* copy of *which* published object is stale, and what key should have evicted it?" Naming the object and the key is most of the diagnosis.

## Content, media, members — and elements

`IPublishedContent` is not only pages. The same interface represents several kinds of published node:

- **documents** (pages) — routable, with a URL and a place in the content tree
- **media** — images, files, and folders from the media tree
- **members** — published member data

Sitting *underneath* `IPublishedContent` is a smaller interface, `IPublishedElement`. This is the important distinction for modern, block-heavy sites:

- `IPublishedElement` is the base: a bag of published properties with **no URL and no position in the tree**. Block List, Block Grid, and nested content items are elements.
- `IPublishedContent` **extends** `IPublishedElement` and adds the routable-node concerns: URL, path, level, `Parent`/`Children`, and publish dates.

> **Key term — element vs content.** An *element* is content that only ever lives *inside* something else (a block in a grid). *Content* is content that can stand on its own at a URL. Every piece of content is an element, but not every element is content. This is why, from Umbraco 18, elements get their own cache and their own cache-busting — covered in [Chapter 8 - NuCache vs Hybrid Cache](./08-nucache-vs-hybrid-cache.md) and flagged throughout.

## The type hierarchy the caches are built around

When you read the source, the published caches mirror this same family. Each kind of published object has its own cache interface:

```
IPublishedCache               (base: GetById, GetAtRoot, HasContent)
├── IPublishedContentCache    (documents / pages)
├── IPublishedMediaCache      (media)
├── IPublishedElementCache    (block elements — v18 only)
└── IDomainCache              (domain assignments)

IPublishedMemberCache         (members — separate hierarchy)
```

`ICacheManager` aggregates them, and it is the doorway most front-end code reaches through:[^02-hierarchy]

```csharp
public interface ICacheManager
{
    IPublishedContentCache Content { get; }
    IPublishedMediaCache Media { get; }
    IPublishedMemberCache Members { get; }
    IDomainCache Domains { get; }
    IAppCache ElementsCache { get; } // v17 low-level element bucket
    // v18 adds: IPublishedElementCache Elements
}
```

So when you call `umbracoHelper.Content(id)` and get an `IPublishedContent` back, you have just walked through `IPublishedContentCache`. The whole of [Chapter 6 - Published Content Cache, AppCaches, and Load Balancing](./06-published-cache-and-load-balancing.md) is about what happens next.

## Serialised, then materialised: the object's real cost

Here is the detail that makes `IPublishedContent` matter *to a caching book*, and it is worth slowing down for.

A cache does not store a live `IPublishedContent`. Most cache layers store a **serialised** representation — a compact blob of the node's data. Before your template can use it, Umbraco has to **materialise** it: deserialise the blob and assemble a live, property-resolving `IPublishedContent` object.

> **Key term — materialised object.** Turning raw cached data into a ready-to-use `IPublishedContent` is *materialising* it. It is not free: it involves deserialisation, property-value conversion, and wiring up the object. The whole reason Umbraco keeps a "fast lane" is to skip this step when it possibly can.

That fast lane is real and specific. In `DocumentCacheService`, Umbraco keeps a local in-process dictionary of already-built `IPublishedContent` objects.[^02-fastlane] If the same object was resolved earlier in the request, it is handed straight back — no deserialisation, no `HybridCache` lookup at all. This is the "L0" tier that becomes a first-class idea in the future architecture ([Chapter 7 - How the Hybrid Cache Engine Works](./07-hybrid-cache-engine.md)).

<div class="pdf-keep-together" style="break-inside: avoid; page-break-inside: avoid; -webkit-column-break-inside: avoid; margin: 1rem 0;">

![The cost of fetching a published node: an in-process fast-lane hit returns immediately; otherwise Umbraco checks HybridCache, falls back to the database-backed cache source if needed, deserialises the blob, materialises a live IPublishedContent, and stores it in the fast lane before returning it.](./assets/flow-published-object-cost.svg)

</div>

Read that diagram as a pipeline and you have the shape of the whole book: everything to the right of "already materialised?" is cost that caching exists to avoid.

## How you actually get one

In day-to-day code, an `IPublishedContent` reaches you through a handful of doors:

- **the ambient page** — `Model` in a Razor view, or `UmbracoContext.Content`
- **by id or key** — `umbracoHelper.Content(id)` / the content cache
- **navigation** — `.Parent`, `.Children()`, `.Ancestors()` off an object you already hold
- **querying** — `IPublishedContentQuery`, which wraps Examine and hands back `PublishedSearchResult` items, each carrying an `IPublishedContent` plus a relevance `Score`

That last door is the bridge between the *index* and the *cache*: a search finds an id, which you resolve back to a cached published object. When *finding* things is the hard part, that is the right tool — see [Chapter 14 - Examine, Indexes, and Cache-Adjacent Querying](./14-examine-indexes-and-cache-adjacent-querying.md). And a warning that recurs: walking the tree with `.Children().Where(...)` can quietly hydrate and cache every node you touch, so traversal is not the free operation it once was ([Chapter 6](./06-published-cache-and-load-balancing.md)).

## Why this object is the whole story

Once you see `IPublishedContent` as the read model, the rest of the book snaps into focus:

- The **published content cache** exists to produce these objects quickly ([Chapter 6](./06-published-cache-and-load-balancing.md)).
- **Website output caching** stores the *HTML* rendered from them ([Chapter 3](./03-website-output-caching.md)).
- The **Content Delivery API** stores the *JSON* projected from them ([Chapter 4](./04-the-content-delivery-api.md)).
- **Cache busting** is the art of throwing the cached copies away the instant the underlying published object changes ([Chapter 9](./09-cache-busting-and-invalidation.md)).

Every one of those is a different answer to the same question: *how do we avoid rebuilding this published object, or its projection, on every request — without ever serving a stale one?*

## A diagnostic worth memorising

Because `IPublishedContent` is the read model, its absence is a precise signal. If the rendered site is blank **and** `IPublishedContent` queries return nothing, the published cache itself is empty or unbuilt — a failed rebuild or missing cache files — rather than a database or routing fault. That symptom (and how to tell it apart from its neighbours) is worked through in [Chapter 11 - Cache Settings, Talks, and Field Notes](./11-cache-settings-talks-and-field-notes.md).

## In a nutshell

- Umbraco content has **two faces**: `IContent` (the mutable write model) and `IPublishedContent` (the read-only read model). Caches serve the read model.
- `IPublishedContent` covers **documents, media, and members**; it extends `IPublishedElement`, the URL-less base used for **blocks**.
- Caches store content **serialised**; turning it back into a usable object is **materialisation**, and it costs real work.
- The in-process **fast lane** in `DocumentCacheService` exists to skip that work — it is the closest, cheapest hit in the whole pipeline.
- If published queries return nothing, suspect the **published cache**, not the database.

### Three takeaways

1. Name the guest before you name the shelf: whenever you cache in Umbraco, know whether you are holding a published object, its HTML, or its JSON.
2. Materialisation — not storage — is the cost the fast lane is built to dodge.
3. Elements are content-without-a-URL, and from v18 they get their own cache and their own invalidation.

### Where to go next

- [Chapter 3 - Website Output Caching](./03-website-output-caching.md) — caching the HTML rendered from these objects.
- [Chapter 4 - The Content Delivery API](./04-the-content-delivery-api.md) — projecting these objects to JSON, and caching that.
- [Chapter 6 - Published Content Cache, AppCaches, and Load Balancing](./06-published-cache-and-load-balancing.md) — the machinery that produces the object.

## Sources

- Docs:
  - [Caching overview (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/develop-with-umbraco/caching.md)
  - [IPublishedContent (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/develop-with-umbraco/templating-and-rendering/querying/ipublishedcontent.md)
  - [IPublishedContent collections (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/develop-with-umbraco/templating-and-rendering/querying/ipublishedcontent/collections.md)
  - [IPublishedContentQuery (v17)](https://docs.umbraco.com/umbraco-cms/17.latest/develop-with-umbraco/templating-and-rendering/querying/ipublishedcontentquery.md)
- Code:
  - `umbraco-v17/src/Umbraco.Core/Models/PublishedContent/IPublishedContent.cs`
  - `umbraco-v17/src/Umbraco.Core/Models/PublishedContent/IPublishedElement.cs`
  - `umbraco-v17/src/Umbraco.Core/PublishedCache/IPublishedContentCache.cs`
  - `umbraco-v17/src/Umbraco.PublishedCache.HybridCache/Services/DocumentCacheService.cs`
  - `umbraco-v18/src/Umbraco.Core/PublishedCache/IPublishedElementCache.cs`

[^02-hierarchy]: See [C1](./17-appendix-sources.md#c1-umbraco-17-source-checkout) and [C7](./17-appendix-sources.md#c7-core-cache-types-and-refreshers) in the appendix; the same hierarchy is dissected in [Chapter 16 - Reading the Cache Code](./16-reading-the-cache-code.md).
[^02-fastlane]: See [C1](./17-appendix-sources.md#c1-umbraco-17-source-checkout) and [C4](./17-appendix-sources.md#c4-umbracopublishedcachehybridcache-on-main) in the appendix.
