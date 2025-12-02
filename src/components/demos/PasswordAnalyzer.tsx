import { useState, useEffect } from "react";
import { CyberCard } from "@/components/ui/cyber-card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Key, Eye, EyeOff, Check, X, AlertTriangle } from "lucide-react";

interface PasswordAnalysis {
  score: number;
  strength: string;
  color: "cyan" | "magenta" | "green";
  crackTime: string;
  checks: { label: string; passed: boolean }[];
  suggestions: string[];
}

function analyzePassword(password: string): PasswordAnalysis {
  const checks = [
    { label: "Pelo menos 8 caracteres", passed: password.length >= 8 },
    { label: "Pelo menos 12 caracteres", passed: password.length >= 12 },
    { label: "Contém letra maiúscula", passed: /[A-Z]/.test(password) },
    { label: "Contém letra minúscula", passed: /[a-z]/.test(password) },
    { label: "Contém número", passed: /[0-9]/.test(password) },
    {
      label: "Contém caracteres especiais",
      passed: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    {
      label: "Sem padrões comuns",
      passed: !/^(123|abc|qwerty|password)/i.test(password),
    },
    {
      label: "Sem caracteres repetidos (3+)",
      passed: !/(.)\1{2,}/.test(password),
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);

  let strength: string;
  let color: "cyan" | "magenta" | "green";
  let crackTime: string;

  if (score < 40) {
    strength = "Fraco";
    color = "magenta";
    crackTime = "Imediatamente a alguns minutos";
  } else if (score < 70) {
    strength = "Médio";
    color = "cyan";
    crackTime = "Horas a dias";
  } else if (score < 90) {
    strength = "Forte";
    color = "cyan";
    crackTime = "Meses a anos";
  } else {
    strength = "Muito forte";
    color = "green";
    crackTime = "Séculos";
  }

  const suggestions: string[] = [];
  if (!checks[0].passed) suggestions.push("Use pelo menos 8 caracteres");
  if (!checks[1].passed)
    suggestions.push("Considere usar mais de 12 caracteres");
  if (!checks[2].passed || !checks[3].passed)
    suggestions.push("Misture letras maiúsculas e minúsculas");
  if (!checks[4].passed) suggestions.push("Adicione alguns números");
  if (!checks[5].passed)
    suggestions.push("Inclua caracteres especiais (!@#$%^&*)");
  if (!checks[6].passed)
    suggestions.push("Evite padrões comuns como '123' ou 'password'.");

  return { score, strength, color, crackTime, checks, suggestions };
}

export function PasswordAnalyzer() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState<PasswordAnalysis | null>(null);

  useEffect(() => {
    if (password) {
      setAnalysis(analyzePassword(password));
    } else {
      setAnalysis(null);
    }
  }, [password]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <CyberCard variant="cyan">
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-6 h-6 text-primary" />
          <h3 className="font-display text-xl font-semibold">
            Analisador de força de senha
          </h3>
        </div>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Digite uma senha para analisar..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pr-10 font-mono bg-muted/50 border-primary/30 focus:border-primary"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        <p className="mt-2 text-xs text-muted-foreground font-mono">
          Esta ferramenta é executada localmente. Sua senha nunca é enviada para
          nenhum servidor.
        </p>
      </CyberCard>

      {analysis && (
        <>
          <CyberCard variant={analysis.color}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold">
                Strength: {analysis.strength}
              </h3>
              <span className="font-mono text-2xl font-bold text-primary">
                {analysis.score}%
              </span>
            </div>
            <Progress value={analysis.score} className="h-3 mb-4" />
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <AlertTriangle className="w-4 h-4" />
              Estimated crack time:{" "}
              <span className="text-foreground">{analysis.crackTime}</span>
            </div>
          </CyberCard>

          <CyberCard variant="cyan">
            <h3 className="font-display text-lg font-semibold mb-4">
              Verificações de segurança
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {analysis.checks.map((check) => (
                <div
                  key={check.label}
                  className={`flex items-center gap-2 p-2 rounded font-mono text-sm ${
                    check.passed ? "text-accent" : "text-destructive"
                  }`}
                >
                  {check.passed ? (
                    <Check className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 flex-shrink-0" />
                  )}
                  {check.label}
                </div>
              ))}
            </div>
          </CyberCard>

          {analysis.suggestions.length > 0 && (
            <CyberCard variant="magenta">
              <h3 className="font-display text-lg font-semibold mb-4">
                Suggestions
              </h3>
              <ul className="space-y-2">
                {analysis.suggestions.map((suggestion, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-mono text-sm text-muted-foreground"
                  >
                    <span className="text-secondary">→</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </CyberCard>
          )}
        </>
      )}
    </div>
  );
}
