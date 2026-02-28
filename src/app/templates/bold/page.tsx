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

        <section className={styles.projects}>
          <div className={styles.projectCard} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80)' }}>
            <div className={styles.projectInfo}>
              <h4>SKYLINE REFORGE</h4>
              <p>STRUCTURAL STEEL // CHICAGO, IL</p>
            </div>
          </div>
          <div className={styles.projectCard} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&q=80)' }}>
            <div className={styles.projectInfo}>
              <h4>MEGA-GRID PHASE 2</h4>
              <p>INFRASTRUCTURE // NEVADA</p>
            </div>
          </div>
        </section>

        <section className={styles.quoteSection}>
          <div className={styles.quoteGrid}>
            <h2>LET'S TALK <br/> <span className={styles.highlight}>POWER.</span></h2>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="COMPANY NAME" />
              <input type="email" placeholder="CONTACT EMAIL" />
              <textarea placeholder="PROJECT SCOPE" />
              <button type="button" className={styles.cta}>INITIATE QUOTE</button>
            </form>
          </div>
        </section>

        <footer style={{ padding: '5rem', background: '#ffcc00', color: '#000', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>FORGE INDUSTRIAL</div>
          <p>© 2026 FORGE INFRASTRUCTURE GRP.</p>
        </footer>
      </main>
    </div>
  );
}
