import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, Stat } from "@/components/sehat/Shell";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/predict")({
  head: () => ({ meta: [{ title: "Predict Engine — SEHAT" }, { name: "description", content: "Forecast staffing bottlenecks" }] }),
  component: PredictPage,
});

const hours = Array.from({ length: 12 }, (_, i) => {
  const h = (new Date().getHours() + i) % 24;
  const load = Math.round(40 + Math.sin(i / 2) * 25 + (i === 4 ? 25 : 0) + Math.random() * 8);
  return { label: `${h}:00`, load };
});

function PredictPage() {
  const [horizon, setHorizon] = useState(12);
  function rerun() {
    toast.success("Forecast refreshed", { description: `Horizon: next ${horizon} hours` });
  }
  const peak = Math.max(...hours.slice(0, horizon).map((h) => h.load));
  return (
    <Shell title="Predict Engine" subtitle="AI forecasting of patient inflow & staffing bottlenecks">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Peak load" value={`${peak}%`} hint="Capacity utilization" tone={peak > 85 ? "destructive" : "warning"} />
        <Stat label="Bottleneck risk" value="Medium" hint="ER between 16:00–18:00" tone="warning" />
        <Stat label="Confidence" value="92%" tone="success" />
      </div>
      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Patient inflow forecast</h2>
          <div className="flex items-center gap-2">
            <select value={horizon} onChange={(e) => setHorizon(Number(e.target.value))} className="rounded-md border border-border bg-input/40 px-2 py-1 text-xs">
              <option value={6}>Next 6h</option>
              <option value={12}>Next 12h</option>
              <option value={24}>Next 24h</option>
            </select>
            <button onClick={rerun} className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">Re-run</button>
          </div>
        </div>
        <div className="mt-6 flex h-56 items-end gap-2">
          {hours.slice(0, horizon).map((h) => (
            <div key={h.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t" style={{ height: `${h.load}%`, background: `linear-gradient(to top, var(--color-predict), color-mix(in oklab, var(--color-predict) 30%, transparent))` }} />
              <div className="text-[10px] text-muted-foreground">{h.label}</div>
            </div>
          ))}
        </div>
      </Card>
    </Shell>
  );
}
