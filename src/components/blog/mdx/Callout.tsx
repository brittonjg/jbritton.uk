interface CalloutProps {
  type?: "info" | "warning" | "tip";
  children: React.ReactNode;
}

const styles = {
  info: "border-border-strong bg-surface",
  warning: "border-accent-decor bg-accent-subtle",
  tip: "border-accent-decor bg-surface",
};

const labels = {
  info: "Info",
  warning: "Warning",
  tip: "Tip",
};

export default function Callout({ type = "info", children }: CalloutProps) {
  return (
    <div className={`my-6 rounded-md border-l-4 p-4 shadow-card ${styles[type]}`}>
      <p className="mb-1 text-label text-text-primary">{labels[type]}</p>
      <div className="text-small text-text-secondary">{children}</div>
    </div>
  );
}
