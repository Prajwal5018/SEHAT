import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Brain, ShieldCheck, Sparkles, Users, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEHAT — AI Workforce Operating System" },
      { name: "description", content: "Predict burnout, prevent staffing bottlenecks, and run a digital twin of your hospital." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Activity className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold">SEHAT</span>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pt-12 pb-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> AI Workforce OS for Hospitals
            </div>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] md:text-6xl">
              Predict burnout.<br />
              <span className="text-primary">Prevent bottlenecks.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground">
              SEHAT continuously monitors hospital operations and helps administrators
              make proactive decisions — before emergencies happen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Launch Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Brain, label: "Stress Engine", c: "var(--color-stress)" },
              { icon: Activity, label: "Predict Engine", c: "var(--color-predict)" },
              { icon: Users, label: "Digital Twin", c: "var(--color-twin)" },
              { icon: ShieldCheck, label: "Command Center", c: "var(--color-primary)" },
            ].map((f) => (
              <div key={f.label} className="rounded-xl border border-border bg-card p-5">
                <div className="grid h-10 w-10 place-items-center rounded-lg" style={{ background: `color-mix(in oklab, ${f.c} 18%, transparent)`, color: f.c }}>
                  <f.icon className="h-5 w-5" />
                </div>
                <div className="mt-3 font-display font-semibold">{f.label}</div>
                <div className="mt-1 text-xs text-muted-foreground">AI-driven module</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 SEHAT — AI Workforce Operating System
      </footer>
    </div>
  );
}

