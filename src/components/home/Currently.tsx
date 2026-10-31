import type { Role } from "@/types/experience";
import RoleCard from "@/components/experience/RoleCard";
import SectionHeader from "@/components/ui/SectionHeader";

/*
 * TODO(james): the dot can pulse gently (opacity and scale, every 2.4s, off
 * under reduced motion). It is the site's only looping animation, so it ships
 * switched off. Set this to true if you'd like it.
 */
const PULSE_CURRENTLY_DOT = false;

export default function Currently({ role }: { role: Role }) {
  return (
    <section aria-labelledby="currently-heading" className="pb-16">
      <SectionHeader
        id="currently-heading"
        eyebrow="Currently"
        leading={
          <span
            aria-hidden="true"
            className={`currently-dot size-2 rounded-full bg-accent-decor ${
              PULSE_CURRENTLY_DOT ? "is-pulsing" : ""
            }`}
          />
        }
      />
      <div className="mt-4">
        <RoleCard role={role} showDates headingLevel="h3" />
      </div>
    </section>
  );
}
