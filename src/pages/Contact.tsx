import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CyberCard } from "@/components/ui/cyber-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Send, Github, Linkedin, Twitter } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@radix-ui/react-context-menu";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const error = null;

    if (error) {
      toast({
        title: "Erro",
        description: "Falha ao enviar mensagem",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Mensagem enviada!",
        description: "Entrarei em contato com você em breve.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    }
    setLoading(false);
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary neon-text">ENTRE</span>
              {" EM "}
              <span className="text-foreground">CONTATO</span>
            </h1>
            <p className="font-mono text-muted-foreground">
              Vamos discutir suas necessidades de segurança
              <Separator />
              (Formulário fictício)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: Github,
                label: "GitHub",
                href: "https://github.com/RobotEby",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                href: "#",
              },
              { icon: Twitter, label: "Twitter", href: "#" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CyberCard variant="cyan" className="text-center">
                  <social.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="font-mono text-sm">{social.label}</span>
                </CyberCard>
              </a>
            ))}
          </div>

          <CyberCard variant="cyan">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Nome"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="font-mono bg-muted/50 border-primary/30"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="font-mono bg-muted/50 border-primary/30"
                />
              </div>
              <Input
                placeholder="Assunto"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="font-mono bg-muted/50 border-primary/30"
              />
              <Textarea
                placeholder="Messagem"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="font-mono bg-muted/50 border-primary/30"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full font-mono bg-primary text-primary-foreground"
              >
                <Send className="w-4 h-4 mr-2" />
                {loading ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </CyberCard>
        </div>
      </section>
    </Layout>
  );
}
