import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { siteConfig } from "@/data/site";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const title = `${siteConfig.name} | Tecnologia, Gestão de Projetos e Transformação Digital`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [
    "Anderson Alves", "Tech Solution", "gestão de projetos", "transformação digital",
    "saúde digital", "SISS Saúde", "tech lead", "redes e infraestrutura", "prompts de IA",
  ],
  authors: [{ name: siteConfig.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.role}` }],
  },
  twitter: { card: "summary_large_image", title, description: siteConfig.description, images: ["/og.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#060C17", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
