import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card } from "@/components/sehat/Shell";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Bell } from "lucide-react";

export const Route = createFileRoute("/staff")({
  head: () => ({ meta: [{ title: "Staff Portal — SEHAT" }, { name: "description", content: "Tasks, alerts and updates for staff" }] }),
  component: StaffPage,
});

const initialTasks = [
  { id: 1, title: "Round on ICU Bed 4 & 7", time: "14:30", priority: "high" as const },
  { id: 2, title: "Update charts for ER patients", time: "15:00", priority: "med" as const },
  { id: 3, title: "Lab coordination — blood panel", time: "15:45", priority: "med" as const },
  { id: 4, title: "Handover briefing with night staff", time: "19:00", priority: "low" as const },
];
const alerts = [
  { id: 1, text: "Stress level high — take 20-min break suggested" },
  { id: 2, text: "Shift swap request from Nurse Patel" },
];

function StaffPage() {
  const [tasks, setTasks] = useState(initialTasks);
  function done(id: number) {
    setTasks((t) => t.filter((x) => x.id !== id));
    toast.success("Task completed");
  }
  return (
    <Shell title="Staff Portal" subtitle="Your shift, tasks and personalized alerts">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="font-display text-lg font-semibold">Today's tasks</h2>
          <div className="mt-4 space-y-2">
            {tasks.length === 0 && <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">All caught up.</div>}
            {tasks.map((t) => (
              <div key={t.id} className="flex items-center gap-3 rounded-lg border border-border bg-background/40 p-3">
                <span className="h-2 w-2 rounded-full" style={{ background: t.priority === "high" ? "var(--color-destructive)" : t.priority === "med" ? "var(--color-warning)" : "var(--color-success)" }} />
                <div className="flex-1">
                  <div className="font-medium">{t.title}</div>
                  <div className="text-xs text-muted-foreground">Due {t.time}</div>
                </div>
                <button onClick={() => done(t.id)} className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"><CheckCircle2 className="h-3.5 w-3.5" /> Done</button>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold"><Bell className="h-4 w-4 text-warning" /> Alerts</h2>
          <div className="mt-4 space-y-2">
            {alerts.map((a) => (
              <div key={a.id} className="rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm">{a.text}</div>
            ))}
          </div>
          <button onClick={() => toast.success("Shift swap accepted")} className="mt-4 w-full rounded-md border border-border py-2 text-xs hover:bg-muted">Accept swap</button>
        </Card>
      </div>
    </Shell>
  );
}
