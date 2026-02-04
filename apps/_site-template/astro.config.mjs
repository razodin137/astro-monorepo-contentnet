import { defineConfig } from 'astro/config';
import { createSiteConfig } from '@my-network/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
// createSiteConfig() reads package.json → siteConfig and wires up Ghost API
export default defineConfig(createSiteConfig({
    markdown: {
        remarkPlugins: [
            function defaultLayout() {
                return function (tree, file) {
                    file.data.astro.frontmatter.layout = '../layouts/MarkdownLayout.astro';
                };
            }
        ]
    },
    integrations: [mdx()]
}));
