import { Navigate } from "react-router-dom";
import Home from "./Home";
import RoleSelect from "./RoleSelect";
import { AppShell } from "@/components/layout/AppShell";
import { getRole } from "@/lib/roleStore";

const Index = () => {
  const role = getRole();
  if (!role) return <Navigate to="/role" replace />;
  return (
    <AppShell>
      <Home />
    </AppShell>
  );
};

export default Index;
export { RoleSelect };
