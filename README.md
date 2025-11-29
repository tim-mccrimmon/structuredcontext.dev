# Structured Context

The connective tissue between human intent and AI execution.

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

## About

This is the official website for Structured Context, a shared, versioned source of truth that ensures AI-assisted development is aligned, compliant, and reproducible.

**Launch Date:** January 5, 2026

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Building for Production

```bash
# Build the site
npm run build

# Preview the build locally
npm run preview
```

## Deployment to Cloudflare Pages

This site is configured to deploy to Cloudflare Pages.

### Option 1: Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Connect your repository to Cloudflare Pages
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (or leave blank)
4. Deploy

Cloudflare Pages will automatically build and deploy on every push to your main branch.

### Option 2: Manual Deployment

```bash
# Install Wrangler CLI
npm install -g wrangler

# Build the site
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist
```

## Project Structure

```
.
├── public/              # Static assets (favicons, images)
├── src/
│   ├── assets/         # Images, logos (processed by Astro)
│   ├── content/
│   │   └── docs/       # Markdown/MDX documentation files
│   ├── styles/         # Custom CSS
│   └── content.config.ts
├── astro.config.mjs    # Astro + Starlight configuration
├── package.json
└── tsconfig.json
```

## Content Management

### Adding New Pages

Create `.md` or `.mdx` files in `src/content/docs/`. The file structure determines the URL:

- `src/content/docs/guides/example.md` → `/guides/example/`
- `src/content/docs/specification/overview.md` → `/specification/overview/`

### Updating Navigation

Edit the `sidebar` configuration in `astro.config.mjs`.

### Custom Styling

Modify `src/styles/custom.css` to customize the site appearance.

## Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## Contributing

We welcome contributions! Please see our GitHub repository for guidelines.

## Community

- **GitHub Discussions:** Share ideas and ask questions
- **GitHub Issues:** Report bugs and request features
- **Community Wiki:** Contribute documentation and examples

## License

See LICENSE file for details.
