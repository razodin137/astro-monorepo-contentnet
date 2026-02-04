import { defineConfig } from 'astro/config';
import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

// https://astro.build/config
export default defineConfig({
    vite: {
        define: {
            'import.meta.env.SITE_TAG': JSON.stringify(pkg.siteConfig.tag),
            'import.meta.env.SITE_TITLE': JSON.stringify(pkg.siteConfig.title)
        }
    }
});
