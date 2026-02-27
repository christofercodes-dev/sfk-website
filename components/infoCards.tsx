import React from 'react';
import styles from './InfoCards.module.css';
import Link from 'next/link';

export default function InfoCards() {
  const activities = [
    {
      title: "Våra Kurser",
      desc: "Specialiserade utbildningar för stående fågelhundar och drivande hundar. Vi fokuserar på praktisk jaktlydnad, stadga och följsamhet i terrängen.",
      link: "/kurser"
    },
    {
      title: "Träningsmarker",
      desc: "Tillgång till unika marker för fältträning och vattenarbete. Våra områden erbjuder varierande terräng för realistiska scenarier.",
      link: "/marker"
    },
    {
      title: "Medlemskap",
      desc: "Bli en del av Södra Fågelhundklubben. Få tillgång till gemensamma jaktdagar, exklusiva träningstillfällen och vårt nätverk.",
      link: "/bli-medlem"
    }
  ];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {activities.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.number}>0{index + 1}</span>
                <div className={styles.line}></div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}