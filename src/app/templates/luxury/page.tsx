import styles from "./luxury.module.css";
import Link from "next/link";

export default function LuxuryTemplate() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>VALENTE</div>
      </nav>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Architecture <br/> of Silence.</h1>
            <p>We believe in spaces that breathe. Our curated portfolio of luxury estates focuses on the intersection of modern minimalism and natural harmony.</p>
            <Link href="/intake" className={styles.cta}>View Collection</Link>
          </div>
          <div className={styles.imagePlaceholder} />
        </section>

        <section style={{ padding: '10rem 10%', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '2rem' }}>The Philosophy</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: 2, color: '#57534e' }}>
            Every stone, every shadow, and every line is considered. Valente is not just about real estate; it's about the art of living in deliberate, beautiful environments.
          </p>
        </section>
      </main>
    </div>
  );
}
