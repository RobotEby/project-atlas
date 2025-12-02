import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Shield } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-primary/20 bg-background/50 backdrop-blur-sm">
      <div className="absolute inset-0 circuit-pattern opacity-30" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-lg text-primary">
                KERLON AMARAL
              </span>
            </Link>
            <p className="text-sm text-muted-foreground font-mono">
              Profissional em Engenharia de Software e Cibersegurança
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-primary mb-4">
              NAVEGAÇÃO
            </h4>
            <ul className="space-y-2">
              {["Painel de controle", "Habilidades", "Blog"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${
                      item.toLowerCase() === "Painel de controle"
                        ? ""
                        : item.toLowerCase()
                    }`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-secondary mb-4">
              INTERATIVO
            </h4>
            <ul className="space-y-2">
              {[
                "Lista de verificação de segurança",
                "Analisador de senhas",
                "Scanner de portas",
                "Desafio CTF",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/demos"
                    className="text-sm text-muted-foreground hover:text-secondary transition-colors font-mono"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-accent mb-4">
              CONECTAR
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/RobotEby"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-primary/30 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-primary/30 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-primary/30 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:#"
                className="p-2 rounded-md border border-primary/30 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            © {currentYear} Kerlon Amaral (RobotEby). Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-muted-foreground font-mono">
              Status do sistema: operacional
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
