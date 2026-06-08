import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, Trophy, MousePointer2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Phase = "idle" | "playing" | "dead";

interface Enemy {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  color: string;
}

interface TrailDot {
  x: number;
  y: number;
  t: number;
}

interface PulseRing {
  x: number;
  y: number;
  r: number;
  life: number;
}

const PLAYER_R = 7;
const TRAIL_MAX = 18;
const PULSE_COOLDOWN = 180; // frames (~3s at 60fps)
const PULSE_RADIUS = 220;
const PULSE_FORCE = 14;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function Playground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pulseReady, setPulseReady] = useState(true);
  const [pulsePct, setPulsePct] = useState(1);
  const [level, setLevel] = useState(1);
  const [isNewHigh, setIsNewHigh] = useState(false);

  const gRef = useRef({
    phase: "idle" as Phase,
    px: 0, py: 0,
    tx: 0, ty: 0,
    enemies: [] as Enemy[],
    particles: [] as Particle[],
    trail: [] as TrailDot[],
    rings: [] as PulseRing[],
    score: 0,
    frame: 0,
    eid: 0,
    pulseCd: 0,
    raf: 0,
    level: 1,
  });

  const pulse = useCallback(() => {
    const g = gRef.current;
    if (g.phase !== "playing" || g.pulseCd > 0) return;
    g.pulseCd = PULSE_COOLDOWN;
    g.rings.push({ x: g.px, y: g.py, r: PLAYER_R, life: 1 });

    g.enemies.forEach(e => {
      const dx = e.x - g.px;
      const dy = e.y - g.py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < PULSE_RADIUS) {
        const force = (1 - dist / PULSE_RADIUS) * PULSE_FORCE;
        const nx = dx / (dist || 1);
        const ny = dy / (dist || 1);
        e.vx += nx * force;
        e.vy += ny * force;
      }
    });
    for (let i = 0; i < 12; i++) {
      const a = (Math.PI * 2 * i) / 12;
      g.particles.push({
        x: g.px, y: g.py,
        vx: Math.cos(a) * (3 + Math.random() * 4),
        vy: Math.sin(a) * (3 + Math.random() * 4),
        r: 2 + Math.random() * 2,
        life: 1,
        color: "#e8e8e0",
      });
    }
  }, []);

  useEffect(() => {
    // Load high score from localStorage (browser-only)
    try {
      const saved = parseInt(localStorage.getItem("void_hs") || "0", 10);
      if (saved > 0) setHighScore(saved);
    } catch { /* SSR / private browsing */ }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (x: number, y: number) => {
      const g = gRef.current;
      g.tx = x; g.ty = y;
    };
    const onMouse = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener("mousemove", onMouse);
    canvas.addEventListener("touchmove", onTouch, { passive: false });
    canvas.addEventListener("touchstart", onTouch, { passive: false });

    function spawnEnemy(g: typeof gRef.current, w: number, h: number) {
      const side = Math.floor(Math.random() * 4);
      let x = 0, y = 0;
      const m = 24;
      if (side === 0) { x = Math.random() * w; y = -m; }
      else if (side === 1) { x = w + m; y = Math.random() * h; }
      else if (side === 2) { x = Math.random() * w; y = h + m; }
      else { x = -m; y = Math.random() * h; }

      const speed = 1.4 + g.level * 0.25 + Math.random() * 0.8;
      const angle = Math.atan2(g.py - y, g.px - x);
      g.enemies.push({
        id: g.eid++,
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 6 + Math.random() * 7,
        alpha: 0,
      });
    }

    function spawnDeath(g: typeof gRef.current) {
      const colors = ["#f5f5f0", "#888888", "#555555", "#e8e8e0"];
      for (let i = 0; i < 40; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 2 + Math.random() * 8;
        g.particles.push({
          x: g.px, y: g.py,
          vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          r: 2 + Math.random() * 5,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
      ctx.strokeStyle = "rgba(31,31,31,0.5)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= w; x += 80) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y <= h; y += 80) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
    }

    const loop = () => {
      const g = gRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);
      drawGrid(ctx, w, h);

      if (g.phase === "idle") {
        // Floating ambient particles on idle screen
        g.frame++;
        if (g.frame % 40 === 0) {
          g.particles.push({
            x: Math.random() * w,
            y: h + 10,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -0.6 - Math.random() * 0.8,
            r: 1 + Math.random() * 2,
            life: 1,
            color: "rgba(200,200,200,0.6)",
          });
        }
      }

      if (g.phase === "playing") {
        g.frame++;
        const newScore = Math.floor(g.frame / 6);
        g.score = newScore;
        const newLevel = 1 + Math.floor(newScore / 200);
        if (newLevel !== g.level) {
          g.level = newLevel;
          setLevel(newLevel);
        }

        // Pulse cooldown
        if (g.pulseCd > 0) {
          g.pulseCd--;
          const pct = 1 - g.pulseCd / PULSE_COOLDOWN;
          setPulseReady(g.pulseCd === 0);
          setPulsePct(pct);
        }

        // Smooth player follow
        g.px = lerp(g.px, g.tx, 0.13);
        g.py = lerp(g.py, g.ty, 0.13);

        // Trail
        g.trail.unshift({ x: g.px, y: g.py, t: Date.now() });
        if (g.trail.length > TRAIL_MAX) g.trail.length = TRAIL_MAX;

        // Spawn rate
        const rate = Math.max(18, 70 - g.level * 6);
        if (g.frame % Math.floor(rate) === 0) spawnEnemy(g, w, h);

        // Update enemies
        g.enemies = g.enemies.filter(e => {
          e.x += e.vx;
          e.y += e.vy;
          e.alpha = Math.min(1, e.alpha + 0.04);

          // Soft home toward player
          const ang = Math.atan2(g.py - e.y, g.px - e.x);
          const spd = Math.hypot(e.vx, e.vy);
          const cap = Math.min(spd, 1.6 + g.level * 0.2 + Math.random() * 0.3);
          e.vx = lerp(e.vx, Math.cos(ang) * cap, 0.025);
          e.vy = lerp(e.vy, Math.sin(ang) * cap, 0.025);

          // Collision
          const dx = e.x - g.px;
          const dy = e.y - g.py;
          if (Math.hypot(dx, dy) < PLAYER_R + e.r - 3) {
            spawnDeath(g);
            g.phase = "dead";
            const hs = parseInt(localStorage.getItem("void_hs") || "0", 10);
            const newHigh = g.score > hs;
            if (newHigh) {
              localStorage.setItem("void_hs", String(g.score));
              setHighScore(g.score);
            }
            setIsNewHigh(newHigh);
            setScore(g.score);
            setPhase("dead");
            return true;
          }

          // Cull off-screen
          return !(e.x < -120 || e.x > w + 120 || e.y < -120 || e.y > h + 120);
        });

        if (g.frame % 10 === 0) setScore(g.score);
      }

      // Draw trail
      g.trail.forEach((dot, i) => {
        const a = (1 - i / TRAIL_MAX) * 0.35;
        const r = PLAYER_R * (1 - i / TRAIL_MAX) * 0.7;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle = "#e8e8e0";
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw pulse rings
      g.rings = g.rings.filter(ring => {
        ring.r = lerp(ring.r, PULSE_RADIUS, 0.12);
        ring.life -= 0.035;
        if (ring.life > 0) {
          ctx.save();
          ctx.globalAlpha = ring.life * 0.5;
          ctx.strokeStyle = "#e8e8e0";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
        return ring.life > 0;
      });

      // Draw particles
      g.particles = g.particles.filter(p => {
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.96; p.vy *= 0.96;
        p.life -= 0.025;
        if (p.life > 0) {
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        return p.life > 0;
      });

      // Draw enemies
      g.enemies.forEach(e => {
        ctx.save();
        ctx.globalAlpha = e.alpha;

        // Soft glow
        const grd = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 2.5);
        grd.addColorStop(0, "rgba(100,100,100,0.18)");
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.fillStyle = "#161616";
        ctx.strokeStyle = "rgba(180,180,180,0.7)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      });

      // Draw player
      if (g.phase !== "dead" || g.particles.length > 0) {
        const { px, py } = g;
        if (g.phase !== "dead") {
          // Outer glow
          const gl = ctx.createRadialGradient(px, py, 0, px, py, PLAYER_R * 5);
          gl.addColorStop(0, "rgba(232,232,224,0.25)");
          gl.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = gl;
          ctx.beginPath();
          ctx.arc(px, py, PLAYER_R * 5, 0, Math.PI * 2);
          ctx.fill();

          // Body
          ctx.fillStyle = "#f5f5f0";
          ctx.beginPath();
          ctx.arc(px, py, PLAYER_R, 0, Math.PI * 2);
          ctx.fill();

          // Core dot
          ctx.fillStyle = "#0a0a0a";
          ctx.beginPath();
          ctx.arc(px, py, PLAYER_R * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      gRef.current.raf = requestAnimationFrame(loop);
    };

    gRef.current.raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(gRef.current.raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchstart", onTouch);
    };
  }, []);

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = gRef.current;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    g.px = cx; g.py = cy;
    g.tx = cx; g.ty = cy;
    g.enemies = [];
    g.particles = [];
    g.trail = [];
    g.rings = [];
    g.score = 0;
    g.frame = 0;
    g.pulseCd = 0;
    g.level = 1;
    g.phase = "playing";
    setPhase("playing");
    setScore(0);
    setLevel(1);
    setPulseReady(true);
    setPulsePct(1);
    setIsNewHigh(false);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-background overflow-hidden select-none"
      onClick={pulse}
    >
      <canvas ref={canvasRef} className="absolute inset-0 touch-none" />

      {/* Back link */}
      <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="pointer-events-auto inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle hover:text-foreground transition-colors"
          >
            <ArrowLeft size={12} /> Back
          </Link>

          {phase === "playing" && (
            <div className="flex items-center gap-6 pointer-events-none">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-subtle">
                Lv <span className="text-foreground">{level}</span>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-subtle">
                Score <span className="text-foreground">{score}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pulse HUD */}
      {phase === "playing" && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none">
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-subtle">
            {pulseReady ? "Click to Pulse" : "Recharging…"}
          </div>
          <div className="w-32 h-[2px] bg-surface-2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-foreground rounded-full"
              animate={{ width: `${pulsePct * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Zap size={10} className={pulseReady ? "text-foreground" : "text-subtle"} />
            <span className="font-mono text-[9px] text-subtle">PULSE</span>
          </div>
        </div>
      )}

      {/* Overlays */}
      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <div className="text-center max-w-md px-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-[11px] uppercase tracking-[0.35em] text-subtle mb-6"
              >
                Playground · 01
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-7xl md:text-9xl font-semibold tracking-tight mb-4"
              >
                VOID
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-muted-foreground text-sm mb-10 leading-relaxed"
              >
                Move your cursor to guide the orb.
                <br />
                Click anywhere to <span className="text-foreground">Pulse</span> — repel enemies.
                <br />
                Survive as long as you can.
              </motion.p>

              {highScore > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-2 mb-8"
                >
                  <Trophy size={13} className="text-subtle" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-subtle">
                    Best: <span className="text-foreground">{highScore}</span>
                  </span>
                </motion.div>
              )}

              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => { e.stopPropagation(); startGame(); }}
                className="inline-flex items-center gap-3 rounded-full border border-foreground/90 bg-foreground text-background px-8 py-3.5 text-sm font-medium tracking-wide"
              >
                <MousePointer2 size={15} />
                Enter the Void
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-8 font-mono text-[9px] uppercase tracking-[0.3em] text-subtle/50"
              >
                Touch supported · Difficulty scales with time
              </motion.div>
            </div>
          </motion.div>
        )}

        {phase === "dead" && (
          <motion.div
            key="dead"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <div className="text-center max-w-sm px-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="font-mono text-[11px] uppercase tracking-[0.35em] text-subtle mb-5"
              >
                Game Over
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                className="font-display text-8xl font-semibold tracking-tight mb-2"
              >
                {score}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="font-mono text-[11px] uppercase tracking-[0.25em] text-subtle mb-8"
              >
                {isNewHigh ? (
                  <span className="text-foreground flex items-center justify-center gap-2">
                    <Trophy size={12} /> New High Score!
                  </span>
                ) : (
                  <>Best: <span className="text-foreground">{highScore}</span></>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex items-center justify-center gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => { e.stopPropagation(); startGame(); }}
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/90 bg-foreground text-background px-6 py-3 text-sm font-medium"
                >
                  Play Again
                </motion.button>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                >
                  <ArrowLeft size={14} /> Home
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
