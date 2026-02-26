export default function EmptyState() {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 120"
        fill="none"
        className="h-28 w-28 text-text-tertiary"
      >
        {/* Notebook body */}
        <rect
          x="24"
          y="16"
          width="72"
          height="88"
          rx="4"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Spine binding */}
        <line
          x1="38"
          y1="16"
          x2="38"
          y2="104"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Ruled lines */}
        <line
          x1="46"
          y1="36"
          x2="84"
          y2="36"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          x1="46"
          y1="48"
          x2="84"
          y2="48"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          x1="46"
          y1="60"
          x2="74"
          y2="60"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          x1="46"
          y1="72"
          x2="80"
          y2="72"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          x1="46"
          y1="84"
          x2="68"
          y2="84"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        {/* Pen body */}
        <rect
          x="82"
          y="22"
          width="6"
          height="48"
          rx="2"
          transform="rotate(15 82 22)"
          className="fill-accent/40"
        />
        {/* Pen tip */}
        <path
          d="M78.5 68 L81 76 L83.5 68"
          transform="rotate(15 81 72)"
          className="fill-accent/60"
        />
        {/* Pen clip */}
        <rect
          x="83.5"
          y="22"
          width="1.5"
          height="16"
          rx="0.75"
          transform="rotate(15 83.5 22)"
          className="fill-accent/60"
        />
      </svg>
      <h2 className="mt-6 font-display text-2xl text-text-primary">
        Nothing here yet
      </h2>
      <p className="mt-2 text-text-secondary">
        Posts are on the way &mdash; check back soon.
      </p>
    </div>
  );
}
