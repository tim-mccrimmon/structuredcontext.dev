---
title: Domain Ontology
description: The Domain Ontology (SCS 0.5.0) — concepts, taxonomy, and typed relationships that replace the flat "concern" list.
---

The **Domain Ontology** is the headline feature of SCS 0.5.0. It replaces the flat
`concerns` list from SCS 0.3 with a structured model of the concepts that organize a
domain's work, how those concepts relate to each other, and which standards each one
satisfies.

SCS 0.5.0 is a breaking change from 0.3. See the
[migration guide](/docs/specification/migration-0-5/) if you have 0.3 content.

## Why it replaced "concern"

A 0.3 domain manifest's `concerns:` list did two jobs at once without being structured for
either: it was the domain's table of contents (which bundles exist), and — implicitly — its
conceptual model (what matters, and how those things relate). The second job never had real
structure: no relationships between concerns, no taxonomy, and no mapping from a concern to
the regulatory clause it existed to satisfy.

That mapping matters most in regulated domains, where "does our context cover IEC 62304
§5.1?" needs to be a machine-answerable question rather than something answered by reading
prose. The original `concerns` list was also never truly domain-neutral — it was the
Software Development (SDLC) shape wearing a generic name. A Medical-Device CDMO engagement
needed risk management, design controls, and supplier qualification — concepts the SDLC
list had no home for — and lost its regulatory mapping when forced into that shape. A
Business Funding engagement was a third, distinct market with no existing framework to
align to. A single fixed list couldn't serve all three.

## The hierarchy

The Domain Ontology introduces a new hierarchy:

```
Project → Domain → Concept → SCD
```

## What's in an ontology

A Domain Ontology lives in the domain manifest, in an `ontology` block, with three parts:

- **Concepts** — named categories of domain knowledge (`concept:risk-management`,
  `concept:design-controls`, …), replacing "concerns."
- **Taxonomy** — an optional parent/child hierarchy. A concept MAY declare a `parent`
  that's another concept in the same domain; the parent graph must be acyclic.
- **Relationships** — an optional, small, fixed set of typed edges between concepts:
  `depends-on` and `relates-to`. `depends-on` means the source concept's context assumes
  the target's is established; `relates-to` is a weak, non-directional, navigational
  association.

A concept can also carry a `satisfies[]` list — shorthand for a `relationships` entry of
type `satisfies` — mapping it to the standards-tier SCDs it exists to address. In a
regulated domain, this is what makes framework coverage machine-answerable.

Depth is optional. The smallest valid Domain Ontology is a flat list of concept names —
exactly what `concerns` was, minus the name. A domain adds taxonomy and relationships
incrementally as it matures.

## Concept bundles

`type: concept` replaces `type: concern` for bundles of functional areas. The structural
rules carry over unchanged: a concept bundle must not import other bundles and must contain
at least one SCD. A domain bundle still imports one or more concept bundles and contains no
direct SCDs.

## Reference ontologies

Three reference ontologies ship with 0.5.0, one per type of business:

| Ontology | Concepts | For |
|---|---|---|
| **SDLC** | 11 | Software development businesses — the original baseline |
| **Medical-Device CDMO** | 12 | Regulated medical-device contract manufacturers |
| **Merchant Cash Advance (MCA)** | 16 | Business funding / merchant cash advance |

The MCA ontology's 16 concepts span three clusters — MCA-native, infrastructure, and a
universal AI-governance layer. It's best-practice AI governance rather than a compliance
mapping, so it carries relationships but no `satisfies`.

An ontology is authored once per type of business (a market/industry vertical), not once
per company. Two companies in the same market each instantiate the same ontology model
rather than sharing concepts across domains — concepts are domain-scoped, not shared across
domains.

## Scaffolding

`scs new project --ontology mca` scaffolds the full MCA ontology directly: 16 concept
bundles, 16 SCDs, and a domain manifest with real `depends-on`/`relates-to` relationships.
`--ontology sdlc` is the default and is unchanged from prior behavior.

**CDMO scaffolding is deferred.** The CDMO reference ontology ships with 0.5.0, but
`scs new project --ontology cdmo` isn't wired up yet — the CDMO ontology's concept bundles
reference SCD content that hasn't been authored, unlike MCA, which had existing skeleton
content to adapt. The `--ontology` flag will extend to CDMO once that content exists.

## Example: Medical-Device CDMO domain manifest

An excerpt from the reference example:

```yaml
domain:
  id: "domain:medical-device-cdmo"
  name: "Medical-Device CDMO"
  version: "0.1.0"

  ontology:
    concepts:
      - id: concept:business-context
        name: Business Context
        description: >
          Objectives and business case, scope boundaries, measurable success
          criteria, and client/program context for a CDMO engagement.
        bundle: bundle:business-context:0.1.0

      - id: concept:risk-management
        name: Risk Management
        description: >
          The risk register, risk-to-requirement-to-controlling-deliverable
          traceability, data-integrity risk controls, and risk-acceptability
          criteria per ISO 14971.
        relationships:
          - type: relates-to
            target: concept:compliance-governance
        satisfies:
          - scd:standards:iso-14971
        bundle: bundle:risk-management:0.1.0
```

The full example, including all 12 CDMO concepts and their relationships, is in
`schema/domain/examples/medical-device-cdmo-domain.yaml` in the spec repo.

## Next steps

- [Specification Overview](/docs/specification/overview/)
- [Bundle Format](/docs/specification/bundle-format/)
- [Migration Guide: 0.3 → 0.5.0](/docs/specification/migration-0-5/)
- [View full spec on GitHub](https://github.com/tim-mccrimmon/structured-context-spec)
