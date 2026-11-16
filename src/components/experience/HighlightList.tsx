"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

interface HighlightListProps {
  highlights: string[];
  /** How many bullets to show before the "Show more" toggle. */
  visibleCount?: number;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1 text-small text-text-secondary">
      {items.map((h) => (
        <li key={h} className="flex items-start gap-2">
          <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent-decor" />
          {h}
        </li>
      ))}
    </ul>
  );
}

// hidden="until-found" lets find-in-page and text-fragment links reveal the
// collapsed bullets. Where it isn't supported (Safari at the time of writing),
// the bullets stay collapsed and inert, as before; the CV page lists them all.
const noSubscribe = () => () => {};
const supportsUntilFound = () => "onbeforematch" in HTMLElement.prototype;
const supportsUntilFoundOnServer = () => false;

/*
 * Role highlights with a "Show more" disclosure. The extra bullets open with
 * a grid-row transition (duration-base). While collapsed they can't be reached
 * by keyboard or screen reader: hidden="until-found" once the closing
 * transition ends where the browser supports it (so Ctrl+F still finds them
 * and opens the list), otherwise inert.
 */
export default function HighlightList({ highlights, visibleCount = 3 }: HighlightListProps) {
  const [expanded, setExpanded] = useState(false);
  // True once the list is fully collapsed (the closing transition has ended)
  const [closed, setClosed] = useState(true);
  const untilFound = useSyncExternalStore(noSubscribe, supportsUntilFound, supportsUntilFoundOnServer);
  const panelRef = useRef<HTMLDivElement>(null);
  const moreId = useId();
  const visible = highlights.slice(0, visibleCount);
  const more = highlights.slice(visibleCount);
  const concealed = untilFound && !expanded && closed;

  // React treats `hidden` as a boolean, so set the "until-found" value directly.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !untilFound) return;
    if (concealed) panel.setAttribute("hidden", "until-found");
    else panel.removeAttribute("hidden");
  }, [untilFound, concealed]);

  // Find-in-page matched a hidden bullet: the browser removes `hidden` itself;
  // open the list so the button and aria-expanded agree.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !untilFound) return;
    const onBeforeMatch = () => {
      setExpanded(true);
      setClosed(false);
    };
    panel.addEventListener("beforematch", onBeforeMatch);
    return () => panel.removeEventListener("beforematch", onBeforeMatch);
  }, [untilFound]);

  function toggle() {
    if (expanded) {
      setExpanded(false);
      // With no transition to wait for, it is closed straight away
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setClosed(true);
    } else {
      setExpanded(true);
      setClosed(false);
    }
  }

  return (
    <div className="mt-3">
      <Bullets items={visible} />
      {more.length > 0 && (
        <>
          <div
            id={moreId}
            className={`collapsible ${expanded ? "is-open" : ""}`}
            inert={!expanded && !concealed}
            onTransitionEnd={(event) => {
              if (event.target === event.currentTarget && !expanded) setClosed(true);
            }}
          >
            {/* hidden="until-found" goes on this unpadded grid child */}
            <div ref={panelRef}>
              <div className="pt-1">
                <Bullets items={more} />
              </div>
            </div>
          </div>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={moreId}
            onClick={toggle}
            className="mt-2 inline-flex min-h-11 items-center gap-1 text-button text-accent transition-colors duration-fast hover:text-accent-hover"
          >
            {expanded ? "Show less" : "Show more"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className={`size-4 transition-transform duration-base ${expanded ? "rotate-180" : ""}`}
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
