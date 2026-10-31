import Link from "next/link";
import type { Education, Role } from "@/types/experience";
import { formatYearRange } from "@/lib/dates";

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
    })),
    ...education.map((edu) => ({
      key: `${edu.institution}-${edu.startDate}`,
      years: formatYearRange(edu.startDate, edu.endDate),
      title: `${edu.degree} ${edu.field}`,
      org: edu.institution,
    })),
  ];

  return (
    <section aria-labelledby="career-heading" className="pb-16">
      <h2 id="career-heading" className="eyebrow">
        Career at a glance
      </h2>
      <div className="mt-4 rounded-md border border-border bg-surface px-5 shadow-card sm:px-6">
        <ol className="divide-y divide-border">
          {rows.map((row) => (
            <li
              key={row.key}
              className="grid gap-x-6 gap-y-0.5 py-3.5 sm:grid-cols-[8.5rem_1fr]"
            >
              <span className="text-sm text-text-tertiary tabular-nums">
                {row.years}
              </span>
              <span className="text-sm">
                <span className="font-bold text-text-primary">{row.title}</span>
                <span className="text-text-secondary"> &middot; {row.org}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-4">
        <Link
          href="/experience"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-accent hover:text-accent-hover"
        >
          Full experience &rarr;
        </Link>
      </div>
    </section>
  );
}
