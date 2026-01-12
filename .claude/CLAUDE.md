# OICP - Operational Integrity Control Plane

## Project Overview

**OICP** is an AI governance control plane that enables organizations to define, validate, version, and deploy governed context for AI agents—preventing hallucination and drift in regulated, high-stakes professional work (healthcare, sales, legal, finance).

**Core Value Proposition**: "If you are using AI and not using Structured Context - you are doing it wrong."

**The Problem**: AI systems lack governed operating environments. Without explicit, validated context, AI improvises based on training data (not organizational rules), behavior varies, and compliance is impossible to prove.

**The Solution**: 4-phase activation workflow with immutable, versioned bundles of Structured Context Documents (SCDs) streamed to AI agents in real-time via gRPC.

---

## The 5 Bundle Types (Canonical Model)

### Bundle Type Hierarchy

```
Meta Bundle (SCS Foundation)
  ↓ imports
Standards Bundles (External: HIPAA, SOC2, CHAI, NIST)
  ↓ imports
Domain Bundle (The Company - e.g., Acme Health Corp)
  ↓ imports multiple
Concern Bundles (Functional Areas: Architecture, Security, Clinical, Data)
  ↓ imported by
Project Bundles (Individual Initiatives: Prior Auth App, Patient Portal)
```

### 1. Meta Bundle
- **What**: Universal SCS vocabulary and semantic foundation
- **Who Creates**: SCS (the platform owner)
- **Cardinality**: 1 per ecosystem
- **Imports**: None (foundation layer)
- **Contains**: Meta-tier SCDs (scd:meta:scd-meta, bundle-meta, domain-meta, validator-meta)
- **Example**: `bundle:meta:1.0.0`

### 2. Standards Bundle
- **What**: External regulatory/compliance requirements
- **Who Creates**: Standards bodies, regulators (CHAI, NIST, AICPA)
- **Cardinality**: Many (one per standard)
- **Imports**: May import other standards bundles
- **Contains**: Standards-tier SCDs
- **Examples**: `bundle:hipaa:1.0.0`, `bundle:soc2:1.0.0`, `bundle:chai:1.0.0`

### 3. Domain Bundle
- **What**: Company's corporate knowledge aggregator (THE KEY CONCEPT)
- **Who Creates**: CTO/CIO (C-suite owned)
- **Cardinality**: **1 per company** ⭐
- **Imports**: MUST import ≥1 concern bundle
- **Contains**: NO SCDs directly (aggregates concerns)
- **Examples**: `bundle:acme-health-corp:1.0.0`, `bundle:megabank-financial:1.0.0`
- **Critical**: This is how companies build once, use everywhere

### 4. Concern Bundle
- **What**: Functional area standards within a company (leaf nodes)
- **Who Creates**: VPs/Directors (Chief Architect, CISO, CMO, CDO)
- **Cardinality**: Variable per company (based on needs)
- **Imports**: MUST be empty (concerns are atomic)
- **Contains**: MUST have ≥1 project-tier SCD
- **Examples**: `bundle:acme-architecture:1.0.0`, `bundle:acme-security:1.0.0`, `bundle:acme-clinical-workflow:1.0.0`
- **Owner Examples**:
  - Architecture concern → Chief Architect
  - Security concern → CISO
  - Clinical Workflow concern → Chief Medical Officer
  - Data Governance concern → Chief Data Officer
  - Company-Context concern → CEO

### 5. Project Bundle
- **What**: Individual project/initiative implementation (entry point for AI)
- **Who Creates**: Product/Project Managers
- **Cardinality**: Many (one per project)
- **Imports**: Typically imports domain bundle (gets everything)
- **Contains**: Project-specific SCDs
- **Examples**: `bundle:prior-auth-app:1.0.0`, `bundle:patient-portal:1.0.0`

---

## Key Concepts

### SCDs (Structured Context Documents)
- **What**: YAML files containing actual structured content
- **Format**: `scd:<tier>:<name>` (e.g., `scd:standards:chai-adherence`, `scd:project:company-overview`)
- **Tiers**:
  - `meta`: SCS specification language itself
  - `standards`: External compliance requirements
  - `project`: Company/project-specific context
