import React from 'react';
import styles from './Specialties.module.css';

export default function Specialties() {
  const specialties = [
    {
      num: "01",
      title: "Eftersök",
      desc: "Precision och etik i viltspår för det mest krävande arbetet efter skottet."
    },
    {
      num: "02",
      title: "Apportering",
      desc: "Fulländad stadga och följsamhet för den passionerade fågelhundsföraren."
    },
    {
      num: "03",
      title: "Drevträning",
      desc: "Strategiskt samspel i terrängen som optimerar hundens instinkt och drev."
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <span className={styles.label}>Expertis</span>
          <h2 className={styles.mainTitle}>Från Skog till <span>Sjö</span></h2>
          <p className={styles.description}>
            Exklusiv träning för den medvetne jägaren där hundens prestation möter mångårig tradition.
          </p>
        </header>

        <div className={styles.grid}>
          {specialties.map((spec, index) => (
            <article key={index} className={styles.item}>
              <div className={styles.cardHeader}>
                <span className={styles.number}>{spec.num}</span>
                <div className={styles.accentLine}></div>
              </div>
              <h3 className={styles.cardTitle}>{spec.title}</h3>
              <p className={styles.cardDesc}>{spec.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}