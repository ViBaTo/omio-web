import type { Metadata } from "next";
import { Libre_Caslon_Text, Lato } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "@fontsource/cascadia-code/400.css";
import "@fontsource/cascadia-code/400-italic.css";
import "@fontsource/cascadia-code/700.css";
import "../globals.css";
import { routing } from "@/i18n/routing";
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("home.title"),
    description: t("home.description"),
    openGraph: {
      title: t("openGraphTitle"),
      description: t("openGraphDescription"),
      type: "website",
    },
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: {
        es: "/",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <html lang={locale} className={`${caslon.variable} ${lato.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider>
          <a href="#main-content" className="skip-to-content">
            {tCommon("skipToContent")}
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
