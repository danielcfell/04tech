import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL, BUSINESS } from "@/lib/seo";

/* Pesos = solo los que se usan de verdad:
   Bricolage (títulos/logo): 500 logo, 700 subtítulos, 800 títulos.
   Instrument (cuerpo): 400 texto, 500/600 énfasis, 700 badges. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const DESCRIPTION =
  "Creamos tu página web en Tulcán, tu sistema de facturación y tu bot de WhatsApp para que te encuentren y te escriban en todo el Carchi. Desde $39. Escríbenos hoy.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Páginas web, sistemas y bots de WhatsApp en Tulcán, Carchi | 04 Tech",
    template: "%s | 04 Tech",
  },
  description: DESCRIPTION,
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name, url: `${SITE_URL}/` }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  keywords: [
    "página web Tulcán",
    "página web Julio Andrade",
    "diseño web Carchi",
    "bot de WhatsApp",
    "sistema de facturación Carchi",
    "tienda en línea Tulcán",
    "04 Tech",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: `${SITE_URL}/`,
    siteName: BUSINESS.name,
    title: "Páginas web, sistemas y bots de WhatsApp en Tulcán, Carchi | 04 Tech",
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "04 Tech — páginas web, sistemas y bots de WhatsApp en Tulcán y el Carchi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Páginas web, sistemas y bots de WhatsApp en Tulcán, Carchi | 04 Tech",
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: "XjDh2QT67rtVwYhaErzFMBR4vgRgfvQOxjr-gNFX3Fk",
  },
  formatDetection: { telephone: true, address: true, email: true },
  other: {
    "geo.region": "EC-C",
    "geo.placename": "Tulcán, Carchi, Ecuador",
    "geo.position": `${BUSINESS.latitude};${BUSINESS.longitude}`,
    ICBM: `${BUSINESS.latitude}, ${BUSINESS.longitude}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-EC" className={`${bricolage.variable} ${instrument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
