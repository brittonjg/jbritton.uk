import type { Role } from "@/types/experience";
import TimelineEntry from "./TimelineEntry";

export default function Timeline({ roles }: { roles: Role[] }) {
  return (
    <ol className="flex flex-col">
      {roles.map((role, index) => (
        <TimelineEntry
          key={`${role.company.name}-${role.startDate}`}
          role={role}
          isCurrent={index === 0 && !role.endDate}
        />
      ))}
    </ol>
  );
}
