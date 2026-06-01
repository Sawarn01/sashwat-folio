import { useState, type FormEvent } from "react";
import { Section, Reveal } from "./Section";
import { ArrowRight, Linkedin, Twitter, Instagram } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <Section id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-subtle mb-4">
            06 — Contact
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-balance">
            Let's Build
            <br />
            <span className="italic text-muted-foreground font-light">Something.</span>
          </h2>
          <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-md">
            Open to collaborations, freelance projects, and interesting conversations.
          </p>
          <div className="mt-10 flex items-center gap-3">
            {[
              { Icon: Linkedin, href: "https://www.linkedin.com/in/sashwat-roy/", label: "LinkedIn" },
              { Icon: Twitter, href: "https://x.com/just_sawarn", label: "Twitter" },
              { Icon: Instagram, href: "https://www.instagram.com/just.sawarn/", label: "Instagram" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-11 h-11 rounded-full border border-border-strong flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-border">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle mb-2">
              Email
            </div>
            <a
              href="mailto:connect@sashwatsawarn.online"
              className="font-display text-xl hover:text-accent transition-colors"
            >
              connect@sashwatsawarn.online
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={onSubmit}
            className="bento-card p-8 md:p-10 flex flex-col gap-6"
          >
            {[
              { id: "name", label: "Name", type: "text", placeholder: "Your name" },
              { id: "email", label: "Email", type: "email", placeholder: "you@domain.com" },
            ].map((f) => (
              <div key={f.id} className="flex flex-col gap-2">
                <label
                  htmlFor={f.id}
                  className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle"
                >
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  className="bg-transparent border-b border-border-strong py-2 text-foreground placeholder:text-subtle focus:outline-none focus:border-foreground/60 transition-colors"
                />
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                placeholder="Tell me about your project…"
                className="bg-transparent border-b border-border-strong py-2 text-foreground placeholder:text-subtle focus:outline-none focus:border-foreground/60 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="group mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-foreground/90 px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors self-start"
            >
              {sent ? "Sent ✓" : "Send Message"}
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </form>
        </Reveal>
      </div>

      <div className="hairline mt-32" />
      <footer className="pt-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
        © 2025 Sashwat Roy. Built with ❤ and caffeine.
      </footer>
    </Section>
  );
}
