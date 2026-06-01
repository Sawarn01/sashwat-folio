import { Section, SectionHeader, Reveal } from "./Section";

const people = [
  { name: "Prof. Dr. Prabhu Rajgopalan", role: "CEO, Plenome · President Awardee" },
  { name: "Phani Kishan", role: "Co-founder, Swiggy" },
  { name: "Prakhar Gupta", role: "Podcaster & YouTuber" },
  { name: "Top Hematologists of India", role: "Clinical Validators" },
  { name: "IIT Madras", role: "Incubation Partner" },
  { name: "AIIMS Delhi", role: "Incubation Partner" },
];

export function Recognition() {
  return (
    <Section id="recognition">
      <SectionHeader eyebrow="05 — Endorsements" title="Recognized By" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {people.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.05}>
            <div className="bento-card p-6 flex flex-col gap-2 group">
              <div className="font-display text-xl font-medium tracking-tight group-hover:text-accent transition-colors">
                {p.name}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                {p.role}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
