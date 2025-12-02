import { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  variant?: "cyan" | "magenta" | "green";
  hover?: boolean;
  style?: CSSProperties;
}

export function CyberCard({
  children,
  className,
  variant = "cyan",
  hover = true,
  style,
}: CyberCardProps) {
  const variantStyles = {
    cyan: "neon-border hover:shadow-[0_0_30px_hsl(180_100%_50%_/_0.3)]",
    magenta:
      "neon-border-magenta hover:shadow-[0_0_30px_hsl(300_100%_60%_/_0.3)]",
    green: "neon-border-green hover:shadow-[0_0_30px_hsl(120_100%_50%_/_0.3)]",
  };

  return (
    <div
      className={cn(
        "cyber-card p-6 transition-all duration-300",
        variantStyles[variant],
        hover && "hover:-translate-y-1",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
