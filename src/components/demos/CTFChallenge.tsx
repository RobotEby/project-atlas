import { useState } from "react";
import { CyberCard } from "@/components/ui/cyber-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Flag, Lock, Unlock, Check, X, Lightbulb } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const challenges = [
  {
    id: 1,
    title: "Base64 Decode",
    description: "Decodifique esta string Base64 para encontrar a bandeira.",
    encoded: "Q1RGe2Jhc2U2NF9pc19ub3RfZW5jcnlwdGlvbn0=",
    flag: "CTF{base64_is_not_encryption}",
    hint: "Base64 is an encoding scheme, not encryption. Use a decoder.",
    points: 50,
  },
  {
    id: 2,
    title: "ROT13 Cipher",
    description: "Esta cifra clássica altera as letras em 13 posições.",
    encoded: "PGS{ebg_guvegrra_pvcure}",
    flag: "CTF{rot_thirteen_cipher}",
    hint: "ROT13 is its own inverse. Apply it twice to get the original.",
    points: 75,
  },
  {
    id: 3,
    title: "Hex to ASCII",
    description: "Converta esta sequência hexadecimal em texto ASCII.",
    encoded: "4354467b6865785f69735f6a7573745f626173655f31367d",
    flag: "CTF{hex_is_just_base_16}",
    hint: "Each pair of hex digits represents one ASCII character.",
    points: 100,
  },
  {
    id: 4,
    title: "Binary Challenge",
    description: "Decodifique esta mensagem binária.",
    encoded:
      "01000011 01010100 01000110 01111011 01100010 01101001 01101110 01100001 01110010 01111001 01011111 01101101 01100001 01110011 01110100 01100101 01110010 01111101",
    flag: "CTF{binary_master}",
    hint: "8 bits = 1 byte = 1 ASCII character",
    points: 100,
  },
];

export function CTFChallenge() {
  const [solved, setSolved] = useState<Set<number>>(new Set());
  const [attempts, setAttempts] = useState<{ [key: number]: string }>({});
  const [showHints, setShowHints] = useState<Set<number>>(new Set());

  const totalPoints = challenges.reduce((acc, c) => acc + c.points, 0);
  const earnedPoints = challenges
    .filter((c) => solved.has(c.id))
    .reduce((acc, c) => acc + c.points, 0);

  const checkFlag = (challengeId: number, flag: string) => {
    const challenge = challenges.find((c) => c.id === challengeId);
    if (!challenge) return;

    if (
      attempts[challengeId]?.toLowerCase().trim() ===
      challenge.flag.toLowerCase()
    ) {
      setSolved((prev) => new Set(prev).add(challengeId));
      toast({
        title: "Bandeira capturada!",
        description: `+${challenge.points} pontos`,
      });
    } else {
      toast({
        title: "CTF incorreta",
        description: "Tente novamente!",
        variant: "destructive",
      });
    }
  };

  const toggleHint = (id: number) => {
    setShowHints((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-8">
      <CyberCard variant="green">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Flag className="w-6 h-6 text-accent" />
            <h3 className="font-display text-xl font-semibold">Desafio CTF</h3>
          </div>
          <div className="text-right">
            <p className="font-mono text-2xl font-bold text-accent">
              {earnedPoints}
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              / {totalPoints} pontos
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground font-mono">
          Resolva quebra-cabeças criptográficos para capturar as bandeiras. Cada
          bandeira segue o formato: CTF{"{flag_text}"}
        </p>
      </CyberCard>

      <div className="space-y-6">
        {challenges.map((challenge) => (
          <CyberCard
            key={challenge.id}
            variant={solved.has(challenge.id) ? "green" : "cyan"}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {solved.has(challenge.id) ? (
                  <Unlock className="w-5 h-5 text-accent" />
                ) : (
                  <Lock className="w-5 h-5 text-primary" />
                )}
                <h3 className="font-display text-lg font-semibold">
                  {challenge.title}
                </h3>
              </div>
              <span className="px-2 py-1 text-xs font-mono bg-primary/20 text-primary rounded">
                {challenge.points} pts
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {challenge.description}
            </p>

            <div className="p-4 rounded bg-muted/50 mb-4 overflow-x-auto">
              <code className="font-mono text-sm text-primary break-all">
                {challenge.encoded}
              </code>
            </div>

            {solved.has(challenge.id) ? (
              <div className="flex items-center gap-2 text-accent font-mono">
                <Check className="w-5 h-5" />
                Solved! Flag: {challenge.flag}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Insira a bandeira (CTF{...})"
                    value={attempts[challenge.id] || ""}
                    onChange={(e) =>
                      setAttempts((prev) => ({
                        ...prev,
                        [challenge.id]: e.target.value,
                      }))
                    }
                    className="font-mono bg-muted/50 border-primary/30"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        checkFlag(challenge.id, attempts[challenge.id] || "");
                      }
                    }}
                  />
                  <Button
                    onClick={() =>
                      checkFlag(challenge.id, attempts[challenge.id] || "")
                    }
                    className="bg-primary text-primary-foreground font-mono"
                  >
                    Enviar
                  </Button>
                </div>

                <button
                  onClick={() => toggleHint(challenge.id)}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-secondary transition-colors font-mono"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHints.has(challenge.id) ? "Esconder dica" : "Mostrar dica"}
                </button>

                {showHints.has(challenge.id) && (
                  <div className="p-3 rounded bg-secondary/10 border border-secondary/30">
                    <p className="text-sm text-secondary font-mono">
                      {challenge.hint}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CyberCard>
        ))}
      </div>
    </div>
  );
}
