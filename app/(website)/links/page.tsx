import React from 'react';
import Navbar from '@/components/Navbar';
import styles from './Links.module.css';

export default function LinksPage() {
    const localClubs = [
        { name: "ÖNFK", full: "Övre Norra Fågelhundsklubben", url: "https://www.onfk.org" },
        { name: "VBFK", full: "Västerbottens Fågelhundsklubb", url: "https://www.vbfk.se" },
        { name: "SNFK", full: "Södra Norrbottens Fågelhundsklubb", url: "https://www.snfk.se" },
        { name: "NNFK", full: "Nedre Norra Fågelhundsklubben", url: "https://www.nnfk.com" },
        { name: "MFK", full: "Mellansvenska Fågelhundklubben", url: "https://www.mellansvenska.net" },
        { name: "ÖSFK", full: "Östsvenska Fågelhundklubben", url: "https://ostrafagelhundsklubben.se/" },
        { name: "VFK", full: "Västsvenska Fågelhundklubben", url: "https://www.vastsvenska.net  " },
    ];
    
    const specialClubs = [
        { name: "FA", full: "Fågelhundklubbarnas Arbetsutskott", url: "https://fa-avance.se" },
        { name: "SSK", full: "Svenska Setterklubben för Engelsk setter", url: "https://ssk.fa-avance.se/" },
        { name: "SPK", full: "Svenska Pointerklubben", url: "https://www.pointerklubben.se" },
        { name: "SISK", full: "Svenska Irländsk Setterklubben", url: "https://www.sisk.se" },
        { name: "SGSK", full: "Svenska Gordonsetterklubben", url: "https://www.sgsk.se" },
    ];

    return (
        <main className={styles.wrapper}>
            <Navbar forceSolid={true} />
            
            <header className={styles.hero}>
                <div className={styles.container}>
                    <span className={styles.label}>Resurser</span>
                    <h1 className={styles.title}>Externa <span>Länkar</span></h1>
                    <p className={styles.subtitle}>
                        Här har vi samlat genvägar till våra lokalklubbar, specialklubbar och viktiga databaser för fågelhundsägare.
                    </p>
                </div>
            </header>

            <section id='links' className={styles.linksSection}>
                <div className={styles.container}>
                    
                    {/* Lokalklubbar */}
                    <div className={styles.category}>
                        <h2 className={styles.categoryTitle}>Lokalklubbar</h2>
                        <div className={styles.grid}>
                            {localClubs.map((club, i) => (
                                <a key={i} href={club.url} className={styles.linkCard} target="_blank" rel="noopener noreferrer">
                                    <span className={styles.shortName}>{club.name}</span>
                                    <span className={styles.fullName}>{club.full}</span>
                                    <span className={styles.arrow}>→</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Specialklubbar */}
                    <div className={styles.category}>
                        <h2 className={styles.categoryTitle}>Specialklubbar</h2>
                        <div className={styles.grid}>
                            {specialClubs.map((club, i) => (
                                <a key={i} href={club.url} className={styles.linkCard} target="_blank" rel="noopener noreferrer">
                                    <span className={styles.shortName}>{club.name}</span>
                                    <span className={styles.fullName}>{club.full}</span>
                                    <span className={styles.arrow}>→</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Övrigt */}
                    <div className={styles.category}>
                        <h2 className={styles.categoryTitle}>Övrigt</h2>
                        <div className={styles.otherGrid}>
                            <a href="https://hundar.skk.se/hunddata/" className={styles.simpleLink} target="_blank">SKK Hunddata</a>
                            <a href="http://www.rasdata.nu/" className={styles.simpleLink} target="_blank">Rasdata.nu</a>
                            <a href="http://www.skkstart.se/" className={styles.simpleLink} target="_blank">SKK Start</a>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}