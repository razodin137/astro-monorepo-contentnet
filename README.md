# Astro Monorepo - Multiple Sites

- Uses Astro and Turbo to manage multiple sites

Simply clone this repo to serve as your local devlopment environment for creating an Astro multisite. 

### Creating a NEW Site

Creating a new site is simple. 

- Simply duplicate the _site-template folder found in /apps.

1. **Rename** _site-template to the name of your site.
2. **Update** that *package.json* file found in the newly create */apps directory* for your new site. All it needs is your site name and the tag that the API needs to fetch for new content. 
3. That's it!

Of course, you're gonna want to make a new **theme** for your site and give it some **new content.**

But as far as making a new site is concerned, it's mostly *copy-paste!* 

All you need for that brand new site is a new **package.json** file. It's in the template you just copy-pasted. **Simply update package.json with your *new title* and *new tag.***

### Configuring Your Site

Each site template comes with a `src/site.config.ts` file. This is where you manage:
- **Navigation Links**: Customize your header menu.
- **Footer Links**: Add quick links to the footer.
- **Social Media**: Add your profiles (GitHub, Twitter, etc.).

This allows you to control the content of your global Header and Footer without touching the code.

# Content

- Calls to Ghost-CMS via the Admin and Content APIs

- Content can also be written in pure markdown by simply placing it in the /src/pages folder of each site. 
> To add in ***Javascript*** functionality to your existing markdown files, you can change the .md extension to a .mdx file. Check the Astro documentation for more details on .mdx files. You might use this if you want to add some javascript newsletter signup to your .md files. 

# UI

Centralized UI:
- UI components are centralized in /packages/ui and are shared across ALL sites.
- Headers, footers, html forms, newsletter signups: this stuff can live in /packages/ui.

---

# Theming

- Each site has its own theme and configuration in the form of a simple /styles/theme.css file.

By default, theming is going to be handled by each /apps's /styles/theme.css file.

### Using External Astro Themes



**--WARNING: All content will have to be adjusted manually when using Astro themes from other creators. You'll have to look into that theme's way of handling content.--**

If you decide from the beginning that you want the site to have a unique Astro theme that you found, that theme is essentially going to be a new /app

Simply git clone the theme into your /apps directory.

That's going to create a totally new way of handling everything, and you won't have access to our shared scripts, UI, or anything else unless you build it into that theme yourself. 

Feel free to create a new site based on a theme. New theme, new /app. 

- Just keep in mind that it's going to be a bit more manual in terms of getting it to play nice with our EXISTING tools, whereas the Theme itself will of course provide some guardrails to handle its own functionality. 

You can clone any Astro theme into `/apps` and wire it up to Ghost in a few steps.

#### Step 1: Clone the Theme

```bash
cd apps
git clone https://github.com/someone/cool-astro-theme.git my-new-site
rm -rf my-new-site/.git  # Disconnect from original repo
```

#### Step 2: Copy the Astro Config

Replace the theme's `astro.config.mjs` with ours (or merge if the theme has custom integrations):

```bash
cp apps/_site-template/astro.config.mjs apps/my-new-site/astro.config.mjs
```

If the theme has custom integrations (like Tailwind), merge them:

```javascript
// apps/my-new-site/astro.config.mjs
import { defineConfig } from 'astro/config';
import { createSiteConfig } from '@my-network/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';  // Keep theme's integrations

export default defineConfig(createSiteConfig({
    integrations: [mdx(), tailwind()]  // Merge integrations here
}));
```

#### Step 3: Update package.json

Add our dependencies and siteConfig to the theme's `package.json`:

```json
{
    "name": "my-new-site",
    "type": "module",
    "dependencies": {
        "@my-network/api": "*",
        "@my-network/config": "*",
        "@my-network/ui": "*",
        "astro": "^5.17.1"
    },
    "siteConfig": {
        "tag": "site-my-new-site",
        "title": "My New Site"
    }
}
```

> **Tip:** Keep any existing dependencies the theme needs (like `@astrojs/tailwind`).

#### Step 4: Add a Ghost-Powered Blog Page

Copy our blog page template:

```bash
cp apps/_site-template/src/pages/blog.astro apps/my-new-site/src/pages/blog.astro
```

Or create your own using the Ghost API:

```astro
---
import { getSiteContent } from '@my-network/api';

const posts = await getSiteContent();  // Auto-filters by siteConfig.tag
---

<h1>Blog</h1>
{posts.map(post => <article>{post.title}</article>)}
```

#### Step 5: Install & Run

```bash
cd ../..              # Back to monorepo root
npm install           # Links the new site to shared packages
npm run dev           # Start all sites
```

Your new themed site will now pull content from Ghost based on its `siteConfig.tag`!

### How the Integration Works

The `@my-network/config` package reads from your site's `package.json`:
- `siteConfig.tag` → Used by the Ghost API to filter posts
- `siteConfig.title` → Available as `import.meta.env.SITE_TITLE`

Ghost credentials (`PUBLIC_GHOST_URL`, `PUBLIC_GHOST_KEY`) are loaded from the root `.env` file automatically. 

# Viewing Your Content

To view this locally, simply clone the repo, and run:

```
npm run dev
```

This will build all sites in the /apps directory and give each a unique /localhost port to view them on your machine. 

---

To see a static build of the site, run:


```
npm run build
```
Each site will have static files appear in its own unique /dist directory.