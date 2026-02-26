import type { Role } from "@/types/experience";
import TimelineEntry from "./TimelineEntry";

export default function Timeline({ roles }: { roles: Role[] }) {
  return (
    <div className="relative">
      {/* Vertical line — gradient with accent warmth */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-border via-accent/20 to-border md:left-1/2" />

      <div className="flex flex-col gap-12">
        {roles.map((role, index) => (
          <TimelineEntry
            key={`${role.company.name}-${role.startDate}`}
            role={role}
            index={index}
            isFirst={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
