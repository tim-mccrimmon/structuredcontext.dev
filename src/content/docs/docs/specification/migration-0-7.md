---
title: "Migration Guide: 0.6 → 0.7.0"
description: Upgrading SCS 0.6 content and scripts to 0.7.0. Domain repositories, re-versioning, and tool changes.
---

The specification changes in 0.7.0 are additive: SCDs and bundles written for 0.6 remain
valid. The tools change more. Context now lives in its own Domain repository, and versioning
and compiling need git. Scripts that call the tools need updating. There's no automated
`scs migrate`. These steps are the migration path.

## Steps

1. **Install the 0.7 tools.** Install the `scs-validator` and `scs-tools` wheels from the
   [GitHub release](https://github.com/tim-mccrimmon/structured-context-spec/releases) in one `pip install` (see the
   [Quick Start](/docs/getting-started/quick-start/)); SCS is not on PyPI. Python 3.11 or later and git are required.
2. **Move your context into a Domain repository.** Run `scs new domain <name>`, then
   `scs new project <name>` inside it for each Project. Copy your SCDs and concept bundles
   into the new workspaces, or rewrite them with `scs scd write`. A 0.6 workspace still
   validates, but versioning, repository validation, and `compile --version` expect the 0.7
   layout.
3. **Correct placeholder authors.** The 0.6 scaffold wrote `created_by: $USER@example.com`.
   That's now reported as `PROVENANCE_PLACEHOLDER`, and a bundle with one can't be versioned.
   Use `Name <email>`.
4. **Name section owners.** Versioning refuses a concept bundle, or a Project bundle that lists
   SCDs directly, without an owner role held by a person. Set each role with
   `scs bundle set-owner ROLE --bundle <file>`, and map it to a person with
   `scs intake set owners '{role: quality, person: Dana Reyes}'`. The email is optional for an
   owner.
5. **Version again under 0.7.** Versions made before 0.7 have no `content_digest`, so a 0.7
   root can't verify or pin them, and adding an owner changes each bundle's digest anyway.
   `scs bundle release --version 1.0.0 --concept NAME=VERSION ... --approved-by "Name <email>"`
   versions each concept bundle, pins it, and versions the root in one step. Run it without
   `--concept` to see which concept bundles need a version. `scs bundle version` and
   `scs bundle pin` still work one bundle at a time.
6. **Update scripts.** Usage errors now exit 3, not 2. `scs compile` writes to `dist/` unless
   you pass `--stdout`. `--force` and `--no-git` are gone from `scs bundle version`, and
   `scs init` is removed. Use `--json` for one structured result.
7. **CI.** Validate at the repository root with `scs-validate --strict`, and check out with
   full history and tags (`fetch-depth: 0`). `scs new domain` writes a workflow that does both.
8. **Plugins.** `scs-vibe` and `scs-team` are removed. Use the
   [Agent Skills](/docs/skills/overview/) instead.

## Other changes to know about

- **The approver is always a person,** `--approved-by "Name <email>"`, in every mode. It's
  never taken from git configuration.
- **A version is a git tag,** `<workspace>/<bundle-name>-v<version>`. Snapshot and manifest
  files are named after the bundle: `<bundle-name>-v<version>.yaml`.
- **Reserved names.** Bundles can't be named `plan`, `test-plan`, or `qa`.
- **Ontology manifest location.** `ontology/domain-manifest.yaml` is the 0.7 location. The 0.6
  location still works and is reported as information.
- **Runtime artifacts** carry `scs_runtime: '0.7'`. Rules and facts are unchanged, and the
  runtime schema still accepts `'0.6'`.
- **The sdlc scaffold** no longer includes the healthcare templates (`hipaa-compliance`,
  `chai-adherence`, `tefca-participation`). Add one with `scs add scd <name>`.
- **Released by.** The review package and the skills say "released by" for the person named at
  release. Formal approval stays in your own review or quality system, and its record should
  cite the version and its content digest.
- **Examples.** `examples/two-tier-governance/`, `examples/med-adherence/`, and
  `examples/chai-standards-bundle/` are removed, so links to them break. They remain at the
  `v0.6.0` tag. The new examples are `examples/medtech-cdmo/` and `examples/personal/`.
- **`docs/concern-docs/` is now `docs/concept-docs/`.** Links to the old path break.
- **Reproducible builds.** The engine honors `SOURCE_DATE_EPOCH` for the timestamps it writes.
  Without it, nothing changes.

The full guide, with every change, is
[`docs/MIGRATION-0.7.0.md`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/docs/MIGRATION-0.7.0.md).
