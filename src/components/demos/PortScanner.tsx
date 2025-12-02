import { useState } from "react";
import { CyberCard } from "@/components/ui/cyber-card";
import { Button } from "@/components/ui/button";
import { Network, Play, AlertCircle } from "lucide-react";

interface Port {
  port: number;
  service: string;
  risk: "baixo" | "médio" | "alto";
  description: string;
  status?: "aberto" | "fechado";
}

const commonPorts: Port[] = [
  {
    port: 21,
    service: "FTP",
    risk: "médio",
    description:
      "Protocolo de transferência de arquivos - Frequentemente mal configurado",
  },
  {
    port: 22,
    service: "SSH",
    risk: "baixo",
    description: "Secure Shell - Garantir apenas autenticação baseada em chave",
  },
  {
    port: 23,
    service: "Telnet",
    risk: "alto",
    description: "Acesso remoto não criptografado - Deve ser desativado",
  },
];

export function PortScanner() {
  const [scanning, setScanning] = useState(false);
  const [scanResults, setScanResults] = useState<Port[] | null>(null);

  const runSimulatedScan = () => {
    setScanning(true);
    setScanResults(null);

    setTimeout(() => {
      const results: Port[] = commonPorts.map((port) => ({
        ...port,
        status: Math.random() > 0.7 ? "aberto" : "fechado",
      }));
      setScanResults(results);
      setScanning(false);
    }, 2000);
  };

  const riskColors: Record<Port["risk"], string> = {
    baixo: "text-accent",
    médio: "text-neon-yellow",
    alto: "text-destructive",
  };

  return (
    <div className="space-y-8">
      <CyberCard variant="cyan">
        <div className="flex items-center gap-3 mb-4">
          <Network className="w-6 h-6 text-primary" />
          <h3 className="font-display text-xl font-semibold">
            Simulador de scanner de portas
          </h3>
        </div>
        <p className="text-sm text-muted-foreground font-mono mb-6">
          Demonstração educacional de varredura de portas comuns. Trata-se de
          uma simulação e não realiza varreduras reais na rede.
        </p>

        <Button
          onClick={runSimulatedScan}
          disabled={scanning}
          className="w-full md:w-auto font-mono bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Play className="w-4 h-4 mr-2" />
          {scanning ? "Escaneando..." : "Executar verificação simulada"}
        </Button>
      </CyberCard>

      {scanning && (
        <CyberCard variant="cyan">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="font-mono text-sm text-muted-foreground">
              Verificação de portas comuns...
            </span>
          </div>
        </CyberCard>
      )}

      {scanResults && (
        <div className="space-y-4">
          <CyberCard variant="green">
            <h3 className="font-display text-lg font-semibold mb-4">
              Resultados da digitalização
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="font-mono text-2xl font-bold text-accent">
                  {scanResults.filter((p) => p.status === "aberto").length}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  Portas abertas
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-muted-foreground">
                  {scanResults.filter((p) => p.status === "fechado").length}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  Portas fechadas
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-destructive">
                  {
                    scanResults.filter(
                      (p) => p.status === "aberto" && p.risk === "alto"
                    ).length
                  }
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  Alto risco aberto
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-primary">
                  {scanResults.length}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  Total digitalizado
                </p>
              </div>
            </div>
          </CyberCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scanResults.map((port) => (
              <CyberCard
                key={port.port}
                variant={
                  port.status === "aberto"
                    ? port.risk === "alto"
                      ? "magenta"
                      : "cyan"
                    : "cyan"
                }
                className={port.status === "fechado" ? "opacity-50" : ""}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-mono text-lg font-bold text-foreground">
                      Port {port.port}
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      / {port.service}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs font-mono rounded ${
                      port.status === "aberto"
                        ? "bg-accent/20 text-accent"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {port.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-mono mb-2">
                  {port.description}
                </p>
                <div className="flex items-center gap-1">
                  <AlertCircle className={`w-3 h-3 ${riskColors[port.risk]}`} />
                  <span
                    className={`text-xs font-mono ${riskColors[port.risk]}`}
                  >
                    {port.risk} risco
                  </span>
                </div>
              </CyberCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
