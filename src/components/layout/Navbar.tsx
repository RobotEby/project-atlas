import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Painel de controle" },
  { href: "/skills", label: "Habilidades" },
  { href: "/projects", label: "Projetos" },
  { href: "/demos", label: "Demonstrações" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contato" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-primary/20"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="w-8 h-8 text-primary transition-all group-hover:text-secondary" />
              <div className="absolute inset-0 blur-md bg-primary/30 group-hover:bg-secondary/30 transition-colors" />
            </div>
            <span className="font-display font-bold text-xl text-primary neon-text group-hover:text-secondary transition-colors">
              CYBEROPS
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-md font-mono text-sm transition-all relative group",
                  location.pathname === link.href
                    ? "text-primary neon-text"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {link.label}
                {location.pathname === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-primary" />
                )}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-primary transition-all group-hover:w-1/2" />
              </Link>
            ))}
            <Link to="/admin">
              <Button
                variant="outline"
                size="sm"
                className="ml-4 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground font-mono"
              >
                <Terminal className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-md transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-primary/20 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-md font-mono text-sm transition-all",
                    location.pathname === link.href
                      ? "text-primary bg-primary/10 neon-text"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/admin" onClick={() => setIsOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full mt-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground font-mono"
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  Painel de Administração
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
