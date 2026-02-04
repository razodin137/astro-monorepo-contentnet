# Astro Monorepo - Multiple Sites

- Uses Astro and Turbo to manage multiple sites

##### Content

- Calls to Ghost-CMS via the Admin and Content APIs

##### UI and Theming

Centralized UI:
- UI components are centralized in /packages/ui and are shared across ALL sites.
- Headers, footers, html forms, newsletter signups: this stuff can live in /packages/ui.

Customized Themes:
- Each site has its own theme and configuration in the form of a simple /styles/theme.css file.

### Creating a NEW Site

Creating a new site is simple. 

- Simply duplicate the _site-template folder found in /apps.

1. **Rename** _site-template to the name of your site.
2. **Update** that *package.json* file found in the newly create */apps directory* for your new site. All it needs is your site name and the tag that the API needs to fetch for new content. 
3. That's it!

Of course, you're gonna want to make a new **theme** for your site and give it some **new content.**

But as far as making a new site is concerned, it's mostly *copy-paste!* 

All you need for that brand new site is a new **package.json** file. It's in the template you just copy-pasted. **Simply update package.json with your *new title* and *new tag.***

---

### Theming

The monorepo supports a **hybrid theme system** for flexibility.

#### Shared Themes (`packages/themes/`)

Themes in `packages/themes/` are shared across all sites. To use a shared theme:

1. Set `siteConfig.theme` in your site's `package.json`:
   ```json
   "siteConfig": {
       "theme": "default"
   }
   ```
2. Add the theme dependency: `"@my-network/themes-default": "*"`
3. Import from `@theme` in your pages:
   ```astro
   import Layout from '@theme/layouts/Base.astro';
   import Card from '@theme/components/Card.astro';
   ```

#### Local Theme Override (`src/themes/`)

To customize a theme for a single site without affecting others:

1. Create a folder: `src/themes/{theme-name}/`
2. Add your custom layouts/components there.
3. The site will automatically use the local version instead of the shared package.

This gives you the best of both worlds: shared themes for consistency, with an escape hatch for per-site customization.


# Viewing Your Content

To view this locally, simply clone the repo, and run:

```
npm run dev
```

To see a static build of the site, run:


```
npm run build
```