---
title: Domain Ontology
description: The Domain Ontology. Concepts, taxonomy, and typed relationships that organize a domain's context, with satisfies mappings to standard citations.
---

The **Domain Ontology**, introduced in SCS 0.5.0, is a structured model of the concepts
that organize a domain's work, how those concepts relate to each other, and which standards
each one satisfies. It replaced the flat `concerns` list from SCS 0.3.

Adopting SCS starts with choosing an ontology for your industry. It's the template your
Domain is scaffolded from, not something you write from a blank page.

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
type `satisfies` — mapping it to the [standard citations](/docs/specification/citations/)
it exists to address, such as `std:iso-14971:2019`. (Before 0.6.0, `satisfies` targeted
standards-tier SCDs; those IDs still validate, with a deprecation warning.) In a
regulated domain, this is what makes framework coverage machine-answerable.

Depth is optional. The smallest valid Domain Ontology is a flat list of concept names —
exactly what `concerns` was, minus the name. A domain adds taxonomy and relationships
incrementally as it matures.

## The `concept` field on SCDs

An SCD can declare the concept it realizes, and it's expected to when it lives in a concept
bundle:

```yaml
id: scd:project:hazard-analysis-procedure
type: project
concept: concept:risk-management
```

This field is the only link from an SCD to its concept. An SCD's `relationships` target other
SCDs or citations, never `concept:` IDs. A link between two concepts is declared once, here in
the ontology, under `concepts[].relationships`. When an SCD relationship targets a `concept:`
ID, the validator's message points to the ontology and the SCD's `concept` field.

## Concept bundles

`type: concept` replaces `type: concern` for bundles of functional areas. The structural
rules carry over unchanged: a concept bundle must not import other bundles and must contain
at least one SCD. A domain bundle still imports one or more concept bundles and contains no
direct SCDs.

Each concept bundle is a section with an `owner`, the role accountable for it. Ontology
templates give each concept a default role, and the workspace's intake record names the person
who holds it. See [Bundle Format](/docs/specification/bundle-format/#section-owners).

## Ontologies

Four ontologies ship with SCS 0.7.0:

| Ontology | For |
|---|---|
| **SDLC** (`sdlc`, the default) | Software development businesses |
| **Medical-Device CDMO** (`cdmo`) | Regulated medical-device contract manufacturers |
| **Merchant Cash Advance** (`mca`) | Business funding and merchant cash advance |
| **Personal** (`personal`, new in 0.7.0) | One person's own guidance |

The MCA ontology is best-practice AI governance rather than a compliance mapping, so it
carries relationships but no `satisfies`. The `personal` ontology has one fixed concept,
boundaries (the `prohibited` concept bundle). You define the others yourself.

An ontology is authored once per type of business, not once per company. An organization's
Domain bundle is the ontology's template with the organization's decisions filled in and
approved. The organization starts from the template rather than importing it, because the
template's skeleton SCDs hold open decisions, not rules. Concepts are domain-scoped: two
companies in the same market each start from the same ontology rather than importing each
other's concepts.

## Scaffolding

`scs new domain NAME --ontology <model>` scaffolds a Domain workspace with that ontology's
concept bundles and SCD templates. `scs new project` uses the Domain's ontology unless you
pass `--ontology`. Each ontology provides one template set for a Domain and one for a
Project. Remove what doesn't apply, and add new concepts with
`scs add bundle NAME --new --owner ROLE`.

In a Domain repository, the ontology manifest is at `ontology/domain-manifest.yaml` in each
workspace.

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
          - std:iso-14971:2019
        bundle: bundle:risk-management:0.1.0
```

The full example, including all 12 CDMO concepts and their relationships, is
[`schema/domain/examples/medical-device-cdmo-domain.yaml`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/schema/domain/examples/medical-device-cdmo-domain.yaml).
For a Domain repository built from this ontology, see the
[MedTech CDMO example](/docs/examples/medtech-cdmo/).

## Next steps

- [Specification Overview](/docs/specification/overview/)
- [Bundle Format](/docs/specification/bundle-format/)
- [Citations](/docs/specification/citations/)
- [Migration Guide: 0.3 → 0.5.0](/docs/specification/migration-0-5/)
- Full text: [`spec/0.7/domain-ontology.md`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/spec/0.7/domain-ontology.md)
