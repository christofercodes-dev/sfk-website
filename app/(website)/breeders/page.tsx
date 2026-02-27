// src/components/Breeders.tsx
import React from 'react';
import styles from './Breeders.module.css';

export default function Breeders() {
  const breeders = [
    {
      kennel: "Avem Venatio",
      breeder: "Andreas Bengtsson",
      breed: "Engelsk Setter",
      location: "Vollsjö",
      phone: "070-123 45 67",
      email: "andreas@example.com"
    },
    {
      kennel: "Björås kennel",
      breeder: "Björn Danås",
      breed: "Pointer, Gordonsetter, Irländsksetter, Workingcocker",
      location: "Södra Sandby",
      phone: "070-785 89 27",
      email: "amoanda@hotmail.com"
    },
    {
      kennel: "Black Luckys Kennel",
      breeder: "Kent & Maria Wassberg-Svensson",
      breed: "Pointer",
      location: "Ystad",
      phone: "0411-55 52 86, 070-810 55 56",
      email: "sve@sydgym.se"
    },
    {
      kennel: "Black Shetans Kennel",
      breeder: "Stig & Kerstin Nilsson",
      breed: "Pointer",
      location: "Marieholm",
      phone: "0413-700 01, 070-2478089",
      email: "shetan@telia.com"
    },
    {
      kennel: "Janås Kennel",
      breeder: "Anita & Camilla Paradis",
      breed: "Irländsksetter, Workingcocker",
      location: "Södra Sandby",
      phone: "070 -544 06 35, 070-684 57 29",
      email: "Camilla.paradis@gmail.com"
    },
    {
      kennel: "Minnesbergs Kennel",
      breeder: "Jan Andersson",
      breed: "Gordonsetter, Irländsksetter, Workingcocker",
      location: "Trelleborg",
      phone: "0723-962103",
      email: "jan1968@live.se"
    },
    {
      kennel: "Rastorps Kennel",
      breeder: "Mayvor Jonsson",
      breed: "Irländsksetter",
      location: "Blentarp",
      phone: "070-577 97 29",
      email: "info@rastorp.nu"
    },
    {
      kennel: "Rödmyrans Kennel",
      breeder: "Eva Björklund",
      breed: "Irländsksetter, Engelsksetterr",
      location: "Helsingborg",
      phone: "042- 22 20 25",
      email: "kennerlrödmyran@telia.com"
    },
    {
      kennel: "Skärtorps Kennel",
      breeder: "Ann-Helen Jönsson",
      breed: "Pointer, Labrador",
      location: "Eslöv",
      phone: "0413 -54 11 87, 070-344 11 87",
      email: "skartorp@tele2.se"
    },
    {
      kennel: "Top Point Kennel",
      breeder: "Bertil Mårtensson",
      breed: "Pointer, Workingcocker",
      location: "Svedala",
      phone: "070-318 87 50",
      email: "tappy@telia.com"
    },
    {
      kennel: "Östrabys Kennel",
      breeder: "Bengt & Maria Sandin",
      breed: "Irländsksetter, Engelsksetter",
      location: "Hörby",
      phone: "0415- 403 50",
      email: "bengt.sandin@swipnet.se"
    },
    // Här kan du enkelt fylla på med fler objekt senare
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* CENTRERAD HEADER */}
        <header className={styles.header}>
          <span className={styles.label}>Avel & uppfödning</span>
          <h2 className={styles.mainTitle}>Kennelregister <span>SFK</span></h2>
        </header>

        <div className={styles.grid}>
          {breeders.map((b, index) => (
            <article key={index} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.breedTag}>{b.breed}</span>
                <h3 className={styles.kennelName}>{b.kennel}</h3>
                <p className={styles.breederName}>{b.breeder}</p>
              </div>
              
              <div className={styles.divider}></div>
              
              <div className={styles.contactInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.icon}></span> {b.location}
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.icon}></span> {b.phone}
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.icon}></span> 
                  <a href={`mailto:${b.email}`} className={styles.mailLink}>{b.email}</a>
                </div>
              </div>
            </article>
          ))}

          {/* Informationskort */}
          <article className={`${styles.card} ${styles.infoCard}`}>
            <div className={styles.infoContent}>
              <h3 className={styles.infoTitle}>Valphänvisning</h3>
              <p className={styles.infoText}>
                Kontakta våra uppfödare direkt för information om planerade kullar och rasfrågor. 
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

