"use client";

import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from './AllResults.module.css'; 

interface Result {
  _id: string;
  event: string;
  type: string;
  date: string;
  judge: string;
  location?: string;
}

export default function AllResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [activeFilter, setActiveFilter] = useState('Alla');

  // Kategorier baserade på dina jaktprov/utställningstyper
  const categories = ['Alla', 'Jaktprov', 'Utställning', 'Viltspår', 'Övrigt'];

  useEffect(() => {
    const fetchResults = async () => {
      // Vi hämtar alla resultat, sorterade efter nyast datum först
      const query = `*[_type == "result"] | order(date desc){
        _id,
        event,
        type,
        date,
        judge,
        location
      }`;
      const data = await client.fetch(query);
      setResults(data || []);
      setFilteredResults(data || []);
    };
    fetchResults();
  }, []);

  const handleFilter = (cat: string) => {
    setActiveFilter(cat);
    if (cat === 'Alla') {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter((r: Result) => r.type === cat));
    }
  };

  return (
    <main className={styles.wrapper}>
      <Navbar forceSolid={true} />
      <section className={styles.section}>
        <div className={styles.container}>
          
          <header className={styles.header}>
            <span className={styles.label}>Arkiv</span>
            <h2 className={styles.mainTitle}>Tävlings <span>resultat</span></h2>
            
            <nav className={styles.filterNav}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className={`${styles.filterBtn} ${activeFilter === cat ? styles.activeFilter : ''}`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </header>

          <div className={styles.list}>
            {filteredResults.length > 0 ? (
              filteredResults.map((item: Result) => {
                const dateObj = new Date(item.date);
                const day = dateObj.getDate();
                const month = dateObj.toLocaleString('sv-SE', { month: 'short' }).toUpperCase();
                
                return (
                  <div key={item._id} className={styles.listItem}>
                    <div className={styles.dateCategoryBox}>
                      <span className={styles.dayMonth}>{day} {month}</span>
                      <span className={styles.categoryLabel}>{item.type || 'Resultat'}</span>
                    </div>

                    <div className={styles.infoBox}>
                      <h3 className={styles.activityTitle}>{item.event}</h3>
                      <span className={styles.metaInfo}>Domare: {item.judge} {item.location ? `— ${item.location}` : ''}</span>
                    </div>

                    <div className={styles.actionBox}>
                      {/* Länkar till den lyxiga detaljsidan vi skapade tidigare */}
                      <Link href={`/all-results/${encodeURIComponent(item.event)}`} className={styles.detailsLink}>
                        Visa resultat →
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className={styles.emptyText}>Inga resultat matchar ditt val.</p>
            )}
          </div>

          <div className={styles.notice}>
            <div className={styles.noticeLine}></div>
            <p>
              Saknas ett resultat eller är något felaktigt? <br />
              Vänligen kontakta webbansvarig eller styrelsen.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}