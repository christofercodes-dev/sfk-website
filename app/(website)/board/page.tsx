'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import styles from './Board.module.css';

export default function Board() {
  const members = [
    { role: "Ordförande", name: "Björn Danås", location: "Södra Sandby", phone: "070 785 89 27", email: "amoanda@hotmail.com" },
    { role: "Ledamot", name: "Bjerke Andersson", location: "Sövde", phone: "041 61 61 40", email: "bjerke.andersson@telia.com" },
    { role: "Sekreterare", name: "Jan Andersson", location: "Trelleborg", phone: "072 396 21 03", email: "jan1968@live.se" },
    { role: "Ledamot", name: "Alexander Bennergård", location: "Lund", email: "alex.ferdi@hotmail.com" },
    { role: "Ledamot", name: "Andras Talpai", location: "Vollsjö", phone: "073 420 62 49", email: "andras.talpai@sydskane.nu" },
    { role: "Ledamot", name: "Ann-Helen Jönsson", location: "Eslöv", phone: "070 344 11 87", email: "annhjons@gmail.com" },
    { role: "Kassör utom styrelsen", name: "Eva Andersson", location: "Sövde", phone: "070 316 14 00", email: "bjerke.andersson@telia.com" },
    { role: "Webbredaktör, Suppleant", name: "Karl Sahlin", location: "Fränninge", phone: "073 849 37 01", email: "karl.sahlin@yahoo.com" },
    { role: "Suppleant", name: "Simon Jägerman", location: "Rydsgård", phone: "072 441 91 61", email: "simon.jagerman@gmail.com" },
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
            <p>
              FA är en samarbetsorganisation som består av representanter för de fyra
              specialklubbarna för Brittiska Stående Fågelhundar: Svenska Pointerklubben
              (SVPK), Svenska Setterklubben för Engelsk Setter (SSK), Svenska
              Gordonsetterklubben (SGSK) samt Svenska-Irländsk Setterklubben (SISK),
              associerade med Svenska Kennelklubben.
            </p>
            <br/>

            <p>
              Lokalklubbarna är fördelade över landet och tillkom för att på det lokala
              planet tillgodose medlemmarnas intressen och främja samarbetet över
              rasgränserna.
            </p>

            <p>
              SFK arrangerar ett internationellt prov på våren och, beroende på hur övriga
              klubbars prov är placerade geografiskt och tidsmässigt, ett eller två
              höstprov.
            </p>

            <p>
              SFK arrangerar även en utställning varje år och har under flera år haft sin
              uppskattade träningsdag med Inofficiellt Klubbmästerskap.
            </p>
            <br/>

            <p>
              Om tillräckligt intresse finns anordnas en dressyrkurs under våren och
              sommaren som avslutas med apporteringstest.
            </p>
            <br/>

            <p>
              Den som vill apporteringstesta sin hund vid en annan tid på året kan ta
              kontakt med klubben.
            </p>
            <br/>

            <p>
              Medlemskapet i SFK ingår i medlemsavgiften för specialklubben.
              Lokalklubbsindelningen sker efter postnummer, men det finns möjlighet att
              välja en annan lokalklubb.
            </p>

            <p>
              Som medlem får du två nummer av tidningen <em>Avance</em> samt en årsbok
              varje år.
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