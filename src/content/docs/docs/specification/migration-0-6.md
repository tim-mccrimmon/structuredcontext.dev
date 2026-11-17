---
title: "Migration Guide: 0.5 → 0.6.0"
description: Upgrading SCS 0.5.0 content to 0.6.0. Splitting Domain and Project bundles and replacing standards with citations.
---

SCS 0.6.0 changes how governance context is organized, and it's a breaking change from
0.5.0. There's no automated `scs migrate`. These steps are the full migration path. After
them, continue with the [0.6 → 0.7.0 guide](/docs/specification/migration-0-7/).

## What changed

| | 0.5.0 | 0.6.0 |
|---|---|---|
| Project bundle imports | MUST import meta, standards, and domain bundles | MAY import concept bundles. MUST NOT import meta, standards, domain, or project bundles. |
| Domain bundle | An industry vertical, imported by projects | An organization's governance, independent of projects |
| Meta bundle | Copied into every project | Published with the spec, pinned by the Domain bundle |
| Standards bundles and `scd:standards:` SCDs | Supported | Deprecated (warning). Use citations. |
| `satisfies` targets | `scd:standards:` IDs | `std:` citations |

## Steps

1. **Split organization rules from project context.** Rules that apply to the whole
   organization, such as AI usage policy, data boundaries, and QMS rules, move to the
   organization's Domain bundle, in concept bundles. Context for one project stays in its
   Project bundle.
2. **Rewrite the Project bundle.** Remove its meta, standards, and domain imports. Either
   import its concept bundles or list its SCDs directly, not both.
3. **Create or update the Domain bundle.** Pin the published meta bundle and import the
   organization's concept bundles. If your 0.5.0 Domain bundle was an industry template, fill
   in its skeleton SCDs with your organization's decisions.
4. **Replace standards with [citations](/docs/specification/citations/).** Add `cites` to
   the SCDs whose rules implement each standard, move genuine organization rules into
   project-tier SCDs, and remove standards bundles from every import.
5. **Update domain manifests.** Change `satisfies` targets from `scd:standards:...` to
   `std:...`, and remove `schemas.standards`.
6. **Validate** each bundle. Deprecation warnings point at whatever remains.
7. **Write directives, prohibitions, and facts, then compile** (optional). See
   [Runtime Artifact](/docs/specification/runtime-artifact/).

The full guide is
[`docs/MIGRATION-0.6.0.md`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/docs/MIGRATION-0.6.0.md).
