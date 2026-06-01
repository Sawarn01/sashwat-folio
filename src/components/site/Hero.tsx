import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, Download } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 60, damping: 20 });
  const y = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const tx1 = useTransform(x, (v) => v * 40);
  const ty1 = useTransform(y, (v) => v * 40);
  const tx2 = useTransform(x, (v) => v * -60);
  const ty2 = useTransform(y, (v) => v * -60);
  const tx3 = useTransform(x, (v) => v * 25);
  const ty3 = useTransform(y, (v) => v * 25);

  const reveal: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain"
    >
      {/* Parallax mesh background */}
      <motion.div
        style={{ x: tx1, y: ty1 }}
        className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full opacity-40"
      >
        <div
          className="w-full h-full rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #1a1a1a 0%, transparent 70%)" }}
        />
      </motion.div>
      <motion.div
        style={{ x: tx2, y: ty2 }}
        className="absolute -bottom-40 -right-32 w-[36rem] h-[36rem] rounded-full opacity-50"
      >
        <div
          className="w-full h-full rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #161616 0%, transparent 70%)" }}
        />
      </motion.div>

      {/* Grid overlay */}
      <motion.div
        style={{ x: tx3, y: ty3 }}
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 text-center pt-20">
        <motion.div
          variants={reveal}
          custom={0}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1/60 px-4 py-1.5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Techno-Entrepreneur · AI Founder · Author
          </span>
        </motion.div>

        <h1 className="font-display font-semibold text-balance leading-[0.95] text-[clamp(2.75rem,8.5vw,8rem)]">
          {["Building the", "Future of Business", "& Technology."].map((line, i) => (
            <motion.span
              key={i}
              variants={reveal}
              custom={i + 1}
              initial="hidden"
              animate="show"
              className="block"
            >
              {i === 1 ? (
                <span className="italic text-muted-foreground font-light">{line}</span>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={reveal}
          custom={4}
          initial="hidden"
          animate="show"
          className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed text-balance"
        >
          Founder of Rakta Cure AI · Creator of DzineFlow · Author of 3 Books · IIT Madras Incubatee
        </motion.p>

        <motion.div
          variants={reveal}
          custom={5}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/90 bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-transparent hover:text-foreground transition-colors"
          >
            View My Work
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            <Download size={15} />
            Download Resume
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-subtle"
      >
        Scroll
      </motion.div>
    </section>
  );
}
