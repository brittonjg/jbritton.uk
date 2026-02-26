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
        <h1 className="font-display text-3xl text-text-primary">Experience</h1>
        <div className="mt-12">
          <Timeline roles={roles} />
        </div>

        {education.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl text-text-primary">
              Education
            </h2>
            <div className="mt-6 space-y-4">
              {education.map((edu) => (
                <div
                  key={`${edu.institution}-${edu.startDate}`}
                  className="rounded-lg border border-border bg-surface p-5"
                >
                  <h3 className="font-semibold text-text-primary">
                    {edu.degree} {edu.field}
                  </h3>
                  <p className="text-sm text-accent">{edu.institution}</p>
                  <p className="mt-1 text-sm text-text-secondary">
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