- **Location**: Live inside bundles in the `scds` array
- **Validation Philosophy**: **Structure YES, Content NO (loose validation)**
  - Validates YAML structure, required bundle fields, tier organization
  - Does NOT enforce required fields in SCD content
  - Supports spectrum from "paranoid CEO" (minimal disclosure) to "open CEO" (full transparency)

### Bundle Manifest Structure
```yaml
id: bundle:acme-company-context
type: concern
version: "DRAFT"  # or "1.0.0" when versioned
title: "Acme Health - Company Context"
description: "Company-specific context"

scds:
  - scd:project:company-overview
  - scd:project:company-values

imports: []  # Empty for concerns

provenance:
  created_by: "Dr. Sarah Chen (CEO)"
  created_at: "2025-12-26T10:00:00Z"
  rationale: "Company context for all Acme projects"
```

### Bundle Type Constraints (Enforced by Control Plane)
- **Meta**: NO imports, contains meta-tier SCDs
- **Standards**: Can import other standards, contains standards-tier SCDs
- **Concern**: NO imports (leaf nodes), MUST have ≥1 project-tier SCD
- **Domain**: MUST import ≥1 concern bundle, NO SCDs directly
- **Project**: Imports domain (or other bundles), contains project-tier SCDs

---

## The 4-Phase Activation Workflow

### Phase 1: Build Bundles (DRAFT) - **CURRENT FOCUS**
- **Goal**: Create bundles and SCDs from source materials
- **Workflow**:
  1. Gather source content (documents, knowledge, policies)
  2. Work with AI to transpose unstructured → structured SCDs
  3. Create SCD YAML files
  4. Create bundle YAML files (references SCDs)
  5. Iterate and refine
  6. Keep `version: "DRAFT"`
- **Validation**: Loose (structure only)
- **Status**: Test cases ready (TC-001, TC-101, TC-102)

### Phase 2: Validate & Version
- **Goal**: Lock bundles with semantic versions, integrate with git
- **Workflow**:
  1. Run `scs validate` (strict mode)
  2. Fix validation errors
  3. Run `scs bundle version --version X.Y.Z` (immutable)
  4. Git workflow (commit, push, PR, merge, tag)
  5. Update bundle registry
- **Validation**: Strict (all checks enforced)
- **Status**: Future

### Phase 3: Deploy
- **Goal**: Publish versioned bundles to Registry, create tags
- **Workflow**:
  1. Publish bundle to Registry via API
  2. Control plane resolves imports recursively
  3. Create tags (e.g., `prior-auth:latest` → `bundle:prior-auth:1.0.0`)
  4. Tags available for agent subscriptions
- **Status**: ✅ MVP Complete

### Phase 4: Measure & Iterate
- **Goal**: AI agents consume context, measure effectiveness
- **Workflow**:
  1. Agents subscribe to tags via Context Service (gRPC)
  2. Context Service resolves tag → bundle, loads all imports
  3. Agent receives context stream and processes requests
  4. When tag updates, agents get new context automatically (zero downtime)
  5. Usage tracked, adherence measured, perfect audit trails
- **Status**: ✅ MVP Complete

---

## CLI Commands

### Project Creation
```bash
# Create new project with scaffolding
scs new <project-name> --type healthcare|fintech|saas|government|minimal|standard

# Initialize SCS in existing project
scs init
```

### Bundle Management
```bash
# Create bundle
scs bundle create

# Validate bundle (loose in Phase 1, strict in Phase 2)
scs validate ./bundles/acme-company-context.yaml

# Version and lock bundle (immutable)
scs bundle version ./bundles/acme-company-context.yaml --version 1.0.0

# Deploy to Registry (via API, not CLI - future enhancement)
# POST /api/bundles with bundle content
```

### Validation
```bash
# Validate SCD
python -m scs_validator ./scds/acme-company-overview.yaml

# Validate bundle
scs validate ./bundles/acme-company-context.yaml
```

---

## Control Plane Architecture

### Three Independent Microservices

