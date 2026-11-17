---
title: Quick Start
description: Install the SCS tools and Agent Skills, then build your first Domain with an AI assistant or with the engine directly.
---

This guide takes you from nothing to a released, compiled Domain: the rules that apply to
all of your work, or your organization's. There are two ways to do it:

- **With the Agent Skills** (most people): an AI assistant drafts the context from your
  documents and answers, and you confirm each change.
- **With the engine directly**: the same steps as `scs` commands.

Either way the result is a **Domain repository**: a git repository with the Domain
workspace in `domain/` and, later, one workspace per Project in `projects/<name>/`.

## Requirements

- Python 3.11 or later, and git
- Your source material: policies, procedures, a list of the standards you work under, and
  the people who own each area
- For the skills: Claude Code, or Claude (claude.ai) with code execution turned on

## 1. Install the tools

```bash
pip install \
  https://github.com/tim-mccrimmon/structured-context-spec/releases/download/v0.7.1/scs_validator-0.7.1-py3-none-any.whl \
  https://github.com/tim-mccrimmon/structured-context-spec/releases/download/v0.7.1/scs_tools-0.7.1-py3-none-any.whl
```

This installs both `scs` and `scs-validate` from the
[GitHub release](https://github.com/tim-mccrimmon/structured-context-spec/releases). SCS is not published on PyPI; the
`scs-tools` package there is an old, unrelated release, so don't install it. Check the
install with:

```bash
scs --version
```

To install from source instead, see the
[`tools/cli/README.md`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/tools/cli/README.md).
The skills can also install the tools for you.

## Path 1: with the Agent Skills

### Install the skills

The four skills are in the
[`skills/`](https://github.com/tim-mccrimmon/structured-context-spec/tree/main/skills)
directory of the spec repository.

**Claude Code.** Copy each skill directory to `~/.claude/skills/<skill-name>/` to use it in
all of your work, or to `.claude/skills/<skill-name>/` inside a Domain repository.

```bash
git clone https://github.com/tim-mccrimmon/structured-context-spec.git
cp -R structured-context-spec/skills/scs-* ~/.claude/skills/
```

**Claude (claude.ai).** Build the skill ZIPs, then upload each one under
**Customize > Skills** (**+**, **Create skill**, **Upload a skill**):

```bash
python skills/package.py --out dist/skills
```

Add `--wheels <dir>` to bundle the `scs-tools` and `scs-validator` wheels into the ZIPs, in
case Claude's sandbox can't reach the package index. On Team and Enterprise plans, an owner
turns on code execution and skills and can upload skills for the whole organization.

Each skill checks whether the tools are installed and new enough. If they aren't, it shows
you the install command. It installs nothing without your agreement.

### Start your Domain

In a new session, in the directory where the repository should go, ask:

```
Set up our SCS Domain.
```

`scs-domain` takes the Domain from start to finish:

| Stage | What happens |
|---|---|
| Profile | Who the context is for, the industry [ontology](/docs/specification/domain-ontology/) (`sdlc`, `cdmo`, `mca`, or `personal`), and the source documents you place in `sources/` |
| Draft | Every SCD drafted in one pass from your sources, each rule traced to where it came from, then consolidated |
| Owners and review package | You confirm who owns each section; the assistant writes an HTML review package for them |
| Review | Findings and your decisions, round by round, until the rules settle |
| Release | You name who approves; the version is tagged and compiled to `dist/` |

Before every change and every commit, the skill shows a dry run and waits for your
explicit yes. You can stop at any point. The next session starts from `scs status` and
picks up where you left off.

### Add a Project

Once the Domain has a released version, ask in a new session:

```
Add a Project for the infusion pump firmware.
```

`scs-project` follows the same stages for one piece of work, inside the same repository.
It reviews the Project against the Domain. A Project can add rules but can't loosen the
Domain's, and conflicts are recorded as questions for the Domain owner.

### Ask questions any time

`scs-explain` answers questions such as "where are we?", "where did this rule come from?",
or "what does this message mean?". `scs-validate` runs the validator and explains the
results.

## Path 2: with the engine

The engine's commands are what the skills run. Every command that changes files takes
`--dry-run`, and `--json` for machine mode.

### Create the repository

```bash
scs new domain acme --ontology cdmo --title "Acme Medical" \
    --author "Jane Doe" --email jane@acme.test
cd acme-context/domain
scs status
```

The ontology supplies the concept bundles and template SCDs. A `personal` Domain gets only
boundaries; define its other concepts with `scs add bundle <name> --new`.

### Fill in the SCDs you need, retire the rest

Each template in `context/project/` says what goes in it. Write the content as
`prohibitions`, `directives`, or `facts`:

```yaml
content:
  summary: "Design changes follow the QMS design change procedure."
  directives:
    - id: DOC-001
      directive: "Design changes require documented review and approval before implementation."
      cites:
        - std:iso-13485:2016#7.3.9
```

Edit the files, or write them through the validator, and remove the templates that don't
apply:

```bash
scs scd write context/project/document-control.yaml --from-file draft.yaml
scs bundle remove-scd scd:project:supplier-assessment scd:project:vendor-tier-approval
```

### Name the owners and approvers

Each concept bundle names an owner role, such as `owner: quality`. Record who holds each
role, and who approves versions:

```bash
scs intake set owners '{role: quality, person: Jane Doe <jane@acme.test>, title: VP Quality}'
scs intake set approvers '{person: Jane Doe <jane@acme.test>, role: VP Quality}'
scs commit -m "Draft the Domain" --author "Jane Doe <jane@acme.test>"
```

### Validate and review

```bash
scs bundle validate                                  # this workspace
(cd .. && scs-validate --strict)                     # every workspace, as CI runs it
scs view bundles/domain-bundle.yaml --allow-draft    # an HTML review package in dist/
```

Send the review package to the section owners. Fix what they find, and repeat.

### Release and compile

```bash
scs bundle release --version 1.0.0 --concept company=1.0.0 --concept prohibited=1.0.0 ... \
    --approved-by "Jane Doe <jane@acme.test>" --dry-run
```

Run it without `--concept` first to see which concept bundles need a version, then without
`--dry-run`. Each version is a git tag, such as `domain/acme-v1.0.0`, on a commit with a
snapshot and a manifest recording the approver and the content digest. Then compile:

```bash
scs compile bundles/domain-bundle.yaml --version 1.0.0    # dist/acme-1.0.0.yaml
```

The compiled artifact is a short YAML file: prohibitions first, then rules, then facts,
with the content digest as `source_digest`.

### Add a Project

```bash
cd ..
scs new project portal --author "Jane Doe" --email jane@acme.test
cd projects/portal
```

The Project has its own templates and bundle and is released and compiled the same way. It
doesn't import the Domain. At runtime both artifacts apply, Domain first.

## Use the artifacts

Each version compiles to one file in the workspace's `dist/` directory. See
[Placing an Artifact](/docs/getting-started/placement/) for where to put the Domain and
Project artifacts in common AI services. That step is yours; the SCS tools don't place
artifacts.

## See it finished

[`examples/medtech-cdmo/`](https://github.com/tim-mccrimmon/structured-context-spec/tree/main/examples/medtech-cdmo)
is a complete Domain repository with one Project, built by these commands, and
[`examples/personal/`](https://github.com/tim-mccrimmon/structured-context-spec/tree/main/examples/personal)
is a personal Domain. Both are walked through in [Examples](/docs/examples/medtech-cdmo/).

For every command and flag, see the [CLI Reference](/docs/skills/cli/).
