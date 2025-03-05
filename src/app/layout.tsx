import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers/Providers";
import { Toaster } from "sonner";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lotofácil Stats - Análise de Resultados e Estatísticas",
  description:
    "Aplicativo completo para análise de resultados da Lotofácil, estatísticas avançadas, verificação de números e histórico de concursos. Aumente suas chances de ganhar!",
  keywords:
    "lotofácil, loteria, resultados lotofácil, estatísticas lotofácil, números da sorte, combinações lotofácil, padrões lotofácil, lotofácil dicas",
  authors: [{ name: "A&T-Desenvolvimento Web" }],
  creator: "A&T-Desenvolvimento Web",
  publisher: "A&T-Desenvolvimento Web",
  openGraph: {
    title: "Lotofácil Stats - Análise de Resultados e Estatísticas",
    description:
      "Aplicativo completo para análise de resultados da Lotofácil, estatísticas avançadas e verificação de números.",
    url: "https://lotofacil-stats.vercel.app",
    siteName: "Lotofácil Stats",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lotofácil Stats - Análise de Resultados e Estatísticas",
    description:
      "Aplicativo completo para análise de resultados da Lotofácil, estatísticas avançadas e verificação de números.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://lotofacil-stats.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* Google AdSense Script */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
        <Providers>
          <Header />
          <main className="flex-1 container py-8 mx-auto px-4">{children}</main>
          <Footer />
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