| Service           | Port(s)     | Purpose                                        | Status        |
|-------------------|-------------|------------------------------------------------|---------------|
| Control Plane API | 8000        | Bundle Registry + Governance APIs              | ✅ MVP Complete |
| Context Service   | 8002, 8003  | Real-time context streaming to agents (gRPC)   | ✅ MVP Complete |
| Rules Engine      | 8001        | Custom business rules management               | ✅ MVP Complete |

### Technology Stack
- **Backend**: FastAPI (async Python), gRPC (asyncio)
- **Database**: PostgreSQL with JSONB
- **Pub/Sub**: Redis (for context update broadcasting)
- **Connection Pooling**: asyncpg
- **Type Safety**: Pydantic, Protocol Buffers
- **Servers**: Uvicorn (ASGI), gRPC server
- **Protocol**: gRPC streaming (bidirectional)

### API Endpoints & Services

**Control Plane API (Port 8000)** - Registry + Governance:

*Bundle Registry (DockerHub Model)*:
- `POST /api/bundles` - Publish bundle to registry
- `GET /api/bundles` - List bundles
- `GET /api/bundles/{id}/versions/{v}` - Get specific version
- `DELETE /api/bundles/{id}/versions/{v}` - Deactivate bundle

*Tag Management*:
- `POST /api/tags` - Create tag (e.g., `prior-auth:latest`)
- `PUT /api/tags/{tag}` - Update tag to point to different bundle
- `GET /api/tags/{tag}` - Resolve tag to bundle

*Deployment & Monitoring*:
- `POST /api/deploy` - Deploy bundle with recursive import resolution
- `GET /api/deployments/{id}` - Get deployment details
- `GET /api/usage/summary` - Usage statistics
- `GET /api/adherence/status/{id}` - Adherence metrics

*Governance (stub endpoints)*:
- `POST /api/intent/*` - Build Supervisor tracking
- `POST /api/manage/*` - Manage Supervisor tracking

**Context Service (Port 8002/8003)** - Real-time streaming:

*gRPC Streaming (Port 8002)*:
- `Subscribe(tag, agent_id)` - Subscribe to tag stream, receive context updates
  - Returns initial `ContextSnapshot` with resolved bundle graph
  - Pushes `ContextUpdate` when tag moves to new bundle
  - Zero-downtime updates, perfect audit trail

*Webhook Server (Port 8003)*:
- `POST /webhook/tag-update` - Receives tag update notifications from Registry
  - Triggers pub/sub broadcast to all Context Service instances
  - All subscribed agents receive update within 100ms

**Rules Engine (Port 8001)** - Custom business rules:
- `POST /api/rules/schemas` - Create rule schema
- `GET /api/rules/schemas` - List schemas
- `POST /api/rules/rule-sets` - Create rule set
- `GET /api/rules/rule-sets` - List rule sets
- `POST /api/rules/rule-sets/{id}/rules` - Add rule
- `PUT /api/rules/rule-sets/{id}/rules/{r}` - Update rule

### Import Resolution (The Magic)

When a project bundle is deployed, the control plane recursively resolves all imports:

```python
# Input: bundle:prior-auth:1.0.0
# Output (resolved dependency graph):
[
  "bundle:prior-auth:1.0.0",         # Project
  "bundle:acme-health-corp:1.0.0",   # Domain
  "bundle:acme-architecture:1.0.0",  # Concern
  "bundle:acme-security:1.0.0",      # Concern
  "bundle:acme-clinical:1.0.0",      # Concern
  "bundle:acme-company-context:1.0.0", # Concern
  "bundle:hipaa:1.0.0",              # Standards
  "bundle:chai:1.0.0",               # Standards
  "bundle:soc2:1.0.0",               # Standards
  "bundle:meta:1.0.0"                # Meta
]
```

All SCDs from all bundles are combined and served to AI service.

### Database Schema

**Index/Ledger Database** (PostgreSQL):
- `bundles` - Bundle storage (id, version, type, manifest JSONB, validation_status)
- `tags` - Tag → bundle mappings (mutable pointers to immutable bundles)
- `active_subscriptions` - Which agents subscribed to which tags
- `deployments` - Multi-bundle deployments (deployment_id, project_bundle_id, bundle_ids array)
- `usage_events` - Agent usage tracking
- `adherence_reports` - Compliance reports
- `validations` - Validation history
- `events` - Lifecycle audit trail (subscriptions, updates, tag movements)

