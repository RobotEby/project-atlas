import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Terminal, ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypingText } from "@/components/effects/TypingText";

const titles = [
  "Engenheiro de DevOps",
  "Desenvolvedor UI/UX|",
  "Desenvolvedor Full Stack",
  "Especialista em CI/CD e Automação",
];

export function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-background/50 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-sm text-muted-foreground">
              Status do sistema:{" "}
              <span className="text-accent">operacional</span>
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">KERLON</span>{" "}
            <span className="text-primary neon-text">AMARAL</span>
          </h1>

          <div className="h-12 mb-8">
            <p className="font-mono text-xl md:text-2xl text-muted-foreground">
              {">"} <span className="text-primary">{titles[titleIndex]}</span>
              <span className="animate-blink">_</span>
            </p>
          </div>

          <div className="mb-8 max-w-2xl mx-auto">
            <TypingText
              text="Protegendo sistemas. Automatizando infraestruturas. Rompendo barreiras."
              className="text-lg text-muted-foreground"
              speed={30}
              onComplete={() => setShowContent(true)}
            />
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-500 ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Link to="/projects">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono group"
              >
                <Shield className="w-5 h-5 mr-2" />
                Ver projetos
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/demos">
              <Button
                size="lg"
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-mono"
              >
                <Terminal className="w-5 h-5 mr-2" />
                Experimente as demonstrações
              </Button>
            </Link>
          </div>

          <div
            className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-500 delay-300 ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {[
              { label: "Projetos", value: "0", icon: Shield },
              { label: "Certificações", value: "1", icon: Activity },
              { label: "Anos de Experiência", value: "2+", icon: Terminal },
              { label: "CVEs Found", value: "5", icon: Shield },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors group"
              >
                <stat.icon className="w-5 h-5 text-primary mb-2 mx-auto group-hover:scale-110 transition-transform" />
                <p className="font-display text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
