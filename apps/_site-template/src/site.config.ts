interface SocialLink {
    platform: string;
    url: string;
    label?: string;
}

export const siteInfo = {
    title: "Template Site",
    description: "A solid starting point for your next project.",
};

export const navLinks = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
];

export const footerLinks = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
    { platform: "github", url: "https://github.com/kaojaicam", label: "GitHub" },
    { platform: "twitter", url: "https://x.com/kaojaicam", label: "Twittter" },
    { platform: "instagram", url: "https://instagram.com/kajaicam", label: "Instagram" },
];
