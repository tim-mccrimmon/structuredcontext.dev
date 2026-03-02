---
title: Open Questions
description: Known open design questions in the SCS specification.
---

## Open Questions

These are known open design questions in SCS v0.3. If you have thoughts on any of them,
open a discussion or draft an RFC.

## Format and structure

**Should SCDs use YAML or support JSON as an alternative?**
YAML is the current format. JSON support would improve interoperability with tooling that
expects JSON, but adds complexity to validators.

**How granular should SCD content be?**
Current guidance is intentionally broad. Finer-grained SCD schemas would enable more
precise validation but constrain how teams express context.

## Bundle types

**Is the five-type hierarchy the right model?**
The current types (Meta, Standards, Domain, Concern, Project) reflect enterprise use cases.
Lighter-weight structures may be more appropriate for small teams and solo developers.

**Should there be a "team" bundle type between Domain and Project?**
The current hierarchy skips from company-level (Domain) to project-level (Project). Some
teams have argued for an intermediate layer for product lines or departments.

## Plugins and tooling

**How should plugins signal which SCS version they target?**
scs-vibe and scs-team currently don't declare version compatibility. This matters as the
spec evolves.

**Should context files be encrypted at rest?**
Some compliance contexts (healthcare, finance) have sensitivity requirements. The current
spec puts everything in plaintext in git.

## Have thoughts?

- [Open a discussion](https://github.com/tim-mccrimmon/structured-context-spec/discussions)
- [Read the RFC process](/docs/community/rfc-process/)
- [Contributing guide](/docs/community/contributing/)
