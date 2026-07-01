# AGENTS.md

## Purpose

This repository is a working book project:

- title: `Umbraco Cache for Intelligent Dummies`
- primary focus: Umbraco 17
- secondary focus: useful changes in 18 and the current `main` branch
- core theme: cache busting and invalidation matter at least as much as cache creation

The goal is not just to collect notes.

The goal is to build a beginner-friendly, fact-based book with diagrams, source-backed claims, and a clear separation between old and new cache architectures.

## Tone and language

- Use British English spelling everywhere in project-owned prose.
- Preserve external identifiers, API names, config keys, and source-code names exactly.
- Write for intelligent beginners.
- Prefer plain language over jargon when possible.
- Explain architectural trade-offs without sounding vague or hand-wavy.

## Writing principles

- Optimise for correctness first, clarity second, completeness third.
- Treat cache busting, invalidation, refresh flows, and stale-data risks as first-class topics.
- Prefer explaining systems as layers and flows rather than as isolated classes.
- Keep strong distinctions between:
  - published-content cache
  - output cache
  - browser/proxy cache
  - media/storage cache
  - distributed invalidation
- Do not blur historical and current implementations together.

## Source hierarchy

When making claims, prefer sources in this order:

1. Umbraco source code
2. Microsoft official docs and blog, when the topic is Microsoft `HybridCache`
3. Umbraco official docs
4. Umbraco official blog posts
5. high-quality secondary material such as talks, PDFs, and explainer articles
6. local decompilation notes when official source is not directly available

Rules:

- If a claim is implementation-specific, prefer code over marketing language.
- If a claim is about Microsoft `HybridCache`, treat Microsoft as a first-class source.
- Use secondary sources to explain, not to overrule primary sources.
- Be explicit when something is an inference rather than a direct statement from the source.

## Citations and evidence

- The book must have an appendix source register in `book/14-appendix-sources.md`.
- Important claims in chapters should use footnotes that point back to the appendix.
- Prefer footnoting:
  - non-obvious technical claims
  - historical claims
  - version-specific behaviour
  - performance or architecture claims
  - statements about invalidation, seeding, serializer/serialiser behaviour, and rebuild flows
- Keep chapter-local `Sources` sections only as transitional support if needed, but the appendix is the canonical source register.

## Book structure

Current chapter pattern:

- main chapters explain the system in beginner-friendly language
- Mermaid diagrams are encouraged and often expected
- appendix chapters can collect supporting material and source maps

When adding or revising chapters:

- link related chapters together where helpful
- keep the “big picture” chapter aligned with the deeper architecture chapters
- update `README.md` when a new chapter is added

## Diagrams

- Prefer Mermaid for flows, timelines, comparisons, and mental models.
- Use diagrams generously when they reduce ambiguity.
- Good diagram types for this book:
  - flowcharts
  - sequence diagrams
  - mindmaps
  - simple charts
- Diagrams should explain:
  - request flow
  - cache layer flow
  - cache-busting flow
  - rebuild flow
  - old vs new architecture

## NuCache vs Hybrid Cache

- Treat NuCache as the older published-content cache architecture.
- Treat Hybrid Cache as the newer active implementation in Umbraco 17+.
- Be careful not to present them as equally current alternatives in v17.
- Call out lingering NuCache naming where it still exists in:
  - settings
  - enum names
  - SQL template names
  - comments
  - refresh helpers

## Microsoft HybridCache guidance

When writing about Hybrid Cache:

- separate what comes from Microsoft from what Umbraco adds
- explain the Microsoft cache stack only where it helps explain Umbraco
- keep focus on what is relevant to Umbraco:
  - L1/L2 structure
  - stampede protection
  - tags
  - entry options
  - serialiser hooks

Do not overload the book with generic .NET caching advice that does not change how Umbraco works.

## What to emphasise

The book should consistently emphasise:

- cache busting is the hard part
- invalidation is central to trustworthiness
- load-balanced correctness matters
- seeding is deliberate, not magical
- broad traversal has a cost in the Hybrid Cache world
- legacy naming can survive even when the implementation has changed

## File editing rules

- Use ASCII by default.
- Keep markdown readable in raw form.
- Prefer short sections with strong headings.
- Avoid unnecessary repetition across chapters, but do repeat key distinctions when needed for beginners.

## When uncertain

- Check the source again.
- Prefer a narrower, true statement over a broader, fuzzier one.
- If the evidence is partial, say so.
- If the implementation appears transitional, explain the seam rather than forcing a false clean story.
