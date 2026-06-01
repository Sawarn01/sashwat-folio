import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { About } from "@/components/site/About";
import { Ventures } from "@/components/site/Ventures";
import { Projects } from "@/components/site/Projects";
import { Books } from "@/components/site/Books";
import { Recognition } from "@/components/site/Recognition";
import { Contact } from "@/components/site/Contact";
import { Cursor } from "@/components/site/Cursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sashwat Roy — Techno-Entrepreneur, AI Founder, Author" },
      {
        name: "description",
        content:
          "Sashwat Roy — Founder of Rakta Cure AI, Creator of DzineFlow, Author of 3 books, and IIT Madras incubatee building the future of business and technology.",
      },
      { property: "og:title", content: "Sashwat Roy — Building the Future of Business & Technology" },
      {
        property: "og:description",
        content: "Techno-entrepreneur, AI founder, author, and freelance web designer.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground">
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <div className="hairline" />
        <Ventures />
        <div className="hairline" />
        <Projects />
        <div className="hairline" />
        <Books />
        <div className="hairline" />
        <Recognition />
        <div className="hairline" />
        <Contact />
      </main>
    </div>
  );
}
