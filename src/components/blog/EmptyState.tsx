export default function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-border-strong px-6 py-16 text-center">
      <span aria-hidden="true" className="size-3 rounded-full bg-accent-decor" />
      <p className="text-text-secondary">First posts coming soon.</p>
    </div>
  );
}
