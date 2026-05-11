import { Link, useNavigate } from "react-router-dom";
import { Settings, Heart, MessageCircle, ShieldCheck, LogOut, ChevronRight, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRole, clearRole } from "@/lib/roleStore";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const role = getRole() ?? "tenant";
  const isOwner = role === "owner";

  const items = [
    { icon: Heart, label: "Saved rooms", to: "/search" },
    { icon: MessageCircle, label: "Messages", to: "/chats" },
    { icon: ShieldCheck, label: "Verification", to: "#" },
    { icon: Settings, label: "Settings", to: "#" },
  ];

  const handleLogout = () => {
    logout();
    clearRole();
    navigate("/role");
  };

  return (
    <div>
      <header className="bg-gradient-hero px-5 pt-8 pb-10 rounded-b-[2rem] text-primary-foreground relative overflow-hidden">
        <Sparkles className="absolute -right-6 -top-6 h-32 w-32 opacity-15" />
        <div className="flex items-center gap-3">
          <div className="h-16 w-16 rounded-full border-2 border-white/80 bg-white/20 inline-flex items-center justify-center text-2xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="flex-1">
            <h1 className="font-display text-xl font-bold">
              {user?.name || "Guest"}
            </h1>
            <p className="text-xs opacity-80 mt-0.5">{user?.email}</p>
            <div className="text-xs opacity-90 inline-flex items-center gap-1.5 mt-0.5">
              <span className="rounded-full bg-white/25 px-2 py-0.5 font-semibold capitalize">
                {user?.role || role}
              </span>
              <ShieldCheck className="h-3 w-3" /> Verified
            </div>
          </div>
        </div>
      </header>

      {isOwner && (
        <section className="px-5 -mt-5">
          <div className="rounded-3xl bg-card shadow-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-semibold inline-flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" /> Your listings
              </h2>
              <Button size="sm" variant="soft" asChild>
                <Link to="/add">+ New</Link>
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-primary-soft p-3 text-center">
                <div className="font-display text-xl font-bold text-primary">0</div>
                <div className="text-[10px] text-muted-foreground">Active</div>
              </div>
              <div className="rounded-2xl bg-secondary p-3 text-center">
                <div className="font-display text-xl font-bold">0</div>
                <div className="text-[10px] text-muted-foreground">Requests</div>
              </div>
              <div className="rounded-2xl bg-secondary p-3 text-center">
                <div className="font-display text-xl font-bold">—</div>
                <div className="text-[10px] text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className={`px-5 ${isOwner ? "mt-6" : "-mt-5"}`}>
        <div className="rounded-3xl bg-card shadow-soft overflow-hidden divide-y divide-border/60">
          {items.map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/60 transition"
            >
              <div className="h-9 w-9 rounded-xl bg-primary-soft inline-flex items-center justify-center text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <span className="flex-1 text-sm font-medium">{label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 mt-6">
        <button
          onClick={handleLogout}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3 text-sm font-semibold text-muted-foreground hover:text-destructive hover:border-destructive/40 transition"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
        <p className="text-center text-[10px] text-muted-foreground mt-4">
          Roomyfy v1.0 · Made with ❤ in India
        </p>
      </section>
    </div>
  );
};

export default Profile;