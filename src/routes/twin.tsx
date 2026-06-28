import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card } from "@/components/sehat/Shell";
import { useState } from "react";
import { toast } from "sonner";
import { Play, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/twin")({
  head: () => ({ meta: [{ title: "Digital Twin — SEHAT" }, { name: "description", content: "Simulate emergency scenarios" }] }),
  component: TwinPage,
});

const scenarios = [
  { id: "surge", label: "Mass casualty surge (+50 patients)" },
  { id: "outage", label: "ICU equipment outage (2 ventilators)" },
  { id: "flu", label: "Seasonal flu wave (3-day)" },
  { id: "shift", label: "Night-shift shortage" },
];

function TwinPage() {
  const [scenario, setScenario] = useState(scenarios[0].id);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<null | { wait: number; util: number; risk: string; advice: string }>(null);

  function run() {
    setRunning(true);
    setResult(null);
    setTimeout(() => {
      const map: Record<string, typeof result> = {
        surge: { wait: 47, util: 96, risk: "High", advice: "Activate 2 standby teams, open Ward B annex." },
        outage: { wait: 22, util: 88, risk: "Medium", advice: "Reroute 3 ICU patients to step-down unit." },
        flu: { wait: 31, util: 82, risk: "Medium", advice: "Pre-stock antivirals; add triage nurse for 72h." },
        shift: { wait: 38, util: 91, risk: "High", advice: "Offer on-call bonus to 4 nurses for 22:00 shift." },
      };
      setResult(map[scenario]!);
      setRunning(false);
      toast.success("Simulation complete");
    }, 1200);
  }

  return (
    <Shell title="Digital Twin Simulator" subtitle="Run what-if scenarios on a live replica of your hospital">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <h2 className="font-display text-lg font-semibold">Scenario</h2>
          <div className="mt-4 space-y-2">
            {scenarios.map((s) => (
              <label key={s.id} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition ${scenario === s.id ? "border-twin bg-twin/10" : "border-border hover:bg-muted"}`}>
                <input type="radio" checked={scenario === s.id} onChange={() => setScenario(s.id)} className="accent-twin" />
                {s.label}
              </label>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={run} disabled={running} className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50">
              <Play className="h-4 w-4" /> {running ? "Simulating…" : "Run simulation"}
            </button>
            <button onClick={() => setResult(null)} className="rounded-md border border-border px-3 hover:bg-muted"><RotateCcw className="h-4 w-4" /></button>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="font-display text-lg font-semibold">Outcome</h2>
          {!result && !running && <div className="mt-10 rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">Select a scenario and run the simulation.</div>}
          {running && <div className="mt-10 text-center text-sm text-muted-foreground">Running 10,000 patient-flow iterations…</div>}
          {result && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-border bg-background/40 p-4">
                  <div className="text-xs text-muted-foreground">Avg wait</div>
                  <div className="mt-1 font-display text-2xl font-bold">{result.wait}m</div>
                </div>
                <div className="rounded-lg border border-border bg-background/40 p-4">
                  <div className="text-xs text-muted-foreground">Utilization</div>
                  <div className="mt-1 font-display text-2xl font-bold">{result.util}%</div>
                </div>
                <div className="rounded-lg border border-border bg-background/40 p-4">
                  <div className="text-xs text-muted-foreground">Risk</div>
                  <div className="mt-1 font-display text-2xl font-bold" style={{ color: result.risk === "High" ? "var(--color-destructive)" : "var(--color-warning)" }}>{result.risk}</div>
                </div>
              </div>
              <div className="rounded-lg border border-primary/40 bg-primary/10 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-primary">AI Advice</div>
                <div className="mt-1 text-sm">{result.advice}</div>
              </div>
              <button onClick={() => toast.success("Plan dispatched to Command Center")} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                Dispatch plan
              </button>
            </div>
          )}
        </Card>
      </div>
    </Shell>
  );
}
