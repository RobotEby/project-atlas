import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CyberCard } from "@/components/ui/cyber-card";

const latestPosts = [
  {
    title: "Contornando as regras do WAF: uma análise aprofundada",
    excerpt:
      "Técnicas para identificar e explorar configurações incorretas do firewall de aplicativos da web.",
    date: "2024-01-15",
    readTime: 8,
    tags: ["Segurança", "", "Teste de penetração"],
    slug: "ignorando-regras-waf",
  },
  {
    title: "Melhores práticas do Kubernetes RBAC",
    excerpt:
      "Implementando controles de acesso com privilégios mínimos em seus clusters K8s.",
    date: "2024-01-10",
    readTime: 6,
    tags: ["Kubernetes", "Segurança", "DevOps"],
    slug: "melhores práticas do kubernetes-rbac",
  },
  {
    title: "Relatório CTF: HackTheBox Machine",
    excerpt: "Passo a passo para explorar uma máquina vulnerável.",
    date: "2024-01-05",
    readTime: 12,
    tags: ["CTF", "Relatório", "Hackear"],
    slug: "htb-máquina-relatório",
  },
];

export function LatestPosts() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              <span className="text-accent neon-text-green">
                ÚLTIMAS NOTÍCIAS
              </span>{" "}
              <span className="text-foreground">RESUMOS</span>
            </h2>
            <p className="font-mono text-muted-foreground">
              Artigos técnicos, soluções CTF e pesquisa de segurança
            </p>
          </div>
          <Link to="/blog">
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-mono"
            >
              Todos os posts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post, index) => (
            <Link key={post.slug} to={`/blog/${post.slug}`}>
              <CyberCard
                variant="green"
                className="h-full animate-fade-in-up"
                style={
                  { animationDelay: `${index * 100}ms` } as React.CSSProperties
                }
              >
                <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground font-mono">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime} min
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-accent/10 text-accent rounded"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </CyberCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
