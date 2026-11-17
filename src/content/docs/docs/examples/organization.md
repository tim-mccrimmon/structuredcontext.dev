---
title: Organization and Projects
description: An organization's Domain and its Projects in one SCS Domain repository, built with the scs-domain and scs-project skills.
---

This walkthrough follows an organization, Acme, from its first Domain version to its first
Project. The organization's rules apply to all of its work. Each Project adds the rules for
one piece of work. For a finished repository built the same way, see the
[Medical-Device CDMO example](/docs/examples/medtech-cdmo/).

## Who does what

| Role | Does |
|---|---|
| **Domain owner** | Runs `scs-domain`, provides the source documents, and answers the intake questions |
| **Section owners** | The people who hold each concept's owner role, such as quality or IT, and review their own sections |
| **Approver** | A named person who approves each Domain version, for example the head of quality |
| **Project lead** | Runs `scs-project` for their Project and approves its versions |

The skills never pick the approver. They ask, and they record the answer.

## 1. The Domain

The Domain owner starts a session with `scs-domain`. The skill:

1. creates `acme-context/` with `scs new domain acme`, from the ontology for the
   organization's industry, for example `sdlc` for a software company
2. reads the policies placed in `domain/sources/`, such as an AI acceptable-use policy, a
   data classification policy, or a secure development standard, and asks the profile
   questions the documents don't answer
3. drafts prohibitions, directives, and facts in one pass, each with `derived_from`
   pointing back to a document section or an answer, and proposes which templates to retire
4. proposes a person for each section owner role, records the confirmed owners, and offers
   a draft review package (`scs view --allow-draft`) to share with them
5. reviews the whole Domain with the owner, raising findings such as two rules that
   conflict or a rule too vague to apply, and records the decision on each one
6. asks who approves the version, releases it with `scs bundle release`, and compiles
   `domain/dist/acme-1.0.0.yaml`

Each change is shown as a dry run first and made only after an explicit yes.

## 2. A Project

Once the Domain has a released version, the project lead starts a separate session with
`scs-project`, which runs:

```bash
scs new project billing-api --title "Billing API"
```

The Project's workspace is created under `projects/billing-api/` in the same repository,
and it uses the Domain's ontology. The skill runs the same documents, drafting, owners, and
review stages for the Project. It also reviews the Project's rules against the Domain's. A
Project can add rules but can't loosen the Domain's. When a conflict comes up, the skill
records it as a question for the Domain owner rather than resolving it in the Project.

## 3. Applying both

The Domain and Project artifacts are compiled separately, and neither includes the other.
An AI service loads them together, Domain first. Before placing them, preview the
combination from the repository root:

```bash
scs stack domain/dist/acme-1.0.0.yaml projects/billing-api/dist/billing-api-1.0.0.yaml
```

`scs stack` lists every rule and fact with the layer it came from. It flags a directive in
one layer that refers to something another layer prohibits, and any rule text repeated
across layers. It only reads the artifacts.

For placement, the organization-wide level of each service is where the Domain goes, for
example a managed `CLAUDE.md` or organization instructions. The Project goes in the code
repository or the project's own settings. See
[Placing an Artifact](/docs/getting-started/placement/).

## 4. Changing a rule

A Domain rule changes only through a new Domain version. The owner runs `scs-domain` again.
The skill starts from `scs status` and `scs bundle diff`, which show what changed since the
released version, makes the change, reviews it, and shows the summary to the approver. Then
it releases and compiles again. Projects don't need a new version when the Domain changes,
and the Domain doesn't need one when a Project changes.

In CI, `scs-validate --strict` at the repository root checks every workspace. It also
verifies every version tag against its digest, so an edit to a released version can't go
unnoticed.

## Next steps

- [Medical-Device CDMO example](/docs/examples/medtech-cdmo/)
- [Agent Skills](/docs/skills/overview/)
