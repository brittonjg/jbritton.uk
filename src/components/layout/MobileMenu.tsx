interface MobileMenuProps {
  id: string;
  open: boolean;
  children: React.ReactNode;
  className?: string;
}

/*
 * Under 640px this wraps the header's nav in a panel that opens with a
 * grid-row transition (duration-base). From 640px up it is a plain wrapper,
 * so the same nav markup serves both layouts. Closed, the panel is
 * visibility: hidden, which keeps its links out of the tab order.
 */
export default function MobileMenu({ id, open, children, className = "" }: MobileMenuProps) {
  return (
    <div id={id} className={`mobile-menu ${open ? "is-open" : ""} ${className}`}>
      <div>{children}</div>
    </div>
  );
}

interface MenuButtonProps {
  open: boolean;
  controls: string;
  onClick: () => void;
  buttonRef: React.Ref<HTMLButtonElement>;
}

export function MenuButton({ open, controls, onClick, buttonRef }: MenuButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? "Close menu" : "Open menu"}
      className="press inline-flex size-11 items-center justify-center rounded-md text-text-secondary transition-colors duration-fast hover:bg-accent-subtle hover:text-text-primary sm:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-5"
      >
        {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 12h16M4 6h16M4 18h16" />}
      </svg>
    </button>
  );
}
