---
title: Quick Start
description: Get up and running with SCS in minutes.
---

## Quick Start

Get started with Structured Context Specification in just a few steps.

## Installation

### Option 1: Install from PyPI (Recommended)

```bash
pip install scs-tools
```

This installs both the `scs` CLI and the validator.

### Option 2: Install from Source

```bash
# Clone the repository
git clone https://github.com/tim-mccrimmon/structured-context-spec.git
cd structured-context-spec/../scs-cli

# Install in development mode
pip install -e .
```

### Verify Installation

```bash
scs --version
scs --help
```

## Create Your First Project

### 1. Scaffold a New Project

```bash
# Create a standard project
scs new project my-first-scs-project

# Or choose a template for your use case
scs new project healthcare-app --type healthcare
scs new project fintech-app --type fintech
scs new project saas-product --type saas
```

This creates a complete project structure with:
- 📦 **10 domain bundles** (Architecture, Security, Compliance, etc.)
- 📄 **30+ SCDs** covering common project needs
- ✅ **Pre-configured** validation and structure

### 2. Explore the Project

```bash
cd my-first-scs-project
ls -la

# View the structure
tree -L 2
```

You'll see:

```
my-first-scs-project/
├── bundles/                    # Bundle manifests
│   ├── project-bundle.yaml    # Your main bundle
│   └── domains/               # Domain bundles
├── context/                   # Your SCDs
│   └── project/              # Project-tier SCDs
├── docs/                      # Documentation
└── README.md                 # Getting started guide
```

### 3. Validate Your Project

```bash
# Validate a bundle
scs validate --bundle bundles/project-bundle.yaml

# Validate individual SCDs
scs validate context/project/system-context.yaml
```

## Add Context to Existing Project

Already have a project? Initialize SCS in it:

```bash
cd /path/to/your/project
scs init --type saas

# This adds SCS structure to your existing codebase
```

## Add SCDs Incrementally

Don't need everything? Add just what you need:

```bash
# Add a single SCD
scs add scd system-context

# Add a domain bundle
scs add bundle security

# Add multiple SCDs at once
scs add scd authn-authz data-protection threat-model
```

## Example: Minimal Healthcare Project

Here's a complete example for a healthcare application:

```bash
# 1. Create project
scs new project patient-portal --type healthcare

# 2. Navigate to project
cd patient-portal

# 3. Validate everything
scs validate --bundle bundles/project-bundle.yaml

# 4. Customize your SCDs
# Edit context/project/system-context.yaml with your app details
vim context/project/system-context.yaml

# 5. Add healthcare-specific context
scs add scd hipaa-compliance
scs add scd phi-handling

# 6. Validate again
scs validate --bundle bundles/project-bundle.yaml
```

## Basic Workflow

The typical SCS workflow:

1. **Create** - Scaffold project or add SCS to existing project
2. **Customize** - Edit SCDs to match your system
3. **Validate** - Ensure structure is correct
4. **Version** - Tag and version your bundles
5. **Deploy** - Use bundles with AI agents

## Project Templates

SCS provides templates for common use cases:

| Template | Best For | Includes |
|----------|----------|----------|
| `standard` | General projects | 38 SCDs, 10 domains |
| `minimal` | Quick prototypes | 11 essential SCDs |
| `healthcare` | HIPAA compliance | HIPAA, CHAI, TEFCA standards |
| `fintech` | Financial services | PCI-DSS, SOX standards |
| `saas` | SaaS products | GDPR, SOC2 standards |
| `government` | Government apps | NIST, FedRAMP standards |

## Next Steps

Now that you have a project:

- **[Understand Core Concepts](/getting-started/core-concepts/)** - Learn about bundles, SCDs, and tiers
- **[CLI Reference](/guides/cli-reference/)** - Complete command documentation
- **[View Examples](/community/examples/)** - See real-world examples
- **[Specification](/specification/overview/)** - Dive into technical details

## Getting Help

- 📖 [Full Documentation](/)
- 💬 [GitHub Discussions](https://github.com/tim-mccrimmon/structured-context-spec/discussions)
- 🐛 [Report Issues](https://github.com/tim-mccrimmon/structured-context-spec/issues)
- 📝 [View Examples](/community/examples/)

## Common Commands Reference

```bash
# Create new project
scs new project my-app --type saas

# Initialize in existing project
scs init --type healthcare

# Add SCDs incrementally
scs add scd system-context authn-authz

# Validate everything
scs validate --bundle bundles/project-bundle.yaml

# Strict validation
scs validate --bundle bundles/project-bundle.yaml --strict

# Get help
scs --help
scs new --help
```

Ready to dive deeper? Check out [Core Concepts](/getting-started/core-concepts/) to understand how SCS works.
