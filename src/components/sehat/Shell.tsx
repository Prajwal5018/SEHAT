import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Activity, LayoutDashboard, Users, Building2, Shield, LogOut, Brain, TrendingUp, Cpu } from "lucide-react";
import { useEffect, useState } from "react";
import { getUser, logout, type SehatUser } from "@/lib/sehat-auth";
import { toast } from "sonner";

const NAV = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/stress", label: "Stress Engine", icon: Brain },
  { to: "/predict", label: "Predict Engine", icon: TrendingUp },
  { to: "/twin", label: "Digital Twin", icon: Cpu },
  { to: "/staff", label: "Staff Portal", icon: Users },
  { to: "/department", label: "Department", icon: Building2 },
  { to: "/admin", label: "Command Center", icon: Shield },
] as const;

export function Shell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) {
  const nav = useNavigate();
  const { location } = useRouterState();
  const [user, setUser] = useState<SehatUser | null>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) nav({ to: "/login" });
    else setUser(u);
  }, [nav]);

  function handleLogout() {
    logout();
    toast.success("Signed out");
    nav({ to: "/" });
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card/40 p-4 md:block">
        <Link to="/dashboard" className="flex items-center gap-2 px-2 py-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground"><Activity className="h-4 w-4" /></div>
          <span className="font-display text-lg font-bold">SEHAT</span>
        </Link>
        <nav className="mt-6 space-y-1">
          {NAV.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 w-56 rounded-lg border border-border bg-card p-3">
          <div className="text-xs text-muted-foreground">Signed in as</div>
          <div className="truncate font-medium">{user?.name ?? "—"}</div>
          <div className="mt-0.5 text-xs capitalize text-primary">{user?.role}</div>
          <button onClick={handleLogout} className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-border px-2 py-1.5 text-xs hover:bg-muted">
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold md:text-3xl">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
            Live · {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border bg-card p-5 ${className}`}>{children}</div>;
}

export function Stat({ label, value, hint, tone = "primary" }: { label: string; value: string | number; hint?: string; tone?: "primary" | "success" | "warning" | "destructive" | "info" }) {
  const color = `var(--color-${tone})`;
  return (
    <Card>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-3xl font-bold" style={{ color }}>{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </Card>
  );
}
