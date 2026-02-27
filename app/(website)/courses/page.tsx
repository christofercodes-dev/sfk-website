// src/app/kurser/page.tsx
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from 'next/image';
import Link from 'next/link';
import styles from "./Courses.module.css";

// Vi hämtar kurserna och ser till att de sorteras snyggt
async function getCourses() {
  const query = `*[_type == "course"] | order(title asc)`;
  const data = await client.fetch(query);
  return data;
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main className={styles.wrapper}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.label}>Utbildning</span>
          <h1 className={styles.title}>Våra <span>Dressyrkurser</span></h1>
          <p className={styles.subtitle}>
            Vi erbjuder utbildningar för alla nivåer – från den första valpkurser till avancerad fältträning.
          </p>
        </div>
      </header>

      <section className={styles.container}>
        {courses.length > 0 ? (
          <div className={styles.courseGrid}>
            {courses.map((course: any) => (
              <div key={course._id} className={styles.courseCard}>
                <div className={styles.imageWrapper}>
                  {course.image ? (
                    <Image 
                      src={urlFor(course.image).url()} 
                      alt={course.title} 
                      fill 
                      className={styles.img} 
                    />
                  ) : (
                    <div className={styles.placeholder}>SFK</div>
                  )}
                  <div className={`${styles.statusBadge} ${styles[course.status]}`}>
                    {course.status === 'open' ? 'Anmälan öppen' : 
                     course.status === 'full' ? 'Fullbokad' : 'Kommer snart'}
                  </div>
                </div>
                
                <div className={styles.content}>
                  <h2 className={styles.courseTitle}>{course.title}</h2>
                  <p className={styles.desc}>{course.description}</p>
                  <div className={styles.footer}>
                    <span className={styles.price}>{course.price || 'Pris ej fastställt'}</span>
                    {/* Just nu skickar vi dem till en placeholder för detaljer */}
                    <Link href={`/courses/${course._id}`} className={styles.readMore}>
                      Läs mer →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noCourses}>
            <p>Just nu planerar vi nästa säsongs kurser. Håll utkik här snart igen!</p>
          </div>
        )}
      </section>
    </main>
  );
}