**Rules Database** (PostgreSQL):
- `rule_schemas` - JSON Schema definitions
- `rule_sets` - Versioned rule collections
- `rules` - Individual rules (e.g., formularies, networks)
- `rule_history` - Audit trail

**Redis** (Pub/Sub):
- Tag update channels - Broadcast tag updates to all Context Service instances
- Enables horizontal scaling of Context Service

---

## Repository Structure

```
OICP/
├── cli/                    # Command-line tools (scs commands)
│   ├── scs_tools/         # CLI implementation
│   └── templates/         # Project scaffolding templates
├── control-plane/         # Core platform services
│   ├── api_server/        # Bundle Registry + governance (port 8000)
│   ├── context_service/   # gRPC streaming (port 8002/8003)
│   ├── rules_engine/      # Custom rules (port 8001)
│   ├── mcp_server/        # LEGACY - not used in MVP
│   ├── database/          # PostgreSQL schemas
│   └── shared/            # Shared models and config
├── core/                  # SCS specification (v0.3)
│   ├── spec/0.3/          # Specification documents
│   ├── examples/          # Example bundles and SCDs
│   ├── templates/         # SCD templates
│   └── tools/             # scd-validator
├── registry/              # Reusable artifacts
│   ├── scd-library/       # Shared SCDs
│   └── templates/         # Bundle templates
├── test-plan/             # **MOST UP-TO-DATE DOCUMENTATION**
│   ├── test-plan.md       # Master test plan
│   ├── scs-bundle-arch-canonical-model.md  # The definitive model
│   ├── bundle-lifecycle-testing.md  # 4-phase testing approach
│   ├── testing-overview.md  # Bundle types and ownership
│   ├── concerns/          # Concern bundle test cases
│   │   └── company-concern/
│   │       └── TC-001-company-context-acme.md
│   └── standards/         # Standards bundle test cases
│       ├── chai/
│       │   └── TC-101-chai-standards.md
│       └── soc2/
│           └── TC-102-soc2-standards.md
└── OICP-marketing/        # Product briefs and positioning
```

---

## Current Status (January 2026)

### ✅ MVP Complete (Phases 3 & 4 Operational)
- ✅ **Bundle Registry** - Versioned bundle storage (DockerHub model)
- ✅ **Tag Management** - Mutable tags pointing to immutable bundles
- ✅ **Context Service** - gRPC streaming with real-time updates
- ✅ **Tag-based subscriptions** - Agents subscribe to tags (e.g., `prior-auth:latest`)
- ✅ **Zero-downtime updates** - Update all agents instantly via pub/sub
- ✅ **Perfect audit trail** - Track what context each agent had at any timestamp
- ✅ **Import resolution** - Recursive bundle dependency resolution
- ✅ **Rules Engine** - Custom business rules with schema validation
- ✅ **Database schemas** - PostgreSQL (Index/Ledger + Rules) + Redis (pub/sub)
- ✅ **CLI tooling** - Bundle creation, validation, scaffolding
- ✅ **5 bundle types** - Meta, Standards, Domain, Concern, Project

### 🚧 Partial (Stub Endpoints)
- 🚧 **Build/Manage Supervisors** - Stub endpoints exist, not fully implemented
- 🚧 **Governance Dashboard** - No UI yet (APIs exist)

### ❌ Not Built Yet
- ❌ **Authentication/Authorization** - APIs currently open (no JWT, RBAC)
- ❌ **Multi-tenancy** - Single organization only
- ❌ **Monitoring/Observability** - No Prometheus/Grafana
- ❌ **High Availability** - Single instance deployment (no load balancing)

### 📋 Documentation Alignment (January 6, 2026)

**Achievement**: After 5 weeks of rapid MVP development, documentation has been brought back into alignment with code reality.

