---
title: Workflow
description: Complete workflow for defining, validating, and versioning structured context.
---

## Workflow Overview

The SCS workflow follows three phases that move context from initial draft to versioned, immutable bundles:

1. **Define Intent** - Create DRAFT bundles and SCDs
2. **Validate Context** - Ensure correctness and completeness
3. **Version Context** - Lock bundles with semantic versions

---

## Phase 1: Define Intent

Create bundles and SCDs from source materials. Keep `version: "DRAFT"` during this phase.

### Start with a Template

```bash
# Create a new project from template
scs new project my-app --type saas

# Or initialize SCS in existing project
cd /path/to/existing/project
scs init --type healthcare
```

This scaffolds a complete project structure:
- 10+ concern bundles (Architecture, Security, Compliance, etc.)
- 30+ SCDs covering common needs
- Pre-configured validation

### Create Custom SCDs

Add SCDs incrementally as you refine your context:

```bash
# Add specific SCDs
scs add scd system-context
scs add scd authn-authz data-protection

# Add entire domain bundles
scs add bundle security
```

### Work with Source Materials

Transpose unstructured documents into structured SCDs:

1. **Gather sources** - Policies, architecture docs, compliance requirements
2. **Work with AI** - Use Claude or other LLMs to help structure content
3. **Create YAML files** - Write SCDs following the specification
4. **Iterate** - Refine and improve

### Example: Creating a Company Context SCD

```yaml
# context/project/company-overview.yaml
id: scd:project:company-overview
version: "DRAFT"
tier: project
type: company-context

metadata:
  title: "Acme Health - Company Overview"
  description: "High-level company context for all Acme projects"
  created_at: "2026-01-12T10:00:00Z"
  created_by: "Sarah Chen (CEO)"

content:
  company_name: "Acme Health Corporation"
  mission: "Transform patient care through AI-powered healthcare solutions"
  industry: "Healthcare Technology"
  size: "Series B, 150 employees"

  key_stakeholders:
    - CEO (Strategy, Vision)
    - CTO (Architecture, Engineering)
    - CMO (Clinical Safety, Protocols)
    - CISO (Security, Compliance)

  regulatory_environment:
    - HIPAA Privacy & Security Rules
    - CHAI AI Assurance Guidelines
    - State telehealth regulations
```

### Example: Creating a Concern Bundle

```yaml
# bundles/concerns/company-context.yaml
id: bundle:acme-company-context
type: concern
version: "DRAFT"
title: "Acme Health - Company Context"
description: "Company-specific context for all projects"

# Concern bundles don't import other bundles
imports: []

# List the SCDs in this concern
scds:
  - scd:project:company-overview
  - scd:project:company-values
  - scd:project:stakeholder-map

provenance:
  created_by: "Sarah Chen (CEO)"
  created_at: "2026-01-12T10:00:00Z"
  rationale: "Foundational company context for all Acme projects"
```

### Validation During Intent Phase

Use loose validation to check structure while iterating:

```bash
# Validate individual SCDs
scs validate context/project/company-overview.yaml

# Validate a bundle (loose mode - default during DRAFT)
scs validate bundles/concerns/company-context.yaml
```

**In DRAFT mode:**
- ✅ Validates YAML structure
- ✅ Validates required bundle fields
- ✅ Validates tier organization
- ❌ Does NOT enforce strict content requirements
- ❌ Does NOT require all fields populated

This supports the spectrum from "paranoid CEO" (minimal disclosure) to "open CEO" (full transparency).

---

## Phase 2: Validate Context

Once your bundles are complete, run strict validation before versioning.

### Run Strict Validation

```bash
# Strict mode - fail on warnings
scs validate --bundle bundles/project-bundle.yaml --strict

# Verbose output for debugging
scs validate --bundle bundles/project-bundle.yaml --strict --verbose

# JSON output for automation
scs validate --bundle bundles/project-bundle.yaml --output json
```

