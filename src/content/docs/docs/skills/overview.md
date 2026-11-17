---
title: Agent Skills
description: The four SCS Agent Skills (scs-domain, scs-project, scs-validate, scs-explain), the workflow they follow, and the rules they share.
---

SCS 0.7.0 ships four skills in the open [Agent Skills](https://agentskills.io/specification)
format. With them, an AI assistant can build and maintain your context for you: it runs the
intake conversation, drafts rules, reviews them, and versions and compiles them. You confirm
every change.

The skills handle the conversation and the judgment calls. The SCS tools do every write. A
skill never edits a context file directly. It calls `scs` and `scs-validate` in
[machine mode](/docs/skills/cli/#machine-mode) and reads back what the tools report.

## The four skills

| Skill | When | What it does |
|---|---|---|
| `scs-domain` | Setup through compile | Sets up and maintains the Domain: welcome, source documents, intake, drafting, section owners, a draft review package, advisory review, versioning, and compiling. Resumes or updates from `scs status`. |
| `scs-project` | Setup through compile | Does the same for one Project, once the Domain has a released version. Reviews the Project against the Domain and records any Domain conflicts as questions for the Domain owner. |
| `scs-validate` | Any time | Runs the validator, explains the results in plain language, and proposes fixes. |
| `scs-explain` | Any time | Explains where the work stands, a workspace, where a rule came from, an artifact, or a diagnostic message. Writes a review package (`scs view`) for the people who review a bundle. |

You don't need to know which step comes next. `scs-domain` and `scs-project` each start
from `scs status` and work out where the workspace stands, so you can stop at any point and
resume in a later session. Run the Domain and each Project in separate sessions.

## How a Domain is built

`scs-domain` takes a Domain through these steps. `scs-project` follows the same pattern for a
Project.

1. **Repository.** Creates the Domain repository with `scs new domain`.
2. **Documents and intake.** Asks for your source documents, such as an AI usage policy and
   related SOPs, then a few questions at a time about your organization and the people
   involved.
3. **Draft.** Drafts every rule from the documents in one pass, each with a record of where it
   came from. Each directive is written as what the assistant does when it meets the case.
4. **Consolidate.** Merges items that say the same thing in several sections, moves reference
   material the assistant doesn't need into the SCD's uncompiled `summary`, and shows you the
   item count before and after.
5. **Section owners and a draft review package.** Proposes a person for each section's owner
   role, then offers a [review package](#review-packages) of the draft that you can share with
   those owners.
6. **Review.** Reviews the whole Domain with you, including comments from the package, checks
   the sources for clauses no rule covers yet, and repeats until nothing more changes.
7. **Release and compile.** Asks who releases the version, releases it, compiles it, and
   advises on placement.

## The rules every skill follows

These come from the [agent interface](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/spec/0.7/agent-interface.md)
section of the specification:

- **Write only through the tools.** Every change goes through an `scs` command, so it is
  validated before it's written.
- **Show a dry run, then ask.** Before every change, the skill shows what `--dry-run` reports
  and waits for your explicit yes. One yes can cover a batch of writes, such as a group of
  SCDs, once every change in it has been shown. Each commit, version, and tag gets its own yes.
- **Never choose who releases a version.** The person who releases a version is someone you
  name in the conversation. The skill never supplies one, never takes one from git
  configuration, and never records itself or the model.
- **Never report success the tools didn't report.** If a command fails, the skill shows you
  the errors in plain language before it proposes a fix.
- **Record review decisions.** When a skill raises an advisory finding, such as a conflict, a
  gap, or a vague rule, it records your decision on that finding in the intake record.
- **Stay inside the Domain repository.** A skill doesn't write anywhere else, including the
  code repositories that use the context.

## Where rules come from

Each workspace keeps an **intake record**, `intake.yaml`. It holds your answers, the
source documents you provided, the section owners, the people who release versions, and your
decisions on review findings. When a skill drafts a rule, it records the rule's origin in
`derived_from`, pointing at a source document (with an optional locator, such as a section
number) or at an intake answer. Validation checks these references. The compiler never emits
them, so they never reach the AI service.

## Section owners

Every section, meaning a concept bundle or a Project bundle that lists SCDs directly, names
the role accountable for it in its `owner` field, such as `quality` or `regulatory`. The
intake record maps each role to a person. The skills settle the owners after drafting, once
it's clear which sections there are, so the draft review package can name each section's
owner. A version can't be released until every section's owner role is mapped to a person.

## Review packages

A review package is one self-contained HTML file, written by `scs view`, for the people who
review a bundle without using git. It shows every prohibition, directive, and fact word for
word, with its source, its citations, and the exact line the AI receives, along with the
section owners and, for a Project, the rules it inherits from the Domain. For a released
version, the cover shows the content digest checked against the release. Nothing in it is
written by AI, and the same release always produces the same file. A package of unreleased
work is marked as not for approval.

The package format is a preview in 0.7.0 and is expected to change in 0.8.

## Released by, and approved elsewhere

The person named at release authorizes the version into the repository. The tools record that
person in the version manifest (the field is still called `version_approved_by` in 0.7.0).
That isn't your organization's formal approval. Where context has to be certified, for
example in a quality management system, that happens in your own system, outside SCS.

After a release, the skills tell you what that approval record should cite: the bundle ID and
version, its tag, its content digest, and optionally the review package of the released
version. The compiled artifact carries the same digest as `source_digest`, so anyone can match
a deployed artifact to the approved content. See
[governance and compliance](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/spec/0.7/governance-and-compliance.md),
section 8.

## Installing

See the [Quick Start](/docs/getting-started/quick-start/#2-install-the-skills) for Claude
Code and Claude (claude.ai). The skills use an open format, but as of 0.7.0 they have been
tried only in Claude Code and Claude. Cursor, Codex, and GitHub Copilot haven't been tried
yet; that's planned for 0.8.

The artifacts the skills produce aren't tied to one service. See
[Placing an Artifact](/docs/getting-started/placement/).

## Replacing scs-vibe and scs-team

The `scs-vibe` and `scs-team` plugins were removed in 0.7.0. They predated the 0.6 model and
wrote context into application repositories, while 0.7 keeps context in its own Domain
repository. There's no automatic conversion. To move to the skills, start a Domain with
`scs-domain` and give it your existing `CLAUDE.md` and rules files as source documents.
