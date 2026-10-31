import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  /** Renders a link when set, otherwise a <button>. */
  href?: string;
  variant?: "primary" | "secondary";
  /** "inverse" is for buttons on the contact band (inverse-surface). */
  tone?: "default" | "inverse";
  size?: "sm" | "md";
  /** Render a plain <a> (for files, external links and downloads). */
  external?: boolean;
  download?: boolean;
  /** Links get aria-disabled="true"; buttons get the disabled attribute. */
  disabled?: boolean;
  /** Shows a spinner, swaps the label for `loadingLabel` and sets aria-busy. */
  loading?: boolean;
  /** The "-ing" form of the label, e.g. "Sending" for "Send". */
  loadingLabel?: string;
  type?: "button" | "submit";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

/*
 * Button states (design system v2):
 * hover    primary → accent-hover; secondary → accent-subtle fill, accent-decor edge
 * focus    2px accent outline, 2px offset (global :focus-visible)
 * pressed  scale(0.98) over duration-fast (.press)
 * disabled disabled-surface fill, disabled-text label
 * loading  16px spinner before an "-ing" label, aria-busy="true"
 */
const base =
  "press inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md text-button transition duration-fast";

const variants = {
  default: {
    primary: "bg-accent text-on-accent hover:bg-accent-hover hover:text-on-accent",
    secondary:
      "border border-border-control bg-surface text-text-primary shadow-control hover:border-accent-decor hover:bg-accent-subtle hover:text-on-accent-subtle",
  },
  inverse: {
    primary:
      "bg-inverse-accent text-on-inverse-accent hover:bg-inverse-accent-hover hover:text-on-inverse-accent",
    secondary:
      "border border-border-control-inverse bg-transparent text-inverse-text shadow-control-inverse hover:border-inverse-accent hover:text-inverse-accent-hover",
  },
};

const disabledClasses =
  "cursor-not-allowed border border-transparent bg-disabled-surface text-disabled-text shadow-none";

const sizes = {
  sm: "px-4",
  md: "px-5",
};

function Spinner() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="size-4 animate-spin"
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Button({
  children,
  href,
  variant = "primary",
  tone = "default",
  size = "md",
  external = false,
  download = false,
  disabled = false,
  loading = false,
  loadingLabel,
  type = "button",
  onClick,
  className = "",
}: ButtonProps) {
  const inactive = disabled || loading;
  const colour = disabled ? disabledClasses : variants[tone][variant];
  const classes = `${base} ${colour} ${sizes[size]} ${loading ? "cursor-progress" : ""} ${className}`;

  const content = loading ? (
    <>
      <Spinner />
      {loadingLabel ?? children}
    </>
  ) : (
    children
  );

  if (!href) {
    return (
      <button
        type={type}
        className={classes}
        disabled={disabled}
        aria-busy={loading || undefined}
        aria-disabled={loading || undefined}
        onClick={inactive ? undefined : onClick}
      >
        {content}
      </button>
    );
  }

  // A disabled or loading link has no href, so it can't be followed.
  if (inactive) {
    return (
      <a
        role="link"
        aria-disabled="true"
        aria-busy={loading || undefined}
        className={classes}
      >
        {content}
      </a>
    );
  }

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        {...(download ? { download: true } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
