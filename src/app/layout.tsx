import { ReactNode } from "react";
import { Inter } from "next/font/google";
import styles from "./globals.module.scss";

// Font import
const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <body className={`${styles.root} ${inter.className}`}>
      <main>{children}</main>
    </body>
  );
};

export default RootLayout;

// Metadata ve dinamik render yapılandırması
export const metadata = {
  title: "Math Game",
  description: "A simple math game",
};

export const dynamic = "force-dynamic";
