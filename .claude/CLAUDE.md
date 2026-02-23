# structuredcontext.dev — Website Context

## What This Project Is

The public documentation website for the SCS (Structured Context Specification) open-source project.
Built with **Astro + Starlight**, deployed statically to `https://structuredcontext.dev`.

The website documents the SCS spec and its ecosystem. It is NOT the SCP control plane product —
that lives in the `SCP-2` repo. For SCP/SCS product context, rely on `~/.claude/CLAUDE.md` (global).

---

## Tech Stack

- **Framework**: Astro v5 with Starlight integration (`@astrojs/starlight`)
- **Language**: TypeScript (minimal), MDX for content
- **Output**: Static site (`output: 'static'`)
- **Deployed to**: `https://structuredcontext.dev`

---

## Key Directories

```
structuredcontext.dev/
├── src/
│   ├── content/docs/       # All documentation pages (MDX/Markdown)
│   │   ├── getting-started/
│   │   ├── guides/
│   │   ├── specification/
│   │   ├── reference/
│   │   ├── community/
│   │   └── index.mdx       # Homepage
│   ├── components/         # Custom Astro components
│   ├── assets/             # Images, SVGs
│   └── styles/             # CSS overrides
├── public/                 # Static assets (favicon, OG images, logos)
├── astro.config.mjs        # Astro + Starlight configuration
├── src/content.config.ts   # Content collection schema
└── package.json
```

---

## Common Commands

```bash
npm run dev       # Start dev server (http://localhost:4321)
npm run build     # Build static site to ./dist/
npm run preview   # Preview production build locally
```

---

## Content Authoring Conventions

- All docs live in `src/content/docs/` as `.md` or `.mdx` files
- Starlight requires frontmatter with at least `title`:
  ```yaml
  ---
  title: "Page Title"
  description: "Short description for SEO"
  ---
  ```
- Sidebar navigation is configured in `astro.config.mjs` under `starlight.sidebar`
- To add a new page: create the file, then add it to the sidebar config
- Images referenced in content should live in `src/assets/` (Astro optimizes them)
  or `public/` (served as-is)

---

## What's Linked From Here

- The spec repo: `https://github.com/tim-mccrimmon/structured-context-spec`
- Plugins: scs-vibe (Cursor/Windsurf), scs-team (Claude Code agents)
- The SCP product site (separate, not on this domain)

---

## What NOT to Do

- Don't add SCP control plane architecture details to this site — that's product docs, not spec docs
- Don't commit build output (`dist/`) — it's in `.gitignore`
- Don't modify `node_modules/` or `package-lock.json` manually

---

**Last Updated**: 2026-02-23
