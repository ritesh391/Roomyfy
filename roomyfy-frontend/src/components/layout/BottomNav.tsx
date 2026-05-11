import { Home, Search, PlusCircle, Users, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/add", label: "List", icon: PlusCircle, primary: true },
  { to: "/roommates", label: "Roommates", icon: Users },
  { to: "/profile", label: "Profile", icon: User },
];

const hideOn = ["/login", "/onboarding", "/role"];

export const BottomNav = () => {
  const { pathname } = useLocation();
  if (hideOn.includes(pathname) || pathname.startsWith("/chat/")) return null;

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 inset-x-0 z-40 mx-auto max-w-md border-t border-border/60 bg-background/85 backdrop-blur-xl safe-bottom"
    >
      <ul className="grid grid-cols-5 px-2 pt-2 pb-2">
        {tabs.map(({ to, label, icon: Icon, primary }) => (
          <li key={to} className="flex justify-center">
            <NavLink
              to={to}
              end={to === "/"}
              className="relative flex flex-col items-center gap-1 px-2 py-1 group w-full"
            >
              {({ isActive }) => (
                <>
                  {primary ? (
                    <motion.div
                      whileTap={{ scale: 0.92 }}
                      className="bg-gradient-primary -mt-7 mb-0 flex h-14 w-14 items-center justify-center rounded-2xl text-primary-foreground shadow-glow"
                    >
                      <Icon className="h-7 w-7" />
                    </motion.div>
                  ) : (
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "text-[10px] font-medium",
                      isActive ? "text-primary" : "text-muted-foreground",
                      primary && "text-primary"
                    )}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
