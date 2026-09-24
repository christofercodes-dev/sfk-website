"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import styles from "./GalleryPage.module.css";

type GalleryImage = {
  _key?: string;
  _type?: string;
  asset?: any;
  alt?: string;
  title?: string;
  category?: string;
};

type GalleryItem = {
  _id: string;
  title?: string;
  category?: string;
  date?: string;

  // Nya strukturen
  images?: GalleryImage[];

  // Gamla strukturen
  image?: GalleryImage;
};

async function getAllGalleryImages() {
  const query = `*[_type == "gallery"] | order(date desc) {
    _id,
    title,
    category,
    date,
    image,
    images
  }`;

  return await client.fetch<GalleryItem[]>(query);
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  useEffect(() => {
    async function loadGallery() {
      const data = await getAllGalleryImages();
      setGalleryItems(data);
    }

    loadGallery();
  }, []);

  /*
   * Hanterar både:
   *
   * gamla:
   * image
   *
   * nya:
   * images[]
   */
  const images = galleryItems.flatMap((item) => {
    if (item.images && item.images.length > 0) {
      return item.images.map((image) => ({
        ...image,
        title: item.title,
        category: item.category,
      }));
    }

    if (item.image) {
      return [
        {
          ...item.image,
          title: item.title,
          category: item.category,
        },
      ];
    }

    return [];
  });

  // Stäng lightbox med Escape
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

  // Förhindra scroll bakom lightbox
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

  return (
    <main className={styles.wrapper}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.label}>
            Fotogalleri
          </span>

          <h1 className={styles.title}>
            Bilder från <span>klubben</span>
          </h1>
        </div>
      </header>

      <section className={styles.container}>
        <div className={styles.simpleGrid}>
          {images.map((image, index) => (
            <button
              key={image._key || `${image.asset?._ref}-${index}`}
              type="button"
              className={styles.card}
              onClick={() => setSelectedImage(image)}
              aria-label={`Förstora ${
                image.title || "bild"
              }`}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={urlFor(image)
                    .width(1200)
                    .quality(85)
                    .url()}
                  alt={image.alt || ""}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  className={styles.image}
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}

      {selectedImage && (
        <div
          className={styles.lightbox}
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Förstorad bild"
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setSelectedImage(null)}
            aria-label="Stäng bild"
          >
            ×
          </button>

          <div
            className={styles.lightboxImage}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <Image
              src={urlFor(selectedImage)
                .width(2000)
                .quality(90)
                .url()}
              alt={selectedImage.alt || ""}
              fill
              sizes="100vw"
              className={styles.fullImage}
            />
          </div>
        </div>
      )}
    </main>
  );
}