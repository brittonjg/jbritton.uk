export default function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-md border border-accent-decor/20 bg-accent-subtle px-2.5 py-0.5 text-xs font-semibold text-accent-hover">
      {label}
    </span>
  );
}
