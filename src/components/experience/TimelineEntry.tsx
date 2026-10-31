import type { Role } from "@/types/experience";
import { formatMonthYear, getDuration } from "@/lib/dates";
import Duration from "./Duration";
import RoleCard from "./RoleCard";

interface TimelineEntryProps {
  role: Role;
  isCurrent?: boolean;
}

/*
 * One role, rendered once. Mobile: dates stacked above the card.
 * Desktop (md+): dates in a 9rem left rail, card in the second column.
 * The line and dot sit on the rail's edge (left edge on mobile).
 */
export default function TimelineEntry({ role, isCurrent }: TimelineEntryProps) {
  return (
    <li className="relative pb-10 pl-7 last:pb-0 md:grid md:grid-cols-[9rem_1fr] md:pl-0">
      {/* Thin border-coloured line */}
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-0 w-px bg-border md:left-[9rem]"
      />
      {/* Outlined dot */}
      <span
        aria-hidden="true"
        className={`absolute top-1.5 left-0 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent-decor bg-background md:left-[9rem] ${
          isCurrent ? "ring-4 ring-accent-decor/15" : ""
        }`}
      />

      <div className="mb-3 text-sm md:mb-0 md:pr-8 md:text-right">
        {/* Each date is unbreakable so ranges only wrap at the dash */}
        <p className="text-text-secondary">
          <span className="whitespace-nowrap">{formatMonthYear(role.startDate)}</span>{" "}
          <span className="whitespace-nowrap">
            — {role.endDate ? formatMonthYear(role.endDate) : "Present"}
          </span>
        </p>
        <p className="text-text-tertiary">
          <Duration
            startDate={role.startDate}
            endDate={role.endDate}
            initial={getDuration(role.startDate, role.endDate)}
          />
        </p>
      </div>

      <div className="min-w-0 md:pl-8">
        <RoleCard role={role} visibleHighlights={3} />
      </div>
    </li>
  );
}
