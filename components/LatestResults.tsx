"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import styles from './LatestResults.module.css';

// Uppdaterat interface för att matcha ditt nya Sanity-schema
interface Result {
  _id: string;
  event: string;  // Tävlingens namn
  judge: string;  // Tidigare owner
  type: string;
  date: string;
  image?: any;
}

export default function LatestResults() {
  const [items, setItems] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vi hämtar specifika fält för att vara säkra på att vi får rätt data
  // [0..1] hämtar exakt två objekt (index 0 och index 1)
const query = `*[_type == "result"] | order(date desc)[0..3]{
  _id,
  event,
  judge,
  type,
  date,
  image
}`;
    
    client.fetch(query).then((data) => {
      setItems(data || []);
      setLoading(false);
    }).catch(err => {
      console.error("Kunde inte hämta senaste resultat:", err);
      setLoading(false);
    });
  }, []);

  if (loading || items.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.topRow}>
          <div>
            <span className={styles.label}>Aktuellt</span>
            <h2 className={styles.title}>Senaste <span>resultaten</span></h2>
          </div>
          <Link href="/all-results" className={styles.archiveBtn}>
            Se hela arkivet
          </Link>
        </header>

        <div className={styles.grid}>
          {items.map((item: Result) => (
            /* Vi omsluter hela kortet med en länk till den dynamiska sidan */
            <Link 
              key={item._id} 
              href={`/all-results/${encodeURIComponent(item.event)}`}
              className={styles.cardLink}
            >
              <article className={styles.card}>
                <div className={styles.imageWrapper}>
                  {item.image ? (
                    <Image
                      src={urlFor(item.image).width(800).height(500).url()}
                      alt={item.event || "Resultatbild"}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className={styles.placeholder}>Ingen bild tillgänglig</div>
                  )}
                  <div className={styles.badge}>{item.type}</div>
                </div>

                <div className={styles.content}>
                  <div className={styles.meta}>
                    <span className={styles.date}>{item.date}</span>
                  </div>
                  {/* Här använder vi 'event' som huvudtitel för kortet */}
                  <h3 className={styles.dogName}>{item.event}</h3>
                  <div className={styles.scoreRow}>
                    {item.judge && (
                      <span className={styles.owner}>Domare: {item.judge}</span>
                    )}
                    <span className={styles.readMore}>Läs resultat →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className={styles.mobileLinkWrapper}>
          <Link href="/all-results" className={styles.archiveBtn}>
            Se hela arkivet <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}