import { Layout } from "@/components/layout/Layout";
import { CyberCard } from "@/components/ui/cyber-card";
import { Clock, Tag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    title: "Contornando as regras do WAF: uma análise aprofundada",
    excerpt:
      "Técnicas para identificar e explorar configurações incorretas de firewall de aplicativos da web em ambientes modernos de nuvem.",
    date: "2024-01-15",
    readTime: 8,
    tags: ["Segurança", "WAF", "Teste de penetração"],
    slug: "ignorando-regras-waf",
  },
  {
    title: "Melhores práticas do Kubernetes RBAC",
    excerpt:
      "Implementação de controles de acesso com privilégios mínimos em seus clusters K8s para maior segurança.",
    date: "2024-01-10",
    readTime: 6,
    tags: ["Kubernetes", "Segurança", "DevOps"],
    slug: "kubernetes-rbac",
  },
  {
    title: "Relatório CTF: HackTheBox Machine",
    excerpt:
      "Passo a passo para explorar uma máquina vulnerável, desde o ponto de entrada inicial até o acesso root.",
    date: "2024-01-05",
    readTime: 12,
    tags: ["CTF", "Relatório"],
    slug: "htb-relatório",
  },
];

export default function Blog() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-accent neon-text-green">BLOG</span>{" "}
              <span className="text-foreground">& ARTIGOS</span>
            </h1>
            <p className="font-mono text-muted-foreground">
              Artigos técnicos e pesquisas sobre segurança
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <Link key={post.slug} to={`/blog/${post.slug}`}>
                <CyberCard
                  variant="green"
                  className="h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground font-mono">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-mono bg-accent/10 text-accent rounded"
                      >
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
    </Layout>
  );
}
