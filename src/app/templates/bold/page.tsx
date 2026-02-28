"use client";

import { useState } from "react";
import styles from "./bold.module.css";
import Link from "next/link";

export default function BoldTemplate() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>FORGE</div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/templates/bold/about" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900 }}>ABOUT</Link>
          <Link href="/templates/bold/services" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900 }}>SERVICES</Link>
          <Link href="/templates/bold/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>QUOTE</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <h1>WE BUILD <br/> THE <span className={styles.highlight}>FUTURE</span> <br/> OF STEEL.</h1>
          <p style={{ fontSize: '1.5rem', maxWidth: '600px', marginBottom: '4rem', fontFamily: 'sans-serif' }}>
            Heavy industrial solutions for a world that never stops. We move the earth, we shape the metal, we power the grid.
          </p>
          <a href="#quote" className={styles.cta}>GET A QUOTE</a>
        </section>

        <section className={styles.certs}>
          <div className={styles.certItem}>ISO 9001:2015</div>
          <div className={styles.certItem}>ASME CERTIFIED</div>
          <div className={styles.certItem}>OSHA DIAMOND</div>
          <div className={styles.certItem}>LEED PLATINUM</div>
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

        <section id="projects" className={styles.projects}>
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
          <div className={styles.projectCard} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541888087820-252f4c398df9?auto=format&fit=crop&w=1200&q=80)' }}>
            <div className={styles.projectInfo}>
              <h4>PORT EXPANSION</h4>
              <p>MARINE // SEATTLE, WA</p>
            </div>
          </div>
          <div className={styles.projectCard} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534398079543-7ae6d016b8be?auto=format&fit=crop&w=1200&q=80)' }}>
            <div className={styles.projectInfo}>
              <h4>FOUNDRY ZERO</h4>
              <p>MANUFACTURING // DETROIT, MI</p>
            </div>
          </div>
        </section>

        <section id="quote" className={styles.quoteSection}>
          <div className={styles.quoteGrid}>
            <h2>LET'S TALK <br/> <span className={styles.highlight}>POWER.</span></h2>
            {formState === 'success' ? (
              <div className={styles.successMessage}>
                <h3>QUOTE INITIATED</h3>
                <p>A FOREMAN WILL BE IN TOUCH.</p>
                <button onClick={() => setFormState('idle')} className={styles.cta} style={{ marginTop: '2rem' }}>NEW REQUEST</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleQuoteSubmit}>
                <input type="text" required placeholder="COMPANY NAME" />
                <input type="email" required placeholder="CONTACT EMAIL" />
                <textarea required placeholder="PROJECT SCOPE" />
                <button type="submit" className={styles.cta} disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? 'PROCESSING...' : 'INITIATE QUOTE'}
                </button>
              </form>
            )}
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
