import { client } from "@/sanity/lib/client";
import Link from 'next/link';
import styles from "./UpcomingEvents.module.css";

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
}

// UpcomingEvents.tsx

async function getEvents() {
  // Vi hämtar dokument av typen "event" där featured-fältet är ikryssat
  const query = `*[_type == "event" && featured == true] | order(date asc)[0..1]{
    _id,
    title,
    date,
    location,
    description,
    category
  }`;

  // Vi lägger till { cache: 'no-store' } för att tvinga fram de senaste ändringarna direkt
  return await client.fetch(query, {}, { cache: 'no-store' });
}

export default async function UpcomingEvents() {
  const allEvents: Event[] = await getEvents() || [];
  const events = allEvents.slice(0, 2);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.label}>Aktuellt</span>
            <h2 className={styles.title}>Kommande <span>aktiviteter</span></h2>
          </div>
          
          {/* Denna knapp döljs på mobil via CSS (.desktopLink) */}
          <Link href="/activities" className={`${styles.calendarBtn} ${styles.desktopLink}`}>
            Visa hela kalendern
          </Link>
        </header>

        <div className={styles.grid}>
          {events.length > 0 ? (
            events.map((event) => {
              if (!event) return null;
              const dateObj = new Date(event.date);
              const day = dateObj.getDate();
              const month = dateObj.toLocaleString('sv-SE', { month: 'short' }).toUpperCase().replace('.', '');

              return (
                <article key={event._id} className={styles.card}>
                  <div className={styles.cardContent}>
                    <div className={styles.cardTop}>
                      <div className={styles.dateBadge}>
                        <span className={styles.day}>{day}</span>
                        <span className={styles.month}>{month}</span>
                      </div>
                      <div className={styles.meta}>
                        <span className={styles.category}>{event.category || "Aktivitet"}</span>
                        <span className={styles.location}>{event.location}</span>
                      </div>
                    </div>

                    <h3 className={styles.eventTitle}>{event.title}</h3>
                    <p className={styles.description}>{event.description}</p>
                  </div>
                </article>
              );
            })
          ) : (
            <p className={styles.empty}>Inga utvalda aktiviteter just nu.</p>
          )}
        </div>

        {/* Denna knapp visas endast på mobil via CSS (.mobileLinkWrapper) */}
        <div className={styles.mobileLinkWrapper}>
          <Link href="/activities" className={styles.calendarBtn}>
            Visa hela kalendern
          </Link>
        </div>
      </div>
    </section>
  );
}