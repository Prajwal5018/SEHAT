import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, Card, Stat } from "@/components/sehat/Shell";
import { Brain, TrendingUp, Cpu, Users, Building2, Shield, ArrowRight, AlertTriangle, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SEHAT" }, { name: "description", content: "Live hospital operations overview" }] }),
  component: Dashboard,
});

const initialRecs = [
  { id: 1, icon: AlertTriangle, tone: "warning", title: "Redistribute 2 nurses from Cardiology → ER", reason: "ER inflow up 38% in next 2h (Predict Engine)" },
  { id: 2, icon: Brain, tone: "destructive", title: "Dr. Sharma approaching burnout threshold", reason: "Stress Engine: 84/100 · 11h continuous shift" },
  { id: 3, icon: Lightbulb, tone: "info", title: "Open 4 extra beds in Ward B by 6 PM", reason: "Digital Twin simulation forecasts overflow" },
] as const;

function Dashboard() {
  const [recs, setRecs] = useState([...initialRecs]);

  function apply(id: number) {
    const r = recs.find((x) => x.id === id);
    setRecs(recs.filter((x) => x.id !== id));
    toast.success("Recommendation applied", { description: r?.title });
  }
  function dismiss(id: number) {
    setRecs(recs.filter((x) => x.id !== id));
    toast("Recommendation dismissed");
  }

  return (
    <Shell title="Hospital Operations" subtitle="AI-driven workforce intelligence — live across all departments">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Staff on duty" value="247" hint="+12 vs last hour" tone="primary" />
        <Stat label="Avg stress index" value="62" hint="Yellow — monitor closely" tone="warning" />
        <Stat label="Predicted ER load" value="↑ 38%" hint="Next 2 hours" tone="info" />
        <Stat label="Burnout alerts" value="3" hint="2 require redistribution" tone="destructive" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">AI Recommendations</h2>
            <span className="text-xs text-muted-foreground">{recs.length} active</span>
          </div>
          <div className="mt-4 space-y-3">
            {recs.length === 0 && <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">All recommendations actioned. Great work.</div>}
            {recs.map((r) => (
              <div key={r.id} className="flex items-start gap-3 rounded-lg border border-border bg-background/40 p-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg" style={{ background: `color-mix(in oklab, var(--color-${r.tone}) 18%, transparent)`, color: `var(--color-${r.tone})` }}>
                  <r.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{r.title}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{r.reason}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => apply(r.id)} className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90">Apply</button>
                  <button onClick={() => dismiss(r.id)} className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted">Dismiss</button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-lg font-semibold">AI Engines</h2>
          <div className="mt-4 space-y-2">
            {[
              { to: "/stress" as const, icon: Brain, label: "Stress Engine", c: "var(--color-stress)" },
              { to: "/predict" as const, icon: TrendingUp, label: "Predict Engine", c: "var(--color-predict)" },
              { to: "/twin" as const, icon: Cpu, label: "Digital Twin", c: "var(--color-twin)" },
            ].map((e) => (
              <Link key={e.to} to={e.to} className="flex items-center gap-3 rounded-lg border border-border bg-background/40 p-3 hover:border-primary/60">
                <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: `color-mix(in oklab, ${e.c} 18%, transparent)`, color: e.c }}><e.icon className="h-4 w-4" /></div>
                <div className="flex-1 font-medium">{e.label}</div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { to: "/staff" as const, icon: Users, title: "Staff Portal", desc: "Tasks, alerts & shift updates" },
          { to: "/department" as const, icon: Building2, title: "Department Dashboard", desc: "Analytics, reports & overview" },
          { to: "/admin" as const, icon: Shield, title: "Admin Command Center", desc: "System control & decision support" },
        ].map((p) => (
          <Link key={p.to} to={p.to} className="group rounded-xl border border-border bg-card p-5 transition hover:border-primary/60">
            <p.icon className="h-6 w-6 text-primary" />
            <div className="mt-3 font-display text-lg font-semibold">{p.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{p.desc}</div>
            <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">Open <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" /></div>
          </Link>
        ))}
      </div>
    </Shell>
  );
}
