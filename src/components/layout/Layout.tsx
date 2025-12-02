import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MatrixRain } from "@/components/effects/MatrixRain";

interface LayoutProps {
  children: ReactNode;
  showMatrix?: boolean;
}

export function Layout({ children, showMatrix = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background relative">
      {showMatrix && <MatrixRain />}
      <div className="fixed inset-0 circuit-pattern pointer-events-none opacity-20" />
      <div className="scanline" />

      <Navbar />
      <main className="relative z-10 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
