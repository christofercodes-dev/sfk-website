"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import styles from "./EventResult.module.css";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

type Team = {
  name: string;
  placement?: string;
  resultText?: string;
  photo?: any;
};

type Result = {
  event: string;
  date: string;
  location: string;
  type: string;
  judge?: string;
  description?: any;
  image?: any;
  teams?: Team[];
};

export default function GalleryEventPage({
  params,
}: {
  params: Promise<{ event: string }>;
}) {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  /*
   * =========================
   * HÄMTA RESULTAT
   * =========================
   */

  useEffect(() => {
    async function loadResult() {
      try {
        const { event } = await params;
        const decodedEvent = decodeURIComponent(event);

        const query = `*[
          _type == "result" &&
          event == $event
        ][0]{
          event,
          date,
          location,
          type,
          judge,
          description,
          image,
          teams[] {
            placement,
            name,
            resultText,
            photo
          }
        }`;

        const data = await client.fetch<Result>(
          query,
          { event: decodedEvent },
          { next: { revalidate: 60 } }
        );

        setResult(data);
      } catch (error) {
        console.error("Kunde inte hämta resultat:", error);
      } finally {
        setLoading(false);
      }
    }

    loadResult();
  }, [params]);

  /*
   * =========================
   * ESC STÄNGER LIGHTBOX
   * =========================
   */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /*
   * =========================
   * LÅS SCROLL NÄR LIGHTBOX ÄR ÖPPEN
   * =========================
   */

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  /*
   * =========================
   * LADDAR
   * =========================
   */

  if (loading) {
    return (
      <main className={styles.main}>
        <Navbar forceSolid={true} />

        <div className={styles.loading}>
          Laddar...
        </div>
      </main>
    );
  }

  /*
   * =========================
   * RESULTAT HITTADES INTE
   * =========================
   */

  if (!result) {
    return (
      <main className={styles.main}>
        <Navbar forceSolid={true} />

        <div className={styles.error}>
          Resultatet hittades inte.
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Navbar forceSolid={true} />

      {/* =========================
          HEADER
      ========================= */}

      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.infoLine}>
            <span>{result.date}</span>
            {" • "}
            <span>{result.location}</span>
          </div>

          <h1 className={styles.title}>
            {result.event}
          </h1>

          <p className={styles.typeTag}>
            {result.type}
          </p>
        </div>
      </header>

      {/* =========================
          OM DAGEN
      ========================= */}

      <section className={styles.storySection}>
        <div className={styles.storyCard}>
          <h2 className={styles.storyTitle}>
            Om dagen
          </h2>

          {result.description && (
            <div className={styles.prose}>
              <PortableText value={result.description} />
            </div>
          )}

          {result.judge && (
            <p className={styles.judgeSignature}>
              — Domare: {result.judge}
            </p>
          )}
        </div>
      </section>

      {/* =========================
          GALLERI
      ========================= */}

      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <h2 className={styles.galleryTitle}>
            Evenemangsgalleri
          </h2>

          <div className={styles.grid}>
            {result.teams?.map((team, i) => (
              <div
                key={i}
                className={styles.card}
              >
                {team.photo ? (
                  <button
                    type="button"
                    className={styles.imageButton}
                    onClick={() => setSelectedImage(team.photo)}
                    aria-label={`Förstora bilden på ${team.name}`}
                  >
                    <Image
                      src={urlFor(team.photo)
                        .width(1400)
                        .quality(90)
                        .url()}
                      alt={team.name || "Bild från evenemanget"}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                      className={styles.img}
                    />
                  </button>
                ) : (
                  <div className={styles.noPhoto}>
                    Ingen bild
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          LIGHTBOX
      ========================= */}

      {selectedImage && (
        <div className={styles.lightbox}>

          {/* 
            HELA DEN MÖRKA BAKGRUNDEN ÄR KLICKBAR.
            Klick här = stäng.
          */}

          <button
            type="button"
            className={styles.lightboxBackdrop}
            onClick={() => setSelectedImage(null)}
            aria-label="Stäng bild"
          />

          {/* =========================
              STÄNGKNAPP
          ========================= */}

          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setSelectedImage(null)}
            aria-label="Stäng bild"
          >
            ×
          </button>

          {/* =========================
              BILD
          ========================= */}

          <div className={styles.lightboxImage}>
            <Image
              src={urlFor(selectedImage)
                .width(2400)
                .quality(95)
                .url()}
              alt={
                selectedImage.alt ||
                "Förstorad bild"
              }
              fill
              sizes="100vw"
              className={styles.fullImage}
            />
          </div>
        </div>
      )}

      {/* =========================
          FOOTER
      ========================= */}

      <footer className={styles.footer}>
        <Link
          href="/all-results"
          className={styles.backLink}
        >
          Tillbaka till alla resultat
        </Link>
      </footer>
    </main>
  );
}