---
title: Contributing
description: How to contribute to the Structured Context Specification.
---

## Contributing to SCS

Contributions to the Structured Context Specification are welcome.

:::tip[This is spec work]
SCS is at 0.7.0 and still evolving before 1.0. If you're working through how to give AI
consistent, approved guidance, or if you see the problem differently, that perspective is
exactly the contribution that helps most.
:::

## Ways to contribute

### Ontologies

An ontology for your industry is one of the most useful contributions. SCS ships `sdlc`,
`cdmo`, `mca`, and `personal`. If you know a field well, you can propose its concepts,
relationships, and the standard clauses they map to. Start from the nearest existing
ontology. See [Domain Ontology](/docs/specification/domain-ontology/).

### Skills, tools, and integrations

- Improvements to the Agent Skills, and reports from clients we haven't tried yet (Cursor,
  Codex, GitHub Copilot)
- The `scs-tools` and `scs-validator` packages
- Integrations that place, deliver, or verify compiled artifacts
- Corrections to the [placement guidance](/docs/getting-started/placement/) when a service
  changes

For development setup, tests, and style, see the repository's
[CONTRIBUTING.md](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/CONTRIBUTING.md).
The examples under `examples/` are rebuilt through the tools by `examples/build.py`, so a
change to an example is made in its recipe or SCDs and then rebuilt.

### Issues and discussions

- [GitHub Issues](https://github.com/tim-mccrimmon/structured-context-spec/issues): bugs,
  spec clarifications, and feature requests
- [GitHub Discussions](https://github.com/tim-mccrimmon/structured-context-spec/discussions):
  use cases, ideas, and questions

### Standards organizations

Rules in SCS cite a standard's clauses rather than reproduce its text, and ontologies can map
concepts to those clauses. If you represent a standards organization interested in how its
framework could be cited or mapped, [get in touch](mailto:info@ohana-tech.com).

## Governance

The specification is maintained by Tim McCrimmon as sole maintainer until a transition to
community governance, planned for 1.0. Design decisions are recorded in RFCs, release notes,
and the decision log in the repository. RFCs and Discussions are informative, not gating,
until then. See the [RFC process](/docs/community/rfc-process/).

## Code of conduct

Be respectful and constructive. The repository's
[Code of Conduct](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/CODE_OF_CONDUCT.md)
applies.