**Updated Reference Documents** (`/temp-docs/`):
- ✅ `2026-01-06-actual-architecture.md` - Complete architecture audit
- ✅ `registry/2026-01-06-CONTEXT-AS-A-SERVICE.md` - CaaS vision (corrected gRPC, ports)
- ✅ `registry/2026-01-06-AI-OBSERVABILITY-COMPLIANCE.md` - Observability upsell (clarified as future)
- ✅ `registry/2026-01-06-REGISTRY-API-DESIGN.md` - API spec (added tag management)
- ✅ `registry/README.md` - Guide for using updated documents
- ✅ `/OICP-marketing/cli-and-api-notes.md` - CLI vs API usage (removed MCP references)

**Journal & Status Tracking** (`/temp-docs/Journal/`):
- ✅ `2026-01-05-status.md` - Comprehensive MVP completion status (576 lines)
- ✅ `2026-01-05-day-3-complete.md` - Day 3 achievement summary
- ✅ `deploy-serve-supervise-plan.md` - 3-phase implementation plan (982 lines)
- ✅ `2026-01-06-status.md` - Current status with competitive analysis

**This Week's Focus** (January 6-10, 2026):
1. Clean up all documentation and look for errors
2. Consolidate `/temp-docs/` back to main directories
3. Create structured context for OICP and sub-projects (open source, core, cli, registry, control-plane)
4. Test if structured context improves session-to-session context persistence

**Next Milestone**: Secure 1-2 funded design partners for MVP validation

---

## Key Insights for Working on OICP

### The Domain Bundle is The Killer Feature
- **1 domain bundle per company** - aggregates all concerns
- CTO/CIO owns it
- Every project imports it → instant access to all company context
- "Build once, use everywhere"

### Validation Philosophy
- **Loose validation in Phase 1** (Intent/DRAFT)
  - Validates structure, not content
  - Supports spectrum from minimal to full disclosure
  - CEO decides what to share
- **Strict validation in Phase 2** (Validate/Version)
  - All checks enforced before versioning
  - Immutable once published

### Ownership Model (Critical)
| Role                  | Owns Bundle Type | Contains                      |
|-----------------------|------------------|-------------------------------|
| SCS                   | Meta             | SCS specification language    |
| Standards Bodies      | Standards        | HIPAA, SOC2, CHAI, NIST      |
| CTO/CIO               | Domain           | Company knowledge aggregator  |
| Chief Architect       | Architecture     | System patterns, tech stack   |
| CISO                  | Security         | Security controls, threats    |
| CMO                   | Clinical         | Clinical protocols, safety    |
| CDO                   | Data Governance  | Data policies, retention      |
| CEO                   | Company-Context  | Mission, values, stakeholders |
| Product/Project Mgr   | Project          | Individual initiatives        |

### Key Architecture Concepts

**Registry (DockerHub Model)**:
- Part of Control Plane API (Port 8000)
- Versioned bundle storage (PostgreSQL)
- Public bundles - Standards from HIPAA, SOC2, CHAI (companies import)
- Private bundles - Company-specific context (access-controlled)
- Search, discovery, import workflows

**Tags (Docker-like)**:
- Mutable pointers to immutable bundles
- Example: `prior-auth:latest` → `bundle:prior-auth:1.0.0`
- When tag updates to point to v1.0.1, all subscribed agents get new context
- Zero-downtime updates

**Context Service (gRPC Streaming)**:
- Agents subscribe to tags (not bundles directly)
- Receive initial context snapshot
- Receive automatic updates when tags move
- Perfect audit trail - know exactly what context each agent had at any moment
- Pub/sub architecture (Redis) for broadcasting updates

**Real-Time Update Flow**:
1. CTO publishes new bundle version (v1.0.1) to Registry
2. Registry updates tag to point to new version
3. Registry sends webhook to Context Service
4. Context Service broadcasts via Redis pub/sub
5. All Context Service instances push update to their agents
6. Agents receive new context within 100ms (no restart)

---

## Market Context

### Target Markets
- **Healthcare**: Prior Authorization, Clinical Documentation, FHIR Governance (HIPAA, CHAI compliance)
- **Sales**: Prospecting, Lead Qualification, Outreach Compliance (TCPA, CAN-SPAM)
- **Future**: Legal, Finance, Government

