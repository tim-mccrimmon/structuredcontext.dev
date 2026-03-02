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
			description: 'Context Engineering for AI development. A structured, versioned approach to AI context management.',
			logo: {
				src: './src/assets/logo.svg',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/tim-mccrimmon/structured-context-spec' }
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
						content: 'context engineering, structured context, AI governance, AI context management, LLM context, AI compliance, context versioning, AI agents, context bundles, SCS',
					},
				},
			],
			customCss: [
				'./src/styles/custom.css',
			],
			sidebar: [
				{
					label: 'Plugins',
					items: [
						{ label: 'Overview', slug: 'docs' },
						{ label: 'scs-vibe', slug: 'docs/plugins/scs-vibe' },
						{ label: 'scs-team', slug: 'docs/plugins/scs-team' },
						{ label: 'Plugin Reference', slug: 'docs/plugins/reference' },
					],
				},
				{
					label: 'Specification',
					items: [
						{ label: 'Overview', slug: 'docs/specification/overview' },
						{ label: 'v0.3 (Current)', slug: 'docs/specification/v0-3' },
						{ label: 'Bundle Format', slug: 'docs/specification/bundle-format' },
						{ label: 'SCD Format', slug: 'docs/specification/scd-format' },
					],
				},
				{
					label: 'Examples',
					items: [
						{ label: 'Solo Developer', slug: 'docs/examples/solo-developer' },
						{ label: 'Team Setup', slug: 'docs/examples/team-setup' },
						{ label: 'Healthcare Bundle', slug: 'docs/examples/healthcare-bundle' },
					],
				},
				{
					label: 'Community',
					items: [
						{ label: 'Contributing', slug: 'docs/community/contributing' },
						{ label: 'RFC Process', slug: 'docs/community/rfc-process' },
						{ label: 'Open Questions', slug: 'docs/community/open-questions' },
						{ label: 'Discussions', link: 'https://github.com/tim-mccrimmon/structured-context-spec/discussions' },
					],
				},
			],
			editLink: {
				baseUrl: 'https://github.com/tim-mccrimmon/structured-context-spec/edit/main/',
			},
			lastUpdated: true,
			credits: false,
			components: {
				Footer: './src/components/Footer.astro',
			},
		}),
	],
});
