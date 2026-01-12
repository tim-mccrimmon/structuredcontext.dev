---
title: CLI Reference
description: Complete reference for the SCS command-line interface.
---

## CLI Reference

Complete command reference for the `scs` CLI tool.

## Installation

### From PyPI

```bash
pip install scs-tools
```

This automatically installs `scs-validator` as a dependency.

### From Source

```bash
# Clone the repository
git clone https://github.com/tim-mccrimmon/structured-context-spec.git
cd structured-context-spec/../scs-cli

# Install in development mode
pip install -e .
```

## Commands Overview

The `scs` command provides five main subcommands:

| Command | Purpose |
|---------|---------|
| `scs new` | Create new SCS projects from templates |
| `scs init` | Initialize SCS in existing projects |
| `scs add` | Add SCDs and bundles incrementally |
| `scs bundle` | Create and manage bundles |
| `scs validate` | Validate SCDs and bundles |

---

## `scs new` - Create New Projects

Scaffold a complete SCS project from templates.

### Basic Usage

```bash
# Create standard project
scs new project my-project

# Healthcare application (HIPAA, CHAI, TEFCA)
scs new project medication-adherence --type healthcare

# Financial services (PCI-DSS, SOX)
scs new project banking-app --type fintech

# SaaS product (GDPR, SOC2)
scs new project my-saas --type saas

# Government application (NIST, FedRAMP)
scs new project gov-portal --type government

# Minimal project (11 essential SCDs)
scs new project prototype --type minimal

# Standard project (38 minimum SCDs)
scs new project my-app --type standard
```

### Options

```bash
# Specify output directory
scs new project my-app --dir /path/to/projects

# Add author information
scs new project my-app --author "Jane Doe" --email "jane@example.com"

# Interactive mode (prompts for all options)
scs new project my-app --interactive
```

---

## `scs init` - Initialize Existing Projects

Add SCS structure to an existing project.

```bash
# Initialize in current directory
scs init

# Initialize with specific project type
scs init --type healthcare

# Initialize in specific directory
scs init --dir /path/to/existing/project
```

---

## `scs add` - Add SCDs and Bundles

Incrementally add SCDs or domain bundles to your project.

```bash
# Add a specific SCD
scs add scd system-context

# Add a domain bundle
scs add bundle security

# Add multiple SCDs
scs add scd authn-authz data-protection threat-model

# Add domain bundle with all related SCDs
scs add bundle compliance-governance --with-scds
```

---

## `scs bundle` - Manage Bundles

Create and manage SCD bundles.

```bash
# Create a bundle from SCDs
scs bundle create --name my-bundle --scds context/project/*.yaml

# List all bundles
scs bundle list

# Update a bundle
scs bundle update bundles/project-bundle.yaml

# Validate bundle completeness
scs bundle check bundles/project-bundle.yaml
```

---

## `scs validate` - Validate SCDs and Bundles

Validate SCS documents against the specification.

### Basic Usage

```bash
# Validate a single SCD file
scs validate context/project/system-context.yaml

# Validate multiple SCD files
scs validate context/project/*.yaml

# Validate a bundle
scs validate --bundle bundles/project-bundle.yaml
```

### Validation Options

```bash
# Strict mode (fail on warnings)
scs validate --bundle bundles/project-bundle.yaml --strict

# JSON output
scs validate --bundle bundles/project-bundle.yaml --output json

# Skip completeness checks
scs validate --bundle bundles/project-bundle.yaml --skip-completeness

# Custom schema directory
scs validate --schema-dir /path/to/schemas context/project/system-context.yaml

# Verbose output
scs validate --bundle bundles/project-bundle.yaml --verbose

# Disable colored output
scs validate --no-color context/project/system-context.yaml
```

### Options Reference

| Option | Description |
|--------|-------------|
| `--bundle` | Validate a bundle file instead of individual SCDs |
| `--schema-dir` | Specify custom schema directory |
| `--output [text\|json]` | Output format (default: text) |
| `--strict` | Fail on warnings (exit code 2) |
| `--no-color` | Disable colored output |
| `--verbose` | Verbose output |
| `--skip-completeness` | Skip Level 6 completeness validation |

---

## Project Structure

A generated SCS project has this structure:

```
my-project/
├── bundles/                    # SCS bundles
│   ├── project-bundle.yaml    # Top-level bundle
│   ├── meta-bundle.yaml       # Meta vocabulary
│   ├── standards-bundle.yaml  # Compliance standards
│   └── domains/               # Domain bundles
│       ├── architecture.yaml
│       ├── security.yaml
│       ├── performance-reliability.yaml
│       └── ... (10 total)
├── context/                   # SCD files
│   └── project/              # Project-tier SCDs
│       ├── system-context.yaml
│       ├── tech-stack.yaml
│       ├── integration-map.yaml
│       └── ... (30+ SCDs)
├── docs/
│   └── GETTING_STARTED.md
├── .scs/
│   └── config
├── .gitignore
├── README.md
└── VERSION
```

## Domain Bundles

Projects include 10 domain bundles covering:

1. **Architecture**: System design, tech stack, integrations, components
2. **Security**: Authentication, data protection, threat model
3. **Performance & Reliability**: Response time, availability, fault tolerance, scalability
4. **Usability & Accessibility**: UX principles, accessibility compliance, error handling
5. **Compliance & Governance**: Regulatory requirements (HIPAA, SOC2, etc.)
6. **Data & Provenance**: Data model, lineage tracking, retention policies
7. **Testing & Validation**: Test coverage, validation plans, QA procedures
8. **Deployment & Operations**: Infrastructure, observability, incident response
9. **Safety & Risk**: Risk assessment, safety checklists
10. **Ethics & AI Accountability**: AI usage policy, audit trails, bias mitigation

## Getting Help

Get help for any command:

```bash
scs --help
scs new --help
scs init --help
scs add --help
scs bundle --help
scs validate --help
```

## Next Steps

- [Create Your First Bundle](/guides/create-bundles/)
- [Validate Context](/guides/validate/)
- [View Examples](/community/examples/)
