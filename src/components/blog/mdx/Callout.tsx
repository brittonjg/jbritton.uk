interface CalloutProps {
  type?: "info" | "warning" | "tip";
  children: React.ReactNode;
}

const styles = {
  info: "border-blue-500/30 bg-blue-500/5",
  warning: "border-amber-500/30 bg-amber-500/5",
  tip: "border-green-500/30 bg-green-500/5",
};

const labels = {
  info: "Info",
  warning: "Warning",
  tip: "Tip",
};

export default function Callout({ type = "info", children }: CalloutProps) {
  return (
    <div className={`my-6 rounded-lg border-l-4 p-4 ${styles[type]}`}>
      <p className="mb-1 text-sm font-semibold text-text-primary">
        {labels[type]}
      </p>
      <div className="text-sm text-text-secondary">{children}</div>
    </div>
  );
}
