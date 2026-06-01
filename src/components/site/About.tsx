import { Section, SectionHeader, Reveal } from "./Section";
import { MapPin, Sparkles, Briefcase } from "lucide-react";

const stats = [
  { v: "200+", l: "Clients" },
  { v: "3", l: "Books" },
  { v: "₹25L", l: "Grant" },
  { v: "2x", l: "Incubated" },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeader eyebrow="01 — About" title="About Me" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[minmax(160px,auto)]">
        <Reveal className="md:col-span-1 md:row-span-2">
          <div className="bento-card h-full overflow-hidden">
            <img
              src="https://pbs.twimg.com/profile_images/2057899753078157312/5HW9CuJ3_400x400.jpg"
              alt="Sashwat Roy"
              className="w-full h-full object-cover object-top"
              style={{ minHeight: "340px" }}
            />
          </div>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-2 md:row-span-2">
          <div className="bento-card p-8 md:p-10 h-full flex flex-col justify-between">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90 text-balance">
              I'm <span className="text-foreground">Sashwat Roy</span>, a techno-entrepreneur
              passionate about building innovative solutions at the intersection of
              <span className="text-foreground"> AI, design, and business</span>. Currently CEO of{" "}
              <span className="text-foreground">DzineFlow</span> and Co-Founder & CEO of{" "}
              <span className="text-foreground">Rakta Cure</span> — an AI health-tech startup
              incubated at IIT Madras that detects blood cancer in under 5 minutes with 97%
              accuracy.
            </p>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              I've built and scaled multiple ventures: a web design agency (DzineFlow),
              bestselling digital products, and authored 3 books.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bento-card p-6 h-full flex flex-col justify-between">
            <MapPin size={18} className="text-muted-foreground" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle mb-2">
                Based in
              </div>
              <div className="font-display text-2xl">Patna, India</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="bento-card p-6 h-full flex flex-col justify-between">
            <Briefcase size={18} className="text-muted-foreground" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle mb-2">
                Currently
              </div>
              <div className="font-display text-xl leading-tight">
                CEO
                <div className="text-muted-foreground text-sm font-sans mt-1">DzineFlow</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="md:col-span-3">
          <div className="bento-card p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.l} className="flex flex-col">
                <div className="font-display text-3xl md:text-4xl font-semibold">{s.v}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle mt-2">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-3">
          <div className="bento-card p-6 flex items-center gap-3">
            <Sparkles size={16} className="text-muted-foreground" />
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Passionate about
            </div>
            <div className="text-sm md:text-base text-foreground/90">
              AI · Health Tech · Web Design · Books
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
