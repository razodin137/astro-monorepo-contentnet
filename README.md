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

By default, theming is going to be handled by each /apps's /styles/theme.css file.

However, if you decide from the beginning that you want the site to have a unique Astro theme that you found, that theme is essentially going to be a new /app

For example, I've been copy-pasting my _site-template folder same as before. 
- For this theme, we're going to skip that.

Simply git clone the theme into your /apps directory.

That's going to create a totally new way of handling everything, and you won't have access to our shared scripts, UI, or anything else unless you build it into that theme yourself. 

Feel free to create a new site based on a theme. New theme, new /app. 
- Just keep in mind that it's going to be a bit more manual in terms of getting it to play nice with our EXISTING tools, whereas the Theme itself will of course provide some guardrails to handle its own functionality. 

# Viewing Your Content

To view this locally, simply clone the repo, and run:

```
npm run dev
```

To see a static build of the site, run:


```
npm run build
```