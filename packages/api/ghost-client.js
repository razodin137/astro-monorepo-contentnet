import GhostContentAPI from "@tryghost/content-api";

// 1. Initialize the API once
const api = new GhostContentAPI({
    url: import.meta.env.PUBLIC_GHOST_URL || 'https://demo.ghost.io',
    key: import.meta.env.PUBLIC_GHOST_KEY,
    version: "v5.0"
});

// 2. The Reusable Function
export async function getSiteContent() {
    // THE MAGIC: It reads the specific site's tag (injected from package.json via vite define)
    const currentTag = import.meta.env.SITE_TAG;

    if (!currentTag) {
        console.warn("⚠️ SITE_TAG is missing! Defaulting to 'getting-started' for demo purposes.");
        return await api.posts.browse({ limit: 5 });
    }

    console.log(`🤖 Fetching content for tag: #${currentTag}`);

    try {
        return await api.posts.browse({
            filter: `tag:${currentTag}`,
            include: "tags,authors"
        });
    } catch (err) {
        console.error(`Error fetching content for tag ${currentTag}:`, err);
        return [];
    }
}
