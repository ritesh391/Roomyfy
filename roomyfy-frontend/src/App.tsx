import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext"; // ← ADD THIS LINE

import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import RoleSelect from "./pages/RoleSelect.tsx";
import Search from "./pages/Search.tsx";
import RoomDetails from "./pages/RoomDetails.tsx";
import AddListing from "./pages/AddListing.tsx";
import Bookings from "./pages/Bookings.tsx";
import Chats from "./pages/Chats.tsx";
import ChatThread from "./pages/ChatThread.tsx";
import Profile from "./pages/Profile.tsx";
import Notifications from "./pages/Notifications.tsx";
import Roommates from "./pages/Roommates.tsx";
import { AppShell } from "@/components/layout/AppShell";
import Login from "./pages/Login.tsx";

const queryClient = new QueryClient();
const Shell = ({ children }: { children: React.ReactNode }) => <AppShell>{children}</AppShell>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>  
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/role" element={<RoleSelect />} />
            <Route path="/search" element={<Shell><Search /></Shell>} />
            <Route path="/room/:id" element={<RoomDetails />} />
            <Route path="/add" element={<Shell><AddListing /></Shell>} />
            <Route path="/bookings" element={<Shell><Bookings /></Shell>} />
            <Route path="/chats" element={<Shell><Chats /></Shell>} />
            <Route path="/chat/:id" element={<ChatThread />} />
            <Route path="/profile" element={<Shell><Profile /></Shell>} />
            <Route path="/notifications" element={<Shell><Notifications /></Shell>} />
            <Route path="/roommates" element={<Shell><Roommates /></Shell>} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>  
  </QueryClientProvider>
);

export default App;