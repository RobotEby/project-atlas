import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: string;
  className?: string;
}

export function GlitchText({ children, className }: GlitchTextProps) {
  return (
    <span
      className={cn("glitch relative inline-block", className)}
      data-text={children}
    >
      {children}
    </span>
  );
}
