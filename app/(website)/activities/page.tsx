"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "./AllActivities.module.css";

interface Event {
  _id: string;
  title: string;
  category?: string;
  date: string;
  location?: string;
  slug?: {
    current: string;
  };
}

export default function AllActivitiesPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [activeFilter, setActiveFilter] = useState("Alla");

  const categories = [
    "Alla",
    "Träning",
    "Jaktprov",
    "Utställning",
    "Möte",
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = `*[_type == "event"] | order(date asc) {
          _id,
          title,
          category,
          date,
          location,
          slug
        }`;

        const data = await client.fetch(query);

        setEvents(data || []);
        setFilteredEvents(data || []);
      } catch (error) {
        console.error("Kunde inte hämta aktiviteter:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleFilter = (category: string) => {
    setActiveFilter(category);

    if (category === "Alla") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter((event) => event.category === category)
      );
    }
  };

  return (
    <main className={styles.wrapper}>
      <Navbar forceSolid={true} />

      <section className={styles.section}>
        <div className={styles.container}>

          <header className={styles.header}>
            <span className={styles.label}>Program</span>

            <h2 className={styles.mainTitle}>
              Aktiviteter & <span>Kalender</span>
            </h2>

            <nav className={styles.filterNav}>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleFilter(category)}
                  className={`${styles.filterBtn} ${
                    activeFilter === category
                      ? styles.activeFilter
                      : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>
          </header>

          <div className={styles.list}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((item) => {
                const dateObj = new Date(item.date);

                const day = dateObj.getDate();

                const month = dateObj
                  .toLocaleString("sv-SE", {
                    month: "short",
                  })
                  .toUpperCase();

                const time = dateObj.toLocaleTimeString("sv-SE", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                const activityUrl = `/activities/${
                  item.slug?.current || item._id
                }`;

                return (
                  <div
                    key={item._id}
                    className={styles.listItem}
                  >

                    {/* DATUM + KATEGORI */}
                    <div className={styles.dateCategoryBox}>
                      <span className={styles.dayMonth}>
                        {day} {month}
                      </span>

                      <span className={styles.categoryLabel}>
                        {item.category || "Aktivitet"}
                      </span>
                    </div>

                    {/* INFORMATION */}
                    <div className={styles.infoBox}>
                      <h3 className={styles.activityTitle}>
                        {item.title}
                      </h3>

                      <span className={styles.metaInfo}>
                        Kl. {time}
                        {item.location
                          ? ` — ${item.location}`
                          : ""}
                      </span>
                    </div>

                    {/* INFO-KNAPP TILL HÖGER */}
                    <div className={styles.actionBox}>
                      <Link
                        href={activityUrl}
                        className={styles.detailsBtn}
                      >
                        <span>Info</span>
                        <span className={styles.arrow}>→</span>
                      </Link>
                    </div>

                  </div>
                );
              })
            ) : (
              <p className={styles.emptyText}>
                Inga planerade aktiviteter just nu.
              </p>
            )}
          </div>

          <div className={styles.notice}>
            <div className={styles.noticeLine}></div>

            <p>
              Har du frågor gällande våra aktiviteter?
              <br />
              Kontakta gärna ansvarig provledare eller styrelsen.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}