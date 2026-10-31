import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  /** Render a plain <a> (for files, external links and downloads). */
  external?: boolean;
  download?: boolean;
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-200";

const variants = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover hover:text-on-accent",
  secondary:
    "border border-border bg-surface text-text-primary shadow-card hover:border-accent hover:text-accent",
};

const sizes = {
  sm: "min-h-9 px-3.5 text-sm",
  md: "min-h-11 px-5 text-sm",
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  download = false,
  className = "",
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        {...(download ? { download: true } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
