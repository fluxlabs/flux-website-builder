"use client";

import styles from "../bold.module.css";
import Link from "next/link";

export default function BoldAboutPage() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/bold" className={styles.logo} style={{ textDecoration: 'none' }}>FORGE</Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/templates/bold/about" style={{ color: '#ffcc00', textDecoration: 'none', fontWeight: 900 }}>ABOUT</Link>
          <Link href="/templates/bold/services" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900 }}>SERVICES</Link>
          <Link href="/templates/bold/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>QUOTE</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '6rem', marginBottom: '2rem' }}>OUR <br/> <span className={styles.highlight}>LEGACY</span> OF <br/> IRON.</h1>
          <p style={{ fontSize: '1.5rem', maxWidth: '800px', marginBottom: '0', fontFamily: 'sans-serif', color: '#888' }}>
            Founded in 1984, Forge Infrastructure Group has been the backbone of industrial progress for over four decades. We don't just build structures; we build the foundation of modern civilization.
          </p>
        </section>

        <section className={styles.stats}>
          <div className={styles.statItem}>
            <h3>42</h3>
            <p>YEARS OF POWER</p>
          </div>
          <div className={styles.statItem}>
            <h3>8.5k</h3>
            <p>SKILLED WORKERS</p>
          </div>
          <div className={styles.statItem}>
            <h3>0</h3>
            <p>SAFETY INCIDENTS</p>
          </div>
        </section>

        <section style={{ padding: '10rem 5%', background: '#111' }}>
          <div className={styles.quoteGrid}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              <h2 style={{ fontSize: '4rem', color: '#ffcc00' }}>THE <br/> FORGE <br/> ETHOS.</h2>
              <p style={{ fontSize: '1.25rem', lineHeight: '1.6', color: '#888', fontFamily: 'sans-serif' }}>
                We believe in raw power tempered by precision. Every weld, every beam, and every foundation is a testament to our commitment to excellence. We don't cut corners; we forge them.
              </p>
            </div>
            <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', height: '600px', border: '10px solid #ffcc00' }} />
          </div>
        </section>

        <section style={{ padding: '10rem 5%' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '6rem', textAlign: 'center' }}>LEADERSHIP</h2>
          <div className={styles.projects}>
            <div className={styles.projectCard} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80)' }}>
              <div className={styles.projectInfo}>
                <h4>VIKTOR STEEL</h4>
                <p>CHIEF EXECUTIVE OFFICER</p>
              </div>
            </div>
            <div className={styles.projectCard} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80)' }}>
              <div className={styles.projectInfo}>
                <h4>SARAH IRONWOOD</h4>
                <p>CHIEF OPERATIONS OFFICER</p>
              </div>
            </div>
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
