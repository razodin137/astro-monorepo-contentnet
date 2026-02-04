/**
 * @my-network/config
 * 
 * Shared Astro configuration helper for the content network.
 * This makes any theme "Ghost-aware" by injecting the necessary
 * environment variables from package.json's siteConfig.
 * 
 * Usage in any theme's astro.config.mjs:
 * 
 *   import { defineConfig } from 'astro/config';
 *   import { createSiteConfig } from '@my-network/config';
 *   import mdx from '@astrojs/mdx';
 *   
 *   export default defineConfig(createSiteConfig({
 *       integrations: [mdx()]
 *   }));
 */

import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from 'vite';

/**
 * Reads the site's package.json and extracts siteConfig
 * @returns {Object} The siteConfig object or empty defaults
 */
function getSiteConfig() {
    try {
        const pkgPath = path.resolve(process.cwd(), 'package.json');
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
        return pkg.siteConfig || {};
    } catch (err) {
        console.warn('⚠️ Could not read package.json siteConfig:', err.message);
        return {};
    }
}

/**
 * Loads Ghost environment variables from the monorepo root
 * @param {string} envDir - Directory to load .env from (default: monorepo root)
 * @returns {Object} Environment variables
 */
function loadGhostEnv(envDir = '../../') {
    try {
        return loadEnv('', envDir, ['PUBLIC_']);
    } catch (err) {
        console.warn('⚠️ Could not load environment variables:', err.message);
        return {};
    }
}

/**
 * Creates a site-aware Astro config with Ghost API integration
 * 
 * This reads from:
 * - package.json → siteConfig.tag (SITE_TAG for filtering Ghost posts)
 * - package.json → siteConfig.title (SITE_TITLE for display)
 * - ../../.env → PUBLIC_GHOST_URL, PUBLIC_GHOST_KEY
 * 
 * @param {Object} astroConfig - Your base Astro config object
 * @param {Object} options - Additional options
 * @param {string} options.envDir - Directory for .env file (default: '../../')
 * @returns {Object} Complete Astro config with vite.define injected
 * 
 * @example
 * // Simple usage
 * export default defineConfig(createSiteConfig({
 *     integrations: [mdx()]
 * }));
 * 
 * @example
 * // With custom env location
 * export default defineConfig(createSiteConfig({
 *     integrations: [mdx()]
 * }, { envDir: '../../../' }));
 */
export function createSiteConfig(astroConfig = {}, options = {}) {
    const { envDir = '../../' } = options;

    const siteConfig = getSiteConfig();
    const env = loadGhostEnv(envDir);

    // Build the vite.define object
    const ghostDefines = {
        'import.meta.env.SITE_TAG': JSON.stringify(siteConfig.tag || ''),
        'import.meta.env.SITE_TITLE': JSON.stringify(siteConfig.title || 'Astro Site'),
        'import.meta.env.PUBLIC_GHOST_URL': JSON.stringify(env.PUBLIC_GHOST_URL || ''),
        'import.meta.env.PUBLIC_GHOST_KEY': JSON.stringify(env.PUBLIC_GHOST_KEY || '')
    };

    // Merge with any existing vite config
    return {
        ...astroConfig,
        vite: {
            ...astroConfig.vite,
            define: {
                ...ghostDefines,
                ...astroConfig.vite?.define  // User defines take precedence
            }
        }
    };
}

// Default export for convenience
export default createSiteConfig;
