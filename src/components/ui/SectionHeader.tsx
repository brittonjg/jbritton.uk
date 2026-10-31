interface SectionHeaderProps {
  /** Heading id, used by the section's aria-labelledby. */
  id: string;
  eyebrow: string;
  /** Optional section title in the heading-section style. */
  title?: string;
  /** Content shown before the eyebrow text, such as a status dot. */
  leading?: React.ReactNode;
}

/*
 * Eyebrow label, optionally followed by a section title. Without a title the
 * eyebrow itself is the section's h2.
 */
export default function SectionHeader({ id, eyebrow, title, leading }: SectionHeaderProps) {
  const eyebrowContent = (
    <>
      {leading}
      {eyebrow}
    </>
  );

  if (!title) {
    return (
      <h2 id={id} className="eyebrow flex items-center gap-2">
        {eyebrowContent}
      </h2>
    );
  }

  return (
    <div>
      <p className="eyebrow flex items-center gap-2">{eyebrowContent}</p>
      <h2 id={id} className="mt-2 font-display text-heading-section text-text-primary">
        {title}
      </h2>
    </div>
  );
}
