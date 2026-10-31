/*
 * First focusable element on every page. Parked above the viewport with a
 * transform (not display: none) so screen readers and keyboards can reach it.
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link inline-flex min-h-11 items-center rounded-sm bg-accent px-4 text-button text-on-accent hover:text-on-accent"
    >
      Skip to content
    </a>
  );
}
