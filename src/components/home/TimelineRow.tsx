interface TimelineRowProps {
  years: string;
  title: string;
  org: string;
  /** Finished roles and courses: the ring fills with accent-decor. */
  isPassed?: boolean;
}

/** One row of "Career at a glance" on the homepage. */
export default function TimelineRow({ years, title, org, isPassed = false }: TimelineRowProps) {
  return (
    <li
      className={`timeline-row grid grid-cols-timeline-row-compact items-baseline gap-x-4 gap-y-1 py-4 sm:grid-cols-timeline-row ${
        isPassed ? "is-passed" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className={`size-3 self-center rounded-full border-2 border-accent-decor ${
          isPassed ? "bg-accent-decor" : "bg-surface"
        }`}
      />
      <span className="text-meta text-text-tertiary tabular-nums">{years}</span>
      <span className="col-start-2 sm:col-start-auto">
        <span className="text-title text-text-primary">{title}</span>
        <span className="text-small text-text-secondary"> &middot; {org}</span>
      </span>
    </li>
  );
}
