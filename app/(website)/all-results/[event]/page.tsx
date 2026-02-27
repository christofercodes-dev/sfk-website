import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import styles from './EventResult.module.css';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';

export default async function EventPage({ params }: { params: Promise<{ event: string }> }) {
    const resolvedParams = await params;
    const decodedEvent = decodeURIComponent(resolvedParams.event);

    const query = `*[_type == "result" && event == $event][0]{
    event,
    date,
    type,
    judge,
    description,
    image
  }`;

    const result = await client.fetch(query, { event: decodedEvent }, { next: { revalidate: 0 } });

    if (!result) return <div className={styles.notFound}>Resultatet hittades inte.</div>;

    return (
        <main className={styles.wrapper}>
            <Navbar forceSolid={true} />

            <article className={styles.article}>
                {/* HEADER - Ren och luftig typografi */}
                <header className={styles.header}>
                    <div className={styles.container}>
                        <div className={styles.breadcrumb}>
                            <Link href="/all-results">Arkiv</Link> / <span>{result.type}</span>
                        </div>
                        <h1 className={styles.mainTitle}>{result.event}</h1>
                        <div className={styles.metaRow}>
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>Datum</span>
                                <span className={styles.metaValue}>{result.date}</span>
                            </div>
                            {result.judge && (
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Domare</span>
                                    <span className={styles.metaValue}>{result.judge}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* BILDEN - Stor och tydlig i fokus */}
                {result.image && (
                    <div className={styles.imageSection}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={urlFor(result.image).url()}
                                alt={`Pristagare på ${result.event}`}
                                width={1000}  // Basbredd
                                height={600}  // Bas-propertioner
                                className={styles.mainImage}
                                priority
                            />
                            {/* En diskret bildtext under förhöjer den redaktionella känslan */}
                        </div>
                    </div>
                )}

                {/* RESULTATLISTAN */}
                <section className={styles.contentSection}>
                    <div className={styles.containerSmall}>
                        <div className={styles.resultsCard}>
                            <h2 className={styles.resultsTitle}>Officiella Resultat</h2>
                            <div className={styles.resultBody}>
                                {result.description}
                            </div>
                        </div>

                        <footer className={styles.footer}>
                            <Link href="/all-results" className={styles.backBtn}>
                                ← Tillbaka till alla resultat
                            </Link>
                        </footer>
                    </div>
                </section>
            </article>
        </main>
    );
}