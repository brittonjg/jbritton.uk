import type { Role } from "@/types/experience";
import { formatDateRange, getDuration } from "@/lib/experience";
import Tag from "@/components/ui/Tag";

interface TimelineEntryProps {
  role: Role;
  index: number;
  isFirst?: boolean;
}

export default function TimelineEntry({ role, index, isFirst }: TimelineEntryProps) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex items-start gap-6 md:gap-10">
      {/* Desktop: alternating layout */}
      <div
        className={`hidden w-1/2 md:flex ${isLeft ? "justify-end pr-10" : "order-2 pl-10"}`}
      >
        <div className="w-full text-left">
          <Card role={role} />
        </div>
      </div>

      {/* Centre dot — hollow ring, with glow on most recent */}
      <div className="absolute left-0 top-1 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-1/2">
        <div
          className={`h-3 w-3 rounded-full border-2 border-accent bg-background ${
            isFirst ? "ring-4 ring-accent/10" : ""
          }`}
        />
      </div>

      {/* Desktop: date side */}
      <div
        className={`hidden w-1/2 items-start pt-1 md:flex ${isLeft ? "order-2 pl-10" : "justify-end pr-10"}`}
      >
        <div className={`text-sm text-text-secondary ${isLeft ? "text-left" : "text-right"}`}>
          <p>{formatDateRange(role.startDate, role.endDate)}</p>
          <p className="text-xs text-text-tertiary">{getDuration(role.startDate, role.endDate)}</p>
        </div>
      </div>

      {/* Mobile: single column */}
      <div className="pl-6 md:hidden">
        <div className="mb-2 text-sm text-text-tertiary">
          {formatDateRange(role.startDate, role.endDate)} &middot;{" "}
          {getDuration(role.startDate, role.endDate)}
        </div>
        <Card role={role} />
      </div>
    </div>
  );
}

function Card({ role }: { role: Role }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg">
      <h3 className="text-lg font-semibold text-text-primary">{role.title}</h3>
      <p className="text-sm text-accent">
        {role.company.url ? (
          <a
            href={role.company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-hover"
          >
            {role.company.name}
          </a>
        ) : (
          role.company.name
        )}
        <span className="text-text-tertiary"> &middot; {role.location}</span>
      </p>
      <p className="mt-3 text-sm text-text-secondary">{role.description}</p>
      {role.highlights && role.highlights.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-text-secondary">
          {role.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>
      )}
      {role.tags && role.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {role.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      )}
    </div>
  );
}
