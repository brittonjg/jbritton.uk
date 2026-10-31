"use client";

import { useId, useState } from "react";

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

/*
 * Role highlights with a "Show more" disclosure. The extra bullets open with
 * a grid-row transition (duration-base) and are inert while hidden, so they
 * can't be reached by keyboard or screen reader.
 */
export default function HighlightList({ highlights, visibleCount = 3 }: HighlightListProps) {
  const [expanded, setExpanded] = useState(false);
  const moreId = useId();
  const visible = highlights.slice(0, visibleCount);
  const more = highlights.slice(visibleCount);

  return (
    <div className="mt-3">
      <Bullets items={visible} />
      {more.length > 0 && (
        <>
          <div id={moreId} className={`collapsible ${expanded ? "is-open" : ""}`} inert={!expanded}>
            <div>
              <div className="pt-1">
                <Bullets items={more} />
              </div>
            </div>
          </div>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={moreId}
            onClick={() => setExpanded(!expanded)}
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
