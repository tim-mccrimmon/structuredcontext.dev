---
title: Version & Deploy
description: How to version and deploy your SCS bundles.
---

## Version & Deploy

Lock your bundles with semantic versions and deploy them for use.

:::note[Coming Soon]
Deployment guide is being developed. CLI launches January 5, 2026.
:::

## Versioning Workflow

1. Validate bundle (strict mode)
2. Assign semantic version
3. Lock bundle (immutable)
4. Tag in git
5. Deploy to registry

## CLI Commands

```bash
# Version a bundle
scs bundle version ./bundles/my-bundle.yaml --version 1.0.0

# Deploy (future)
# scs deploy ./bundles/my-bundle.yaml
```

## Next Steps

- [CLI Reference](/guides/cli-reference/)
- [View Specification](/specification/overview/)
