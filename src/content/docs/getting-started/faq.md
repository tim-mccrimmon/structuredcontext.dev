---
title: FAQ
description: Frequently asked questions about Structured Context Specification.
---

# Structured Context Specification

---

## 1. What is "context" in AI-assisted development?

Context is the information an AI system uses to understand what you are asking it to do and the environment in which it must operate.

For humans, context lives in shared mental models, documents, architecture, conversations, and experience. For an LLM, context only exists in the text it is given in the moment.

If essential intent, constraints, and boundaries are missing, the model improvises—leading to drift, rework, and misalignment.

---

## 2. What is Structured Context?

Structured Context (SCS) is a compact, standardized, machine-readable representation of the essential environment in which development occurs.

It encodes intent, constraints, architecture boundaries, domain rules, and organizational expectations into a form that fits inside an LLM's context window.

SCS ensures that humans and AI share the same foundational understanding before any code is generated.

---

## 3. Why do we need Structured Context?

Modern AI-assisted development fails not because the models are inadequate, but because **the environment they operate in is undefined**.

Teams rely on implicit context—tribal knowledge, scattered documents, personal assumptions—that AI cannot access.

SCS makes this environment explicit, structured, and shareable. As a result, AI and humans behave consistently, and development becomes predictable rather than improvisational.

---

## 4. What problems does SCS solve?

SCS addresses key failure modes in AI-assisted development:

- Misaligned or inconsistent AI output
- Requirements and architectural drift
- Rework caused by unclear constraints
- Conflicting interpretations across tools and developers
- Lack of traceability or governable context
- Inability to automate compliance or architectural checks

By defining the environment up front, SCS stabilizes downstream work.

---

## 5. What do we expect SCS to achieve?

SCS is designed to produce:

- Reliable AI-assisted development behavior
- Clear alignment between humans and AI
- Reduced rework and fewer corrections
- Stronger architectural and compliance consistency
- Portable organizational knowledge
- A foundation for future autonomic governance

SCS does not solve every development challenge, but it eliminates the biggest source of unpredictability: missing or inconsistent context.

---

## 6. Is Structured Context the application?

No.

SCS is not the application—it is the **environment** that governs how the application is built.

The application includes code, architecture, runtime behavior, and infrastructure.

SCS simply defines the intent, rules, boundaries, and constraints that guide development.

---

## 7. How is SCS different from requirements documents or architecture diagrams?

Traditional documentation is written for humans—often verbose, ambiguous, and scattered across many tools.

SCS is a **minimal, structured, versioned contract** that LLMs can interpret consistently.

It distills what matters most into a machine-readable form, without replacing richer human-readable documentation.

---

## 8. Why are SCDs inflexible?

SCDs are intentionally inflexible because they function as contractual elements of the project's environment.

Each SCD defines exactly one concept—business rule, architectural constraint, domain definition—and must remain stable once versioned.

This rigidity prevents silent drift and ensures humans and AI always operate from the same authoritative definition.

---

## 9. What is an SCD?

An **SCD (Structured Context Document)** is the atomic unit of structured context.

Each SCD is written in YAML or JSON and expresses one essential idea: a definition, rule, constraint, requirement, boundary, or domain concept.

Hundreds of SCDs across multiple categories build the operating environment for the project.

---

## 10. What are Meta, Standards, and Project tiers?

**Meta Tier** (`scd:meta:*`) - Defines how SCS itself works (schemas, rules, semantics).

**Standards Tier** (`scd:standards:*`) - Encodes external compliance requirements (HIPAA, SOC2, etc.).

**Project Tier** (`scd:project:*`) - Expresses system-specific rules and intent for your organization.

Together, they allow organizations to build reusable libraries while customizing context for each project.

---

## 11. What is a Bundle?

A **Bundle** is a versioned manifest that packages SCDs and imports other bundles.

Bundles assemble context into a complete operating environment used by AI tools during development.

**The 5 Bundle Types:**

