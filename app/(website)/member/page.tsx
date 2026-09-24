import React from 'react';
import styles from './Member.module.css';

export default function MemberPage() {
    const steps = [
        { 
            title: "Välj Specialklubb", 
            desc: "Medlemskap sker genom betalning till någon av specialklubbarna: SGSK, SISK, SPK eller SSK." 
        },
        { 
            title: "Inplacering via FA", 
            desc: "Fågelhundarnas Arbetsutskott (FA) placerar in dig i vår lokalklubb, främst baserat på din bostadsort." 
        },
        { 
            title: "Gemenskap", 
            desc: "När avgiften är betald och inplaceringen klar är du varmt välkommen att delta i alla våra aktiviteter!" 
        },
        { 
            title: "Frågor?", 
            desc: "Har du funderingar kring medlemskapet är du alltid välkommen att kontakta någon i styrelsen." 
        }
    ];

    return (
        <div className={styles.wrapper}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.label}>Medlemskap</span>
                    <h1 className={styles.title}>Bli en del av <span>gemenskapen</span></h1>
                    <p className={styles.subtitle}>
                        Medlemskap i Södra Fågelhundklubben hanteras centralt via Fågelhundarnas Arbetsutskott (FA) och deras specialklubbar.
                    </p>
                </div>
            </section>

            {/* Hur blir jag medlem? */}
            <section className={styles.listSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.listTitle}>Hur blir jag medlem?</h2>
                        <div className={styles.line}></div>
                    </div>

                    <div className={styles.benefitList}>
                        {steps.map((step, index) => (
                            <div key={index} className={styles.listItem}>
                                <span className={styles.listNumber}>0{index + 1}</span>
                                <div className={styles.listText}>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                 {/*    <div className={styles.infoBox}>
                        <p>
                            Medlem är alla de som betalat medlemsavgiften i någon av specialklubbarna och av FA blivit inplacerade i klubben. 
                            Besök gärna våra aktiviteter för att lära känna oss bättre!
                        </p>
                    </div> */}
                </div>
            </section>

            {/* CTA Sektion */}
            <section className={styles.ctaSection}>
                <div className={styles.containerSmall}>
                    <div className={styles.ctaCard}>
                        <h2 className={styles.ctaTitle}>Redo att registrera dig?</h2>
                        <p className={styles.ctaText}>
                            Läs allt om medlemskap och avgifter på FA:s officiella sida för specialklubbar.
                        </p>
                        <a 
                            href="https://fa-avance.se/om-fa/medlemsservice/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.primaryBtn}
                        >
                            Till FA Medlemsservice →
                        </a>
                        <p className={styles.termsSmall}>
                            Du skickas vidare till fa-avance.se för extern hantering av medlemskap.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}