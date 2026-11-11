---
title: CLI Reference
description: The scs and scs-validate commands in SCS 0.7.0, review packages, machine mode, and exit codes.
---

`pip install "scs-tools==0.7.0"` installs two commands: `scs`, which creates and maintains
workspaces, and `scs-validate`, which checks them. Python 3.11 or later and git are
required. No `scs` command opens a network connection.

Run `scs <command> --help` for every option.

## Repository and workspaces

| Command | What it does |
|---|---|
| `scs new domain NAME` | Creates the Domain repository `NAME-context/`, with `domain/`, `projects/`, `AGENTS.md`, a CI workflow, and an initial commit. Takes `--ontology` (`sdlc`, `cdmo`, `mca`, `personal`), `--title` (the display name), `--author` and `--email` (recorded as the creator, never taken from git configuration), and `--dir`. |
| `scs new project NAME` | Creates `projects/NAME/` inside a Domain repository and commits it. Uses the Domain's ontology unless you pass `--ontology`. |
| `scs status` | Shows where each workspace stands: intake, sources, SCDs with placeholders left, review findings, section owner roles not yet mapped to a person, versions and changes since the latest one, uncommitted files, and compiled artifacts. Read-only. |
| `scs commit -m MSG --author "Name <email>"` | Commits one workspace's changes and nothing else. |

## Editing content

| Command | What it does |
|---|---|
| `scs scd write PATH --from-file FILE` | Validates an SCD and writes it only if it's valid. Use `-` to read stdin. |
| `scs add bundle NAME --new` | Creates a new concept: the concept bundle, a first empty SCD, the ontology entry, and the import. |
| `scs add bundle NAME` / `scs add scd NAME` | Adds a concept bundle or an SCD from the ontology's templates. |
| `scs bundle add-import REF` | Adds an import to a Domain or Project bundle. |
| `scs bundle add-scd SCD_ID --bundle B` | Lists an existing SCD in a bundle. |
| `scs bundle remove-scd SCD_ID...` | Retires SCDs. A concept bundle left empty is removed with its imports and ontology entry. Released versions keep the SCDs at their tags. |
| `scs bundle pin NAME --version V` | Pins an import to a released version. |
| `scs bundle set-owner ROLE --bundle B` | Names the role accountable for a section, such as `quality`. Owners go on concept bundles and on a Project bundle that lists SCDs directly. |
| `scs bundle list` / `scs bundle info` | Lists bundles, or shows one bundle in full. |

These commands edit the files as text, so comments and layout survive.

## Intake record

| Command | What it does |
|---|---|
| `scs intake set FIELD VALUE` | Sets one field of `intake.yaml`, such as an answer, a source document, a section owner (`owners`, mapping a role to a person), or a person who releases versions (`approvers`). |
| `scs intake record-finding` | Records an advisory review finding and the decision on it. Takes `--kind`, `--target`, `--finding`, `--decision`, and `--decided-by`. |

Don't edit `intake.yaml` by hand. Both commands refuse a change that would make it invalid.

## Versions

| Command | What it does |
|---|---|
| `scs bundle release -v V --concept NAME=V... --approved-by "Name <email>"` | Releases a root bundle together with the concept bundles it needs: versions each changed concept bundle, pins it, then versions the root, with one person named as releaser. Its dry run rehearses the whole release and lists every snapshot, manifest, pin, commit, and tag. If a step fails, every completed step is undone. |
| `scs bundle version -v V --approved-by "Name <email>"` | Releases one bundle. Commits the workspace, writes a snapshot and a manifest with a `content_digest`, and creates the annotated tag `<workspace>/<bundle-name>-v<version>`. |
| `scs bundle diff [--from V] [--to V\|working]` | Shows what changed between two versions, or since the latest one: SCDs, prohibitions, directives, facts, citations, and imports. |
| `scs bundle validate` | Validates the workspace's root bundle and everything it imports. |

Run `scs bundle release` without `--concept` to see which concept bundles need a new
version. To release step by step instead, version each concept bundle with `scs bundle
version --bundle`, pin it, then version the root.

The person named with `--approved-by` is the one who releases the version. It's always a named
person, and it's never taken from git configuration. Every section must have an owner role
mapped to a person before a version is released. A released version is never overwritten.
Formal approval, where your organization requires it, happens in your own system and should
cite the version and its content digest.

## Compiling, previewing, and review packages

| Command | What it does |
|---|---|
| `scs compile BUNDLE --version V` | Compiles the released version from its tag to `dist/<bundle-name>-<version>.yaml`. |
| `scs compile BUNDLE --allow-draft` | Compiles the working copy. The artifact's version becomes `DRAFT+<digest>`. |
| `scs stack ARTIFACT...` | Previews several artifacts loaded together, outermost first, and reports overlaps and conflicts. Read-only. |
| `scs view BUNDLE --version V` | Writes a review package of a released version to `dist/<bundle-name>-<version>-review.html`: one self-contained HTML file with every rule word for word, the line the AI receives, the section owners, and the content digest checked against the release. For a Project, it also shows the Domain's rules as inherited. |
| `scs view BUNDLE --allow-draft` | Writes a review package of the working copy, marked as not for approval. |

For `scs compile`, `--stdout` writes the artifact to stdout, `--format json` changes the
serialization, and `--no-cites` leaves citations out. For `scs view`, `--domain-version`
chooses the Domain version a Project's package shows (the latest released by default),
`--no-domain` leaves it out, and `--open` opens the package in a browser. The review package
format is a preview and is expected to change in 0.8.

## Validation

```bash
scs-validate --strict                          # every workspace, from the repository root
scs-validate --verify-version domain/security-v1.0.0
scs-validate --bundle domain/bundles/domain-bundle.yaml
scs validate domain/context/project/security.yaml   # one or more SCDs, through scs
```

At the root of a Domain repository, `scs-validate` checks every workspace. It also checks
every version tag against its manifest's digest, so a version edited after release is
reported. In CI, check out with full history and tags (`fetch-depth: 0`). The workflow that
`scs new domain` writes already does this.

## Machine mode

Every `scs` and `scs-validate` command accepts `--json`. In machine mode, stdout carries
exactly one result envelope with:

- `ok` and `exit_code`
- `changes`: every file created, modified, or deleted, plus commits and tags
- `diagnostics`: findings, each with a registered `code` and a `severity`
- `result`: the command's own output

Commands that write also accept `--dry-run`. A dry run reports the same `changes` without
making them. The [envelope schema](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/schema/cli/envelope-schema.json)
and the [diagnostic code registry](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/schema/diagnostics/codes.yaml)
are in the spec repository.

## Exit codes

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | Errors |
| 2 | Warnings, under `--strict` |
| 3 | Usage error |
| 4 | File error |
| 5 | Internal error |
