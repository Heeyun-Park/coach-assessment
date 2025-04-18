export function Card({ children, className }) {
  return <div className={`rounded-xl border p-4 shadow ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className="p-2">{children}</div>;
}
