import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Gallery.module.css';

export default function Gallery() {
  const images = [
    { src: '/images/bg-image-setter.webp', alt: 'Fältarbete' },
    { src: '/images/sfk-img1.jpg', alt: 'Träning' },
    { src: '/images/sfk-img2.jpg', alt: 'Gemenskap' },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header - Matchar LatestResults */}
        <header className={styles.topRow}>
          <div>
            <span className={styles.label}>Bilder</span>
            <h2 className={styles.title}>Södra <span>Fågelhundklubben</span></h2>
          </div>
          <Link href="/gallery" className={styles.archiveBtn}>
            Se hela galleriet
          </Link>
        </header>

        {/* Mosaik-layout */}
        <div className={styles.mosaic}>
          <div className={`${styles.imageWrapper} ${styles.large}`}>
            <Image 
              src={images[0].src} 
              alt={images[0].alt} 
              fill 
              className={styles.image} 
            />
          </div>
          <div className={`${styles.imageWrapper} ${styles.smallTop}`}>
            <Image 
              src={images[1].src} 
              alt={images[1].alt} 
              fill 
              className={styles.image} 
            />
          </div>
          <div className={`${styles.imageWrapper} ${styles.smallBottom}`}>
            <Image 
              src={images[2].src} 
              alt={images[2].alt} 
              fill 
              className={styles.image} 
            />
          </div>
        </div>

        {/* Centrerad knapp för mobil */}
        <div className={styles.mobileLinkWrapper}>
          <Link href="/gallery" className={styles.archiveBtn}>
            Se hela galleriet
          </Link>
        </div>
      </div>
    </section>
  );
}