import type { Role } from "@/types/experience";
import RoleCard from "@/components/experience/RoleCard";

export default function Currently({ role }: { role: Role }) {
  return (
    <section aria-labelledby="currently-heading" className="pb-16">
      <h2 id="currently-heading" className="eyebrow">
        Currently
      </h2>
      <div className="mt-4">
        <RoleCard role={role} showDates headingLevel="h3" />
      </div>
    </section>
  );
}
