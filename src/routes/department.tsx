import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, Stat } from "@/components/sehat/Shell";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/department")({
  head: () => ({ meta: [{ title: "Department Dashboard — SEHAT" }, { name: "description", content: "Department analytics and reports" }] }),
  component: DeptPage,
});

const depts = [
  { name: "Emergency", occupancy: 92, staff: 28, status: "Critical" },
  { name: "ICU", occupancy: 84, staff: 22, status: "High" },
  { name: "Cardiology", occupancy: 61, staff: 18, status: "Normal" },
  { name: "Pediatrics", occupancy: 48, staff: 14, status: "Normal" },
  { name: "Surgery", occupancy: 73, staff: 19, status: "High" },
];

function DeptPage() {
  const [selected, setSelected] = useState(depts[0].name);
  return (
    <Shell title="Department Dashboard" subtitle="Analytics, reports & department overview">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Departments" value={depts.length} tone="primary" />
        <Stat label="Critical" value={depts.filter((d) => d.status === "Critical").length} tone="destructive" />
        <Stat label="Avg occupancy" value={`${Math.round(depts.reduce((s, d) => s + d.occupancy, 0) / depts.length)}%`} tone="info" />
      </div>
      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Departments</h2>
          <button onClick={() => toast.success("Report exported", { description: "Sent to your inbox" })} className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted">Export report</button>
        </div>
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="px-4 py-2 text-left">Department</th><th className="px-4 py-2 text-left">Occupancy</th><th className="px-4 py-2 text-left">Staff</th><th className="px-4 py-2 text-left">Status</th><th /></tr>
            </thead>
            <tbody>
              {depts.map((d) => {
                const tone = d.status === "Critical" ? "destructive" : d.status === "High" ? "warning" : "success";
                return (
                  <tr key={d.name} className={`border-t border-border ${selected === d.name ? "bg-primary/5" : ""}`}>
                    <td className="px-4 py-3 font-medium">{d.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted"><div className="h-full" style={{ width: `${d.occupancy}%`, background: `var(--color-${tone})` }} /></div>
                        <span className="text-xs">{d.occupancy}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{d.staff}</td>
                    <td className="px-4 py-3"><span className="rounded-full px-2 py-0.5 text-xs" style={{ background: `color-mix(in oklab, var(--color-${tone}) 18%, transparent)`, color: `var(--color-${tone})` }}>{d.status}</span></td>
                    <td className="px-4 py-3"><button onClick={() => { setSelected(d.name); toast(`Viewing ${d.name}`); }} className="text-xs font-semibold text-primary hover:underline">View</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </Shell>
  );
}
