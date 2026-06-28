const KEY = "sehat_user";

export type SehatUser = { name: string; role: "admin" | "department" | "staff"; method: string };

export function login(user: SehatUser) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(user));
}
export function logout() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}
export function getUser(): SehatUser | null {
  if (typeof window === "undefined") return null;
  try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
