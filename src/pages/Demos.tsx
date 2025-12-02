import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SecurityChecklist } from "@/components/demos/SecurityChecklist";
import { PasswordAnalyzer } from "@/components/demos/PasswordAnalyzer";
import { PortScanner } from "@/components/demos/PortScanner";
import { CTFChallenge } from "@/components/demos/CTFChallenge";
import { Shield, Key, Network, Flag } from "lucide-react";

const demos = [
  { id: "checklist", label: "Lista de verificação de segurança", icon: Shield },
  { id: "password", label: "Analisador de senhas", icon: Key },
  { id: "ports", label: "Scanner de portas", icon: Network },
  { id: "ctf", label: "Desafio CTF", icon: Flag },
];

export default function Demos() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-accent neon-text-green">DEMONSTRAÇÕES</span>{" "}
              <span className="text-foreground">INTERATIVAS</span>
            </h1>
            <p className="font-mono text-muted-foreground max-w-2xl mx-auto">
              Experimente ferramentas de segurança e demonstrações educativas
            </p>
          </div>

          <Tabs defaultValue="checklist" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 h-auto bg-transparent mb-8">
              {demos.map((demo) => (
                <TabsTrigger
                  key={demo.id}
                  value={demo.id}
                  className="flex items-center gap-2 py-3 px-4 font-mono text-sm border border-primary/30 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary rounded-md transition-all"
                >
                  <demo.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{demo.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="checklist" className="animate-fade-in">
              <SecurityChecklist />
            </TabsContent>

            <TabsContent value="password" className="animate-fade-in">
              <PasswordAnalyzer />
            </TabsContent>

            <TabsContent value="ports" className="animate-fade-in">
              <PortScanner />
            </TabsContent>

            <TabsContent value="ctf" className="animate-fade-in">
              <CTFChallenge />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
