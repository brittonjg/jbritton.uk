import type { Education, Role } from "@/types/experience";
import { formatYearRange } from "@/lib/dates";
import SectionHeader from "@/components/ui/SectionHeader";
import TextLink from "@/components/ui/TextLink";
import TimelineRow from "./TimelineRow";

interface CareerGlanceProps {
  roles: Role[];
  education: Education[];
}

export default function CareerGlance({ roles, education }: CareerGlanceProps) {
  const rows = [
    ...roles.map((role) => ({
      key: `${role.company.name}-${role.startDate}`,
      years: formatYearRange(role.startDate, role.endDate),
      title: role.title,
      org: role.company.name,
      isPassed: Boolean(role.endDate),
    })),
    ...education.map((edu) => ({
      key: `${edu.institution}-${edu.startDate}`,
      years: formatYearRange(edu.startDate, edu.endDate),
      title: `${edu.degree} ${edu.field}`,
      org: edu.institution,
      isPassed: true,
    })),
  ];

  return (
    <section aria-labelledby="career-heading" className="pb-16">
      <SectionHeader id="career-heading" eyebrow="Career at a glance" />
      <div className="mt-4 rounded-lg border border-border bg-surface px-5 shadow-card sm:px-6">
        <ol className="divide-y divide-border">
          {rows.map(({ key, ...row }) => (
            <TimelineRow key={key} {...row} />
          ))}
        </ol>
      </div>
      <div className="mt-4">
        <TextLink href="/experience">Full experience</TextLink>
      </div>
    </section>
  );
}
