---
title: Open Questions
description: Open design questions in SCS 0.7.0, and the work planned for 0.8.
---

## Open Questions

These design questions are open as of SCS 0.7.0. Most are candidates for 0.8. If you have a
view on any of them, open a discussion or draft an RFC. The full backlog, with the evidence
behind each item, is in the repository's
[`ISSUES.md`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/ISSUES.md).

## Content and format

**Who is each item for?**
Everything in an SCD compiles, so material meant for people, such as vendor qualification
steps or accountability tables, also reaches the assistant, where it adds length and can be
repeated back to users as instructions. One proposal for 0.8 is an audience marker on items:
the review package would show both kinds, and the compiler would emit only the items meant for
the assistant (ISS-064).

**How should repeated rules and artifact size be caught?**
The skills now merge repeated items before the draft review package, but that relies on the
assistant noticing. Engine support under consideration: flag near-duplicate items across a
workspace's sections, and show the item count and compiled size while drafting (ISS-066).

**Should the Project tier be renamed?**
Organization-wide rules in a Domain bundle are `scd:project:*` SCDs, because the tier
identifies who authors an SCD, not where it applies. The name is kept so that SCD IDs stay
stable. It's to be revisited only if it proves confusing in practice (ISS-041).

## Ontologies

**Should there be a universal backbone?**
Ontologies are currently templates a workspace is scaffolded from, one per industry. A
proposal for 0.8 is a small universal set of concepts, with the industry layer built during
intake rather than chosen from a fixed list (ISS-078). How an ontology is packaged and
versioned apart from a specific Domain manifest isn't yet specified.

**What should an organization with no AI policy start from?**
The skills draft from your own documents. A default starter Domain for each ontology is
proposed for organizations that have nothing to draft from yet (ISS-077).

## Review and approval

**What should the approver fields be called?**
The person named at release authorizes a version into the repository; formal approval happens
in the organization's own system. 0.7.0 says "released by" in the skills and the review
package but keeps the field names `version_approved_by` and `--approved-by`. A rename is
planned for the 0.8 RFC (ISS-074).

**Should a Project record the Domain version it was reviewed against?**
For now, `scs status` compares a Project against the Domain's latest released version. A
reference to a specific Domain version in the Project manifest is proposed (ISS-075).

**What should the review package and the effective context look like?**
The `scs view` review package is a preview in 0.7.0 and is expected to change in 0.8. A related
proposal specifies a Project's effective context, its own rules plus those it inherits from
the Domain, with provenance for each rule (ISS-079).

**What should a review checklist for a specific framework look like?**
RFC 0003, review profiles, is a stub for checklists tied to frameworks such as HIPAA or
ISO 13485. It's targeted at 0.8.0 or later and isn't yet open for review.

## Runtime and placement

**Where does SCS end?**
SCS defines the runtime artifact. How a runtime stores, selects, and injects artifacts is
outside the specification. Whether any part of delivery belongs in the specification is open.

**Where do placement facts go?**
Some rules depend on where the assistant runs, such as which tool it's in. The same artifact
goes to every placement, and SCS has no place yet to say where it was placed (ISS-065).

**How stable is placement guidance?**
The [placement guidance](/docs/getting-started/placement/) is provisional and expected to
change in 0.8, based on testing with 0.7.

## Other AI clients

**Do the skills work outside Claude?**
The skills use the open Agent Skills format, but in 0.7.0 they have been tried only in Claude
Code and Claude. Trying them in Cursor, Codex, and GitHub Copilot is deferred to 0.8 (ISS-071).
Reports from those clients are welcome.

## Foundational

The repository's [`OPEN_QUESTIONS.md`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/OPEN_QUESTIONS.md)
keeps broader questions that remain open: what must be explicit for reliable AI behavior,
where context ends and memory begins, and how much structure is enough before usability
suffers.

## Have thoughts?

- [Open a discussion](https://github.com/tim-mccrimmon/structured-context-spec/discussions)
- [Read the RFC process](/docs/community/rfc-process/)
- [Contributing guide](/docs/community/contributing/)
