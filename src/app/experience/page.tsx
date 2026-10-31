import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import ExperienceEntry from "@/components/experience/ExperienceEntry";
import { getExperience } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience and career timeline.",
};

export default function ExperiencePage() {
  const { roles, education } = getExperience();

  return (
    <Container width="wide">
      <section className="py-16">
        <h1 className="font-display text-heading-2 text-text-primary sm:text-heading-1">
          Experience
        </h1>

        <h2 className="sr-only">Roles</h2>
        <div className="mt-12">
          <ExperienceTimeline>
            {roles.map((role, index) => (
              <ExperienceEntry
                key={`${role.company.name}-${role.startDate}`}
                role={role}
                isCurrent={index === 0 && !role.endDate}
              />
            ))}
          </ExperienceTimeline>
        </div>

        {education.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-heading-2 text-text-primary">Education</h2>
            <div className="mt-6 flex flex-col gap-4">
              {education.map((edu) => (
                <div
                  key={`${edu.institution}-${edu.startDate}`}
                  className="rounded-lg border border-border bg-surface p-5 shadow-card sm:p-6"
                >
                  <h3 className="text-heading-3 text-text-primary">
                    {edu.degree} {edu.field}
                  </h3>
                  <p className="mt-1 text-label text-accent">{edu.institution}</p>
                  <p className="mt-1 text-meta text-text-tertiary">
                    {edu.startDate} — {edu.endDate}
                    {edu.location && ` · ${edu.location}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </Container>
  );
}
