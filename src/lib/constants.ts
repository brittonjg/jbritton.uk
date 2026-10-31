export const siteConfig = {
  name: "James Britton",
  title: "Head of Engineering @ Cuvva",
  description:
    "Head of Engineering at Cuvva. Building teams that ship great products",
  url: "https://jbritton.uk",
};

export const linkedInUrl = "https://www.linkedin.com/in/jgbritton/";

export const cvPdfPath = "/pdf/JBrittonCV.pdf";

export const socialLinks = [
  {
    name: "LinkedIn",
    url: linkedInUrl,
    icon: "linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/brittonjg",
    icon: "github",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/britton.jg/",
    icon: "instagram",
  },
  {
    name: "Last.fm",
    url: "https://www.last.fm/user/mcdillon",
    icon: "lastfm",
  },
] as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Writing", href: "/blog" },
  { label: "Experience", href: "/experience" },
  { label: "CV", href: "/cv" },
] as const;
