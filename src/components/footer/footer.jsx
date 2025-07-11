'use client';
import React from "react";
import styles from "./footer.module.scss";
import { IoArrowUpCircleOutline } from "react-icons/io5";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.textSection}>
          <p className={styles.footerText}>
            Bu uygulama eğitim amaçlı hazırlanmıştır.
          </p>
          <button
            onClick={scrollToTop}
            className={styles.scrollButton}
            aria-label="Yukarı çık"
          >
            <IoArrowUpCircleOutline size={56} />
          </button>
        </div>
      </div>
      <div className={styles.footerContentTwo}>
        <p className={styles.footerText}>
          © {currentYear} Lokasyon Matematik. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
