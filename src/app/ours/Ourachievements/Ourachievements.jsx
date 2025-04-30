import React from "react";
import styles from "./Ourachievements.module.scss";

export default function OurAchievements() {
    return (
        <section className={styles.achievementsSection}>
            <h1 className={styles.sectionTitle}>Başarılarımız</h1>
            <div className={styles.yearBlock}>
                <h2 className={styles.yearTitle}>2019</h2>
                <p className={styles.description}>
                    Şirketimiz 2019 yılında kuruldu ve matematik eğitimine yeni bir yaklaşım getirdik.
                </p>
                <ul className={styles.studentList}>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Arda Kılıç:</strong> İlk LGS denemesinde tam puan aldı.
                    </li>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Elif Yılmaz:</strong> Matematik sınavlarında okul birincisi oldu.
                    </li>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Deniz Can:</strong> Özel matematik yarışmasında dereceye girdi.
                    </li>
                </ul>
            </div>
            <div className={styles.yearBlock}>
                <h2 className={styles.yearTitle}>2020</h2>
                <p className={styles.description}>
                    İlk online eğitim programımızı başlattık ve öğrencilerimizin başarılarıyla gurur duyduk:
                </p>
                <ul className={styles.studentList}>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Ahmet Yılmaz:</strong> LGS&apos;de Türkiye genelinde ilk 1.000&apos;e girdi.
                    </li>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Selin Kara:</strong> Matematik yarışmasında il birincisi oldu.
                    </li>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Zeynep Arslan:</strong> Uluslararası matematik sınavında 2. oldu.
                    </li>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Murat Demir:</strong> ALES&apos;te yüksek başarı puanı aldı.
                    </li>
                </ul>
            </div>
            <div className={styles.yearBlock}>
                <h2 className={styles.yearTitle}>2021</h2>
                <p className={styles.description}>
                    Daha fazla öğrenciye ulaşarak başarı hikayelerimizi büyüttük:
                </p>
                <ul className={styles.studentList}>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Mehmet Aksoy:</strong> Üniversite giriş sınavında Matematik testinde tam puan aldı.
                    </li>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Ece Demir:</strong> Uluslararası matematik olimpiyatlarında bronz madalya kazandı.
                    </li>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Kaan Yalçın:</strong> KPSS&apos;de Türkiye genelinde ilk 1000&apos;a girdi.
                    </li>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Leyla Şimşek:</strong> Üniversite sınavında ilk 2000&apos;de yer aldı.
                    </li>
                </ul>
            </div>
            <div className={styles.yearBlock}>
                <h2 className={styles.yearTitle}>2022</h2>
                <p className={styles.description}>
                    Öğrencilerimize bireysel mentorluk desteği sunmaya başladık ve dikkat çeken başarılar elde ettik:
                </p>
                <ul className={styles.studentList}>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Burak Can:</strong> Liseye Geçiş Sınavı&apos;nda il genelinde derece yaptı.
                    </li>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Zeynep Çelik:</strong> Matematik alanında hazırladığı proje ile TÜBİTAK ödülü aldı.
                    </li>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Elif Demirtaş:</strong> Uluslararası matematik olimpiyatlarında 10. oldu.
                    </li>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Baran Doğan:</strong> KPSS&apos;de tüm soruları doğru yanıtladı.
                    </li>
                </ul>
            </div>
            <div className={styles.yearBlock}>
                <h2 className={styles.yearTitle}>2023</h2>
                <p className={styles.description}>
                    Yeni projelerimiz ve genişleyen ekibimizle daha fazla öğrenciye destek olduk:
                </p>
                <ul className={styles.studentList}>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Ayşe Kaya:</strong> Ulusal matematik yarışmasında altın madalya kazandı.
                    </li>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Emre Şahin:</strong> YKS&apos;de Matematik alanında Türkiye 3500.&apos;sü oldu.
                    </li>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Mina Yıldız:</strong> ALES&apos;te başarı puanıyla dikkat çekti.
                    </li>
                    <li className={styles.studentItem}>
                        <strong className={styles.studentName}>Sefa Tan:</strong> KPSS&apos;de matematik alanında en yüksek notu aldı.
                    </li>
                </ul>
            </div>
        </section>
    );
}
