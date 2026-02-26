export default function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-md border border-accent/15 bg-accent/8 px-2.5 py-0.5 text-xs font-medium text-accent/90">
      {label}
    </span>
  );
}
