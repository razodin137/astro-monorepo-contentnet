# Site Template

This is the standard starter template for new sites in the monorepo. It comes pre-configured with:
- **Ghost CMS Integration**: Automatically fetches content based on your site tag.
- **Shared UI Components**: Uses the global Header and Footer standard.
- **Local Configuration**: Easy customization via `site.config.ts`.

## 🚀 Quick Start

1. **Rename** this folder to your site name (e.g., `apps/my-new-site`).
2. **Update** `package.json` with your site name and Ghost tag.
3. **Configure** your site in `src/site.config.ts`.

## ⚙️ Configuration

The site uses a data-driven approach for global components. You don't need to edit HTML to change your navigation or footer.

Open `src/site.config.ts` to customize:

### Valid Social Platforms
Supported platforms for icons:
- `twitter` (X)
- `github`
- `linkedin`
- `youtube`
- `instagram`
- `email`
- `website`

### Example Configuration

```typescript
export const siteInfo = {
    title: "My Awesome Site",
    description: "Welcome to my new website built with Astro.",
};

export const navLinks = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Shop", href: "/shop" }, // Add your own links
];

export const socialLinks: SocialLink[] = [
    { platform: "twitter", url: "https://x.com/me", label: "Follow me" },
    { platform: "github", url: "https://github.com/me" },
];
```

## 🎨 Styling

- **Theme**: Edit `src/styles/theme.css` to change CSS variables (colors, fonts, spacing).
- **Layout**: Edit `src/layouts/BaseLayout.astro` if you need to fundamentally change the page structure or swap out the shared Header/Footer.
