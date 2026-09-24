import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import styles from "./ActivityPage.module.css";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface ActivityPageProps {
  params: Promise<{
    activity: string;
  }>;
}

interface Activity {
  _id: string;
  title: string;
  category?: string;
  date?: string;
  location?: string;
  description?: string;
  image?: any;
  slug?: {
    current: string;
  };
}

export default async function ActivityPage({
  params,
}: ActivityPageProps) {
  const { activity } = await params;

  const decodedActivity = decodeURIComponent(activity);

  const query = `*[
    _type == "event" &&
    (
      slug.current == $activity ||
      _id == $activity
    )
  ][0]{
    _id,
    title,
    category,
    date,
    location,
    description,
    image,
    slug
  }`;

  const result: Activity | null = await client.fetch(
    query,
    {
      activity: decodedActivity,
    },
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!result) {
    return (
      <main className={styles.main}>
        <Navbar forceSolid={true} />

        <div className={styles.error}>
          <h1>Aktiviteten hittades inte.</h1>

          <Link
            href="/all-activities"
            className={styles.backLink}
          >
            ← Tillbaka till aktiviteter
          </Link>
        </div>
      </main>
    );
  }

  const formattedDate = result.date
    ? new Date(result.date).toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const formattedTime = result.date
    ? new Date(result.date).toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <main className={styles.main}>
      <Navbar forceSolid={true} />

      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.container}>

          <div className={styles.infoLine}>
            {formattedDate && (
              <span>{formattedDate}</span>
            )}

            {formattedTime && (
              <>
                <span className={styles.separator}>•</span>
                <span>Kl. {formattedTime}</span>
              </>
            )}

            {result.location && (
              <>
                <span className={styles.separator}>•</span>
                <span>{result.location}</span>
              </>
            )}
          </div>

          <h1 className={styles.title}>
            {result.title}
          </h1>

          {result.category && (
            <p className={styles.typeTag}>
              {result.category}
            </p>
          )}

        </div>
      </header>

      {/* BILD */}
      {result.image && (
        <section className={styles.heroImageSection}>
          <div className={styles.heroImageWrapper}>
            <Image
              src={urlFor(result.image)
                .width(1600)
                .height(900)
                .url()}
              alt={result.title}
              fill
              priority
              className={styles.heroImage}
            />
          </div>
        </section>
      )}

      {/* OM AKTIVITETEN */}
      <section className={styles.storySection}>
        <div className={styles.storyCard}>

          <h2 className={styles.storyTitle}>
            Om aktiviteten
          </h2>

          {result.description ? (
            <div className={styles.prose}>
              {result.description
                .split("\n")
                .map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
            </div>
          ) : (
            <p className={styles.noDescription}>
              Ingen beskrivning har lagts till ännu.
            </p>
          )}

        </div>
      </section>

      {/* PRAKTISK INFORMATION */}
      <section className={styles.detailsSection}>
        <div className={styles.container}>

          <div className={styles.detailsGrid}>

            {formattedDate && (
              <div className={styles.detail}>
                <span className={styles.detailLabel}>
                  Datum
                </span>

                <span className={styles.detailValue}>
                  {formattedDate}
                </span>
              </div>
            )}

            {formattedTime && (
              <div className={styles.detail}>
                <span className={styles.detailLabel}>
                  Tid
                </span>

                <span className={styles.detailValue}>
                  {formattedTime}
                </span>
              </div>
            )}

            {result.location && (
              <div className={styles.detail}>
                <span className={styles.detailLabel}>
                  Plats
                </span>

                <span className={styles.detailValue}>
                  {result.location}
                </span>
              </div>
            )}

            {result.category && (
              <div className={styles.detail}>
                <span className={styles.detailLabel}>
                  Typ
                </span>

                <span className={styles.detailValue}>
                  {result.category}
                </span>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* TILLBAKA */}
      <footer className={styles.footer}>
        <Link
          href="/all-activities"
          className={styles.backLink}
        >
          ← Tillbaka till alla aktiviteter
        </Link>
      </footer>
    </main>
  );
}