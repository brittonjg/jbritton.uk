import { siteConfig, socialLinks } from "@/lib/constants";

export default function Footer() {
  // Generated at build time; the site is rebuilt on every deploy.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-reading flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <p className="text-small text-text-tertiary">
          &copy; {year} {siteConfig.name}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6">
          {socialLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-nav text-text-secondary transition-colors duration-fast hover:text-accent"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
