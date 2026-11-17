---
title: SCD Format
description: Structured Context Documents in SCS 0.7.0. Prohibitions, directives, facts, citations, and item provenance.
---

A Structured Context Document (SCD) is a YAML file that covers one topic. Think of it as one
page of a handbook: it can be reviewed and changed on its own.

## Structure

```yaml
id: scd:project:design-change-control
type: project
title: Design Change Control
version: "DRAFT"
description: Review and approval of design changes.
concept: concept:design-controls        # optional: the ontology concept it realizes

content:
  summary: Design changes follow the QMS design change procedure.
  prohibitions:
    - id: DCC-P01
      kind: practice
      subject: implementing a design change before its review is recorded
  directives:
    - id: DCC-001
      directive: Design changes require documented review and approval before implementation.
      cites:
        - std:iso-13485:2016#7.3.9
      derived_from:
        - source: doc-qm
          locator: "section 7.3.9"
  facts:
    - id: DCC-F01
      fact: Design change records are kept in the electronic QMS.

provenance:
  created_by: "Name <email>"
  created_at: "2026-10-01T09:00:00Z"
  rationale: Initial version
```

## Content that compiles

| List | Item fields | Compiles as |
|---|---|---|
| `prohibitions` | `id`, `kind` (`tool` or `practice`), `subject`, optional `instead`, `reason`, `cites` | `Prohibited: <subject>.` rules, listed first |
| `directives` | `id`, `directive`, optional `cites` | Rules |
| `facts` | `id`, `fact`, optional `cites` | Facts |

Item IDs are unique within the SCD. The compiled ID is `<bundle>/<scd-name>/<id>`. An SCD
with none of the three lists contributes nothing to the artifact, which validation reports as
information (`SCD_EMPTY`).

Other content, such as a summary, rationale, or decisions, is for the people who maintain
the context and isn't compiled.

## Item provenance

`derived_from` records where an item came from. Each entry has exactly one of `intake` (an
answer ID in the workspace's `intake.yaml`) or `source` (a source document ID), plus an
optional `locator`. Validation warns when an ID doesn't resolve. The compiler never emits
`derived_from`.

The SCD-level `provenance` block records who created the SCD. `created_by` must name a
person, team, or organization. Placeholder values such as addresses at `example.com` are
reported, and a bundle that has one can't be versioned.

## Concepts and relationships

An SCD links to the concept it realizes only through its `concept` field, which is expected
for an SCD in a concept bundle. Its `relationships` (`depends-on`, `constrains`, `satisfies`,
`refines`, `extends`, `conflicts-with`, `implements`) target other SCDs, or a citation for
`satisfies`, never a `concept:` ID. A link between two concepts is declared once, in the
[Domain Ontology](/docs/specification/domain-ontology/). The validator says so when an SCD
relationship targets a concept.

## Tiers

- `scd:meta:*`: the meta bundle, published with the specification
- `scd:project:*`: everything an adopter writes, including organization-wide rules in a
  Domain bundle. The tier identifies who authors the SCD, not where it applies.
- `scd:standards:*`: deprecated since 0.6.0. Use [citations](/docs/specification/citations/).

## Writing SCDs

Write SCDs through the engine, `scs scd write PATH --from-file FILE`, which validates
before writing. Or let the [skills](/docs/skills/overview/) draft them for you.

Full text: [`spec/0.7/core-model.md`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/spec/0.7/core-model.md)
