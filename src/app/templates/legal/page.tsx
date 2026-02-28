import styles from "./legal.module.css";
import Link from "next/link";

export default function LegalTemplate() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>JUSTICE & CO</div>
        <div style={{ display: 'flex', gap: '3rem', fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1rem' }}>
          <span>Expertise</span>
          <span>Our Story</span>
          <span>Results</span>
          <Link href="/intake" className={styles.cta} style={{ padding: '0.5rem 1.5rem', marginTop: '-0.3rem' }}>Consultation</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero}>
          <h1>Unwavering Defense. <br/> Exceptional Results.</h1>
          <p>We provide high-stakes legal representation for complex corporate and personal matters. Our legacy is built on precision and power.</p>
          <Link href="/intake" className={styles.cta}>Meet Our Partners</Link>
        </section>

        <section className={styles.practiceAreas}>
          <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '6rem' }}>Areas of Expertise</h2>
          <div className={styles.grid}>
            <div className={styles.areaCard}>
              <h3>Corporate Law</h3>
              <p>Navigating the complexities of global business, mergers, and high-value acquisitions.</p>
            </div>
            <div className={styles.areaCard}>
              <h3>Criminal Defense</h3>
              <p>Aggressive representation for white-collar crimes and sensitive personal litigation.</p>
            </div>
            <div className={styles.areaCard}>
              <h3>IP Litigation</h3>
              <p>Protecting your most valuable assets in an increasingly digital and competitive world.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
