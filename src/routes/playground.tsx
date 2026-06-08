import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, lazy, Suspense } from "react";

// Lazy-load the game so it's never evaluated during SSR
const Playground = lazy(() =>
  import("@/components/site/Playground").then((m) => ({ default: m.Playground }))
);

function Shell() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-subtle">
        Loading…
      </span>
    </div>
  );
}

function PlaygroundRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <Shell />;
  return (
    <Suspense fallback={<Shell />}>
      <Playground />
    </Suspense>
  );
}

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Playground — Void · Sashwat Roy" },
      { name: "description", content: "An interactive game built into the portfolio. Survive the void." },
    ],
  }),
  component: PlaygroundRoute,
});
