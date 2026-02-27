import React from 'react';
import styles from './Member.module.css';

export default function MemberPage() {
    const benefits = [
        { title: "Träningsmarker", desc: "Exklusiv nyttjanderätt till marker för apportering och fältarbete." },
        { title: "Utbildning & Kurser", desc: "Förtur och medlemsrabatt på våra dressyrkurser och föreläsningar." },
        { title: "Gemenskap", desc: "Inbjudan till officiella jaktprov, KM och våra uppskattade Game Days." },
        { title: "Rådgivning", desc: "Tillgång till mentorer för avelsfrågor och unghundsträning." }
    ];

    return (
        <div className={styles.wrapper}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.label}>Medlemskap</span>
                    <h1 className={styles.title}>Bli en del av <span>gemenskapen</span></h1>
                    <p className={styles.subtitle}>
                        Medlemskap i Södra Fågelhundklubben hanteras centralt via Fågelhundarnas Arbetsutskott (FA).
                    </p>
                </div>
            </section>

            {/* Förmåner */}
            <section className={styles.listSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.listTitle}>Dina Förmåner</h2>
                        <div className={styles.line}></div>
                    </div>

                    <div className={styles.benefitList}>
                        {benefits.map((benefit, index) => (
                            <div key={index} className={styles.listItem}>
                                <span className={styles.listNumber}>0{index + 1}</span>
                                <div className={styles.listText}>
                                    <h3>{benefit.title}</h3>
                                    <p>{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Sektion (Ersätter formuläret) */}
            <section className={styles.ctaSection}>
                <div className={styles.containerSmall}>
                    <div className={styles.ctaCard}>
                        <h2 className={styles.ctaTitle}>Redo att bli medlem?</h2>
                        <p className={styles.ctaText}>
                            Klicka på knappen nedan för att komma till FA:s medlemsservice. 
                            Där kan du enkelt registrera ditt medlemskap och välja 
                            <strong> Södra Fågelhundklubben</strong> som din lokalklubb.
                        </p>
                        <a 
                            href="https://fa-avance.se/om-fa/medlemsservice/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.primaryBtn}
                        >
                            Gå till Medlemsservice →
                        </a>
                        <p className={styles.termsSmall}>
                            Du skickas nu vidare till fa-avance.se för extern hantering av medlemsavgifter.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}