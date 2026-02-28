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

        <section className={styles.gallery}>
          <div className={styles.galleryGrid}>
            <div className={styles.galleryItem} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80)' }}>
              <div className={styles.itemLabel}>THE VILLA, MALIBU</div>
            </div>
            <div className={styles.galleryItem} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&w=1200&q=80)' }}>
              <div className={styles.itemLabel}>MODERNIST PENTHOUSE, NYC</div>
            </div>
          </div>
        </section>

        <section className={styles.viewingSection}>
          <div className={styles.viewingContainer}>
            <header>
              <h2>Private Consultation</h2>
              <p>Request a private tour or portfolio review with our architectural curators.</p>
            </header>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formRow}>
                <input type="text" placeholder="FULL NAME" />
                <input type="email" placeholder="EMAIL ADDRESS" />
              </div>
              <textarea placeholder="MESSAGE (OPTIONAL)" />
              <button type="button" className={styles.cta}>Request Access</button>
            </form>
          </div>
        </section>

        <footer style={{ padding: '5rem', textAlign: 'center', borderTop: '1px solid #e7e5e4', color: '#a8a29e', fontSize: '0.7rem', letterSpacing: '0.2rem' }}>
          © 2026 VALENTE ARCHITECTURAL ESTATES. ALL RIGHTS RESERVED.
        </footer>
      </main>
    </div>
  );
}
