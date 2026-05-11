// Lightweight client-side role store (replace with Supabase auth later)
type Role = "tenant" | "owner";

const KEY = "roomyfy:role";

export const getRole = (): Role | null => {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem(KEY) as Role) || null;
};

export const setRole = (role: Role) => {
  localStorage.setItem(KEY, role);
};

export const clearRole = () => localStorage.removeItem(KEY);
