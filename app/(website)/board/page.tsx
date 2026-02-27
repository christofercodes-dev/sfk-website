'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import styles from './Board.module.css';

export default function Board() {
  const members = [
    { role: "Ordförande", name: "Björn Danås", location: "Södra Sandby", phone: "070 785 89 27", email: "amoanda(@)hotmail.com" },
    { role: "Ledamot, Vice Ordförande", name: "Bjerke Andersson", location: "Blentarp", phone: "0416-161 40", email: "bjerke.andersson(@)telia.com" },
    { role: "Ledamot, Suppleant 2:a", name: "Jan Andersson", location: "Trelleborg", phone: "0723-962103", email: "jan1968(@)live.se" },
    { role: "Ledamot", name: "Alexander Bennergård", location: "Lund", email: "alex.ferdi(@)hotmail.com" },
    { role: "Ledamot", name: "Andras Talpai", location: "Vollsjö", phone: "0734-206249", email: "andras.talpai(@)sydskane.nu" },
    { role: "Suppleant 1:a", name: "Ann-Helen Jönsson", location: "Eslöv", phone: "0703 441187", email: "annhjons(@)gmail.com" },
    { role: "Kassör utom styrelsen", name: "Eva Andersson", phone: "070 316 14 00", email: "bjerke.andersson(@)telia.com" },
    { role: "Webbredaktör", name: "Karl Sahlin", phone: "1234566", email: "webb@webb.se" },
  ];

  return (
    <main className={styles.wrapper}>
      <Navbar forceSolid={true} />
      
      <section className={styles.section}>
        <div className={styles.container}>
          
          {/* SEKTION: HISTORIA */}
          <header className={styles.header}>
            <span className={styles.label}>Vår historia</span>
            <h2 className={styles.mainTitle}>Södra <span>Fågelhundklubben</span></h2>
          </header>

          <div className={styles.aboutFlow}>
            <p className={styles.leadText}>
            Södra Fågelhundklubben, SFK, bildades 1968 som en av fem lokalklubbar, och är idag en av nio lokalklubbar under Fågelhundklubbarnas Arbetsutskott, FA.

FA är en samarbetsorganisation som består av representanter för de fyra specialklubbarna för Brittiska Stående Fågelhundar, Svenska Pointerklubben, SVPK, Svenska Setterklubben för Engelsk Setter, SSK, Svenska Gordonsetterklubben, SGSK, samt Svenska-Irländsk Setterklubben, SISK, associerade med Svenska Kennelklubben.
Lokalklubbarna är fördelade över landet och tillkom för att på det lokala planet tillgodose medlemmarnas intressen och främja samarbetet över rasgränserna.

SFK arrangerar ett Internationellt prov på våren och beroende på hur övriga klubbar har sina prov placerade, både geografiskt och tidsmässigt, har SFK  ett eller två höstprov också. SFK har också en utställning varje år. Vidare har SFK under några år haft sin omtyckta träningsdag, med Inofficiellt Klubbmästerskap.
Om tillräckligt intresse finns anordnas dressyrkurs under våren-sommaren, som avslutas med apporteringstest. Den som vill apporteringstesta sin hund annan tid på året kan ta kontakt med klubben.
Medlemskapet i SFK ingår i medlemsavgiften för specialklubben. Lokalklubbsindelningen sker efter postnummer, men möjlighet finns att välja annan lokalklubb.  Som medlem får Du 2 nummer av tidningen Avance, samt en årsbok per år.
            </p>
          </div>

          <div className={styles.notice}>
            <div className={styles.noticeLine}></div>
          </div>

          {/* SEKTION: STYRELSE */}
          <header className={`${styles.header} ${styles.boardHeader}`}>
            <span className={styles.label}>Organisation</span>
            <h2 className={styles.mainTitle}>Klubbens <span>Styrelse</span></h2>
          </header>

          <div className={styles.list}>
            {members.map((m, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.dateCategoryBox}>
                  <span className={styles.categoryLabel}>{m.role}</span>
                </div>

                <div className={styles.infoBox}>
                  <h3 className={styles.activityTitle}>{m.name}</h3>
                  <span className={styles.metaInfo}>{m.location}</span>
                </div>

                <div className={styles.actionBox}>
                  {m.phone && (
                    <a href={`tel:${m.phone.replace(/[^0-9+]/g, '')}`} className={styles.contactLink}>
                      {m.phone}
                    </a>
                  )}
                  <a href={`mailto:${m.email}`} className={styles.contactLink}>
                    {m.email}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.notice}>
            <div className={styles.noticeLine}></div>
            <p>
              Har du frågor gällande medlemskap eller allmänna ärenden? <br />
              Vänligen kontakta i första hand sekreteraren eller ordföranden.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}