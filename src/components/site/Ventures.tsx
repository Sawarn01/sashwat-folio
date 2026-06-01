import { Section, SectionHeader, Reveal } from "./Section";

const ventures = [
  {
    tag: "AI Health Tech Startup",
    name: "Rakta Cure",
    role: "Co-Founder & CEO",
    desc: "AI-powered blood cancer detection in under 5 minutes with 97% accuracy. Incubated at IIT Madras — the only startup selected for AIIMS Delhi Incubation. Raised ₹25 Lakh in grants. Prototype validated by top Hematologists of India and appreciated by Prof. Dr. Prabhu Rajgopalan (CEO, Plenome), Phani Kishan (Co-founder, Swiggy), and Prakhar Gupta.",
    tags: ["AI", "HealthTech", "IIT Madras", "AIIMS Delhi", "Blood Cancer Detection"],
    span: "md:col-span-3",
    flagship: true,
  },
  {
    tag: "Web Design Agency",
    name: "DzineFlow",
    role: "Founder & Creative Director",
    desc: "A premium web design agency serving 200+ clients globally. Specialized in building high-converting websites and digital experiences for brands and businesses.",
    tags: ["Web Design", "Freelance", "Brand Building", "200+ Clients"],
    span: "md:col-span-2",
  },
  {
    tag: "Published Author",
    name: "Books & Writing",
    role: "Author",
    desc: "Author of 3 books spanning AI Prompt Engineering, A Beginner's Guide for Crypto Investors, and A Way To Find God.",
    tags: ["Author", "AI", "Crypto", "Spirituality"],
    span: "md:col-span-1",
  },
];

export function Ventures() {
  return (
    <Section id="ventures">
      <SectionHeader eyebrow="02 — Experience" title="Ventures & Experience" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {ventures.map((v, i) => (
          <Reveal key={v.name} delay={i * 0.08} className={v.span}>
            <article className="bento-card p-8 md:p-10 h-full flex flex-col group">
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
                  {v.tag}
                </span>
                {v.flagship && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent border border-border rounded-full px-2.5 py-1">
                    Flagship
                  </span>
                )}
              </div>
              <h3 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">
                {v.name}
              </h3>
              <div className="mt-2 text-sm text-muted-foreground">{v.role}</div>
              <p className="mt-6 text-muted-foreground leading-relaxed text-[15px] flex-1">
                {v.desc}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {v.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
