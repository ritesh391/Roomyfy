import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        try {
          const data = await api.getMe();
          if (data?.user) {
            setUser(data.user);
          } else {
            localStorage.removeItem("token");
            setToken(null);
          }
        } catch {
          localStorage.removeItem("token");
          setToken(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api.login({ email, password });
    if (!data.token) {
      throw new Error(data.message || "Login failed");
    }
    localStorage.setItem("token", data.token);
    setToken(data.token);

    // Build user from token payload or fetch from API
    try {
      const me = await api.getMe();
      if (me?.user) {
        setUser(me.user);
      } else {
        // Fallback: set basic user info
        setUser({
          id: "",
          name: email.split("@")[0],
          email: email,
          role: "tenant",
        });
      }
    } catch {
      // Even if getMe fails, login was successful
      setUser({
        id: "",
        name: email.split("@")[0],
        email: email,
        role: "tenant",
      });
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role = "tenant"
  ) => {
    const data = await api.register({ name, email, password, role });
    if (!data.user) {
      throw new Error(data.message || "Registration failed");
    }
    // Auto login after register
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isLoggedIn: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);