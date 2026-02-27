import Image from "next/image";
import { siteConfig } from "@/lib/constants";
import SocialLinks from "@/components/ui/SocialLinks";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center py-32 text-center sm:py-40">
      <div className="animate-fade-in-up h-44 w-44 overflow-hidden rounded-full ring-2 ring-accent/20 ring-offset-4 ring-offset-background shadow-xl sm:h-48 sm:w-48">
        <Image
          src="/images/selfie.jpg"
          alt={siteConfig.name}
          width={192}
          height={192}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <h1 className="animate-fade-in-up [animation-delay:120ms] mt-8 font-display text-4xl text-text-primary sm:text-5xl">
        {siteConfig.name}
      </h1>
      <p className="animate-fade-in-up [animation-delay:240ms] mt-4 text-lg text-text-secondary">
        {siteConfig.title}
      </p>
      <p className="animate-fade-in-up [animation-delay:360ms] mt-4 max-w-lg leading-relaxed text-text-secondary">
        {siteConfig.description}
      </p>
      <div className="animate-fade-in [animation-delay:480ms]">
        <SocialLinks className="mt-8" />
      </div>
    </section>
  );
}
