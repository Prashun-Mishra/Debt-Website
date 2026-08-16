import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Lock, Mail, KeyRound, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin-portal/login")({
  head: () => ({
    title: "Admin Vault Login | Square Up Any Debt",
    meta: [
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Check if session already exists
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate({ to: "/admin-portal/dashboard" });
      }
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        console.error("Login error:", error.message);
        setErrorMsg(error.message || "Invalid login credentials.");
        toast.error("Authentication failed. Please check your credentials.");
      } else if (data.session) {
        toast.success("Welcome to Admin Vault.");
        navigate({ to: "/admin-portal/dashboard" });
      }
    } catch (err: any) {
      console.error("Unexpected login error:", err);
      setErrorMsg(err?.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-cream to-background px-4 py-12 text-foreground">

      <div className="relative w-full max-w-md space-y-8">
        
        {/* Title Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-forest/20 bg-forest/10 shadow-[var(--shadow-soft)]">
            <ShieldCheck className="h-7 w-7 text-forest" />
          </div>
          <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-foreground">
            Admin Audit Vault
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Secure, unlinked compliance portal for viewing UK customer lead records and legal proof certificates.
          </p>
        </div>

        {/* Login Form Card */}
        <div className="rounded-xl border border-hairline bg-card p-8 shadow-[var(--shadow-soft)]">
          
          <form onSubmit={handleLogin} className="space-y-5">
            
            {errorMsg && (
              <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3.5 text-xs text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground/50">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@squareupanydebt.co.uk"
                  className="w-full rounded-md border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-forest focus:ring-2 focus:ring-forest/15"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Admin Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground/50">
                  <KeyRound className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-md border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-forest focus:ring-2 focus:ring-forest/15"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-coral py-3 text-sm font-semibold text-coral-foreground transition-all hover:bg-coral-hover disabled:opacity-50 disabled:cursor-not-allowed shadow-[var(--shadow-soft)]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Vault
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Compliance Notice */}
          <div className="mt-6 border-t border-hairline pt-5 text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Lock className="h-3.5 w-3.5 text-forest" />
              <span>UK FCA & Data Protection Act 2018 Protected Access</span>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <p className="text-center text-[11px] text-muted-foreground">
          This URL is isolated and hidden from public navigation.
        </p>

      </div>
    </div>
  );
}
