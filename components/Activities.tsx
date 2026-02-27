import React from 'react';
import styles from './Activities.module.css';

export default function Activities() {
  const events = [
    { 
      date: "Mars - Maj", 
      title: "Vår: Grundlydnad & Stadga", 
      text: "Vi lägger den absoluta grunden för jakthunden. Under våren fokuserar vi på positiv kontakt och inkallning trots störningar.",
      details: ["Fokus: Stadga i uppflog", "Plats: Kristianstad Träningsfält", "Nivå: Alla unghundar"]
    },
    { 
      date: "Juni - Augusti", 
      title: "Sommar: Vatten & Eftersök", 
      text: "Intensivträning inför proven. Vi nyttjar sjöarna för avancerad vattenapportering och dirigering i varierande terräng.",
      details: ["Fokus: Dirigering & Spår", "Plats: Sjöområden & Skog", "Nivå: Medel / Avancerad"]
    },
    { 
      date: "September - November", 
      title: "Höst: Praktiskt Jaktarbete", 
      text: "Nu omsätter vi träning till praktik. Gemensamma jaktdagar där vi tränar på realistiska scenarier med erfarna instruktörer.",
      details: ["Fokus: Praktisk Jakt", "Plats: Klubbens jaktmarker", "Nivå: Jaktklar hund"]
    },
    { 
      date: "December - Februari", 
      title: "Vinter: Viltvård & Teori", 
      text: "När snön lägger sig fokuserar vi på förvaltning, teorikvällar om viltet och planering inför nästa träningsår.",
      details: ["Fokus: Viltetik & Teori", "Plats: Klubbstugan", "Nivå: Alla medlemmar"]
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.label}>Säsonger</span>
          <h2 className={styles.mainTitle}>Jaktåret i <span>SFK</span></h2>
          <p className={styles.introText}>En cyklisk genomgång av våra utbildningar och traditioner genom årstiderna.</p>
        </header>

        <div className={styles.timeline}>
          {events.map((e, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.indicator}>
                <div className={styles.dot}></div>
                <div className={styles.line}></div>
              </div>
              
              <div className={styles.content}>
                <span className={styles.date}>{e.date}</span>
                <h3 className={styles.title}>{e.title}</h3>
                <p className={styles.text}>{e.text}</p>
                <div className={styles.infoGrid}>
                  {e.details.map((detail, idx) => (
                    <span key={idx} className={styles.detail}>{detail}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}