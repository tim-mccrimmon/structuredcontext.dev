---
title: Validate Context
description: How to validate your structured context bundles and SCDs.
---

## Validation

Ensure your bundles and SCDs are properly structured before deployment.

:::note[Coming Soon]
Validation guide is being developed. CLI launches January 5, 2026.
:::

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
