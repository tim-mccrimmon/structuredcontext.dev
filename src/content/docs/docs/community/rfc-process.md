---
title: RFC Process
description: How changes to the SCS specification are proposed and reviewed.
---

## RFC Process

The SCS RFC (Request for Comments) process is how significant changes to the specification
are proposed, discussed, and decided.

:::note[Early stage]
The RFC process is being formalized. This page describes the intended process — details
may evolve as we work through the first RFCs.
:::

## When to write an RFC

Write an RFC for changes that:

- Affect the core bundle or SCD format
- Change validation semantics
- Add or remove bundle types
- Would break backward compatibility

Small clarifications, typo fixes, and documentation improvements don't need an RFC — open
a pull request directly.

## How to submit an RFC

1. Fork the [spec repo](https://github.com/tim-mccrimmon/structured-context-spec)
2. Create a file at `rfcs/NNNN-short-title.md` using the RFC template
3. Open a pull request with `[RFC]` in the title
4. Discussion happens in the PR comments

## RFC template

```markdown
# RFC NNNN: Title

**Status**: Draft | Under Review | Accepted | Rejected
**Authors**: Name
**Created**: YYYY-MM-DD

## Summary

One paragraph describing the proposed change.

## Motivation

Why is this change needed? What problem does it solve?

## Detailed design

The technical details of the proposal.

## Drawbacks

What are the tradeoffs? Why might we not do this?

## Alternatives considered

What other approaches were considered?

## Open questions

What's unresolved?
```

## See also

- [Open Questions](/docs/community/open-questions/) — Known open design questions
- [Contributing](/docs/community/contributing/)
- [GitHub Discussions](https://github.com/tim-mccrimmon/structured-context-spec/discussions)