### Validation Levels

**Level 1: Syntax**
- Valid YAML/JSON
- Schema compliance
- Required fields present

**Level 2: Semantic**
- Valid identifiers
- Proper tier usage
- Type consistency

**Level 3: References**
- All imported bundles exist
- All referenced SCDs exist
- No circular dependencies

**Level 4: Versioning**
- Valid semantic versions
- No DRAFT in production bundles
- Consistent version references

**Level 5: Provenance**
- Created/updated timestamps
- Creator information
- Rationale documented

**Level 6: Completeness** (optional with `--skip-completeness`)
- All required concerns present
- Minimum SCD coverage
- Domain completeness

### Fix Validation Errors

Common errors and fixes:

**Missing imports:**
```bash
# Error: bundle:acme-security:1.0.0 not found
# Fix: Add the bundle or update the version reference
```

**Invalid tier:**
```yaml
# Error: project-tier SCD in standards bundle
# Fix: Move SCD to correct bundle type or change tier
```

**Circular dependency:**
```bash
# Error: bundle:A imports bundle:B which imports bundle:A
# Fix: Restructure bundle hierarchy
```

### Validate Import Resolution

Check that your bundle hierarchy resolves correctly:

```bash
# Test bundle import resolution
scs bundle check bundles/project-bundle.yaml

# Shows all resolved bundles and SCDs
```

---

## Phase 3: Version Context

Once validation passes, lock your bundles with semantic versions.

### Semantic Versioning

SCS follows semantic versioning (semver):

- **MAJOR** (1.0.0 → 2.0.0) - Breaking changes, incompatible updates
- **MINOR** (1.0.0 → 1.1.0) - New features, backward compatible
- **PATCH** (1.0.0 → 1.0.1) - Bug fixes, clarifications

### Version a Bundle

```bash
# Version a single bundle
scs bundle version bundles/concerns/company-context.yaml --version 1.0.0

# This:
# 1. Changes version: "DRAFT" → version: "1.0.0"
# 2. Runs strict validation
# 3. Makes the bundle immutable
```

### Git Workflow Integration

After versioning, commit and tag:

```bash
# Stage versioned bundles
git add bundles/

# Commit with clear message
git commit -m "Release company-context bundle v1.0.0

- Added company overview and values
- Added stakeholder map
- Validated and ready for production use"

# Tag the release
git tag company-context-v1.0.0

# Push to remote
git push origin main --tags
```

### Update Dependent Bundles

After versioning a concern bundle, update bundles that import it:

```yaml
# bundles/domain/acme-health-corp.yaml
id: bundle:acme-health-corp
type: domain
version: "DRAFT"  # Still drafting the domain bundle

imports:
  - bundle:acme-architecture:1.0.0
  - bundle:acme-security:1.0.0
  - bundle:acme-company-context:1.0.0  # Updated from DRAFT
  - bundle:acme-clinical:1.0.0
```

### Version the Complete Hierarchy

Version bundles from bottom up:

1. **Concern bundles first** (leaf nodes)
2. **Domain bundle second** (aggregator)
3. **Project bundle last** (top-level)

```bash
# Step 1: Version all concern bundles
scs bundle version bundles/concerns/architecture.yaml --version 1.0.0
scs bundle version bundles/concerns/security.yaml --version 1.0.0
scs bundle version bundles/concerns/company-context.yaml --version 1.0.0
# ... (all 11 concerns)

# Step 2: Update domain bundle imports, then version it
scs bundle version bundles/domain/acme-health-corp.yaml --version 1.0.0

# Step 3: Update project bundle imports, then version it
scs bundle version bundles/project/prior-auth-app.yaml --version 1.0.0
```

---

## Complete Example

### Initial Setup

```bash
# Create project
scs new project medication-adherence --type healthcare
cd medication-adherence

# Add custom SCDs
scs add scd company-overview
scs add scd clinical-safety-rules
```

