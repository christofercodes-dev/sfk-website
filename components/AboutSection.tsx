import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Vänster sida: Textlayout */}
          <div className={styles.textColumn}>
            <span className={styles.label}>Information</span>
            <h2 className={styles.title}>SFK bildades <span>1968</span></h2>

            <div className={styles.content}>
              <p className={styles.lead}>
                Södra Fågelhundklubben är en av 9 lokalklubbar under Fågelhundklubbarnas Arbetsutskott, FA.
              </p>
              <p>
                FA är en samarbetsorganisation som består av representanter för de fyra specialklubbarna för Brittiska Stående Fågelhundar, Svenska Pointerklubben, SVPK, Svenska Setterklubben för Engelsk Setter, SSK, Svenska Gordonsetterklubben, SGSK, samt Svenska-Irländsk Setterklubben, SISK, associerade med Svenska Kennelklubben.
              </p>
            </div>



            {/* Knapp - Samma stil som i de andra sektionerna */}
            {/*   <div className={styles.ctaWrapper}>
              <Link href="/om-oss" className={styles.archiveBtn}>
                Läs mer om oss <span>→</span>
              </Link>
            </div> */}
          </div>

          {/* Höger sida: Bild med ram-effekt */}
          <div className={styles.imageColumn}>
            <div className={styles.imageFrame}>
              <Image
                src="/images/hugo.jpg"
                alt="Träning på Södra Fågelhundklubben"
                fill
                className={styles.mainImage}
              />
              <div className={styles.decorativeBox}></div>
            </div>
            <span className={styles.caption}>Gemenskap på fältet, Skåne 2026.</span>
          </div>
        </div>
      </div>
    </section>
  );
}