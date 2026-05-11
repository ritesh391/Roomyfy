import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";

export const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Mobile shell: centered phone-style frame + bottom nav */}
      <div className="md:hidden min-h-screen bg-background">
        <div className="mx-auto max-w-md min-h-screen pb-24 relative bg-background shadow-soft">
          {children}
        </div>
        <BottomNav />
      </div>

      {/* Desktop shell: sidebar + header + full-width content */}
      <div className="hidden md:block">
        <SidebarProvider defaultOpen>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <header className="h-14 sticky top-0 z-30 flex items-center gap-3 border-b border-border/60 bg-background/85 backdrop-blur-xl px-4">
                <SidebarTrigger />
                <div className="md:hidden">
                  <Logo size={24} />
                </div>
              </header>
              <main className="flex-1">
                <div className="mx-auto w-full max-w-6xl px-4 lg:px-8 py-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </>
  );
};
