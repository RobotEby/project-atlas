import { Link } from "react-router-dom";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CyberCard } from "@/components/ui/cyber-card";

const featuredProjects = [
  {
    title: "Demonstração",
    description: "",
    category: "Segurança",
    tech: ["Kubernetes", "Istio", "OIDC", "mTLS"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
  },
  {
    title: "Demonstração",
    description: "",
    category: "Teste de penetração",
    tech: ["Python", "Docker", "Redis", "React"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
  },
  {
    title: "Demonstração",
    description: "",
    category: "DevOps",
    tech: ["ArgoCD", "Tekton", "Helm", "Prometheus"],
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600",
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              <span className="text-secondary neon-text-magenta">PROJETOS</span>{" "}
              <span className="text-foreground">EM DESTAQUE</span>
            </h2>
            <p className="font-mono text-muted-foreground">
              Implementações recentes de segurança e infraestrutura
            </p>
          </div>
          <Link to="/Projects">
            <Button
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-mono"
            >
              Ver tudo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <CyberCard
              key={`${project.title}-${index}`}
              variant={index % 2 === 0 ? "magenta" : "cyan"}
              className="animate-fade-in-up overflow-hidden"
              style={
                { animationDelay: `${index * 100}ms` } as React.CSSProperties
              }
            >
              <div className="aspect-video -mx-6 -mt-6 mb-4 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-500"
                />
              </div>
              <span className="inline-block px-2 py-1 text-xs font-mono bg-secondary/20 text-secondary rounded mb-3">
                {project.category}
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Github className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CyberCard>
          ))}
        </div>
      </div>
    </section>
  );
}
