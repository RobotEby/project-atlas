import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { CyberCard } from "@/components/ui/cyber-card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Shield,
  FileText,
  Briefcase,
  Award,
  Mail,
  LogOut,
  Lock,
} from "lucide-react";

export default function Admin() {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) navigate("/auth");
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <Layout showMatrix={false}>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  const adminSections = [
    { icon: Briefcase, label: "Projetos", count: 0 },
    { icon: FileText, label: "Postagens do blog", count: 0 },
    { icon: Award, label: "Habilidades", count: 0 },
    { icon: Mail, label: "Mensagens", count: 0 },
  ];

  return (
    <Layout showMatrix={false}>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-primary neon-text">
                Painel de Administração
              </h1>
              <p className="font-mono text-sm text-muted-foreground">
                {user?.email}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={signOut}
              className="font-mono border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>

          {!isAdmin && (
            <CyberCard variant="magenta" className="mb-8">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-secondary" />
                <p className="font-mono text-sm">
                  É necessária a função de administrador para acesso total.
                  Entre em contato com o administrador.
                </p>
              </div>
            </CyberCard>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminSections.map((section, i) => (
              <CyberCard
                key={section.label}
                variant={i % 2 === 0 ? "cyan" : "magenta"}
              >
                <section.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-lg font-semibold mb-1">
                  {section.label}
                </h3>
                <p className="font-mono text-2xl text-muted-foreground">
                  {section.count}
                </p>
              </CyberCard>
            ))}
          </div>

          <div className="mt-8">
            <CyberCard variant="cyan">
              <h3 className="font-display text-lg font-semibold mb-4">
                Ações rápidas
              </h3>
              <p className="text-sm text-muted-foreground font-mono">
                Funcionalidade CMS completa em breve. Gerencie seus projetos,
                publicações no blog, habilidades e mensagens a partir daqui.
              </p>
            </CyberCard>
          </div>
        </div>
      </section>
    </Layout>
  );
}
