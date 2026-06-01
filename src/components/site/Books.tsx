import Tilt from "react-parallax-tilt";
import { Section, SectionHeader, Reveal } from "./Section";

const books = [
  {
    title: "The Complete Guide to AI Prompt Engineering",
    genre: "Artificial Intelligence · Non-Fiction",
    desc: "A comprehensive guide to mastering AI prompts — helping creators, entrepreneurs, and professionals unlock the full power of generative AI tools.",
    tags: ["Bestseller", "AI", "Prompt Engineering"],
    cover: "https://media.licdn.com/dms/image/v2/D4E22AQGLuuOI3n6gAQ/feedshare-image-high-res/B4EZoqQv2yKcAo-/0/1761645629021?e=1781740800&v=beta&t=N5xIzYFDvx1sA9EmoEO4Vss17AQ5p3mj3KbW5azD580",
  },
  {
    title: "A Beginner's Guide for Crypto Investors",
    genre: "Finance · Crypto",
    desc: "An accessible, jargon-free guide for anyone starting their crypto investment journey.",
    tags: ["Finance", "Crypto", "Investing"],
    cover: "https://m.media-amazon.com/images/I/51wr1dlMa0L._SY522_.jpg",
  },
  {
    title: "A Way To Find God",
    genre: "Spirituality · Philosophy",
    desc: "A deeply personal exploration of spirituality, faith, and purpose.",
    tags: ["Spirituality", "Philosophy", "Personal Growth"],
    cover: "https://m.media-amazon.com/images/I/41AFPtr3e9L._SY445_SX342_QL70_FMwebp_.jpg",
  },
];

export function Books() {
  return (
    <Section id="books">
      <SectionHeader eyebrow="04 — Library" title="Books I've Written" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {books.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.1}>
            <Tilt
              glareEnable
              glareMaxOpacity={0.08}
              glareColor="#ffffff"
              glarePosition="all"
              tiltMaxAngleX={6}
              tiltMaxAngleY={6}
              transitionSpeed={1200}
              className="h-full"
            >
              <article className="bento-card p-8 md:p-10 h-full flex flex-col">
                <div className="aspect-3/4 mb-8 rounded-md border border-border relative overflow-hidden">
                  <img
                    src={b.cover}
                    alt={b.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
                  {b.genre}
                </span>
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed flex-1">
                  {b.desc}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {b.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
