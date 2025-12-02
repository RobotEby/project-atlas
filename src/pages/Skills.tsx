import { Layout } from "@/components/layout/Layout";
import { CyberCard } from "@/components/ui/cyber-card";
import { SkillBar } from "@/components/ui/skill-bar";
import {
  Shield,
  Cloud,
  Code,
  Network,
  Lock,
  Terminal,
  Award,
  ExternalLink,
} from "lucide-react";

const skillCategories = [
  {
    name: "Segurança",
    icon: Shield,
    color: "cyan" as const,
    skills: [
      { name: "Teste de penetração", level: 95 },
      { name: "SIEM e SOC", level: 88 },
      { name: "Avaliação de vulnerabilidades", level: 92 },
      { name: "Resposta a incidentes", level: 85 },
      { name: "Análise de Malware", level: 78 },
    ],
  },
  {
    name: "DevOps",
    icon: Code,
    color: "magenta" as const,
    skills: [
      { name: "Kubernetes", level: 94 },
      { name: "Docker", level: 96 },
      { name: "Terraform", level: 90 },
      { name: "CI/CD Pipelines", level: 92 },
      { name: "GitOps", level: 88 },
    ],
  },
  {
    name: "Cloud",
    icon: Cloud,
    color: "green" as const,
    skills: [
      { name: "AWS", level: 92 },
      { name: "Azure", level: 85 },
      { name: "GCP", level: 80 },
      { name: "Segurança na nuvem", level: 90 },
      { name: "Serverless", level: 82 },
    ],
  },
  {
    name: "Trabalho em rede",
    icon: Network,
    color: "cyan" as const,
    skills: [
      { name: "TCP/IP", level: 94 },
      { name: "Configuração do Firewall", level: 90 },
      { name: "VPN e tunelamento", level: 88 },
      { name: "Análise forense de redes", level: 82 },
      { name: "Rede Definida por Software (SDN)", level: 75 },
    ],
  },
];

const tools = [
  "Burp Suite",
  "Metasploit",
  "Nmap",
  "Wireshark",
  "Terraform",
  "Ansible",
  "Jenkins",
  "ArgoCD",
  "Prometheus",
  "Grafana",
  "ELK Stack",
  "Vault",
  "Falco",
  "Trivy",
  "OWASP ZAP",
  "SO Parrot",
  "Kali Linux",
  "VMware",
];

export default function Skills() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary neon-text">HABILIDADES</span>{" "}
              <span className="text-foreground">& EXPERIÊNCIA</span>
            </h1>
            <p className="font-mono text-muted-foreground max-w-2xl mx-auto">
              Competências técnicas em segurança, DevOps, infraestrutura em
              nuvem e redes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {skillCategories.map((category, catIndex) => (
              <CyberCard
                key={category.name}
                variant={category.color}
                className="animate-fade-in-up"
                style={
                  {
                    animationDelay: `${catIndex * 100}ms`,
                  } as React.CSSProperties
                }
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {category.name}
                  </h2>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={category.color}
                      delay={catIndex * 100 + skillIndex * 50}
                    />
                  ))}
                </div>
              </CyberCard>
            ))}
          </div>

          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-6 h-6 text-secondary" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                <span className="text-secondary neon-text-magenta">
                  CERTIFICATIONS
                </span>
              </h2>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <Terminal className="w-6 h-6 text-accent" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                <span className="text-accent neon-text-green">TOOLS</span> &
                TECHNOLOGIES
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool, index) => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-md border border-accent/30 bg-accent/5 text-accent font-mono text-sm hover:bg-accent/10 hover:border-accent/50 transition-all cursor-default animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
