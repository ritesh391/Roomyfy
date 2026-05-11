import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isRegister) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft px-6 py-10 max-w-md mx-auto flex flex-col">

      {/* Logo */}
      <div className="flex items-center justify-center pt-4">
        <Logo size={40} />
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 text-center"
      >
        <h1 className="font-display text-3xl font-bold leading-tight">
          {isRegister ? "Create account" : "Welcome back"}
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          {isRegister
            ? "Join thousands finding their happy place"
            : "Login to continue to Roomyfy"}
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 rounded-3xl bg-card shadow-card p-6 flex flex-col gap-4"
      >

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-2xl">
            {error}
          </div>
        )}

        {/* Name field (register only) */}
        {isRegister && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Full Name
            </label>
            <div className="flex items-center gap-3 border border-border rounded-2xl px-4 py-3 bg-background focus-within:border-primary transition">
              <User className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ritesh Rathore"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Email
          </label>
          <div className="flex items-center gap-3 border border-border rounded-2xl px-4 py-3 bg-background focus-within:border-primary transition">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="ritesh@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Password
          </label>
          <div className="flex items-center gap-3 border border-border rounded-2xl px-4 py-3 bg-background focus-within:border-primary transition">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-2xl py-6 text-base font-bold mt-2"
        >
          {loading ? "Please wait..." : isRegister ? "Create Account" : "Login"}
          {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>

      </motion.div>

      {/* Toggle Register/Login */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        {isRegister ? "Already have an account?" : "Don't have an account?"}
        {" "}
        <span
          onClick={() => { setIsRegister(!isRegister); setError(""); }}
          className="text-primary font-bold cursor-pointer"
        >
          {isRegister ? "Login" : "Register"}
        </span>
      </p>

      <p className="text-center text-[11px] text-muted-foreground mt-4">
        By continuing, you agree to Roomyfy's Terms & Privacy Policy.
      </p>

    </div>
  );
};

export default Login;