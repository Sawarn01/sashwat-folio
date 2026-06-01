const items = [
  "IIT Madras Incubatee",
  "₹25 Lakh Government Grant",
  "AIIMS Delhi Incubated",
  "200+ Clients Served",
  "3 Books Published",
  "AI Health Tech Founder",
  "Web Design Agency Owner",
];

export function Marquee() {
  const loop = [...items, ...items, ...items];
  return (
    <section className="relative border-y border-border bg-surface-1 overflow-hidden py-5">
      <div className="flex whitespace-nowrap animate-[marquee_42s_linear_infinite]">
        {loop.map((t, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-subtle px-8">
              {t}
            </span>
            <span className="text-border">·</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
