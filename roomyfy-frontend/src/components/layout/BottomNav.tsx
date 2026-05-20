import { Home, Search, PlusCircle, MessageCircle, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/add", label: "List", icon: PlusCircle, primary: true },
  { to: "/chats", label: "Chats", icon: MessageCircle },
  { to: "/profile", label: "Profile", icon: User },
];

export const BottomNav = () => {
  const { pathname } = useLocation();

  const hideOn = ["/login", "/onboarding", "/role"];

  if (
    hideOn.includes(pathname) ||
    pathname.startsWith("/chat/") ||
    pathname.startsWith("/room/")
  ) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center gap-1 text-xs",
                  isActive ? "text-primary" : "text-muted-foreground",
                  tab.primary && "text-orange-500"
                )
              }
            >
              <motion.div whileTap={{ scale: 0.9 }}>
                <Icon size={22} />
              </motion.div>
              <span>{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};