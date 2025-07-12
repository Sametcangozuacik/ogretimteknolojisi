import React from "react";
import styles from "./header.module.scss";
import Image from "next/image";
import Link from "next/link"; // Link bileşenini içe aktar

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          src="/sametmathsicon.svg"  // public klasöründe yer almalı
          alt="Logo"
          layout="intrinsic"  // Bu, boyutlandırmayı daha esnek hale getirir
          width={550}
          height={100}
          className={styles.logo}
        />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/addition" className={styles.navLink}>
              <Image
                src="/addition.png"
                alt="Toplama"
                width={100}
                height={100}
                className={styles.navIcon}
              />
              <span>Toplama</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/subtraction" className={styles.navLink}>
              <Image
                src="/Subtraction.png"
                alt="Çıkarma"
                width={100}
                height={100}
                className={styles.navIcon}
              />
              <span>Çıkarma</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/multiplication" className={styles.navLink}>
              <Image
                src="/multiplication.png"
                alt="Çarpma"
                width={100}
                height={100}
                className={styles.navIcon}
              />
              <span>Çarpma</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/division" className={styles.navLink}>
              <Image
                src="/division.png"
                alt="Bölme"
                width={75}
                height={75}
                className={styles.navIcon}
              />
              <span>Bölme</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/alltransactions" className={styles.navLink}>
              <Image
                src="/alltransactions.png"
                alt="Tüm İşlemler"
                width={75}
                height={75}
                className={styles.navIcon}
              />
              <span>Tüm İşlemler</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/exponents" className={styles.navLink}>
              <Image
                src="/exponents.png"
                alt="Üslü Sayılar"
                width={75}
                height={75}
                className={styles.navIcon}
              />
              <span>Üslü Sayılar</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/equation" className={styles.navLink}>
              <Image
                src="/equation.png"
                alt="Denklemler"
                width={75}
                height={75}
                className={styles.navIcon}
              />
              <span>Denklemler</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/rationalnumbers" className={styles.navLink}>
              <Image
                src="/rationalnumbers.png"
                alt="Rasyonel Sayılar"
                width={75}
                height={75}
                className={styles.navIcon}
              />
              <span>Rasyonel Sayılar</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/divisibility" className={styles.navLink}>
              <Image
                src="/division.png"
                alt="Rasyonel Sayılar"
                width={75}
                height={75}
                className={styles.navIcon}
              />
              <span>Bölünebilme</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
