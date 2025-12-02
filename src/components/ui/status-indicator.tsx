import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "online" | "offline" | "aviso" | "Processando";
  label?: string;
  className?: string;
}

export function StatusIndicator({
  status,
  label,
  className,
}: StatusIndicatorProps) {
  const statusConfig = {
    online: {
      color: "bg-accent",
      glow: "shadow-[0_0_10px_hsl(120_100%_50%_/_0.5)]",
      text: "Online",
    },
    offline: {
      color: "bg-destructive",
      glow: "shadow-[0_0_10px_hsl(0_80%_50%_/_0.5)]",
      text: "Offline",
    },
    aviso: {
      color: "bg-neon-yellow",
      glow: "shadow-[0_0_10px_hsl(50_100%_50%_/_0.5)]",
      text: "Warning",
    },
    Processando: {
      color: "bg-primary",
      glow: "shadow-[0_0_10px_hsl(180_100%_50%_/_0.5)]",
      text: "Processando",
    },
  };

  const config = statusConfig[status];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          config.color,
          config.glow,
          status === "Processando" && "animate-pulse"
        )}
      />
      <span className="font-mono text-xs text-muted-foreground">
        {label || config.text}
      </span>
    </div>
  );
}
