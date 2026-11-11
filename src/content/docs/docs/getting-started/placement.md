---
title: Placing an Artifact
description: Where to put compiled SCS Domain and Project artifacts in common AI services. Provisional guidance for SCS 0.7.0.
---

:::caution[Provisional]
This guidance was checked against each vendor's documentation on 2026-10-28. AI services
change often, and this guidance is expected to change in SCS 0.8. Check the vendor's current
documentation before relying on it.
:::

SCS ends at the approved version and its compiled
[runtime artifact](/docs/specification/runtime-artifact/). Where you place that file is
your decision. The SCS tools don't place it for you.

## Two artifacts, two places

- A **Domain** artifact governs all of an owner's work, whether the owner is an organization
  or one person. Place it at the broadest level that covers all of that owner's work, and
  nothing else.
- A **Project** artifact governs one project. Place it at the level that covers only that
  project.

Each artifact is compiled separately, and neither includes the other. They're meant to be
loaded together: the Project inherits the Domain's rules at runtime.

## Where each one goes

| Service | Domain (organization) | Domain (one person) | Project |
|---|---|---|---|
| Claude Code | Managed policy `CLAUDE.md` | `~/.claude/rules/<bundle>.md` | `.claude/rules/scs-<bundle>.md` in the code repository |
| Claude (claude.ai) | Organization instructions (3,000-character limit) | Instructions for Claude | Project instructions |
| ChatGPT Enterprise | Workspace instructions (unconfirmed) | Custom instructions | Project instructions; `AGENTS.md` for Codex |
| GitHub Copilot | Organization custom instructions | `~/.copilot/copilot-instructions.md` | `.github/copilot-instructions.md` |
| Cursor | An enforced Team Rule | User Rules | `.cursor/rules/scs-<bundle>.mdc` with `alwaysApply: true` |

Size limits differ widely. Some fields hold only a few thousand characters, which is less
than a small Domain artifact. Claude's organization instructions, for example, are limited
to 3,000 characters, while the MedTech example's Domain artifact,
[`domain/dist/medtech-1.0.0.yaml`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/examples/medtech-cdmo/medtech-context/domain/dist/medtech-1.0.0.yaml),
is about 4,000 bytes. If an artifact doesn't fit, render a compact form that keeps the
identity and every rule with its ID. Don't drop rules silently; if it still doesn't fit,
that is a decision for the bundle's owner.

Each service has other details that matter: which surfaces read which level, and how
conflicts are resolved. The full pages, with sources, are in the spec repository under
[`docs/placement/`](https://github.com/tim-mccrimmon/structured-context-spec/tree/main/docs/placement).

## Keep the identity in any rendering

Some settings fields accept only Markdown or plain text. If you render the artifact instead
of pasting the YAML as-is, keep these parts:

- the bundle `id`, `type`, and `version`
- the `source_digest`
- the self-identification rule, as the first rule
- each rule and fact `id`

With these, you or an auditor can match a rendering to the exact version it came from.
You can also ask the agent which governance bundles are active. Where a service accepts a
Markdown file, the YAML inside a fenced code block is often the least lossy form.

A `DRAFT` artifact has no `source_digest`, and its version is `DRAFT+<digest>`. Use it for
trying things out, not where other people rely on it.

## What placement does and doesn't guarantee

Each of these services treats instruction files as context, not as enforcement. None of the
documentation checked promises that the model will follow every instruction. Several warn
that conflicting instructions may be followed unpredictably, which is one reason the
`scs-project` skill reviews a Project against its Domain.

SCS gives you a clear record of what was approved and supplied. It doesn't guarantee model
behavior.

## Preview a stack

Once you know which artifacts a service loads together, `scs stack` shows what a session
receives. List the artifacts outermost first:

```bash
scs stack ~/jlee-context/domain/dist/jlee-1.0.0.yaml \
          domain/dist/medtech-1.0.0.yaml \
          projects/infusion-pump-fw/dist/infusion-pump-fw-1.0.0.yaml
```

Here a consultant's own Domain is outermost, then the client's Domain, then the client's
Project, run from the client's Domain repository. The paths are those of the
[examples](/docs/examples/medtech-cdmo/).

It lists every rule and fact with the layer it came from. It also reports a bundle that
appears in two layers, a directive that refers to something another layer prohibits,
identical text in two layers, and `DRAFT` layers. It only reads the artifacts: it never
merges or drops a rule.
