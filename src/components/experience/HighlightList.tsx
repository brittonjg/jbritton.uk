"use client";

import { useId, useState } from "react";

interface HighlightListProps {
  highlights: string[];
  /** How many bullets to show before the "Show more" toggle. */
  visibleCount?: number;
}

export default function HighlightList({
  highlights,
  visibleCount = 3,
}: HighlightListProps) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const hiddenCount = Math.max(0, highlights.length - visibleCount);

  return (
    <>
      <ul id={listId} className="mt-3 space-y-1 text-sm text-text-secondary">
        {highlights.map((h, i) => (
          <li
            key={i}
            className="flex items-start gap-2"
            hidden={!expanded && i >= visibleCount}
          >
            <span
              aria-hidden="true"
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-decor"
            />
            {h}
          </li>
        ))}
      </ul>
      {hiddenCount > 0 && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded(!expanded)}
          className="mt-2 inline-flex min-h-11 items-center gap-1 rounded-sm text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          {expanded ? "Show less" : `Show ${hiddenCount} more`}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </>
  );
}
