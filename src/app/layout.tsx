import { ReactNode } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "../components/header/header";
import styles from "./globals.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lokasyon Matematik Game - Eğlenceli ve Eğitici Matematik Oyunu",
  description:
    "Lokasyon Matematik ile matematik öğrenmek hiç bu kadar eğlenceli olmamıştı! Zorluk seviyelerine göre hazırlanmış interaktif matematik oyunu ile pratik yapın.",
  keywords:
    "matematik, matematik oyunu, eğitim, öğrenme, çocuklar için matematik, interaktif oyun, Lokasyon Matematik",
  author: "Lokasyon Matematik",
  url: "https://lokasyonmatematik.com",
  image: "https://lokasyonmatematik.com/og-image.png",
  language: "tr-TR",
  robots: "index, follow",
  canonical: "https://lokasyonmatematik.com",
  twitterUsername: "@lokasyonmath",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": metadata.url,
  "name": metadata.title,
  "description": metadata.description,
  "publisher": {
    "@type": "Organization",
    "name": metadata.author,
    "logo": {
      "@type": "ImageObject",
      "url": metadata.image,
    },
  },
  "inLanguage": metadata.language,
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="tr">
      <Head>
        {/* Temel SEO */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="robots" content={metadata.robots} />
        <meta httpEquiv="Content-Language" content={metadata.language} />
        <link rel="canonical" href={metadata.canonical} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:locale" content={metadata.language} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={metadata.twitterUsername} />
        <meta name="twitter:creator" content={metadata.twitterUsername} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />

        {/* Hreflang (dil versiyonları varsa eklenebilir) */}
        <link rel="alternate" href={metadata.canonical} hrefLang="tr" />
        {/* Örnek başka dil varsa */}
        {/* <link rel="alternate" href="https://en.lokasyonmatematik.com" hrefLang="en" /> */}

        {/* Yapısal Veri (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body className={`${styles.root} ${inter.className}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
