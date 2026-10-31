export default function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent-subtle px-3 py-1 text-tag text-on-accent-subtle">
      {label}
    </span>
  );
}
