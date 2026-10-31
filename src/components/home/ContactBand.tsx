import { linkedInUrl } from "@/lib/constants";
import Button from "@/components/ui/Button";

/*
 * Inverse band. Uses the inverse-* tokens, which are dark in both site
 * themes, and the inverse tone of Button for its actions.
 */
export default function ContactBand() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mb-16 scroll-mt-24 rounded-lg bg-inverse-surface px-6 py-12 text-center shadow-card sm:px-12"
    >
      <h2 id="contact-heading" className="font-display text-heading-2 text-inverse-text">
        Let&rsquo;s talk
      </h2>
      {/* TODO(james): optional one-line invitation in text-inverse-text-secondary, e.g. what you're happy to be contacted about. */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button href={linkedInUrl} tone="inverse" external>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="size-4"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Message me on LinkedIn
        </Button>
        {/* TODO(james): add email — no address exists in the repo yet, so no email button is shown. When you add it, use <Button variant="secondary" tone="inverse" href="mailto:…" external>. */}
      </div>
    </section>
  );
}
