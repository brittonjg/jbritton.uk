import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import ResumeSection from "@/components/cv/ResumeSection";
import DownloadButton from "@/components/cv/DownloadButton";
import { getExperience, formatDateRange } from "@/lib/experience";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum Vitae for James Britton.",
};

export default function CVPage() {
  const { roles, education } = getExperience();

  return (
    <Container>
      <section className="py-16">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-heading-2 text-text-primary sm:text-heading-1">
              {siteConfig.name}
            </h1>
            <p className="mt-1 text-body-large text-text-secondary">
              {siteConfig.title}
            </p>
          </div>
          <DownloadButton />
        </div>

        <ResumeSection title="Summary">
          <p className="text-text-secondary">
            {siteConfig.description}
          </p>
        </ResumeSection>

        <ResumeSection title="Experience">
          <div className="flex flex-col gap-8">
            {roles.map((role) => (
              <div key={`${role.company.name}-${role.startDate}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-title text-text-primary">
                    {role.title}
                  </h3>
                  <span className="text-meta text-text-tertiary">
                    {formatDateRange(role.startDate, role.endDate)}
                  </span>
                </div>
                <p className="mt-1 text-label text-accent">
                  {role.company.name}
                  <span className="text-text-secondary">
                    {" "}
                    &middot; {role.location}
                  </span>
                </p>
                <p className="mt-2 text-small text-text-secondary">
                  {role.description}
                </p>
                {role.highlights && role.highlights.length > 0 && (
                  <ul className="mt-2 flex flex-col gap-1 text-small text-text-secondary">
                    {role.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent-decor" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Education">
          <div className="flex flex-col gap-4">
            {education.map((edu) => (
              <div key={`${edu.institution}-${edu.startDate}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-title text-text-primary">
                    {edu.degree} {edu.field}
                  </h3>
                  <span className="text-meta text-text-tertiary">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p className="mt-1 text-label text-accent">
                  {edu.institution}
                  {edu.location && (
                    <span className="text-text-secondary">
                      {" "}
                      &middot; {edu.location}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </ResumeSection>
      </section>
    </Container>
  );
}
