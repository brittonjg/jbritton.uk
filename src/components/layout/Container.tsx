interface ContainerProps {
  children: React.ReactNode;
  /** "reading" is 768px (default); "wide" is 1040px, for the Experience page. */
  width?: "reading" | "wide";
}

export default function Container({ children, width = "reading" }: ContainerProps) {
  return (
    <div className={`mx-auto px-6 ${width === "wide" ? "max-w-wide" : "max-w-reading"}`}>
      {children}
    </div>
  );
}
