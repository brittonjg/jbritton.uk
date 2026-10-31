import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Timeline from "@/components/experience/Timeline";
import { getExperience } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience and career timeline.",
};

export default function ExperiencePage() {
  const { roles, education } = getExperience();

  return (
    <Container>
      <section className="py-16">
        <h1 className="font-display text-h2 text-text-primary sm:text-h1">
          Experience
        </h1>

        <h2 className="sr-only">Roles</h2>
        <div className="mt-12">
          <Timeline roles={roles} />
        </div>

        {education.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-h2 text-text-primary">Education</h2>
            <div className="mt-6 space-y-4">
              {education.map((edu) => (
                <div
                  key={`${edu.institution}-${edu.startDate}`}
                  className="rounded-md border border-border bg-surface p-5 shadow-card sm:p-6"
                >
                  <h3 className="text-h3 text-text-primary">
                    {edu.degree} {edu.field}
                  </h3>
                  <p className="mt-0.5 text-sm font-semibold text-accent">
                    {edu.institution}
                  </p>
                  <p className="mt-1 text-sm text-text-tertiary">
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
