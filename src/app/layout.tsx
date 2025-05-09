import { ReactNode } from "react";
import { Inter } from "next/font/google";
import Header from "../components/header/header";
import styles from "./globals.module.scss";

// Font import
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lokasyon Matematik Game",
  description: "A simple math game",
};

export const dynamic = "force-dynamic";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="tr">
      <body className={`${styles.root} ${inter.className}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
