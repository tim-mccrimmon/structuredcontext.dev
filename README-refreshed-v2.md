
# Structured Context
### The operating environment for reliable, aligned, AI-assisted software development.

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)
![Spec Status](https://img.shields.io/badge/Spec-Version_0.1-blue)
![Lifecycle](https://img.shields.io/badge/CEDM-Intent→Validate→Version→Build-green)
![License](https://img.shields.io/badge/License-Apache_2.0%20%2F%20CC--BY_4.0-yellow)
![Open Standard](https://img.shields.io/badge/Open-Standard-purple)

---

## About Structured Context

Structured Context (SCS) is a **compact, machine-readable, versioned representation of a project’s essential intent, constraints, architecture boundaries, and governing rules**.  
It provides the stable environment required for both **humans and AI systems** to build software with consistency, clarity, and alignment.

Modern AI-assisted development breaks down not because models are inadequate, but because the **environment they operate in is undefined**.  
SCS solves this by making the environment explicit, structured, compact, and shareable.

### Why SCS exists
- Aligns humans and AI with the same understanding  
- Prevents architectural and requirements drift  
- Reduces rework and accelerates delivery  
- Enables safer multi-agent workflows  
- Lays the foundation for future autonomic governance  

This website hosts the *official documentation*, including the specification, lifecycle model (CEDM), onboarding guides, and examples.

**Public Launch Date:** January 5, 2026

---

## Key Concepts

### SCD — Structured Context Definition
An atomic, versioned definition capturing one essential element: a rule, boundary, domain concept, or constraint.

### Bundles
Versioned manifests that assemble SCDs into a coherent operating environment:

- **Project Bundles** (complete system environment)  
- **Category Bundles** (architecture, UX, compliance, etc.)  
- **Domain Bundles** (derived from TOGAF, ISO/IEC 25010, NIST RMF)

### CEDM — Context Engineering Development Model
A lightweight lifecycle: **Intent → Validate → Version → Build**

SCS is the mechanism; CEDM is the process that governs it.

---

# Development

## Prerequisites
- Node.js 18+
- npm or yarn

## Local Development

```bash
npm install
npm run dev
```

Visit:  
👉 `http://localhost:4321`

## Build for Production

```bash
npm run build
npm run preview
```

---

# Deployment to Cloudflare Pages

### Automatic Deployment (Recommended)

1. Push to GitHub  
2. Connect the repository to Cloudflare Pages  
3. Configure build settings:  
   - **Build command:** `npm run build`  
   - **Output directory:** `dist`  
4. Deploy — Cloudflare will build on every push.

### Manual Deployment

```bash
npm install -g wrangler
npm run build
wrangler pages deploy dist
```

---

# Project Structure

```
.
├── public/              
├── src/
│   ├── assets/          
│   ├── content/         
│   │   └── docs/       
│   ├── styles/
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

# Content Management

### Adding New Pages
Add `.md` or `.mdx` under `src/content/docs/`.

```
src/content/docs/guides/example.md        → /guides/example/
src/content/docs/specification/overview.md → /specification/overview/
```

### Navigation
Modify `sidebar` in `astro.config.mjs`.

### Styling
Edit `src/styles/custom.css`.

---

# Commands

| Command           | Action                                      |
|------------------|---------------------------------------------|
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start dev server at localhost:4321          |
| `npm run build`   | Build site → `dist/`                         |
| `npm run preview` | Preview production build                    |

---

# Contributing

We welcome contributions—from documentation improvements to examples and tooling.  
See Issues & Discussions to participate.

---

# Community

- **GitHub Discussions** — Ideas & Q&A  
- **GitHub Issues** — Bugs & feature requests  
- **Community Wiki** — Best practices & examples  

Structured Context is an **open standard**. Everyone is invited to help shape it.

---

# License

See `LICENSE` for details.

