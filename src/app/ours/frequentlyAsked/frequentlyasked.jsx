import React from "react";
import styles from "./frequentlyasked.module.scss";

export default function FrequentlyAsked() {
    return (
        <div className={styles.frequentlyAsked}>
            <h2 className={styles.frequentlyAskedTitle}>
                Sıkça Sorulan Sorular
            </h2>
            <div className={styles.frequentlyAskedContainer}>
                <div className={styles.frequentlyAskedBox}>
                    <h3 className={styles.frequentlyAskedBoxTitle}>
                        Dersleriniz nasıl işliyor?
                    </h3>
                    <p className={styles.frequentlyAskedBoxDescription}>
                        Derslerimiz online ve yüzyüze olarak gerçekleşmektedir. Derslerimizde öğrencilerimizin ihtiyaçlarına göre özel ders programları hazırlanmaktadır. Derslerimizde öğrencilerimizin eksiklerini tamamlamaları ve potansiyellerini en üst seviyeye çıkarmaları hedeflenmektedir.
                    </p>
                </div>
                <div className={styles.frequentlyAskedBox}>
                    <h3 className={styles.frequentlyAskedBoxTitle}>
                        Derslerinizin ücretleri nedir?
                    </h3>
                    <p className={styles.frequentlyAskedBoxDescription}>
                        Derslerimizin ücretleri öğrencilerimizin ihtiyaçlarına ve ders programlarına göre değişmektedir. Derslerimizin ücretleri hakkında detaylı bilgi almak için bizimle iletişime geçebilirsiniz.
                    </p>
                </div>
                <div className={styles.frequentlyAskedBox}>
                    <h3 className={styles.frequentlyAskedBoxTitle}>
                        Derslerinizin süresi ne kadardır?
                    </h3>
                    <p className={styles.frequentlyAskedBoxDescription}>
                        Derslerimizin süresi öğrencilerimizin ihtiyaçlarına ve ders programlarına göre değişmektedir. Derslerimizin süresi hakkında detaylı bilgi almak için bizimle iletişime geçebilirsiniz.
                    </p>
                </div>
                <div className={styles.frequentlyAskedBox}>
                    <h3 className={styles.frequentlyAskedBoxTitle}>
                        Online derslere katılmak için neye ihtiyacım var?
                    </h3>
                    <p className={styles.frequentlyAskedBoxDescription}>
                        Online derslere katılabilmek için bir bilgisayar, tablet veya akıllı telefon, internet bağlantısı ve sesli iletişim için bir mikrofon gereklidir. Görüntülü konuşmalar için bir kamera kullanabilirsiniz.
                    </p>
                </div>
                <div className={styles.frequentlyAskedBox}>
                    <h3 className={styles.frequentlyAskedBoxTitle}>
                        Ders programımı nasıl oluşturabilirim?
                    </h3>
                    <p className={styles.frequentlyAskedBoxDescription}>
                        Ders programı oluşturmak için bizimle iletişime geçebilir, ihtiyaçlarınıza göre uygun bir program hazırlayabiliriz. Programlarımız esnektir ve öğrencinin durumuna göre şekillendirilebilir.
                    </p>
                </div>
                <div className={styles.frequentlyAskedBox}>
                    <h3 className={styles.frequentlyAskedBoxTitle}>
                        Sınıf içi etkileşim nasıl sağlanıyor?
                    </h3>
                    <p className={styles.frequentlyAskedBoxDescription}>
                        Online derslerimizde etkileşimli sunumlar, canlı soru-cevap oturumları ve öğrencilerin katılımını teşvik eden aktiviteler kullanılır. Ayrıca öğrencilerle birebir geri bildirim seansları da düzenlenmektedir.
                    </p>
                </div>
                <div className={styles.frequentlyAskedBox}>
                    <h3 className={styles.frequentlyAskedBoxTitle}>
                        Derslerinizi iptal etmek veya ertelemek mümkün mü?
                    </h3>
                    <p className={styles.frequentlyAskedBoxDescription}>
                        Derslerimizi iptal etmek veya ertelemek için en az 24 saat önceden haber vermeniz gerekmektedir. Aksi takdirde, dersin ücreti alınacaktır. İptal veya erteleme durumunda bizimle iletişime geçmeniz yeterlidir.
                    </p>
                </div>
            </div>
        </div>
    );
}
