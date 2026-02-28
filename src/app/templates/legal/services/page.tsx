"use client";

import styles from "../legal.module.css";
import Link from "next/link";

export default function LegalServicesPage() {
  const practiceAreas = [
    { title: "CORPORATE LAW", desc: "Expert advisory for mergers, acquisitions, and multi-national business strategy.", image: "https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&w=1200&q=80" },
    { title: "CRIMINAL DEFENSE", desc: "High-stakes representation for white-collar crimes and sensitive personal litigation.", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80" },
    { title: "IP LITIGATION", desc: "Aggressive protection of your most valuable intellectual and digital assets.", image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80" },
    { title: "GLOBAL COMPLIANCE", desc: "Navigating the complex landscape of international regulatory frameworks.", image: "https://images.unsplash.com/photo-1521791136064-7986c2959213?auto=format&fit=crop&w=1200&q=80" }
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/legal" className={styles.logo} style={{ color: '#fff', textDecoration: 'none' }}>JUSTICE & CO</Link>
        <div style={{ display: 'flex', gap: '3rem', fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1rem', alignItems: 'center' }}>
          <Link href="/templates/legal/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
          <Link href="/templates/legal/services" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '8px' }}>Expertise</Link>
          <Link href="/templates/legal/cases" style={{ color: '#fff', textDecoration: 'none' }}>Cases</Link>
          <Link href="/templates/legal/team" style={{ color: '#fff', textDecoration: 'none' }}>Partners</Link>
          <Link href="/templates/legal/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem' }}>Consultation</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ padding: '10rem 5%', backgroundImage: 'linear-gradient(to right, #111 40%, transparent 100%), url(https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1950&q=80)' }}>
          <h1>Our Strategic <br/> Expertise.</h1>
          <p>We provide unparalleled legal advocacy across the most critical sectors of the modern economy and society.</p>
        </section>

        <section style={{ padding: '10rem 5%', background: '#0a0a0a' }}>
          <div className={styles.grid}>
            {practiceAreas.map((area, i) => (
              <div key={i} className={styles.areaCard}>
                <h3 style={{ fontSize: '1.25rem', letterSpacing: '0.1rem', textTransform: 'uppercase' }}>{area.title}</h3>
                <p style={{ marginBottom: '2rem' }}>{area.desc}</p>
                <div style={{ backgroundImage: `url(${area.image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px', border: '1px solid rgba(255,255,255,0.05)' }} />
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '10rem 5%', background: '#111' }}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2 style={{ fontSize: '3rem' }}>Bespoke Strategy</h2>
              <p>Every case we handle is assigned a dedicated team of partners and associates who develop a tailored legal roadmap. We don't believe in one-size-fits-all solutions.</p>
            </div>
            <Link href="/templates/legal/contact" className={styles.cta} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', fontSize: '1.5rem', background: '#fff', color: '#000' }}>
              SCHEDULE A CASE EVALUATION
            </Link>
          </div>
        </section>

        <footer style={{ padding: '5rem 5%', textAlign: 'center', background: '#000', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.2rem', marginBottom: '1.5rem' }}>JUSTICE & CO</div>
          <p style={{ opacity: 0.3, fontSize: '0.75rem', fontFamily: 'Inter' }}>ATTORNEY ADVERTISING // © 2026 JUSTICE & CO. GLOBAL LLP</p>
        </footer>
      </main>
    </div>
  );
}
