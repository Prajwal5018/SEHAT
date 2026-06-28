import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, Stat } from "@/components/sehat/Shell";
import { useState } from "react";
import { toast } from "sonner";
import { Siren, Power, Database, Cpu } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Command Center — SEHAT" }, { name: "description", content: "System control & decision support" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [services, setServices] = useState({ stress: true, predict: true, twin: true, data: true });
  function toggle(k: keyof typeof services) {
    setServices((s) => ({ ...s, [k]: !s[k] }));
    toast.success(`${k} engine ${services[k] ? "paused" : "resumed"}`);
  }
  function emergency() {
    toast.error("Emergency protocol activated", { description: "All departments notified · standby teams paged" });
  }

  return (
    <Shell title="Admin Command Center" subtitle="System control, monitoring & decision support">
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Uptime" value="99.98%" tone="success" />
        <Stat label="Data ingest" value="14.2k/s" hint="Events per second" tone="info" />
        <Stat label="AI inferences" value="3.4k/min" tone="primary" />
        <Stat label="Active alerts" value="7" tone="warning" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="font-display text-lg font-semibold">AI services</h2>
          <div className="mt-4 space-y-2">
            {([
              { k: "stress" as const, icon: Cpu, label: "Stress Engine" },
              { k: "predict" as const, icon: Cpu, label: "Predict Engine" },
              { k: "twin" as const, icon: Cpu, label: "Digital Twin Simulator" },
              { k: "data" as const, icon: Database, label: "Data Integration Layer" },
            ]).map((s) => (
              <div key={s.k} className="flex items-center gap-3 rounded-lg border border-border bg-background/40 p-3">
                <s.icon className="h-4 w-4 text-primary" />
                <div className="flex-1 font-medium">{s.label}</div>
                <span className={`text-xs ${services[s.k] ? "text-success" : "text-muted-foreground"}`}>{services[s.k] ? "● running" : "○ paused"}</span>
                <button onClick={() => toggle(s.k)} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted"><Power className="h-3.5 w-3.5" /> {services[s.k] ? "Pause" : "Resume"}</button>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-lg font-semibold">Emergency protocol</h2>
          <p className="mt-2 text-sm text-muted-foreground">Activates surge response: pages standby teams, opens overflow wards, notifies all department heads.</p>
          <button onClick={emergency} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-destructive py-2.5 text-sm font-semibold text-destructive-foreground hover:opacity-90">
            <Siren className="h-4 w-4" /> Activate protocol
          </button>
          <button onClick={() => toast.success("Daily report generated")} className="mt-2 w-full rounded-md border border-border py-2 text-xs hover:bg-muted">Generate daily report</button>
        </Card>
      </div>
    </Shell>
  );
}
