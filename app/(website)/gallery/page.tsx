// app/galleri/page.tsx
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from 'next/image';
import styles from "./GalleryPage.module.css";

async function getAllGalleryImages() {
  const query = `*[_type == "gallery"] | order(date desc)`;
  return await client.fetch(query);
}

export default async function GalleryPage() {
  const images = await getAllGalleryImages();

  return (
    <main className={styles.wrapper}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.label}>Fotogalleri</span>
          <h1 className={styles.title}>Bilder från <span>klubben</span></h1>
        </div>
      </header>

      <section className={styles.container}>
        <div className={styles.simpleGrid}>
          {images.map((item: any) => (
            <div key={item._id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.image.alt || ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.image}
                />
                
                <div className={styles.overlay}>
                  <div className={styles.info}>
                    <span className={styles.cat}>{item.category}</span>
                    <h3 className={styles.imageTitle}>{item.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}