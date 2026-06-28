import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Activity, Fingerprint, ScanFace, KeyRound } from "lucide-react";
import { useState } from "react";
import { login } from "@/lib/sehat-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — SEHAT" }, { name: "description", content: "Sign in to SEHAT" }] }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const [name, setName] = useState("Dr. Aarav Mehta");
  const [role, setRole] = useState<"admin" | "department" | "staff">("admin");
  const [method, setMethod] = useState<"password" | "fingerprint" | "face">("password");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    login({ name, role, method });
    toast.success(`Welcome, ${name}`, { description: `Signed in via ${method}` });
    nav({ to: "/dashboard" });
  }

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl">
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground"><Activity className="h-4 w-4" /></div>
          SEHAT
        </Link>
        <h1 className="mt-6 font-display text-2xl font-bold">Sign in to your hospital</h1>
        <p className="mt-1 text-sm text-muted-foreground">Choose an authentication method.</p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { id: "password", icon: KeyRound, label: "Password" },
            { id: "fingerprint", icon: Fingerprint, label: "Biometric" },
            { id: "face", icon: ScanFace, label: "Face" },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethod(m.id as typeof method)}
              className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-3 text-xs transition ${method === m.id ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"}`}
            >
              <m.icon className="h-5 w-5" />
              {m.label}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Full name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded-md border border-border bg-input/40 px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Role</span>
            <select value={role} onChange={(e) => setRole(e.target.value as typeof role)} className="mt-1 w-full rounded-md border border-border bg-input/40 px-3 py-2 text-sm outline-none focus:border-primary">
              <option value="admin">Admin / Command Center</option>
              <option value="department">Department Head</option>
              <option value="staff">Medical Staff</option>
            </select>
          </label>
          {method === "password" && (
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Password</span>
              <input type="password" defaultValue="demo-pass" className="mt-1 w-full rounded-md border border-border bg-input/40 px-3 py-2 text-sm outline-none focus:border-primary" />
            </label>
          )}
          {method !== "password" && (
            <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
              {method === "fingerprint" ? "Place your finger on the scanner" : "Look into the camera"} — demo mode auto-verifies.
            </div>
          )}
          <button type="submit" className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Enter SEHAT
          </button>
        </form>
      </div>
    </div>
  );
}