1. **Meta Bundle** (`type: meta`)
   - Foundation of SCS specification language itself
   - Contains meta-tier SCDs
   - No imports (it's the base layer)

2. **Standards Bundle** (`type: standards`)
   - External compliance requirements (HIPAA, SOC2, CHAI, NIST)
   - May import other standards bundles
   - Contains standards-tier SCDs

3. **Domain Bundle** (`type: domain`)
   - **Company knowledge aggregator** (1 per company) ⭐
   - Imports multiple concern bundles
   - Does NOT contain SCDs directly (aggregates concerns)

4. **Concern Bundle** (`type: concern`)
   - Functional area standards (Architecture, Security, Clinical, etc.)
   - Contains project-tier SCDs
   - Does NOT import other bundles (leaf nodes)

5. **Project Bundle** (`type: project`)
   - Individual initiative or application
   - Typically imports the domain bundle (gets everything)
   - Contains project-specific SCDs

---

## 12. What are Concern Bundles and why are they important?

**Concern Bundles** organize project-tier SCDs by functional area, with patterns derived from established frameworks such as TOGAF, Zachman, FEAF, ISO/IEC 25010, and NIST RMF.

**The 11 Standard Concerns:**

1. **Architecture** - System design, tech stack, integrations
2. **Security** - Authentication, data protection, threat model
3. **Performance & Reliability** - Response time, availability, fault tolerance
4. **Usability & Accessibility** - UX principles, accessibility compliance
5. **Compliance & Governance** - Regulatory requirements, audit trails
6. **Data & Provenance** - Data model, lineage, retention policies
7. **Testing & Validation** - Test coverage, QA procedures
8. **Deployment & Operations** - Infrastructure, observability, incident response
9. **Safety & Risk** - Risk assessment, safety checklists
10. **Ethics & AI Accountability** - AI usage policy, bias mitigation
11. **Business Context** - Company mission, values, stakeholders

Every production project should include all relevant concern bundles to ensure comprehensive coverage. Instead of inventing new categories, SCS mirrors well-known enterprise frameworks—ensuring completeness and credibility.

---

## 13. Who owns what in the Bundle hierarchy?

**Ownership Model:**

| Bundle Type | Owner | Purpose |
|-------------|-------|---------|
| Meta Bundle | SCS Maintainers | SCS specification language |
| Standards Bundles | Standards Bodies | HIPAA, SOC2, CHAI, etc. |
| Domain Bundle | CTO/CIO | Company knowledge aggregator |
| Concern Bundles | Executives | Functional area ownership: |
| - Architecture | Chief Architect | System patterns, tech decisions |
| - Security | CISO | Security controls, threats |
| - Clinical | CMO (healthcare) | Clinical protocols, safety |
| - Data Governance | CDO | Data policies, retention |
| - Company Context | CEO | Mission, values, stakeholders |
| Project Bundle | Product/Project Mgr | Individual initiatives |

This ownership model ensures accountability and proper governance at every level.

---

## 14. How does the Domain Bundle work?

The Domain Bundle is the **killer feature** of SCS.

**Key Concept**: 1 domain bundle per company

The Domain Bundle:
- Aggregates all concern bundles for your company
- Owned by the CTO/CIO
- Every project imports it → instant access to all company context
- **"Build once, use everywhere"**

Example:
```yaml
id: bundle:acme-health-corp
type: domain
imports:
  - bundle:acme-architecture:1.0.0
  - bundle:acme-security:1.0.0
  - bundle:acme-clinical:1.0.0
  - bundle:acme-company-context:1.0.0
scds: []  # Domain bundles aggregate, don't contain SCDs
```

Every Acme Health project imports `bundle:acme-health-corp` and gets all company context automatically.

---

## 15. How does SCS fit inside an LLM context window?

Structured Context is intentionally compact—typically 25–35% of the model's window.

This leaves room for task instructions, code, debugging, and conversation.

Compact, structured data is far more salient to LLMs than large narrative documents, resulting in more stable and reliable behavior.

---

## 16. What is the difference between Task Context and Project Context?

**Task Context** is the immediate instruction (e.g., "Create a new API endpoint").

**Project Context** is the durable environment (intent, constraints, definitions, boundaries) that governs how tasks must be completed.

AI failures almost always stem from missing **Project Context**, not unclear instructions.

SCS provides the missing project environment.

---

## 17. How does SCS make development reliable?

When a project bundle is loaded into an IDE or AI agent:

- The model knows the constraints
- The model applies domain and architectural rules
- Output becomes consistent across sessions and developers
- Rework decreases significantly

The reference implementation demonstrated a dramatic improvement:
**With a bundle: stable, aligned behavior. Without a bundle: drift and inconsistency.**

---

## 18. Does SCS replace Agile, Scrum, XP, or DevOps?

Not at all.

SCS operates **upstream** of all methodologies. It defines the environment in which those methods run.

Teams continue using Agile ceremonies, DevOps pipelines, CI/CD, and testing practices—but with far clearer boundaries and constraints.

---

## 19. Can SCS work with RAG or documentation retrieval?

Yes, but RAG cannot substitute for SCS.

RAG retrieves unstructured information—useful for reference but not for governance or consistent application of constraints.

SCS provides the authoritative project environment, while RAG supplements it with supporting materials.

---

## 20. How does versioning work in SCS?

Each SCD and Bundle has an explicit version.

Once versioned, an SCD becomes part of the project contract and should not change except through deliberate version increments.

Versioning enables reproducibility, traceability, and stable development behavior.

**Example:**
- `bundle:acme-health-corp:1.0.0` - Immutable once published
- `bundle:acme-health-corp:1.1.0` - New version with updates
- Projects specify which version they use

---

## 21. Is Structured Context required for autonomic governance?

Yes.

Autonomic (future AI-driven) governance requires an explicit, machine-readable environment.

Without structured context, AI systems cannot validate architectural choices, enforce compliance, or detect drift.

SCS provides the substrate that future governance tools will rely upon.

---

## 22. Does SCS make development slower?

No—SCS shifts work **upstream**, reducing far more downstream rework, drift, and correction cycles.

Teams report smoother development, fewer misunderstandings, more consistent AI behavior, and faster onboarding.

The time saved over the life of a project is significant.

---

## 23. What does SCS *not* do?

SCS does **not**:

- Build the system
- Replace engineering practice
- Replace architecture documentation
- Specify implementation details
- Replace your backlog or roadmap
- Dictate process or methodology

SCS defines **the environment**, not the implementation.

---

## 24. How do I get started with SCS?

**Install the CLI:**
```bash
pip install scs-tools
```

**Create your first project:**
```bash
scs new project my-app --type saas
cd my-app
scs validate --bundle bundles/project-bundle.yaml
```

**Learn more:**
- [Quick Start Guide](/getting-started/quick-start/)
- [CLI Reference](/guides/cli-reference/)
- [Examples](/community/examples/)
- [GitHub Repository](https://github.com/tim-mccrimmon/structured-context-spec)
- [Join Discussions](https://github.com/tim-mccrimmon/structured-context-spec/discussions)

---

## Version

**Version 0.3** — Updated for January 2026 launch

Last Updated: 2026-01-12
