"use client";

import { useEffect, useRef } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

/*
 * Section reveal: fades in and rises 8px (duration-slow, ease-standard) the
 * first time the section scrolls into view, then never again.
 *
 * The hidden starting state is added here, only for sections that start
 * below the fold, so content stays visible if this script never runs. Under
 * reduced motion nothing is hidden or animated (see .reveal in globals.css).
 */
export default function AnimatedSection({ children, className }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen at load: leave it alone rather than flash it.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add("reveal");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
