import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import { loadEnv } from 'vite';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

// Load environment variables from the root (../../)
const env = loadEnv('', '../../', ['PUBLIC_']);

// https://astro.build/config
export default defineConfig({
    vite: {
        define: {
            'import.meta.env.SITE_TAG': JSON.stringify(pkg.siteConfig.tag),
            'import.meta.env.SITE_TITLE': JSON.stringify(pkg.siteConfig.title),
            'import.meta.env.PUBLIC_GHOST_URL': JSON.stringify(env.PUBLIC_GHOST_URL),
            'import.meta.env.PUBLIC_GHOST_KEY': JSON.stringify(env.PUBLIC_GHOST_KEY)
        }
    }
});
