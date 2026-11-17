---
title: RFC Process
description: How changes to the SCS specification are proposed and reviewed.
---

## RFC Process

The SCS RFC (Request for Comments) process is how significant changes to the specification
are proposed, discussed, and decided.

:::note[Before 1.0]
Until the transition to community governance planned for 1.0, RFCs are informative, not
gating. The maintainer decides, and records the reasoning in the RFC's amendments and the
release notes.
:::

## RFCs so far

| RFC | Title | Status |
|---|---|---|
| [0001](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/rfcs/RFC-0001-domain-ontology.md) | Domain Ontology | Accepted 2026-09-21, shipped in 0.5.0 |
| [0002](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/rfcs/RFC-0002-agent-mediated-scs.md) | Agent-mediated SCS | Accepted 2026-10-25, shipped in 0.7.0 |
| [0003](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/rfcs/RFC-0003-review-profiles.md) | Review profiles | Stub, targeted at 0.8.0 or later |

The `rfcs/` directory also holds [0.8.DRAFT: Plan Development](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/rfcs/0.8.DRAFT-plan-development.md),
a draft amendment cut back from RFC 0002 and kept as a starting point for 0.8. It isn't an RFC
yet.

## When to write an RFC

Write an RFC for changes that:

- Add SCD tiers or bundle types
- Change the core schemas, or add a required field
- Change relationship or validation semantics
- Would break backward compatibility

Small clarifications, typo fixes, additional examples, and schema bug fixes don't need an
RFC. Open a pull request directly. If you're not sure, start a discussion first.

## How to submit an RFC

1. Open a [GitHub Discussion](https://github.com/tim-mccrimmon/structured-context-spec/discussions)
   in the Ideas category to see whether an RFC is appropriate
2. Fork the [spec repo](https://github.com/tim-mccrimmon/structured-context-spec) and copy
   `rfcs/0000-template.md` to `rfcs/0000-my-feature.md`
3. Open a pull request titled `RFC: <your title>`. The maintainer assigns a number.
4. Discussion happens in the PR comments, for at least two weeks
5. Within four weeks of the PR opening, the maintainer accepts, rejects, or defers the RFC,
   or asks for changes. An accepted RFC is merged and gets a tracking issue.

## RFC template

Start from [`rfcs/0000-template.md`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/rfcs/0000-template.md).
Its sections are:

```markdown
# RFC 0000: Title

- **Start Date**: YYYY-MM-DD
- **RFC PR**: (filled in by the maintainer)
- **Tracking Issue**: (filled in when the RFC is accepted)
- **Author(s)**: Your Name (@github-username)

## Summary
## Motivation
## Guide-level Explanation
## Reference-level Explanation
### Schema Changes
### SCD Examples
### Validation Rules
## Drawbacks
## Alternatives
## Unresolved Questions
## Future Possibilities
## Appendix (Optional)
```

## See also

- [Open Questions](/docs/community/open-questions/): known open design questions
- [Contributing](/docs/community/contributing/)
- [GitHub Discussions](https://github.com/tim-mccrimmon/structured-context-spec/discussions)
