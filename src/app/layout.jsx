import { ReactNode } from "react"; // ReactNode tipi için import
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "./globals.module.scss";

const inter = Inter({ subsets: ["latin"] });

const defaultMetadata = {
  title: "Lokasyon Matematik | Ankara Özel Ders ile Başarıyı Yakalayın",
  description: "Ankara'da birebir matematik dersleri ile sınav başarılarını artırın. Lokasyon Matematik ile uzman öğretmenlerden kişisel matematik dersleri alın.",
  keywords: "ankara matematik özel ders, çankaya matematik özel ders, keçiören matematik özel ders, batıkent matematik birebir ders, etimesgut matematik kursu, mamak özel matematik öğretmeni, kpss matematik özel ders, ales matematik birebir ders, yks matematik dersleri, tyt matematik kursu, lgs matematik özel ders, dgs matematik birebir ders, üniversite hazırlık matematik kursu, ilkokul matematik özel ders, ortaokul matematik birebir ders, lise matematik kursu, matematik temel geliştirme kursları, öğrencilere özel matematik dersleri, bireysel matematik eğitimi, online matematik özel ders, evde matematik dersleri, matematik ders paketi, özel matematik eğitmeni, deneyimli matematik öğretmeni, uygun fiyatlı matematik dersleri, matematik dersine hemen başla, matematikte başarı için özel ders, birebir matematik ders randevusu, özel matematik öğretmeni ara, matematik ders programı oluştur, sınav kazandıran matematik dersleri",
  openGraph: {
    title: "Lokasyon Matematik | Ankara'da Birebir Özel Matematik Dersleri",
    description: "Lokasyon Matematik, Ankara'da birebir özel derslerle matematikte başarıya ulaşmanızı sağlar. Öğrenciye özel ders planı ve tam destek sunuyoruz.",
    image: "/header/sametmathsicon.svg",
    url: "https://www.lokasyonmatematik.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokasyon Matematik | Ankara Özel Matematik Dersleri",
    description: "Ankara'da uzman eğitmenlerden birebir özel matematik dersleri. Öğrencilerin başarılarını artırmak için Lokasyon Matematik ile doğru adreste olun.",
    image: "/header/sametmathsicon.svg",
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Lokasyon Matematik",
    description: "Ankara'da birebir özel matematik dersleri.",
    url: "https://www.lokasyonmatematik.com",
    logo: "/header/sametmathsicon.svg",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-312-555-1234",
      contactType: "Customer Service",
      areaServed: "TR",
      availableLanguage: "Turkish",
    },
  },
};

// Yardımcı fonksiyon metadata birleştirme
const mergeMetadata = (customMetadata = {}) => ({
  ...defaultMetadata,
  ...customMetadata,
  openGraph: { ...defaultMetadata.openGraph, ...customMetadata.openGraph },
  twitter: { ...defaultMetadata.twitter, ...customMetadata.twitter },
});

// Layout props tipi tanımla
interface LayoutProps {
  children: ReactNode; // children tipi ReactNode olmalı
  pageMetadata?: Record<string, any>; // Dinamik metadata yapısı
}

export default function RootLayout({ children, pageMetadata = {} }: LayoutProps) {
  const metadata = mergeMetadata(pageMetadata);

  return (
    <html lang="tr" className={styles.root}>
      <Head>
        {/* Dinamik Başlık ve Açıklama */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Anahtar Kelimeler */}
        <meta name="keywords" content={metadata.keywords} />

        {/* SEO Meta Etiketleri */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={metadata.openGraph.url} />

        {/* Open Graph Meta Etiketleri */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.image} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />

        {/* Twitter Meta Etiketleri */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />

        {/* Favicon */}
        <link rel="icon" href="/Titleicon.ico" />

        {/* Yapılandırılmış Veri (JSON-LD) */}
        <script type="application/ld+json">{JSON.stringify(metadata.schema)}</script>
      </Head>
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
