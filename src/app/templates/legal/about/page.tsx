"use client";

import styles from "../legal.module.css";
import Link from "next/link";

export default function LegalAboutPage() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/legal" className={styles.logo} style={{ color: '#fff', textDecoration: 'none' }}>JUSTICE & CO</Link>
        <div style={{ display: 'flex', gap: '3rem', fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1rem', alignItems: 'center' }}>
          <Link href="/templates/legal/about" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '8px' }}>About</Link>
          <Link href="/templates/legal/services" style={{ color: '#fff', textDecoration: 'none' }}>Expertise</Link>
          <Link href="/templates/legal/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem' }}>Consultation</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ padding: '10rem 5%', backgroundImage: 'linear-gradient(to right, #111 40%, transparent 100%), url(https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1950&q=80)' }}>
          <h1>A Legacy of <br/> Uncompromising <br/> Integrity.</h1>
          <p>Founded on the principles of absolute discretion and relentless advocacy, Justice & Co. has been the firm of choice for the world's most complex legal challenges.</p>
        </section>

        <section className={styles.results} style={{ background: '#0a0a0a' }}>
          <div className={styles.resultItem}>
            <strong>1924</strong>
            <span>ESTABLISHED IN NEW YORK</span>
          </div>
          <div className={styles.resultItem}>
            <strong>12</strong>
            <span>GLOBAL OFFICES</span>
          </div>
          <div className={styles.resultItem}>
            <strong>500+</strong>
            <span>EXPERT LITIGATORS</span>
          </div>
        </section>

        <section style={{ padding: '10rem 5%', background: '#111' }}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2 style={{ fontSize: '3.5rem' }}>Our Philosophy</h2>
              <p style={{ marginBottom: '2rem' }}>
                We believe that the best defense is built on a foundation of meticulous research and strategic foresight. At Justice & Co., we don't just react to legal challenges; we anticipate them.
              </p>
              <p>
                Our partners are more than just lawyers; they are strategic advisors who understand the intersection of law, business, and global policy.
              </p>
            </div>
            <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1521791136064-7986c2959213?auto=format&fit=crop&w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', height: '600px', border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>
        </section>

        <section className={styles.partnersSection} style={{ background: '#050505' }}>
          <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '6rem' }}>Global Presence</h2>
          <div className={styles.grid}>
            <div className={styles.areaCard}>
              <h3 style={{ fontSize: '1.25rem', letterSpacing: '0.1rem', textTransform: 'uppercase' }}>NEW YORK</h3>
              <p>Centrally located in the heart of the financial district, serving as our global headquarters.</p>
            </div>
            <div className={styles.areaCard}>
              <h3 style={{ fontSize: '1.25rem', letterSpacing: '0.1rem', textTransform: 'uppercase' }}>LONDON</h3>
              <p>Managing our European litigation and cross-border corporate advisory services.</p>
            </div>
            <div className={styles.areaCard}>
              <h3 style={{ fontSize: '1.25rem', letterSpacing: '0.1rem', textTransform: 'uppercase' }}>SINGAPORE</h3>
              <p>Our gateway to the Asian markets and specialized international arbitration cases.</p>
            </div>
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
