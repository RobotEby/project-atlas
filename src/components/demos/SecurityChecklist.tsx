import { useState } from "react";
import { CyberCard } from "@/components/ui/cyber-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Shield, CheckCircle, AlertTriangle } from "lucide-react";

const checklistItems = [
  {
    category: "Autenticação",
    items: [
      {
        id: "mfa",
        label: "Autenticação multifatorial ativada",
        critical: true,
      },
      {
        id: "password-policy",
        label: "Política de senhas fortes aplicada",
        critical: true,
      },
      {
        id: "session-timeout",
        label: "Tempo limite da sessão configurado",
        critical: false,
      },
      {
        id: "failed-attempts",
        label: "Bloqueio por tentativas de login falhadas",
        critical: true,
      },
    ],
  },
  {
    category: "Segurança de rede",
    items: [
      {
        id: "firewall",
        label: "Regras de firewall configuradas",
        critical: true,
      },
      {
        id: "ids",
        label: "Sistema de detecção de intrusão ativo",
        critical: true,
      },
      {
        id: "network-segmentation",
        label: "Segmentação de rede implementada",
        critical: false,
      },
      { id: "vpn", label: "VPN para acesso remoto", critical: true },
    ],
  },
  {
    category: "Proteção de dados",
    items: [
      {
        id: "encryption-rest",
        label: "Dados criptografados em repouso",
        critical: true,
      },
      {
        id: "encryption-transit",
        label: "Dados criptografados em trânsito (TLS)",
        critical: true,
      },
      { id: "backup", label: "Backups regulares configurados", critical: true },
      {
        id: "backup-test",
        label: "Restauração do backup testada",
        critical: false,
      },
    ],
  },
  {
    category: "Segurança de aplicativos",
    items: [
      {
        id: "input-validation",
        label: "Validação de entrada implementada",
        critical: true,
      },
      {
        id: "xss-protection",
        label: "Cabeçalhos de proteção contra XSS",
        critical: true,
      },
      { id: "csrf-tokens", label: "Tokens CSRF implementados", critical: true },
      {
        id: "dependency-scan",
        label: "Verificação de vulnerabilidades de dependências",
        critical: false,
      },
    ],
  },
];

export function SecurityChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const totalItems = checklistItems.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );
  const criticalItems = checklistItems.reduce(
    (acc, cat) => acc + cat.items.filter((i) => i.critical).length,
    0
  );
  const checkedCount = checked.size;
  const checkedCritical = checklistItems.reduce(
    (acc, cat) =>
      acc + cat.items.filter((i) => i.critical && checked.has(i.id)).length,
    0
  );

  const progress = (checkedCount / totalItems) * 100;
  const criticalProgress = (checkedCritical / criticalItems) * 100;

  const toggleItem = (id: string) => {
    const newChecked = new Set(checked);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setChecked(newChecked);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CyberCard variant="cyan">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-primary" />
            <h3 className="font-display text-lg font-semibold">
              Progresso geral
            </h3>
          </div>
          <Progress value={progress} className="h-2 mb-2" />
          <p className="font-mono text-sm text-muted-foreground">
            {checkedCount} / {totalItems} itens concluídos (
            {Math.round(progress)}%)
          </p>
        </CyberCard>

        <CyberCard variant={criticalProgress === 100 ? "green" : "magenta"}>
          <div className="flex items-center gap-3 mb-4">
            {criticalProgress === 100 ? (
              <CheckCircle className="w-6 h-6 text-accent" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-secondary" />
            )}
            <h3 className="font-display text-lg font-semibold">
              Itens críticos
            </h3>
          </div>
          <Progress value={criticalProgress} className="h-2 mb-2" />
          <p className="font-mono text-sm text-muted-foreground">
            {checkedCritical} / {criticalItems} itens críticos (
            {Math.round(criticalProgress)}%)
          </p>
        </CyberCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {checklistItems.map((category) => (
          <CyberCard key={category.category} variant="cyan">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              {category.category}
            </h3>
            <div className="space-y-3">
              {category.items.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <Checkbox
                    checked={checked.has(item.id)}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="mt-0.5 border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span
                    className={`font-mono text-sm transition-colors ${
                      checked.has(item.id)
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }`}
                  >
                    {item.label}
                    {item.critical && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs bg-destructive/20 text-destructive rounded">
                        Crítico
                      </span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </CyberCard>
        ))}
      </div>
    </div>
  );
}
