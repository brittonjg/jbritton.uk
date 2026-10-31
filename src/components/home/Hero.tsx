import Image from "next/image";
import { cvPdfPath, siteConfig } from "@/lib/constants";
import SocialLinks from "@/components/ui/SocialLinks";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center py-16 text-center sm:py-24">
      <div className="animate-fade-in-up h-44 w-44 overflow-hidden rounded-full ring-2 ring-accent-decor/30 ring-offset-4 ring-offset-background shadow-xl sm:h-48 sm:w-48">
        <Image
          src="/images/selfie.jpg"
          alt={siteConfig.name}
          width={192}
          height={192}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <h1 className="animate-fade-in-up [animation-delay:120ms] mt-8 font-display text-h1 text-text-primary sm:text-display">
        {siteConfig.name}
      </h1>
      <p className="animate-fade-in-up [animation-delay:240ms] mt-4 text-lg font-semibold text-text-secondary">
        Head of Engineering at{" "}
        <a
          href="https://www.cuvva.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover"
        >
          Cuvva
        </a>
      </p>
      <p className="animate-fade-in-up [animation-delay:360ms] mt-3 max-w-lg text-text-secondary">
        Building teams that ship great products.
        {/* TODO(james): add one more sentence about what you care about. */}
      </p>
      <div className="animate-fade-in-up [animation-delay:420ms] mt-8 flex flex-wrap items-center justify-center gap-3">
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
            className="h-4 w-4"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Download CV
        </Button>
      </div>
      <div className="animate-fade-in [animation-delay:480ms]">
        <SocialLinks className="mt-6" />
      </div>
    </section>
  );
}
