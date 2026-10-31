interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <section className="mt-10">
      <h2 className="border-b border-border pb-2 text-heading-3 text-text-primary">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
