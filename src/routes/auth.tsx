import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Lock, Mail, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assetgambar/LOGO.ASSI.png";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Masuk Admin — Akademi Soft Skills Indonesia" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/admin", replace: true });
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      }
    } catch (e: any) {
      setErr(e.message ?? "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] grid place-items-center px-4 py-12 bg-gradient-to-br from-[var(--brand-navy)]/5 via-background to-[var(--brand-tosca)]/5">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl bg-card border shadow-elegant p-8">
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="Logo Akademi" className="h-14 w-auto" />
          <h1 className="mt-4 text-2xl font-extrabold text-[var(--brand-navy)]">
            {mode === "login" ? "Masuk Admin" : "Daftar Admin"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login" ? "Akses panel pengelolaan konten." : "Akun pertama akan otomatis jadi admin."}
          </p>
        </div>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--brand-navy)] mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border bg-background pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 ring-[var(--brand-tosca)]" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--brand-navy)] mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input required type="password" minLength={6} value={password} onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl border bg-background pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 ring-[var(--brand-tosca)]" />
            </div>
          </div>
          {err && <div className="text-xs rounded-lg bg-red-50 text-red-700 px-3 py-2">{err}</div>}
          <button type="submit" disabled={loading}
            className="w-full rounded-full gradient-orange py-3.5 text-sm font-semibold text-white shadow-glow inline-flex items-center justify-center gap-2 disabled:opacity-60">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "login" ? "Masuk" : "Daftar"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="font-semibold text-[var(--brand-orange)]">
            {mode === "login" ? "Daftar di sini" : "Masuk"}
          </button>
        </div>
        <div className="mt-2 text-center">
          <Link to="/" className="text-xs text-muted-foreground hover:text-[var(--brand-navy)]">← Kembali ke beranda</Link>
        </div>
      </motion.div>
    </div>
  );
}
