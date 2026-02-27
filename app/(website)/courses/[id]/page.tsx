// src/app/kurser/[id]/page.tsx
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CourseDetail.module.css";

async function getCourse(id: string) {
  const query = `*[_type == "course" && _id == $id][0]`;
  // Här skickar vi med parametern $id till Sanity
  return await client.fetch(query, { id });
}

// Lägg till async här för params
export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // VIKTIGT: Vi måste awaita params för att få ut id
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    return (
      <div className={styles.container}>
        <p>Kursen hittades inte...</p>
        <Link href="/courses">Tillbaka till listan</Link>
      </div>
    );
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <Link href="/courses" className={styles.backBtn}>← Tillbaka till alla kurser</Link>
        
        <div className={styles.grid}>
          <div className={styles.mainInfo}>
            <span className={styles.label}>Kursinformation</span>
            <h1 className={styles.title}>{course.title}</h1>
            
            <div className={styles.richText}>
              {/* PortableText sköter formateringen från Sanity */}
              {course.content ? <PortableText value={course.content} /> : <p>Information kommer snart.</p>}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.stickyCard}>
              {course.image && (
                <div className={styles.imageWrapper}>
                  <Image 
                    src={urlFor(course.image).url()} 
                    alt={course.title} 
                    fill 
                    className={styles.img} 
                  />
                </div>
              )}
              <div className={styles.cardContent}>
                <div className={styles.priceRow}>
                  <span>Pris:</span>
                  <strong>{course.price || "Kontakta oss för pris"}</strong>
                </div>
                <div className={styles.statusRow}>
                  <span>Status:</span>
                  <span className={`${styles.badge} ${styles[course.status]}`}>
                    {course.status === 'open' ? 'Öppen' : 
                     course.status === 'full' ? 'Fullbokad' : 'Planeras'}
                  </span>
                </div>
                
                <a href="mailto:info@sfk.se" className={styles.applyBtn}>
                  Anmäl intresse
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}