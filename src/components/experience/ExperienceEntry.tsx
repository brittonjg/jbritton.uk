import type { Role } from "@/types/experience";
import { formatMonthYear, getDuration } from "@/lib/dates";
import Duration from "./Duration";
import RoleCard from "./RoleCard";

interface ExperienceEntryProps {
  role: Role;
  isCurrent?: boolean;
}

/*
 * One role on the Experience timeline.
 * From 640px: a 104px right-aligned dates column, a 24px rail column with a
 * 12px node, then the role card.
 * Under 640px: a 16px rail column on the left, dates above the card.
 */
export default function ExperienceEntry({ role, isCurrent = false }: ExperienceEntryProps) {
  return (
    <li className="experience-entry relative grid grid-cols-entry-compact gap-x-4 gap-y-3 sm:grid-cols-entry sm:gap-y-0">
      <span
        aria-hidden="true"
        className="relative z-10 col-start-1 row-start-1 flex justify-center pt-1 sm:col-start-2"
      >
        <span
          className={`experience-node size-3 rounded-full border-2 border-accent-decor bg-background ${
            isCurrent ? "ring-4 ring-accent-subtle" : ""
          }`}
        />
      </span>

      <div className="col-start-2 row-start-1 text-meta sm:col-start-1 sm:text-right">
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

      <div className="col-start-2 row-start-2 min-w-0 sm:col-start-3 sm:row-start-1">
        <RoleCard role={role} visibleHighlights={3} />
      </div>
    </li>
  );
}
