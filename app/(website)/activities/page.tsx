"use client";

import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import Navbar from '@/components/Navbar'; // Antog att du vill ha Navbar här också
import styles from './AllActivities.module.css'; 

export default function AllActivitiesPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Alla');

  const categories = ['Alla', 'Träning', 'Jaktprov', 'Utställning', 'Möte'];

  useEffect(() => {
    const fetchEvents = async () => {
      const today = new Date().toISOString();
      const query = `*[_type == "event"] | order(date asc)`;
      const data = await client.fetch(query, { today });
      setEvents(data || []);
      setFilteredEvents(data || []);
    };
    fetchEvents();
  }, []);

  const handleFilter = (cat: string) => {
    setActiveFilter(cat);
    if (cat === 'Alla') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((e: any) => e.category === cat));
    }
  };

  return (
    <main className={styles.wrapper}>
      <Navbar forceSolid={true} />
      <section className={styles.section}>
        <div className={styles.container}>
          
          <header className={styles.header}>
            <span className={styles.label}>Program</span>
            <h2 className={styles.mainTitle}>Aktiviteter & <span>Kalender</span></h2>
            
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
            {filteredEvents.length > 0 ? (
              filteredEvents.map((item: any) => {
                const dateObj = new Date(item.date);
                const day = dateObj.getDate();
                const month = dateObj.toLocaleString('sv-SE', { month: 'short' }).toUpperCase();
                const time = dateObj.toLocaleTimeString('sv-SE', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                });

                return (
                  <div key={item._id} className={styles.listItem}>
                    <div className={styles.dateCategoryBox}>
                      <span className={styles.dayMonth}>{day} {month}</span>
                      <span className={styles.categoryLabel}>{item.category || 'Aktivitet'}</span>
                    </div>

                    <div className={styles.infoBox}>
                      <h3 className={styles.activityTitle}>{item.title}</h3>
                      <span className={styles.metaInfo}>Kl. {time} — {item.location}</span>
                    </div>

                    <div className={styles.actionBox}>
                      {/* <Link href={`/activities/${item.slug?.current || item._id}`} className={styles.detailsLink}>
                        Visa detaljer →
                      </Link> */}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className={styles.emptyText}>Inga planerade aktiviteter just nu.</p>
            )}
          </div>

          <div className={styles.notice}>
            <div className={styles.noticeLine}></div>
            <p>
              Har du frågor gällande våra aktiviteter? <br />
              Kontakta gärna ansvarig provledare eller styrelsen.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}