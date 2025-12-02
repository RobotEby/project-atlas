import { Server, Shield, Code, Lock } from "lucide-react";
import { CyberCard } from "@/components/ui/cyber-card";
import { StatusIndicator } from "@/components/ui/status-indicator";

const systems = [
  {
    name: "Infraestrutura",
    status: "online" as const,
    icon: Server,
    metrics: ["99.9% Tempo de atividade", "12 Regiões", "Autoescala"],
  },
  {
    name: "Segurança",
    status: "online" as const,
    icon: Shield,
    metrics: ["0 Violações", "24/7 Monitoramento", "Em conformidade com SOC2"],
  },
  {
    name: "CI/CD Pipeline",
    status: "Processando" as const,
    icon: Code,
    metrics: ["150+ Implantações/dia", "GitOps", "blue green deployment"],
  },
  {
    name: "Vault",
    status: "online" as const,
    icon: Lock,
    metrics: ["AES-256", "Apoiado pela HSM", "zero Trust"],
  },
];

export function QuickStats() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary neon-text">STATUS D</span>
            {"0 "}
            <span className="text-foreground">SISTEMA</span>
          </h2>
          <p className="font-mono text-muted-foreground max-w-2xl mx-auto">
            Monitoramento em tempo real de sistemas críticos e componentes de
            infraestrutura
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systems.map((system, index) => (
            <CyberCard
              key={system.name}
              variant={
                index % 3 === 0 ? "cyan" : index % 3 === 1 ? "magenta" : "green"
              }
              className="animate-fade-in-up"
              style={
                { animationDelay: `${index * 100}ms` } as React.CSSProperties
              }
            >
              <div className="flex items-start justify-between mb-4">
                <system.icon className="w-8 h-8 text-primary" />
                <StatusIndicator status={system.status} />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                {system.name}
              </h3>
              <ul className="space-y-2">
                {system.metrics.map((metric) => (
                  <li
                    key={metric}
                    className="font-mono text-xs text-muted-foreground flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {metric}
                  </li>
                ))}
              </ul>
            </CyberCard>
          ))}
        </div>
      </div>
    </section>
  );
}
