---
title: Examples
description: Example bundles and SCDs to help you get started.
---

## Examples

Real-world examples of SCS bundles and SCDs from the official repository.

:::tip[View on GitHub]
All examples are available at [github.com/tim-mccrimmon/structured-context-spec](https://github.com/tim-mccrimmon/structured-context-spec/tree/main/core/examples)
:::

---

## Bundle Examples by Type

### 1. Meta Bundle

The foundational SCS specification language itself.

**Example**: [meta-bundle.yaml](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/meta-bundle.yaml)
- Contains foundational META SCDs that define the SCS specification language
- All SCS projects import this bundle for consistent understanding
- Includes: `scd:meta:scd-meta`, `scd:meta:bundle-meta`, `scd:meta:domain-meta`, `scd:meta:validator-meta`

### 2. Standards Bundles

External compliance and regulatory requirements.

**Example**: [standards-bundle.yaml](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/standards-bundle.yaml)
- Healthcare compliance example (HIPAA + SOC2)
- Shows how to import external standard bundles
- Includes HIPAA-specific SCDs for privacy, security, and breach notification

### 3. Domain Bundle

Company-wide knowledge aggregator that imports all concerns.

**Example**: [software-development.yaml](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/domains/software-development.yaml)
- Software Development domain bundle
- Imports all 11 concern bundles (architecture, security, performance, etc.)
- Shows the "build once, use everywhere" pattern

### 4. Concern Bundles

Functional area standards within a company. Each concern bundle is owned by a specific executive role (Chief Architect, CISO, CMO, etc.).

**Available Examples**:
- [Architecture](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/concerns/architecture.yaml) - System design, tech stack, integrations
- [Security](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/concerns/security.yaml) - Authentication, data protection, threat model
- [Performance & Reliability](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/concerns/performance-reliability.yaml) - Response time, availability, fault tolerance
- [Compliance & Governance](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/concerns/compliance-governance.yaml) - Regulatory requirements
- [Data & Provenance](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/concerns/data-provenance.yaml) - Data model, lineage, retention
- [Testing & Validation](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/concerns/testing-validation.yaml) - Test coverage, QA procedures
- [Deployment & Operations](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/concerns/deployment-operations.yaml) - Infrastructure, observability
- [Usability & Accessibility](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/concerns/usability-accessibility.yaml) - UX principles, accessibility
- [Safety & Risk](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/concerns/safety-risk.yaml) - Risk assessment, safety checklists
- [Ethics & AI Accountability](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/concerns/ethics-ai-accountability.yaml) - AI usage policy, audit trails
- [Business Context](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/concerns/business-context.yaml) - Company mission, values, stakeholders

### 5. Project Bundle

Complete context for a specific project or initiative.

**Example**: [project-bundle.yaml](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/project-bundle.yaml)
- Medication Adherence System example
- Imports meta, standards, and domain bundles
- Shows recursive import resolution (gets all context from imports)

---

## Complete Examples

### Healthcare: Medication Adherence System

A complete example showing all bundle types working together:

```
Medication Adherence System
├── Project Bundle (medication-adherence)
│   ├── imports: Meta Bundle
│   ├── imports: Standards Bundle (HIPAA + SOC2)
│   └── imports: Software Development Domain
│       └── imports: 11 Concern Bundles
│           ├── Architecture (system-context, tech-stack, integrations)
│           ├── Security (authn-authz, data-protection, threat-model)
│           ├── Performance & Reliability
│           ├── Compliance & Governance
│           └── ... (7 more concerns)
```

**View the complete example**:
- [Project Bundle](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/core/examples/bundles/project-bundle.yaml)
- [All Bundles](https://github.com/tim-mccrimmon/structured-context-spec/tree/main/core/examples/bundles)
- [All SCDs](https://github.com/tim-mccrimmon/structured-context-spec/tree/main/core/examples)

---

## How to Use These Examples

### 1. Browse on GitHub

Explore the examples directly:
```bash
# View all bundles
https://github.com/tim-mccrimmon/structured-context-spec/tree/main/core/examples/bundles

# View all SCDs
https://github.com/tim-mccrimmon/structured-context-spec/tree/main/core/examples
```

### 2. Clone and Explore Locally

```bash
# Clone the repository
git clone https://github.com/tim-mccrimmon/structured-context-spec.git
cd structured-context-spec/core/examples

# Explore bundle structure
tree bundles/

# Validate an example bundle
scs validate bundles/project-bundle.yaml
```

### 3. Use as Templates

Copy and customize examples for your own projects:

```bash
# Start with an example
cp core/examples/bundles/concerns/architecture.yaml \
   my-project/bundles/my-architecture.yaml

# Edit to match your system
vim my-project/bundles/my-architecture.yaml

# Validate your changes
scs validate my-project/bundles/my-architecture.yaml
```

---

## Industry-Specific Examples

### Healthcare
- **HIPAA Compliance**: Privacy rule, security rule, breach notification
- **Clinical Context**: Patient safety, care protocols
- **Use Case**: Prior authorization, patient portals, clinical documentation

### Financial Services
- **SOC2 Compliance**: Trust Services Criteria
- **Regulatory**: PCI-DSS, SOX standards
- **Use Case**: Banking apps, payment systems, financial reporting

### SaaS Products
- **Compliance**: GDPR, SOC2, data privacy
- **Architecture**: Multi-tenancy, scalability, availability
- **Use Case**: B2B SaaS platforms, API services

---

## Community Examples

Have an example to share? We'd love to see how you're using SCS!

- 💬 [Share on GitHub Discussions](https://github.com/tim-mccrimmon/structured-context-spec/discussions)
- 📝 [Submit a PR](https://github.com/tim-mccrimmon/structured-context-spec/pulls) to add your example
- 🐛 [Report Issues](https://github.com/tim-mccrimmon/structured-context-spec/issues)

---

## Next Steps

- **[Create Your Own Bundle](/guides/workflow/)** - Step-by-step guide
- **[Validate Context](/guides/workflow/)** - Ensure correctness
- **[View Specification](/specification/overview/)** - Technical details
- **[Quick Start](/getting-started/quick-start/)** - Get up and running
