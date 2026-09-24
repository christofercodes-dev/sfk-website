import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import styles from './EventResult.module.css';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';

export default async function GalleryEventPage({ params }: { params: Promise<{ event: string }> }) {
    const { event } = await params;
    const decodedEvent = decodeURIComponent(event);

    const query = `*[_type == "result" && event == $event][0]{
        event, date, location, type, judge, description, image,
        teams[] { placement, name, resultText, photo }
    }`;

    const result = await client.fetch(query, { event: decodedEvent }, { next: { revalidate: 60 } });

    if (!result) return <div className={styles.error}>Resultatet hittades inte.</div>;

    return (
        <main className={styles.main}>
            <Navbar forceSolid={true} />

            {/* HEADER - Minimalistisk */}
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.infoLine}>
                        <span>{result.date}</span> • <span>{result.location}</span>
                    </div>
                    <h1 className={styles.title}>{result.event}</h1>
                    <p className={styles.typeTag}>{result.type}</p>
                </div>
            </header>

            {/* TEXTRUTA: DAGEN - Centrerad och läsvänlig */}
            <section className={styles.storySection}>
                <div className={styles.storyCard}>
                    <h2 className={styles.storyTitle}>Om dagen</h2>
                    <div className={styles.prose}>
                        <PortableText value={result.description} />
                    </div>
                    {result.judge && (
                        <p className={styles.judgeSignature}>— Domare: {result.judge}</p>
                    )}
                </div>
            </section>

            {/* EKIPAGE-GALLERI */}
            <section className={styles.gallerySection}>
                <div className={styles.container}>
                    <h2 className={styles.galleryTitle}>Evenemangsgalleri</h2>
                    <div className={styles.grid}>
                        {result.teams?.map((team: any, i: number) => (
                            <div key={i} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    {team.photo ? (
                                        <Image 
                                            src={urlFor(team.photo).url()} 
                                            alt={team.name} 
                                            fill 
                                            className={styles.img} 
                                        />
                                    ) : (
                                        <div className={styles.noPhoto}>Ingen bild</div>
                                    )}
                                    <div className={styles.placementBadge}>{team.placement}</div>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3>{team.name}</h3>
                                    <p>{team.resultText}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className={styles.footer}>
                <Link href="/all-results" className={styles.backLink}>Tillbaka till alla resultat</Link>
            </footer>
        </main>
    );
}