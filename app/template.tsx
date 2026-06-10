// Re-mounts on every navigation, so each route fades/slides in smoothly.
// Reduced-motion users get an instant render (handled in globals.css).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
