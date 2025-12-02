import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CyberCard } from "@/components/ui/cyber-card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["todos", "Segurança", "DevOps", "Cloud", "Automação"];

const projects = [
  {
    title: "Demonstração",
    description: "",
    category: "Segurança",
    tech: ["Kubernetes", "Istio", "OIDC", "mTLS", "Terraform"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
    github: "#",
    demo: "#",
    challenges:
      "Gerenciando a rotação de certificados em escala em mais de 50 microsserviços",
    outcomes:
      "Gerenciando a rotação de certificados em escala em mais de 50 microsserviços",
  },
  {
    title: "Demonstração",
    description: "",
    category: "Segurança",
    tech: ["Python", "Docker", "Redis", "FastAPI", "React"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
    github: "#",
    challenges: "Tratamento da limitação de taxa e redução de falsos positivos",
    outcomes: "Descobrimos 12 CVEs na infraestrutura do cliente",
  },
  {
    title: "Demonstração",
    description: "",
    category: "DevOps",
    tech: ["ArgoCD", "Tekton", "Helm", "Prometheus", "Grafana"],
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600",
    github: "#",
    demo: "#",
    challenges:
      "Implementando implantações sem tempo de inatividade com aplicativos com estado",
    outcomes: "150+ deployments/day with 99.9% success rate",
  },
  {
    title: "Demonstração",
    description: "",
    category: "Cloud",
    tech: ["AWS", "Azure", "Go", "Terraform", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
    github: "#",
    challenges:
      "Normalizando as descobertas de segurança entre diferentes provedores de nuvem",
    outcomes: "Conformidade com SOC2 alcançada em 3 meses",
  },
  {
    title: "Demonstração",
    description: "",
    category: "Automação",
    tech: ["Terraform", "OPA", "Vault", "AWS", "Python"],
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600",
    github: "#",
    challenges: "Gerenciando o estado em mais de 200 contas AWS",
    outcomes: "Redução do tempo de provisionamento de infraestrutura em 80%",
  },
  {
    title: "Demonstração",
    description: "",
    category: "Segurança",
    tech: ["Go", "Kubernetes", "Falco", "Trivy", "gRPC"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600",
    github: "#",
    demo: "#",
    challenges:
      "Minimizando o impacto no desempenho das cargas de trabalho de produção",
    outcomes: "Bloqueou mais de 500 violações da política no primeiro mês",
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-secondary neon-text-magenta">
                DEMONSTRAÇÃO
              </span>
              {" DE "}
              <span className="text-foreground">PROJETOS</span>
            </h1>
            <p className="font-mono text-muted-foreground max-w-2xl mx-auto">
              Ferramentas de segurança, automação de infraestrutura e
              implementações de DevOps
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "font-mono",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "border-primary/30 text-muted-foreground hover:text-primary hover:border-primary"
                )}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <CyberCard
                key={`${project.title}-${index}`}
                variant={
                  index % 3 === 0
                    ? "cyan"
                    : index % 3 === 1
                    ? "magenta"
                    : "green"
                }
                className="animate-fade-in-up group"
                style={
                  { animationDelay: `${index * 50}ms` } as React.CSSProperties
                }
              >
                <div className="aspect-video -mx-6 -mt-6 mb-4 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>

                <span className="inline-block px-2 py-1 text-xs font-mono bg-secondary/20 text-secondary rounded mb-3">
                  {project.category}
                </span>

                <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary rounded"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-2 py-0.5 text-xs font-mono text-muted-foreground">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                <div className="pt-4 border-t border-primary/10 flex gap-2">
                  {project.github && (
                    <a href={project.github} rel="noopener noreferrer">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        Github
                      </Button>
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} rel="noopener noreferrer">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-secondary"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Demo
                      </Button>
                    </a>
                  )}
                </div>
              </CyberCard>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