### Phase 1: Define Intent

```bash
# Edit your SCDs
vim context/project/company-overview.yaml
vim context/project/clinical-safety-rules.yaml

# Create concern bundle
vim bundles/concerns/company-context.yaml

# Loose validation while iterating
scs validate bundles/concerns/company-context.yaml
# ✅ Passed (structure valid)
```

### Phase 2: Validate

```bash
# Strict validation before versioning
scs validate --bundle bundles/project-bundle.yaml --strict
# ⚠️  Warning: Missing recommended field
# Fix the issue...

scs validate --bundle bundles/project-bundle.yaml --strict
# ✅ All validations passed
```

### Phase 3: Version

```bash
# Version concern bundles
scs bundle version bundles/concerns/company-context.yaml --version 1.0.0
scs bundle version bundles/concerns/architecture.yaml --version 1.0.0
# ... (all concerns)

# Update and version domain bundle
scs bundle version bundles/domain/acme-health-corp.yaml --version 1.0.0

# Update and version project bundle
scs bundle version bundles/project-bundle.yaml --version 1.0.0

# Commit to git
git add -A
git commit -m "Release medication-adherence v1.0.0"
git tag v1.0.0
git push origin main --tags
```

---

## Iteration and Updates

### Making Changes to Versioned Bundles

Once a bundle is versioned (e.g., `1.0.0`), it's **immutable**. To make changes:

**Option 1: Patch Version** (bug fixes, clarifications)
```bash
# Make changes to SCD
vim context/project/company-overview.yaml

# Increment patch version
scs bundle version bundles/concerns/company-context.yaml --version 1.0.1
```

**Option 2: Minor Version** (new features, additions)
```bash
# Add new SCD
scs add scd data-retention-policy

# Add to bundle manifest
vim bundles/concerns/compliance.yaml

# Increment minor version
scs bundle version bundles/concerns/compliance.yaml --version 1.1.0
```

**Option 3: Major Version** (breaking changes)
```bash
# Restructure bundle significantly
# Breaking changes to SCD schemas
# Major architectural shifts

# Increment major version
scs bundle version bundles/concerns/architecture.yaml --version 2.0.0
```

### Cascading Updates

When a concern bundle updates, you may need to update bundles that import it:

```bash
# Concern updated: company-context 1.0.0 → 1.0.1
# Domain bundle imports it, so:

# Update domain bundle import reference
vim bundles/domain/acme-health-corp.yaml
# Change: bundle:acme-company-context:1.0.0 → 1.0.1

# Version domain bundle (patch or minor)
scs bundle version bundles/domain/acme-health-corp.yaml --version 1.0.1

# Update project bundle import reference
vim bundles/project/prior-auth-app.yaml
# Change: bundle:acme-health-corp:1.0.0 → 1.0.1

# Version project bundle
scs bundle version bundles/project/prior-auth-app.yaml --version 1.0.1
```

---

## Best Practices

### 1. Use DRAFT Liberally
Keep bundles as DRAFT during active development. Only version when ready to lock.

### 2. Validate Early and Often
Run loose validation during iteration to catch structural issues early.

### 3. Version Bottom-Up
Always version concern bundles before domain bundles, and domain before project.

### 4. Document Changes
Use git commit messages and bundle provenance to document why versions changed.

### 5. Tag Releases
Use git tags to mark important releases: `v1.0.0`, `architecture-v2.0.0`, etc.

### 6. Keep Versions in Sync
When updating imported bundles, update all dependent bundles together.

### 7. Test Before Versioning
Run strict validation and test with AI agents before locking versions.

---

## Next Steps

- **[CLI Reference](/guides/cli-reference/)** - Complete command documentation
- **[Examples](/community/examples/)** - Real-world bundle examples
- **[Specification](/specification/overview/)** - Technical specification details
- **[FAQ](/getting-started/faq/)** - Common questions answered
