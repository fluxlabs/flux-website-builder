import styles from "./bold.module.css";
import Link from "next/link";

export default function BoldTemplate() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>FORGE</div>
        <div style={{ fontSize: '1.25rem' }}>BUILD // DESTROY // REPEAT</div>
      </nav>

      <main>
        <section className={styles.hero}>
          <h1>WE BUILD <br/> THE <span className={styles.highlight}>FUTURE</span> <br/> OF STEEL.</h1>
          <p style={{ fontSize: '1.5rem', maxWidth: '600px', marginBottom: '4rem', fontFamily: 'sans-serif' }}>
            Heavy industrial solutions for a world that never stops. We move the earth, we shape the metal, we power the grid.
          </p>
          <Link href="/intake" className={styles.cta}>GET A QUOTE</Link>
        </section>

        <section className={styles.stats}>
          <div className={styles.statItem}>
            <h3>400k+</h3>
            <p>TONS OF STEEL</p>
          </div>
          <div className={styles.statItem}>
            <h3>1200</h3>
            <p>ACTIVE SITES</p>
          </div>
          <div className={styles.statItem}>
            <h3>0</h3>
            <p>COMPROMISES</p>
          </div>
        </section>
      </main>
    </div>
  );
}
