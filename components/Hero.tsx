// src/components/Hero.tsx
import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.heroContainer}>
            {/* Detta lager sköter bilden för att undvika zoom-effekten på mobil */}
            <div className={styles.heroBg}></div>
            
            {/* Valfri overlay om du vill ha extra mörker direkt i HTML */}
            <div className={styles.heroOverlay}></div>

            <div className={styles.heroContent}>
                <div className={styles.crestContainer}>
                    <div className={styles.crestLine}></div>
                    <span className={styles.crestText}>SFK</span>
                    <div className={styles.crestLine}></div>
                </div>
                
                <h1 className={styles.heroTitle}>
                    Södra<br />
                    <span className={styles.accentText}>Fågelhundklubben</span>
                </h1>
                
                <p className={styles.heroDescription}>
                Lokalklubben för Dig som bor i Skåne – Blekinge och är intresserad av de Brittiska Stående Fågelhundarna, Engelsk Setter, Irländsk Röd Setter, Irländsk Röd och Vit Setter, Gordonsetter och Pointer.
                </p>

                <div className={styles.buttonGroup}>
                    <Link href="/activities" className={styles.heroButtonPrimary}>
                        Aktiviteter
                    </Link>
                    <Link href="/all-results" className={styles.heroButtonSecondary}>
                        Resultat
                    </Link>
                </div>
            </div>
        </section>
    );
}