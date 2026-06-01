import { Section, SectionHeader, Reveal } from "./Section";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "Sales Starter Kit",
    url: "https://salesstarterkit.com",
    desc: "A high-performing digital product that helps entrepreneurs and sales professionals build and scale their sales pipeline from scratch. One of the top-performing digital products in its niche — helping thousands of users.",
    tags: ["Digital Product", "Sales", "Top Performer"],
    span: "md:col-span-2",
    featured: true,
  },
  {
    name: "SSK Launchpad",
    url: "https://launchpad.salesstarterkit.com/",
    desc: "The companion launchpad platform for the Sales Starter Kit ecosystem.",
    tags: ["SaaS", "Sales", "Landing Page"],
    span: "md:col-span-1",
  },
  {
    name: "Augusta",
    url: "https://augusta.dzineflow.com/",
    desc: "A premium client website built under DzineFlow, showcasing high-end web design capabilities.",
    tags: ["Web Design", "Client Work", "DzineFlow"],
    span: "md:col-span-1",
  },
  {
    name: "Easied Lecki Author Site",
    url: "https://easiedleckiauthor.com/",
    desc: "Author portfolio website built for a client — a refined, editorial design for a published author.",
    tags: ["Web Design", "Author Site", "Client Work"],
    span: "md:col-span-2",
  },
];

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeader
        eyebrow="03 — Selected Work"
        title="Selected Projects"
        subtitle="A few things I've built and shipped."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08} className={p.span}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bento-card relative block h-full p-8 md:p-10 group overflow-hidden hover:scale-[1.01] transition-transform"
            >
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface-2/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-start justify-between mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
                  {p.featured ? "Featured Project" : "Project"}
                </span>
                <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-colors">
                  <ArrowUpRight size={15} />
                </div>
              </div>
              <h3 className="relative font-display text-3xl md:text-4xl font-semibold tracking-tight">
                {p.name}
              </h3>
              <p className="relative mt-5 text-muted-foreground text-[15px] leading-relaxed max-w-xl">
                {p.desc}
              </p>
              <div className="relative mt-8 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="relative mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/80 flex items-center gap-1">
                Visit Project <ArrowUpRight size={12} />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
