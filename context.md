# Astro Monorepo (The "Static-First" Modern Approach)
- This is optimized for Build Performance. The nightly cron job triggers a build process that generates pure HTML.


/astro-content-network
├── package.json
├── /scripts
│   └── nightly-build.sh       <-- CRON LIVES HERE: Triggers 'npm run build' for each site
│
├── /packages
│   └── /ui                    <-- MAIN HTML HOME (The "Skeleton")
│       ├── /components
│       │   ├── Header.astro   <-- Shared HTML logic (One source of truth)
│       │   └── Card.astro     <-- Shared logic: "If API has image, show it"
│       └── /layouts
│           └── BaseLayout.astro <-- The <html>, <head>, and <meta> tags
│
├── /apps                      <-- THE SITES
│   ├── /food-site
│   │   ├── astro.config.mjs
│   │   ├── /src
│   │   │   ├── /styles
│   │   │   │   └── theme.css  <-- CSS HOME: Site-specific colors/fonts
│   │   │   └── /pages
│   │   │       └── index.astro <-- API CALL HOME: Fetch(url?tag=foodsite)
│   │   └── /dist              <-- OUTPUT: Pure HTML/CSS for Site A
│   │
│   ├── /tech-blog
│   │   ├── /src
│   │   │   ├── /styles
│   │   │   │   └── theme.css  <-- CSS HOME: Dark mode / Code fonts
│   │   │   └── /pages
│   │   │       └── index.astro <-- API CALL HOME: Fetch(url?tag=techblog)
│   │   └── /dist              <-- OUTPUT: Pure HTML/CSS for Site B
│   │
│   └── /news-portal
│       └── /src
│           ├── /styles
│           │   └── theme.css  <-- CSS HOME: Minimalist/Clean
│           └── /pages
│               └── index.astro <-- API CALL HOME: Fetch(url?tag=news)
│       └── /dist              <-- OUTPUT: Pure HTML/CSS for Site C

---


### The Project Structure (Hybrid)
Here is how your Food Site looks when it pulls 90% of its content from Ghost (API) but keeps a few static pages (Markdown) for things like "Legal" or "About Us."

Plaintext
/apps/food-site
├── /public
├── /src
│   ├── /layouts
│   │   └── MarkdownLayout.astro  <-- The "Skin" for your Markdown files
│   │
│   └── /pages
│       │
│       │  │       ├── index.astro           <-- Homepage (Fetches list from Ghost)
│       ├── [slug].astro          <-- Post Template (Fetches single post from Ghost)
│       │
│       │  │       ├── about.md              <-- Renders to /about
│       ├── privacy.md            <-- Renders to /privacy
│       └── contact.md            <-- Renders to /contact


---

### The "One Script" (Shared Package)
This lives in packages/api/index.js. It is generic. It doesn't know about "Food" or "Tech." It just asks: "What tag do you want?"

JavaScript
// packages/api/ghost-client.js
import GhostContentAPI from "@tryghost/content-api";

// 1. Initialize the API once
const api = new GhostContentAPI({
  url: 'https://my-cms.com',
  key: process.env.GHOST_API_KEY, // Reads from the system
  version: "v5.0"
});

// 2. The Reusable Function
export async function getSiteContent() {
  // THE MAGIC: It reads the specific site's tag from the Environment Variable
  const currentTag = import.meta.env.SITE_TAG; 

  if (!currentTag) throw new Error("SITE_TAG is missing!");

  console.log(`🤖 Fetching content for tag: #${currentTag}`);
  
  return await api.posts.browse({
    filter: `tag:${currentTag}`,
    include: "tags,authors"
  });
}

---

### The Site Configuration 
You don't touch the code. You only touch the configuration file.

File: apps/food-site/.env

Bash
SITE_TAG=site-food
File: apps/tech-blog/.env

Bash
SITE_TAG=site-tech


### The Implementation (Copy-Pasteable Code)
Because the logic is abstracted away, your index.astro file becomes identical for every single site. You could literally copy-paste this file 100 times, and it would generate 100 different sites based on the .env file.

File: apps/food-site/src/pages/index.astro

JavaScript
---
// Import the "One Script"
import { getSiteContent } from '@my-network/api';
import Card from '@my-network/ui/Card.astro';

// Run the script (It automatically grabs 'site-food' from .env)
const posts = await getSiteContent();
---

<html>
  <body>
    <h1>Latest Posts</h1>
    <div class="grid">
      {posts.map(post => <Card data={post} />)}
    </div>
  </body>
</html>

---

## Adding External Astro Themes to the Network

You can clone any Astro theme into `/apps` and make it "Ghost-aware" in 3 steps:

### Step 1: Clone the Theme

```bash
cd apps
git clone https://github.com/some-user/cool-astro-theme.git my-new-site
rm -rf my-new-site/.git  # Disconnect from original repo
```

### Step 2: Update `package.json`

Replace or merge the theme's `package.json` with these required fields:

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
        "title": "My New Site Title"
    }
}
```

### Step 3: Update `astro.config.mjs`

Replace or merge the theme's config to use `createSiteConfig()`:

```javascript
import { defineConfig } from 'astro/config';
import { createSiteConfig } from '@my-network/config';

// Wrap your existing config with createSiteConfig()
export default defineConfig(createSiteConfig({
    // Keep existing integrations, e.g.:
    // integrations: [mdx(), tailwind()]
}));
```

### Step 4: Add a Ghost-Powered Page

Create or modify any page to fetch from Ghost:

```astro
---
// src/pages/blog.astro
import { getSiteContent } from '@my-network/api';

const posts = await getSiteContent();  // Auto-filters by siteConfig.tag
---

<h1>Blog</h1>
{posts.map(post => <article>{post.title}</article>)}
```

### Step 5: Install & Build

```bash
cd ../../                # Back to monorepo root
npm install              # Links the new site
npm run build -w my-new-site  # Build just this site
```

---

## How It Works

The `@my-network/config` package does the magic:

1. Reads `package.json → siteConfig.tag` and `siteConfig.title`
2. Loads `.env` from the monorepo root (`PUBLIC_GHOST_URL`, `PUBLIC_GHOST_KEY`)
3. Injects these as `import.meta.env.*` via Vite's `define` option

The `@my-network/api` package then uses `import.meta.env.SITE_TAG` to filter posts automatically.