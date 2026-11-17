// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://structuredcontext.dev',
	output: 'static',
	redirects: {
		'/plugins': '/skills',
		'/plugins/scs-vibe': '/skills',
		'/plugins/scs-team': '/skills',
		'/docs/plugins/scs-vibe': '/docs/skills/overview',
		'/docs/plugins/scs-team': '/docs/skills/overview',
		'/docs/plugins/reference': '/docs/skills/cli',
		'/docs/examples/solo-developer': '/docs/examples/personal-domain',
		'/docs/examples/team-setup': '/docs/examples/organization',
		'/docs/examples/healthcare-bundle': '/docs/examples/medtech-cdmo',
	},
	integrations: [
		starlight({
			title: 'Structured Context',
			description: 'An open specification for the guidance, guardrails, and facts an organization wants its AI to work from. Versioned, approved by a named person, and maintained with AI assistance.',
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
						content: 'structured context, AI governance, AI guardrails, agent skills, context versioning, AI compliance, runtime artifact, domain ontology, context bundles, SCS',
					},
				},
			],
			customCss: [
				'./src/styles/custom.css',
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Overview', slug: 'docs' },
						{ label: 'Quick Start', slug: 'docs/getting-started/quick-start' },
						{ label: 'Placing an Artifact', slug: 'docs/getting-started/placement' },
					],
				},
				{
					label: 'Skills and Tools',
					items: [
						{ label: 'Agent Skills', slug: 'docs/skills/overview' },
						{ label: 'CLI Reference', slug: 'docs/skills/cli' },
					],
				},
				{
					label: 'Specification',
					items: [
						{ label: 'Overview', slug: 'docs/specification/overview' },
						{ label: 'v0.7 (Current)', slug: 'docs/specification/v0-7' },
						{ label: 'Domain Repositories', slug: 'docs/specification/domain-repositories' },
						{ label: 'Runtime Artifact', slug: 'docs/specification/runtime-artifact' },
						{ label: 'Citations', slug: 'docs/specification/citations' },
						{ label: 'Domain Ontology', slug: 'docs/specification/domain-ontology' },
						{ label: 'Bundle Format', slug: 'docs/specification/bundle-format' },
						{ label: 'SCD Format', slug: 'docs/specification/scd-format' },
						{
							label: 'Migration Guides',
							collapsed: true,
							items: [
								{ label: '0.6 → 0.7.0', slug: 'docs/specification/migration-0-7' },
								{ label: '0.5 → 0.6.0', slug: 'docs/specification/migration-0-6' },
								{ label: '0.3 → 0.5.0', slug: 'docs/specification/migration-0-5' },
							],
						},
						{
							label: 'Previous Versions',
							collapsed: true,
							items: [
								{ label: 'v0.6', slug: 'docs/specification/v0-6' },
								{ label: 'v0.5', slug: 'docs/specification/v0-5' },
								{ label: 'v0.3', slug: 'docs/specification/v0-3' },
							],
						},
					],
				},
				{
					label: 'Examples',
					items: [
						{ label: 'Personal Domain', slug: 'docs/examples/personal-domain' },
						{ label: 'Organization and Projects', slug: 'docs/examples/organization' },
						{ label: 'Medical-Device CDMO', slug: 'docs/examples/medtech-cdmo' },
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
				baseUrl: 'https://github.com/tim-mccrimmon/structuredcontext.dev/edit/main/',
			},
			lastUpdated: true,
			credits: false,
			components: {
				Footer: './src/components/Footer.astro',
			},
		}),
	],
});
