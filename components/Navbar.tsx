"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

interface NavbarProps {
  forceSolid?: boolean;
}

export default function Navbar({ forceSolid = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Inuti din Navbar-komponent
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.classList.add(styles.noScroll);
      document.body.classList.add(styles.noScroll);
    } else {
      document.documentElement.classList.remove(styles.noScroll);
      document.body.classList.remove(styles.noScroll);
    }

    // Cleanup om man lämnar sidan
    return () => {
      document.documentElement.classList.remove(styles.noScroll);
      document.body.classList.remove(styles.noScroll);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSolid = isScrolled || forceSolid;
  const navClass = `${styles.navbar} ${isSolid ? styles.scrolled : ''}`;

  const navLinks = [
    { name: 'Hem', path: '/' },
    { name: 'Uppfödare', path: '/breeders' },
    { name: 'Aktiviteter', path: '/activities' },
    /* { name: 'Våra kurser', path: '/courses' }, */
    { name: 'Resultat', path: '/all-results' },
    { name: 'Om oss', path: '/board' },
  ];

  return (
    <nav className={navClass}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={() => setIsMobileMenuOpen(false)}>
          <div className={styles.logoWrapper}>
            <Image
              src="/images/sfk-logo.png" // Kontrollera att sökvägen och filnamnet stämmer
              alt="Södra Fågelhundklubben"
              width={70}  // Justera bredden så den passar din logga
              height={70} // Justera höjden så den passar din logga
              className={styles.logoImage}
              priority // Gör att loggan laddas omedelbart
            />
          </div>
        </Link>

        {/* Desktop Meny */}
        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} className={styles.link}>
              {link.name}
            </Link>
          ))}
          <Link href="/member" className={styles.ctaButton}>
            Bli Medlem
          </Link>
        </div>

        {/* Mobil-knapp (Hamburgare som blir X) */}
        <button
          className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles.toggleOpen : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Meny"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobil Meny Overlay */}
      {/* Mobil Meny Overlay */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.mobileLinksWrapper}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={styles.mobileNavLink}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/member" className={styles.mobileCta} onClick={() => setIsMobileMenuOpen(false)}>
            Bli Medlem
          </Link>

          {/* KONTAKTINFO UNDER KNAPPEN */}
          <div className={styles.mobileContactInfo}>
            <div className={styles.contactDivider}></div>
            <a href="tel:0707858927" className={styles.contactItem}>070 785 89 27</a>
            <a href="mailto:info@sodrafagelhundklubben.se" className={styles.contactItem}>info@sodrafagelhundklubben.se</a>

          </div>
        </div>
      </div>
    </nav>
  );
}