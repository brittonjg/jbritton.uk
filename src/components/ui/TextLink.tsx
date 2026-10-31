import Link from "next/link";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  /** "forward" puts → after the label, "back" puts ← before it. */
  arrow?: "forward" | "back" | "none";
  className?: string;
}

/*
 * Accent text link in the button type style, 44px tall. The arrow sits in an
 * aria-hidden span and nudges 3px on hover over duration-fast.
 */
export default function TextLink({
  href,
  children,
  arrow = "forward",
  className = "",
}: TextLinkProps) {
  return (
    <Link
      href={href}
      className={`text-link inline-flex min-h-11 items-center gap-1 text-button text-accent hover:text-accent-hover ${className}`}
    >
      {arrow === "back" && (
        <span aria-hidden="true" className="text-link-arrow is-back">
          &larr;
        </span>
      )}
      {children}
      {arrow === "forward" && (
        <span aria-hidden="true" className="text-link-arrow">
          &rarr;
        </span>
      )}
    </Link>
  );
}
