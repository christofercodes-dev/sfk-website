"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import styles from "./LatestResults.module.css";

interface Result {
  _id: string;
  event: string;
  judge: string;
  type: string;
  date: string;
  image?: any;
}

export default function LatestResults() {
  const [items, setItems] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const query = `*[_type == "result"] | order(date desc)[0..3]{
      _id,
      event,
      judge,
      type,
      date,
      image
    }`;

    client
      .fetch(query)
      .then((data) => {
        console.log("LatestResults:", data);
        setItems(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Kunde inte hämta senaste resultat:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>

        <header className={styles.topRow}>
          <div className={styles.headerContent}>
            <span className={styles.label}>Aktuellt</span>

            <h2 className={styles.title}>
              Senaste <span>resultaten</span>
            </h2>
          </div>

          <Link
            href="/all-results"
            className={styles.archiveBtn}
          >
            Se hela arkivet
          </Link>
        </header>

        {loading ? (
          <div className={styles.loading}>
            Laddar resultat...
          </div>
        ) : items.length === 0 ? (
          <div className={styles.loading}>
            Inga resultat hittades.
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map((item, index) => (
              <Link
                key={item._id}
                href={`/all-results/${encodeURIComponent(
                  item.event
                )}`}
                className={styles.cardLink}
                style={
                  {
                    "--delay": `${index * 120}ms`,
                  } as React.CSSProperties
                }
              >
                <article className={styles.card}>

                  <div className={styles.imageWrapper}>
                    {item.image ? (
                      <Image
                        src={urlFor(item.image)
                          .width(800)
                          .height(500)
                          .url()}
                        alt={item.event || "Resultatbild"}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className={styles.placeholder}>
                        Ingen bild tillgänglig
                      </div>
                    )}

                    <div className={styles.badge}>
                      {item.type}
                    </div>
                  </div>

                  <div className={styles.content}>

                    <div className={styles.meta}>
                      <span className={styles.date}>
                        {item.date}
                      </span>
                    </div>

                    <h3 className={styles.dogName}>
                      {item.event}
                    </h3>

                    <div className={styles.scoreRow}>
                      {item.judge && (
                        <span className={styles.owner}>
                          Domare: {item.judge}
                        </span>
                      )}

                      <span className={styles.readMore}>
                        Läs resultat →
                      </span>
                    </div>

                  </div>

                </article>
              </Link>
            ))}
          </div>
        )}

        <div className={styles.mobileLinkWrapper}>
          <Link
            href="/all-results"
            className={styles.archiveBtn}
          >
            Se hela arkivet <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}