
import React from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import styles from "./UpcomingEvents.module.css";

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
}

// Datahämtning direkt på servern
async function getEvents(): Promise<Event[]> {
  try {
    const query = `*[_type == "event" && featured == true] | order(date asc)[0..1]{
      _id,
      title,
      date,
      location,
      description,
      category
    }`;

    return await client.fetch(query, {}, { cache: "no-store" });
  } catch (error) {
    console.error("Fel vid hämtning av events:", error);
    return [];
  }
}

export default async function UpcomingEvents() {
  const events = await getEvents();

  // Om inga events hittas visas ingenting (eller skriv en fallback om du vill)
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.topRow}>
          <div className={styles.headerContent}>
            <span className={styles.label}>Aktiviteter</span>
            <h2 className={styles.title}>
              Kommande <span>evenemang</span>
            </h2>
          </div>

          <Link href="/activities" className={styles.archiveBtn}>
            Se alla aktiviteter
          </Link>
        </header>

        <div className={styles.grid}>
          {events.map((event) => (
            <article key={event._id} className={styles.card}>
              <div className={styles.content}>
                <span className={styles.badge}>{event.category}</span>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.meta}>
                   📍 {event.location}
                </p>
                <p className={styles.description}>{event.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}