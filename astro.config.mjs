// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://structuredcontext.dev',
	output: 'static',
	integrations: [
		starlight({
			title: 'Structured Context',
			description: 'A shared, versioned source of truth that ensures AI-assisted development is aligned, compliant, and reproducible.',
			logo: {
				src: './src/assets/logo.svg',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/structuredcontext' }
			],
			head: [
				{
					tag: 'meta',
					attrs: {
						property: 'og:image',
						content: 'https://structuredcontext.dev/og-image.png',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:image',
						content: 'https://structuredcontext.dev/og-image.png',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:card',
						content: 'summary_large_image',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'keywords',
						content: 'structured context, AI governance, AI context management, LLM context, AI compliance, context versioning, AI agents, context bundles, SCS',
					},
				},
			],
			customCss: [
				'./src/styles/custom.css',
			],
			sidebar: [
				{
					label: 'Get Started',
					items: [
						{ label: 'What is SCS?', link: '/' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
						{ label: 'Core Concepts', slug: 'getting-started/core-concepts' },
					],
				},
				{
					label: 'About SCS',
					items: [
						{ label: 'Architecture', slug: 'about/architecture' },
						{ label: 'Bundle Types', slug: 'about/bundle-types' },
						{ label: 'SCDs', slug: 'about/scds' },
						{ label: 'Versioning', slug: 'about/versioning' },
					],
				},
				{
					label: 'Using SCS',
					items: [
						{ label: 'Create Bundles', slug: 'guides/create-bundles' },
						{ label: 'Validate Context', slug: 'guides/validate' },
						{ label: 'Version & Deploy', slug: 'guides/version-deploy' },
						{ label: 'CLI Reference', slug: 'guides/cli-reference' },
					],
				},
				{
					label: 'Specification',
					items: [
						{ label: 'Overview', slug: 'specification/overview' },
						{ label: 'v0.3 (Current)', slug: 'specification/v0-3' },
						{ label: 'Bundle Format', slug: 'specification/bundle-format' },
						{ label: 'SCD Format', slug: 'specification/scd-format' },
					],
				},
				{
					label: 'Community',
					items: [
						{ label: 'Contributing', slug: 'community/contributing' },
						{ label: 'Examples', slug: 'community/examples' },
						{ label: 'Discussions', link: 'https://github.com/structuredcontext/discussions' },
					],
				},
			],
			editLink: {
				baseUrl: 'https://github.com/structuredcontext/spec/edit/main/',
			},
			lastUpdated: true,
			credits: false,
			components: {
				Footer: './src/components/Footer.astro',
			},
		}),
	],
});