### Competitive Positioning
- No direct competitors selling "control plane for AI governance"
- Different from prompt management tools (PromptLayer) - we govern context, not just prompts
- Different from AI governance platforms (Arthur, Fiddler) - we prevent drift proactively vs. detect reactively
- Different from in-house solutions - pre-built workflow, faster time-to-value

### Go-to-Market Timeline
- **Q1 2025**: Pilots (2-4 design partners)
- **Q2 2025**: Early adopters (5-10 paying customers, $200K ARR)
- **Q3-Q4 2025**: Scale (20-50 customers, $1M+ ARR)

---

## CRITICAL INSIGHT: Governance vs Workflow Context (Jan 6, 2026)

**The Breakthrough from Exec Call:**

> "Agents already have workflow with context and report the status of that workflow somewhere. What they don't have is context on how to behave - boundaries and limits."

### Agents Already Have:
- ✅ **Workflow** (business process they execute: check eligibility, verify coverage, approve/deny)
- ✅ **Operational context** (data to do their job: patient records, insurance policies, drug formularies)
- ✅ **Status reporting** (where results go: dashboards, databases, logs)

### Agents DON'T Have (This is What OICP Provides):
- ❌ **Behavioral boundaries** (what they're allowed/not allowed to do)
- ❌ **Compliance limits** (HIPAA constraints, clinical safety rules)
- ❌ **Governance guardrails** (bias prevention, ethical guidelines, audit requirements)

### The Correct Positioning

**OICP Streams Governance Context, NOT Workflow Context**

**What OICP Actually Provides:**
> "Your prior authorization agent already knows **what to do** (check eligibility, verify coverage, approve/deny). It has the patient data, the insurance policy, the workflow.
>
> What it doesn't have is **how to behave**: HIPAA boundaries, clinical safety limits, bias guardrails, audit requirements.
>
> **That's what OICP streams**: The governance context - the rules, boundaries, and compliance constraints the agent must operate within."

**The Analogy:**
> "Your agent is a car. It has an engine (workflow), GPS (operational context), and a dashboard (status reporting). What it doesn't have is **traffic laws**. OICP streams the traffic laws - speed limits, stop signs, right-of-way rules. The car still drives itself. But it drives **within legal boundaries**."

### Critical Validation Test Required

**Hypothesis**: Agents with structured governance context behave differently (more compliant, better boundaries) than agents without it.

**Test Structure**:
1. Pick one agent pattern (prior auth)
2. Define test scenario ("Approve/deny prior auth for expensive cancer drug")
3. Run **without** structured context → capture behavior
4. Run **with** structured context (HIPAA, clinical guidelines, formulary) → capture behavior
5. Document the difference

**This becomes Slide 1 of every demo.**

**Before/After Example:**

**Without Structured Context**:
```
Agent: "Based on my training data, I'll approve this expensive cancer drug
because the patient needs it."
[Problems: No formulary check, no medical necessity criteria, no audit trail]
```

**With Structured Context**:
```
Agent: "Checking formulary... Drug requires prior auth per Plan XYZ.
Reviewing medical necessity criteria from clinical guidelines...
Patient meets 3/4 criteria. APPROVED with documentation requirement.
Logged: HIPAA-compliant access, reasoning documented, bias check passed."
[Following actual rules, audit trail, compliance]
```

### V2 Roadmap: Intelligent Context Streaming

**Problem**: Naive approach streams entire bundle (HIPAA 50KB + Guidelines 200KB + Formulary 500KB). Agent uses 10%. High latency, high token cost.

**V2 Solution**: Intelligent context scoping
- Agent provides task hints (diagnosis, drug, patient age)
- Context Service filters dynamically
- Agent gets only relevant subset
- 10x faster, 80% fewer tokens

**Competitive Advantage**: "Unlike competitors who dump entire context libraries, OICP streams only what your agent needs for the task at hand."

**Reference**: See `/temp-docs/Journal/2026-01-06-exec-call-insights.md` for full details

---

## SCS Dogfooding Story: The Correct Framing (CRITICAL FOR MARKETING)

**WRONG FRAMING** (Do NOT use):
> "After 5 weeks of rapid development, our documentation was chaos. Random markdown files. Context drift between sessions. Every morning: re-teach Claude our architecture."

**Problem with this**: Makes it sound like a documentation problem. It wasn't.

**CORRECT FRAMING** (Use this):
> "After 5 weeks of rapid development on OICP, Claude kept making confident architectural decisions that seemed right in isolation but coded us into corners. Without explicit context about the overall system architecture, it would invent solutions that required significant rework to fix. It wasn't forgetting - it never had the architectural world to operate in."

**What Actually Happened**:
- Claude would build features that conflicted with earlier design decisions
- Made implementation choices that required significant rework
- Invented architectural patterns that didn't align with the overall system
- Without explicit context, it had no way to know what "fit" the bigger picture
- Each session started fresh, reinventing the architectural world

**This Aligns with the Martians Analogy**:
- Martians (AI) are intelligent and can build anything
- But without the "world" (architectural context), they make confident decisions that seem right
- Those decisions code you into corners because they don't fit the bigger system
- Not hallucination - just working without boundaries

**The Solution We Built**:
Created SCS bundles for SCS itself (`/dog-food/` directory) with:
- System architecture context
- Design decisions and rationale
- Patterns we use and patterns we avoid
- How components fit together
- Constraints we operate within

**The Outcome**:
Now Claude operates within our architectural world instead of inventing one. Features fit the system. Less rework. Consistent decisions.

**For Marketing/Sales**: This story demonstrates the core SCS value proposition - giving AI a bounded world to operate in prevents architectural drift and reduces rework.

---

## Important Notes for Claude

1. **Documentation now aligned** - As of Jan 6, 2026, docs match code reality (see `/temp-docs/`)
2. **MVP is complete** - Phases 3 & 4 are operational (Registry + Context Service)
3. **Context Service (not MCP)** - gRPC streaming, NOT "Model Context Protocol"
4. **Registry is real** - DockerHub model, part of Control Plane API (Port 8000)
5. **Tag-based architecture** - Agents subscribe to tags, get zero-downtime updates
6. **Legacy code exists** - `/control-plane/mcp_server/` is not used in MVP
7. **Current focus** - Documentation cleanup this week, then finding funded pilots
8. **Open source strategy** - `/core` will be open sourced as SCS specification
9. **Standards org play** - Partner with HIPAA, SOC2, CHAI to publish bundles to Registry
10. **User needs speed** - Focus on practical help for market validation
11. **Structured context experiment** - Using OICP to manage OICP docs (eating our own dog food)
12. **Journal directory** - `/temp-docs/Journal/` has comprehensive status updates and plans
13. **CRITICAL**: Always distinguish "governance context" from "workflow context" in pitches
14. **Validation test needed**: Prove agents behave differently with structured context

## Current Reference Docs (Prioritized)
1. `/temp-docs/Journal/2026-01-06-exec-call-insights.md` - **CRITICAL** - Governance vs workflow context distinction
2. `/temp-docs/Journal/2026-01-06-status.md` - Current status with competitive analysis
3. `/temp-docs/2026-01-06-actual-architecture.md` - Complete architecture (MOST ACCURATE)
4. `/temp-docs/marketing/OICP/GO-TO-MARKET-STRATEGY.md` - Updated GTM strategy (MVP vs vision clarified)
5. `/temp-docs/marketing/scs-spec-open-source/scs-marketing-plan.md` - Complete SCS open source launch plan
6. `/temp-docs/marketing/launch-posts.md` - Ready-to-use LinkedIn, HN, Twitter, Reddit posts
7. `/temp-docs/registry/2026-01-06-CONTEXT-AS-A-SERVICE.md` - CaaS vision document
8. `/temp-docs/registry/2026-01-06-AI-OBSERVABILITY-COMPLIANCE.md` - Observability upsell
9. `/temp-docs/registry/2026-01-06-REGISTRY-API-DESIGN.md` - Technical API reference
10. `/OICP-marketing/cli-and-api-notes.md` - CLI vs API usage guide
11. Code in `/OICP/control-plane/` - Ground truth for what's built

---

**Last Updated**: 2026-01-06 (Evening - added critical governance vs workflow context distinction)
**Next Review**: After validation test complete
**Status**: MVP complete, seeking funded pilots, preparing SCS open source launch
