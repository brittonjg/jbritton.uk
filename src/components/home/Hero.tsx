import Image from "next/image";
import { cvPdfPath, siteConfig } from "@/lib/constants";
import SocialLinks from "@/components/ui/SocialLinks";
import Button from "@/components/ui/Button";

/** Hero entrance: each step fades in and rises 8px, staggered by 120ms. */
function enter(step: number) {
  return { "--enter-delay": `${step * 120}ms` } as React.CSSProperties;
}

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center py-16 text-center sm:py-24">
      <div className="hero-enter relative size-36 sm:size-40" style={enter(0)}>
        <div className="size-full overflow-hidden rounded-full shadow-avatar">
          <Image
            src="/images/selfie.jpg"
            alt="Portrait of James Britton"
            width={160}
            height={160}
            className="size-full object-cover"
            priority
          />
        </div>
        {/* Ring draws in from the top: r 87 in a 176 viewBox, 8px outside the photo */}
        <svg viewBox="0 0 176 176" aria-hidden="true" className="hero-ring">
          <circle
            cx="88"
            cy="88"
            r="87"
            fill="none"
            strokeWidth="2"
            className="stroke-accent-decor"
          />
        </svg>
      </div>
      <h1
        className="hero-enter mt-8 font-display text-heading-1 text-text-primary sm:text-display"
        style={enter(1)}
      >
        {siteConfig.name}
      </h1>
      <p className="hero-enter mt-4 text-body-large font-semibold text-text-secondary" style={enter(2)}>
        Head of Engineering at{" "}
        <a
          href="https://www.cuvva.com"
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target text-accent hover:text-accent-hover"
        >
          Cuvva
        </a>
      </p>
      <p className="hero-enter mt-3 max-w-lg text-body-large text-text-secondary" style={enter(3)}>
        These days that&rsquo;s mostly people, plans and keeping things moving, but
        I&rsquo;m still hands-on with the code.
      </p>
      <div
        className="hero-enter mt-8 flex flex-wrap items-center justify-center gap-3"
        style={enter(4)}
      >
        <Button href="/#contact">Get in touch</Button>
        <Button href={cvPdfPath} variant="secondary" download>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-4"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Download CV
        </Button>
      </div>
      <div className="hero-enter mt-6" style={enter(5)}>
        <SocialLinks />
      </div>
    </section>
  );
}
