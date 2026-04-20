import type { Metadata } from "next";
import { Libre_Caslon_Text, Lato } from "next/font/google";
import "@fontsource/cascadia-code/400.css";
import "@fontsource/cascadia-code/400-italic.css";
import "@fontsource/cascadia-code/700.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import TextureBackground from "@/components/TextureBackground";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollIndicator from "@/components/ScrollIndicator";

const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  variable: "--font-caslon",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "OMIO Atelier & Design — Artesano · Ingeniero · Fábrica",
  description:
    "Fusionamos tres mundos para fabricar piezas imposibles a escala global. Socio estratégico de los estudios de diseño de interiores más prestigiosos del mundo.",
  openGraph: {
    title: "OMIO Atelier & Design",
    description: "Artesano · Ingeniero · Fábrica — Tres mundos, una pieza.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${caslon.variable} ${lato.variable}`}
    >
      <body className="antialiased">
        <a href="#main-content" className="skip-to-content">
          Ir al contenido
        </a>
        <SmoothScroll>
          <TextureBackground />
          <Preloader />
          <Navbar />
          {children}
          <Footer />
          <ScrollIndicator />
          <CustomCursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
