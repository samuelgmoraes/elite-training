import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Elite Training | Consultoria Online de Alta Performance",
  description: "A consultoria definitiva para quem busca performance real e resultados transformadores em 12 semanas. Treinos personalizados e suporte direto.",
  keywords: "treino online, consultoria fitness, hipertrofia, emagrecimento, elite training",
  openGraph: {
    title: "Elite Training | Consultoria Online",
    description: "Transforme seu corpo com metodologia de elite.",
    images: ["/banner.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${montserrat.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
