---
title: Medical-Device CDMO
description: A Domain repository for a fictional medical-device contract manufacturer, with one firmware Project, rules that cite ISO 13485 and IEC 62304, and the compiled artifacts.
---

This example is the Domain repository in the spec repository at
[`examples/medtech-cdmo/`](https://github.com/tim-mccrimmon/structured-context-spec/tree/main/examples/medtech-cdmo).
It belongs to MedTech CDMO, a fictional contract developer and manufacturer of medical
devices that works under ISO 13485 and 21 CFR Part 820. The repository holds the
organization's Domain and one Project, the firmware for an infusion pump. Each is released
as version 1.0.0 and compiled.

The repository, `medtech-context/`, is built by the engine from
[`recipe.yaml`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/examples/medtech-cdmo/recipe.yaml),
using the same commands the [skills](/docs/skills/overview/) run. It is checked in without
its `.git` directory. See
[`examples/README.md`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/examples/README.md)
for how it is built.

## The two workspaces

| Workspace | Bundle | SCDs | Compiled artifact |
|---|---|---|---|
| `domain/` | `bundle:medtech` 1.0.0 | 7, in 6 concepts | [`domain/dist/medtech-1.0.0.yaml`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/examples/medtech-cdmo/medtech-context/domain/dist/medtech-1.0.0.yaml) |
| `projects/infusion-pump-fw/` | `bundle:infusion-pump-fw` 1.0.0 | 2, in 2 concepts | [`projects/infusion-pump-fw/dist/infusion-pump-fw-1.0.0.yaml`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/examples/medtech-cdmo/medtech-context/projects/infusion-pump-fw/dist/infusion-pump-fw-1.0.0.yaml) |

The Domain was created with `scs new domain medtech --ontology cdmo --title "MedTech CDMO"`.
The `cdmo` ontology supplies a template SCD for each concept a regulated manufacturer is
likely to need. The templates that didn't apply, such as supplier qualification, training,
and security, were retired with `scs bundle remove-scd`. The Domain bundle imports the
published meta bundle and six concept bundles, and holds no SCDs of its own:

```yaml
# domain/bundles/domain-bundle.yaml
id: bundle:medtech
type: domain
imports:
  - bundle:meta:0.6.0
  - bundle:company:1.0.0
  - bundle:prohibited:1.0.0
  - bundle:compliance-governance:1.0.0
  - bundle:qms-records:1.0.0
  - bundle:data-provenance:1.0.0
  - bundle:ai-accountability:1.0.0
scds: []
```

The Project bundle imports its own two concept bundles, `system-architecture` and
`verification-validation`. It doesn't import the Domain bundle. The Project inherits the
Domain's rules at runtime, and the two are compiled separately.

## Owners and approvers

Each concept bundle names the role accountable for it, such as `owner: quality` on
`qms-records`. `domain/intake.yaml` records who holds each role and who approves versions:

| Role | Person |
|---|---|
| executive | Morgan Chen, CEO |
| ai-governance | Dana Reyes, VP Quality |
| regulatory | Sam Okafor, Director of Regulatory Affairs |
| quality | Dana Reyes, VP Quality |
| it | Lee Park, IT Director |

Dana Reyes approves Domain versions. In the Project, Ravi Iyer, the firmware lead, holds the
`engineering` role and approves Project versions.

## Rules that cite the standard

`domain/context/project/document-control.yaml`, in the `qms-records` concept:

```yaml
id: scd:project:document-control
type: project
title: "Document Control"
concept: concept:qms-records
content:
  summary: "Design changes and design reviews follow the QMS procedures; controlled documents live in the eQMS."
  directives:
    - id: DOC-001
      directive: "Design changes require documented review and approval before implementation."
      cites:
        - std:iso-13485:2016#7.3.9
    - id: DOC-002
      directive: "Do not describe a design change as approved unless the approval record is identified."
    - id: DOC-003
      directive: "A design review record must identify the design under review, the participants, and the date of the review."
      cites:
        - std:iso-13485:2016#7.3.5
  facts:
    - id: DOC-F01
      fact: "Controlled documents and design history files are kept in the electronic quality management system, not in shared drives or source repositories."
```

The SCD holds the company's own rule and cites the clause it addresses. It doesn't
reproduce the standard's text. The company's quality system is the authoritative
interpretation, and the citation records which requirement the rule is meant to address.
See [Citations](/docs/specification/citations/).

Prohibitions are written separately, in `domain/context/project/prohibited.yaml`, and each
can name an alternative:

```yaml
content:
  prohibitions:
    - id: NO-001
      kind: tool
      subject: "consumer generative AI services and personal AI accounts"
      instead: "the company's approved AI service"
      reason: "Client data may not leave company-controlled systems."
```

## The compiled Domain artifact

An excerpt from `domain/dist/medtech-1.0.0.yaml`, which is about 4,000 bytes in full.
Prohibitions compile first, as `Prohibited: <subject>.`, then the meta bundle's three rules,
then the directives. Facts follow in a separate list.

```yaml
scs_runtime: '0.7'
id: bundle:medtech
type: domain
version: 1.0.0
source_digest: sha256:37b363d86eefc4006a2cacc1669877501e7fcb21b42915e8e45d60b5119b2f57
title: MedTech CDMO Governance
sources: ['bundle:meta:0.6.0', 'bundle:company:1.0.0', 'bundle:prohibited:1.0.0', 'bundle:compliance-governance:1.0.0', 'bundle:qms-records:1.0.0', 'bundle:data-provenance:1.0.0', 'bundle:ai-accountability:1.0.0']
rules:
- id: medtech/identity
  rule: 'When asked which governance bundles are active, state: "Domain bundle bundle:medtech version 1.0.0".'
- id: medtech/prohibited/NO-001
  rule: 'Prohibited: consumer generative AI services and personal AI accounts. Use instead: the company''s approved AI service.'
- id: medtech/prohibited/NO-003
  rule: 'Prohibited: open-source components under GPL or AGPL licenses in device software.'
- id: medtech/governance-context/M-002
  rule: When a rule leads you to decline, limit, or change what you do, name the rule id.
- id: medtech/document-control/DOC-001
  rule: Design changes require documented review and approval before implementation.
  cites: ['std:iso-13485:2016#7.3.9']
- id: medtech/client-program-segregation/CPS-001
  rule: Treat each client's information as confidential to that client. Do not use one client's information in work for another client.
- id: medtech/human-authority/HA-001
  rule: Treat everything you produce as a draft. A qualified person must review and approve AI-generated content before it enters a controlled document, the design history file, or device software.
facts:
- id: medtech/regulatory-applicability/RA-001
  fact: MedTech CDMO's quality management system is certified to ISO 13485:2016.
  cites: ['std:iso-13485:2016']
- id: medtech/regulatory-applicability/RA-002
  fact: The quality management system operates under 21 CFR Part 820 (QMSR).
  cites: ['std:21-cfr-820']
```

The `source_digest` is the content digest recorded in the version's manifest,
`domain/bundles/medtech-v1.0.0-MANIFEST.yaml`, along with the approver and the git tag
`domain/medtech-v1.0.0`.

## The compiled Project artifact

`projects/infusion-pump-fw/dist/infusion-pump-fw-1.0.0.yaml`, in full:

```yaml
scs_runtime: '0.7'
id: bundle:infusion-pump-fw
type: project
version: 1.0.0
source_digest: sha256:143a9bce0c061ee0974dbba934e8b6f52dcc1fdaa839ea252a9e69a757be0222
title: Infusion Pump Firmware Governance
sources: ['bundle:system-architecture:1.0.0', 'bundle:verification-validation:1.0.0']
rules:
- id: infusion-pump-fw/identity
  rule: 'When asked which governance bundles are active, state: "Project bundle bundle:infusion-pump-fw version 1.0.0".'
- id: infusion-pump-fw/architecture-constraints/AC-001
  rule: The pump firmware is IEC 62304 software safety class C. Treat every firmware change as safety-relevant.
  cites: ['std:iec-62304:2006-a1#4.3']
- id: infusion-pump-fw/architecture-constraints/AC-002
  rule: Do not propose removing or weakening an alarm, interlock, or dose limit check. Refer such requests to the risk management lead.
  cites: ['std:iso-14971:2019']
- id: infusion-pump-fw/acceptance-criteria/REL-001
  rule: A firmware build is releasable only after unit, integration, and system verification have passed and the results are recorded.
  cites: ['std:iec-62304:2006-a1#5.8']
- id: infusion-pump-fw/acceptance-criteria/REL-002
  rule: Generated code must not be merged without review by a firmware engineer.
```

The Project adds rules for the firmware. It doesn't repeat or relax the Domain's rules.

## Previewing both together

From the repository root, `scs stack` shows what a session on the firmware receives, Domain
first:

```bash
scs stack domain/dist/medtech-1.0.0.yaml \
          projects/infusion-pump-fw/dist/infusion-pump-fw-1.0.0.yaml
```

```
Stack of 2 layers, outermost first:
  1. bundle:medtech 1.0.0 (domain)  sha256:37b363d8...  domain/dist/medtech-1.0.0.yaml
  2. bundle:infusion-pump-fw 1.0.0 (project)  sha256:143a9bce...  projects/infusion-pump-fw/dist/infusion-pump-fw-1.0.0.yaml

Layer 1: bundle:medtech 1.0.0
  [rule] medtech/identity: When asked which governance bundles are active, state: ...
  ...
Layer 2: bundle:infusion-pump-fw 1.0.0
  [rule] infusion-pump-fw/identity: When asked which governance bundles are active, state: ...
  ...
```

For these two artifacts it reports no conflicts or repeated text.

## What this supports

- **A fixed version to test against.** Every engineer's AI works from the same approved
  version, so results can be compared and repeated.
- **Named rules in review.** An agent can name the rule it applied, such as
  `medtech/human-authority/HA-001`, and a reviewer can check the work against it.
- **A record for audits.** Each version records who approved it and its content digest, and
  the compiled artifact carries the same digest.

SCS doesn't make an organization compliant, and a citation isn't a claim that a rule is
sufficient. It gives the quality system a versioned, approved record of the guidance its AI
was given.

## Next steps

- [Domain Ontology](/docs/specification/domain-ontology/)
- [Runtime Artifact](/docs/specification/runtime-artifact/)
- [Placing an Artifact](/docs/getting-started/placement/)
