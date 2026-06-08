import { createFileRoute } from "@tanstack/react-router";
import { Playground } from "@/components/site/Playground";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Playground — Void · Sashwat Roy" },
      { name: "description", content: "An interactive game built into the portfolio. Survive the void." },
    ],
  }),
  component: Playground,
});
