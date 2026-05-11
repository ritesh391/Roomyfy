import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Home, Building2, ShieldCheck, Sparkles, Search } from "lucide-react";
import { setRole } from "@/lib/roleStore";

const RoleSelect = () => {
  const navigate = useNavigate();
  const choose = (r: "tenant" | "owner") => {
    setRole(r);
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-soft px-6 py-10 max-w-md mx-auto flex flex-col">
      <div className="flex items-center justify-center pt-4">
        <Logo size={40} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 text-center"
      >
        <h1 className="font-display text-3xl font-bold leading-tight">
          Welcome to <span className="text-primary">Roomyfy</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-2">How will you be using Roomyfy today?</p>
      </motion.div>

      <div className="flex-1 flex flex-col gap-4 mt-10">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => choose("tenant")}
          className="rounded-3xl bg-card shadow-card p-5 text-left relative overflow-hidden border border-transparent hover:border-primary/40 transition"
        >
          <div className="h-12 w-12 rounded-2xl bg-primary-soft inline-flex items-center justify-center text-primary mb-3">
            <Search className="h-6 w-6" />
          </div>
          <h2 className="font-display text-xl font-bold">I'm looking for a room</h2>
          <p className="text-sm text-muted-foreground mt-1">Browse PGs, flats and hostels — verified, AI-curated and easy to book.</p>
          <div className="mt-3 flex gap-1.5">
            <span className="text-[11px] rounded-full bg-secondary px-2 py-0.5 font-medium">Students</span>
            <span className="text-[11px] rounded-full bg-secondary px-2 py-0.5 font-medium">Professionals</span>
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => choose("owner")}
          className="rounded-3xl bg-card shadow-card p-5 text-left relative overflow-hidden border border-transparent hover:border-primary/40 transition"
        >
          <div className="h-12 w-12 rounded-2xl bg-accent/15 inline-flex items-center justify-center text-accent mb-3">
            <Building2 className="h-6 w-6" />
          </div>
          <h2 className="font-display text-xl font-bold">I want to list my room</h2>
          <p className="text-sm text-muted-foreground mt-1">List in minutes, get smart price suggestions and reach verified tenants.</p>
          <div className="mt-3 flex gap-1.5">
            <span className="text-[11px] rounded-full bg-secondary px-2 py-0.5 font-medium inline-flex items-center gap-1"><Sparkles className="h-2.5 w-2.5" /> AI pricing</span>
            <span className="text-[11px] rounded-full bg-secondary px-2 py-0.5 font-medium inline-flex items-center gap-1"><ShieldCheck className="h-2.5 w-2.5" /> Verified tenants</span>
          </div>
        </motion.button>
      </div>

      <p className="text-center text-[11px] text-muted-foreground mt-6">You can switch anytime from your profile.</p>
    </div>
  );
};

export default RoleSelect;
