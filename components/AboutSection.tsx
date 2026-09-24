"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${
        isVisible ? styles.visible : ""
      }`}
    >
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* VÄNSTER – TEXT */}
          <div className={styles.textColumn}>

            <span className={styles.label}>
              Information
            </span>

            <h2 className={styles.title}>
              SFK bildades <span>1968</span>
            </h2>

            <div className={styles.content}>

              <p className={styles.lead}>
                Södra Fågelhundklubben är en av 9 lokalklubbar
                under Fågelhundklubbarnas Arbetsutskott, FA.
              </p>

              <p>
                FA är en samarbetsorganisation som består av
                representanter för de fyra specialklubbarna för
                Brittiska Stående Fågelhundar, Svenska Pointerklubben,
                SVPK, Svenska Setterklubben för Engelsk Setter, SSK,
                Svenska Gordonsetterklubben, SGSK, samt
                Svenska-Irländsk Setterklubben, SISK, associerade
                med Svenska Kennelklubben.
              </p>

            </div>

          </div>

          {/* HÖGER – BILD */}
          <div className={styles.imageColumn}>

            <div className={styles.imageFrame}>

              <Image
                src="/images/logga.png"
                alt="Träning på Södra Fågelhundklubben"
                fill
                className={styles.mainImage}
              />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}