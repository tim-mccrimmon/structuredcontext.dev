---
title: Team Setup
description: Set up shared structured context for a development team using scs-team.
---

## Team setup with scs-team

This example walks through scs-team setup for a three-person development team working
on a healthcare application. The team has existing documentation: a product requirements
doc, an architecture decision record, and a HIPAA compliance checklist.

## What scs-team needs

Point it at your documentation. scs-team works best when you have:

- Product requirements or feature specs
- Architecture decisions (even informal ones)
- Compliance or security requirements
- Onboarding docs or team conventions

You don't need all of these. Start with what you have.

## Running the init

From within Claude Code, run:

```
/scs-team:init
```

Follow the prompts to specify your documentation sources. scs-team will process them
and generate structured context files in your project root.

## Shared context in the repo

After init, commit the generated files:

```bash
git add CLAUDE.md .claude/
git commit -m "Add SCS context files"
```

When a team member clones the repo and opens Claude Code, they get the same structured
context automatically. No manual setup. No inconsistent prompting.

## Keeping context in sync

When documentation changes, run:

```
/scs-team:sync
```

This re-processes the source docs and updates the context files. Review the diff in a pull
request — context changes that affect how Claude behaves deserve the same review process as
code changes.

## Next steps

- [Healthcare bundle example](/docs/examples/healthcare-bundle/)
- [scs-team reference](/docs/plugins/scs-team/)
