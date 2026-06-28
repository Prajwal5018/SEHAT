import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, Stat } from "@/components/sehat/Shell";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/stress")({
  head: () => ({ meta: [{ title: "Stress Engine — SEHAT" }, { name: "description", content: "Workforce stress & burnout analysis" }] }),
  component: StressPage,
});

const initial = [
  { name: "Dr. Sharma", dept: "ER", score: 84, shift: "11h" },
  { name: "Nurse Patel", dept: "ICU", score: 78, shift: "9h" },
  { name: "Dr. Rao", dept: "Cardiology", score: 64, shift: "7h" },
  { name: "Nurse Khan", dept: "Pediatrics", score: 42, shift: "5h" },
  { name: "Dr. Iyer", dept: "Surgery", score: 31, shift: "3h" },
];

function StressPage() {
  const [people, setPeople] = useState(initial);
  function relieve(name: string) {
    setPeople((p) => p.map((x) => (x.name === name ? { ...x, score: Math.max(20, x.score - 30) } : x)));
    toast.success(`Break scheduled for ${name}`, { description: "Coverage auto-arranged" });
  }
  const avg = Math.round(people.reduce((s, p) => s + p.score, 0) / people.length);
  return (
    <Shell title="Stress Engine" subtitle="Real-time mental well-being analysis across staff">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Average stress" value={avg} hint="Out of 100" tone={avg > 70 ? "destructive" : avg > 50 ? "warning" : "success"} />
        <Stat label="High risk (>75)" value={people.filter((p) => p.score > 75).length} tone="destructive" />
        <Stat label="Healthy (<50)" value={people.filter((p) => p.score < 50).length} tone="success" />
      </div>
      <Card className="mt-6">
        <h2 className="font-display text-lg font-semibold">Staff stress levels</h2>
        <div className="mt-4 space-y-3">
          {people.map((p) => {
            const tone = p.score > 75 ? "destructive" : p.score > 50 ? "warning" : "success";
            return (
              <div key={p.name} className="flex items-center gap-4 rounded-lg border border-border bg-background/40 p-3">
                <div className="w-40">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.dept} · {p.shift}</div>
                </div>
                <div className="flex-1">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full transition-all" style={{ width: `${p.score}%`, background: `var(--color-${tone})` }} />
                  </div>
                </div>
                <div className="w-12 text-right font-mono text-sm" style={{ color: `var(--color-${tone})` }}>{p.score}</div>
                <button onClick={() => relieve(p.name)} className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted">Schedule break</button>
              </div>
            );
          })}
        </div>
      </Card>
    </Shell>
  );
}
