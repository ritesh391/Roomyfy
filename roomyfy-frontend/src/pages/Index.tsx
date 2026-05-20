import { Navigate } from "react-router-dom";
import Home from "./Home";
import RoleSelect from "./RoleSelect";
import { AppShell } from "@/components/layout/AppShell";
import { getRole } from "@/lib/roleStore";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isLoggedIn, loading } = useAuth();
  const role = getRole();

  if (loading) return null;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!role) return <Navigate to="/role" replace />;

  return (
    <AppShell>
      <Home />
    </AppShell>
  );
};

export default Index;
export { RoleSelect };