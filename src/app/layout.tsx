import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chismes",
  description: "¿Sos una serpiente chismosa? ¡Entrá!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-419">
      <body className={cn("min-h-screen", inter.className)}>
        <Header />        
        <div className="mt-16"> {/**Header's height is h-16 */}
          {children}
        </div>
      </body>
    </html>
  );
}
