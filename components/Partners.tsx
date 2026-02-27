import React from 'react';
import Image from 'next/image';
import styles from './Partners.module.css';

export default function Partners() {
  const logos = [
    { name: 'Härkila', src: '/images/royal-canin-logo.svg.png' },
    { name: 'Chevalier', src: '/images/royal-canin-logo.svg.png' },
    { name: 'Svenska Jägareförbundet', src: '/images/royal-canin-logo.svg.png' },
    { name: 'Royal Canin', src: '/images/royal-canin-logo.svg.png' },
/*     { name: 'Interjakt', src: '/images/royal-canin-logo.svg.png' },
 */  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.line}></div>
          <span className={styles.label}>Samarbetspartners</span>
          <div className={styles.line}></div>
        </div>
        
        <div className={styles.grid}>
          {logos.map((logo, index) => (
            <div key={index} className={styles.logoWrapper} title={logo.name}>
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                className={styles.logo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}