---
title: Validate Context
description: How to validate your structured context bundles and SCDs.
---

## Validation

Ensure your bundles and SCDs are properly structured before deployment.

## Validation Modes

- **Loose**: Structure validation only (DRAFT phase)
- **Strict**: Full validation (Version phase)

## Using the CLI

```bash
# Validate a bundle
scs validate ./bundles/my-bundle.yaml

# Validate with strict mode
scs validate ./bundles/my-bundle.yaml --strict
```

## Next Steps

- [Version & Deploy](/guides/version-deploy/)
- [CLI Reference](/guides/cli-reference/)
