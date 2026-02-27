import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react'; // Importera ikoner
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <div className={styles.mainGrid}>
          {/* Kolumn 1: Arvet */}
          <div className={styles.brandSection}>
            <div className={styles.logoArea}>
              <span className={styles.logoText}>SFK</span>
              <span className={styles.est}>Est. 1968</span>
            </div>
            <p className={styles.description}>
              Södra Fågelhundklubben verkar för främjandet av brittiska stående fågelhundar i Skåne & Blekinge.
            </p>
            <div className={styles.socials}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <Instagram size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Kolumn 2: Navigation (Journal style) */}
          <div className={styles.navSection}>
            <h4 className={styles.columnTitle}>Register</h4>
            <ul className={styles.navList}>
              <li><Link href="/activities">Program & Aktiviteter</Link></li>
              <li><Link href="/all-results">Resultatarkiv</Link></li>
              <li><Link href="/breeders">Anslutna Uppfödare</Link></li>
              <li><Link href="/member">Medlemskap</Link></li>
              <li><Link href="/board">Klubbstyrelsen</Link></li>
            </ul>
          </div>

          {/* Kolumn 3: Kontaktkort (The Heritage Cards) */}
          <div className={styles.contactSection}>
            <h4 className={styles.columnTitle}>Kontakt</h4>
            
            <div className={styles.heritageCard}>
              <span className={styles.cardTag}>Klubbfrågor</span>
              <h5 className={styles.cardName}>Sekreterare</h5>
              <a href="mailto:info@sfk.se" className={styles.cardEmail}>info@sfk.se</a>
            </div>

            <div className={styles.heritageCard}>
              <span className={styles.cardTag}>Digitalt</span>
              <h5 className={styles.cardName}>Karl Sahlin</h5>
              <a href="mailto:karl.sahlin@yahoo.com" className={styles.cardEmail}>karl.sahlin@yahoo.com</a>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.bottomLine}></div>
          <div className={styles.bottomContent}>
            <p>© {currentYear} Södra Fågelhundklubben</p>
            <p className={styles.traditionText}>Passion för fågelhundar i generationer</p>
          </div>
        </div>
      </div>
    </footer>
  );
}