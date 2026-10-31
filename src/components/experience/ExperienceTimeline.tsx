"use client";

import { useEffect, useRef } from "react";

/*
 * Timeline draws itself: a grey 2px rail with an accent-decor rail on top
 * whose length follows scroll progress. Progress is written to --rail-fill
 * (0 to 1, i.e. 0–100%) and drives a scaleY transform, so nothing reflows.
 * Each entry gets .is-reached once the fill passes its node.
 *
 * Under reduced motion the CSS draws the rail in full and fills every node,
 * and this script does nothing.
 */
export default function ExperienceTimeline({ children }: { children: React.ReactNode }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      // The fill's leading edge tracks a line 60% of the way down the screen.
      const anchor = window.innerHeight * 0.6;
      const filled = Math.min(Math.max(anchor - rect.top, 0), rect.height);
      list.style.setProperty("--rail-fill", rect.height ? String(filled / rect.height) : "0");

      list.querySelectorAll<HTMLElement>(".experience-entry").forEach((entry) => {
        const node = entry.querySelector<HTMLElement>(".experience-node");
        if (!node) return;
        const nodeRect = node.getBoundingClientRect();
        const nodeCentre = nodeRect.top + nodeRect.height / 2 - rect.top;
        entry.classList.toggle("is-reached", filled >= nodeCentre);
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div ref={listRef} className="experience-timeline">
      <span aria-hidden="true" className="experience-rail bg-border" />
      <span aria-hidden="true" className="experience-rail-fill bg-accent-decor" />
      <ol className="flex flex-col gap-10">{children}</ol>
    </div>
  );
}
