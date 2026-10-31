import type { Role } from "@/types/experience";
import { formatDateRange, getDuration } from "@/lib/dates";
import Tag from "@/components/ui/Tag";
import Duration from "./Duration";
import HighlightList from "./HighlightList";

interface RoleCardProps {
  role: Role;
  /** Show the date range inside the card (when there is no date rail). */
  showDates?: boolean;
  /** Bullets shown before "Show more". Defaults to all of them. */
  visibleHighlights?: number;
  headingLevel?: "h2" | "h3";
}

export default function RoleCard({
  role,
  showDates = false,
  visibleHighlights,
  headingLevel: Heading = "h3",
}: RoleCardProps) {
  const highlights = role.highlights ?? [];

  return (
    <div className="rounded-md border border-border bg-surface p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg sm:p-6">
      <Heading className="text-h3 text-text-primary">{role.title}</Heading>
      <p className="mt-0.5 text-sm">
        {role.company.url ? (
          <a
            href={role.company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:text-accent-hover"
          >
            {role.company.name}
          </a>
        ) : (
          <span className="font-semibold text-accent">{role.company.name}</span>
        )}
        <span className="text-text-tertiary"> &middot; {role.location}</span>
      </p>
      {showDates && (
        <p className="mt-1 text-sm text-text-tertiary">
          {formatDateRange(role.startDate, role.endDate)} &middot;{" "}
          <Duration
            startDate={role.startDate}
            endDate={role.endDate}
            initial={getDuration(role.startDate, role.endDate)}
          />
        </p>
      )}
      <p className="mt-3 text-sm text-text-secondary">{role.description}</p>
      {highlights.length > 0 && (
        <HighlightList
          highlights={highlights}
          visibleCount={visibleHighlights ?? highlights.length}
        />
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
