---
title: Citations
description: How SCS rules reference a standard and clause without reproducing the standard's text.
---

Since 0.6.0, a standard appears in SCS only as a **citation**: an identifier for the
standard, its edition, and a clause. A citation never carries the standard's text.

## Why citations, not standards content

- **Licensing.** The text of most standards is licensed to the adopter, not to the
  specification or a vendor.
- **Interpretation.** The authoritative interpretation of a standard is the adopter's own
  quality system. SCS holds that interpretation as rules and keeps the standard as the
  reference.

If you want AI systems to consult a standard's full text, that belongs in retrieval, not in
governance.

## Format

```
std:<standard>[:<edition>][#<clause>]
```

| Citation | Refers to |
|---|---|
| `std:iso-13485:2016` | ISO 13485:2016 as a whole |
| `std:iso-13485:2016#7.3.9` | ISO 13485:2016, clause 7.3.9 |
| `std:iec-62304:2006-a1#5.1` | IEC 62304:2006+A1:2015, clause 5.1 |
| `std:iso-14971:2019#5` | ISO 14971:2019, clause 5 |
| `std:21-cfr-820#820.30` | 21 CFR Part 820, §820.30 |
| `std:hipaa#164.312(d)` | HIPAA Security Rule, 45 CFR 164.312(d) |
| `std:soc2:2017#CC6.6` | SOC 2 (2017 Trust Services Criteria), CC6.6 |
| `std:nist-800-53:r5#SI-4` | NIST SP 800-53 Rev. 5, control SI-4 |

`std:` is the only prefix, for laws and regulations as well as standards
(`std:21-cfr-820`, `std:eu-ai-act-2024-1689`). An amendment is written with a hyphen
(`std:iec-62304:2006-a1`), never `+`.

A citation is an identifier, not a link to a document. Validators check that it's
well-formed. They don't resolve it against any registry.

## Where citations appear

- **On an SCD or on one item,** in a `cites` list:

  ```yaml
  directives:
    - id: DCC-001
      directive: Design changes require documented review and approval before implementation.
      cites:
        - std:iso-13485:2016#7.3.9
  ```

- **As a `satisfies` target**, on an SCD relationship or on a concept in a
  [Domain Ontology](/docs/specification/domain-ontology/).

Citations are compiled into the [runtime artifact](/docs/specification/runtime-artifact/)
unless you pass `--no-cites`. The meta bundle tells the agent that a citation doesn't
contain the standard's text, and that it shouldn't present wording from memory as that text.

## What a citation claims

Citing a clause says that the rule or concept is meant to address that clause. It doesn't
say that the rule is sufficient, and it isn't a claim of compliance. The organization
remains responsible for its rules.

## Migrating standards-tier SCDs

`scd:standards:` IDs and `type: standards` bundles still validate, with deprecation
warnings. To migrate, add citations to the SCDs whose rules implement the standard. Move any
genuine organization rules into a project-tier SCD, then remove the standards bundle from
every import. See the [0.5 → 0.6.0 migration guide](/docs/specification/migration-0-6/).

Full text: [`spec/0.7/citations.md`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/spec/0.7/citations.md)
