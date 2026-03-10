import type { Metadata } from "next";
import { Playfair_Display, Bebas_Neue, JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import TextureBackground from "@/components/TextureBackground";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SoundToggle from "@/components/SoundToggle";
import ScrollIndicator from "@/components/ScrollIndicator";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
  weight: "400",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "700"],
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
      className={`${playfair.variable} ${bebas.variable} ${jetbrains.variable} ${dmSans.variable}`}
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
          <SoundToggle />
        </SmoothScroll>
      </body>
    </html>
  );
}
