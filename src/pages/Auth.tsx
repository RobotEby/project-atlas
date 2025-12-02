import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { CyberCard } from "@/components/ui/cyber-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/admin");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = isLogin
      ? await signIn(email, password)
      : await signUp(email, password);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else if (!isLogin) {
      toast({ title: "Account created!", description: "You can now sign in." });
      setIsLogin(true);
    }
    setLoading(false);
  };

  return (
    <Layout showMatrix={false}>
      <section className="min-h-[80vh] flex items-center justify-center py-20">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="font-display text-3xl font-bold text-primary neon-text">
              {isLogin ? "TERMINAL DE ACESSO" : "CRIAR CONTA"}
            </h1>
          </div>

          <CyberCard variant="cyan">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 font-mono bg-muted/50 border-primary/30"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 font-mono bg-muted/50 border-primary/30"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full font-mono bg-primary text-primary-foreground"
              >
                {isLogin ? (
                  <LogIn className="w-4 h-4 mr-2" />
                ) : (
                  <UserPlus className="w-4 h-4 mr-2" />
                )}
                {loading
                  ? "Processing..."
                  : isLogin
                  ? "Entrar"
                  : "Cadastrar-se"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary font-mono transition-colors"
              >
                {isLogin
                  ? "Precisa de uma conta? Cadastre-se"
                  : "Tem uma conta? Faça login"}
              </button>
            </div>
          </CyberCard>
        </div>
      </section>
    </Layout>
  );
}
