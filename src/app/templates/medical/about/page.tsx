"use client";

import styles from "../medical.module.css";
import Link from "next/link";

export default function MedicalAboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <span>Emergency: 1-800-PULSE-MED</span>
        <span>Open 24/7 for Critical Care</span>
      </div>
      
      <nav className={styles.nav}>
        <Link href="/templates/medical" className={styles.logo} style={{ textDecoration: 'none' }}>
          <div style={{ width: '30px', height: '30px', background: '#0070f3', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900 }}>+</div>
          PULSE MEDICAL
        </Link>
        <div style={{ display: 'flex', gap: '2.5rem', fontWeight: 600, fontSize: '0.9rem', alignItems: 'center' }}>
          <Link href="/templates/medical/about" style={{ color: '#0070f3', textDecoration: 'none' }}>About Us</Link>
          <Link href="/templates/medical/services" style={{ color: '#666', textDecoration: 'none' }}>Specialties</Link>
          <Link href="/templates/medical/contact" className={styles.cta} style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem' }}>BOOK APPOINTMENT</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ padding: '6rem 5%' }}>
          <div className={styles.heroContent}>
            <h1>Redefining <br/> Modern Care <br/> Since 2012.</h1>
            <p>At Pulse Medical, we combine world-class expertise with the latest in healthcare technology to deliver patient-centered outcomes that matter.</p>
          </div>
          <div className={styles.imagePlaceholder} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </section>

        <section className={styles.stats}>
          <div className={styles.stat}>
            <strong>15+</strong>
            <span>YEARS OF SERVICE</span>
          </div>
          <div className={styles.stat}>
            <strong>250k</strong>
            <span>PATIENTS TREATED</span>
          </div>
          <div className={styles.stat}>
            <strong>99%</strong>
            <span>PATIENT SATISFACTION</span>
          </div>
          <div className={styles.stat}>
            <strong>45</strong>
            <span>AWARDS WON</span>
          </div>
        </section>

        <section className={styles.teamSection}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '3rem', color: '#003366', fontWeight: 800 }}>Our Vision</h2>
            <p style={{ maxWidth: '700px', margin: '2rem auto', fontSize: '1.25rem', color: '#666', lineHeight: 1.6 }}>
              Our mission is to lead the industry in diagnostic precision and compassionate care. We envision a world where every individual has access to visionary healthcare.
            </p>
          </div>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&w=800&q=80)' }} />
              <h4>Dr. Elena Ross</h4>
              <p>CHIEF MEDICAL OFFICER</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80)' }} />
              <h4>Dr. James Chen</h4>
              <p>HEAD OF DIAGNOSTICS</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80)' }} />
              <h4>Dr. Sarah Miller</h4>
              <p>PATIENT CARE DIRECTOR</p>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>PULSE MEDICAL GROUP</div>
          <p>© 2026 PULSE MEDICAL // COMMITTED TO EXCELLENCE</p>
        </footer>
      </main>
    </div>
  );
}
