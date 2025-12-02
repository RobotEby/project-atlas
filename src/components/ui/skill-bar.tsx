import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SkillBarProps {
  name: string;
  level: number;
  color?: "cyan" | "magenta" | "green";
  delay?: number;
}

export function SkillBar({ name, level, color = "cyan", delay = 0 }: SkillBarProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  const colorClasses = {
    cyan: "bg-primary",
    magenta: "bg-secondary",
    green: "bg-accent",
  };

  const glowClasses = {
    cyan: "shadow-[0_0_10px_hsl(180_100%_50%_/_0.5)]",
    magenta: "shadow-[0_0_10px_hsl(300_100%_60%_/_0.5)]",
    green: "shadow-[0_0_10px_hsl(120_100%_50%_/_0.5)]",
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-mono text-sm text-foreground">{name}</span>
        <span className="font-mono text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            colorClasses[color],
            glowClasses[color]
          )}
          style={{ width: animated ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}
