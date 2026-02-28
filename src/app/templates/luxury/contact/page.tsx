"use client";

import { useState } from "react";
import styles from "../luxury.module.css";
import Link from "next/link";

export default function LuxuryContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav} style={{ flexDirection: 'column', gap: '2rem' }}>
        <Link href="/templates/luxury" className={styles.logo} style={{ color: '#1c1917', textDecoration: 'none' }}>VALENTE</Link>
        <div style={{ display: 'flex', gap: '4rem', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2rem' }}>
          <Link href="/templates/luxury/about" style={{ color: '#1c1917', textDecoration: 'none' }}>Story</Link>
          <Link href="/templates/luxury/services" style={{ color: '#1c1917', textDecoration: 'none' }}>Atelier</Link>
          <Link href="/templates/luxury/contact" style={{ color: '#1c1917', textDecoration: 'underline', textUnderlineOffset: '12px' }}>Inquiry</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ height: '70vh' }}>
          <div className={styles.heroImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80)' }} />
          <div className={styles.heroContent}>
            <span className={styles.label}>INQUIRY</span>
            <h1 style={{ fontSize: '4rem', fontWeight: 300, lineHeight: 1.2, marginBottom: '2rem' }}>A Private <br/> Consultation.</h1>
            <p style={{ color: '#57534e', lineHeight: 1.8 }}>We appreciate your interest in the Valente Atelier. For private inquiries and consultations, please provide your details below. Our specialists will reach out discreetly.</p>
          </div>
        </section>

        <section className={styles.viewingSection} style={{ background: '#1c1917', color: '#fff' }}>
          <div className={styles.viewingContainer} style={{ textAlign: 'left', maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '4rem' }}>Initiate Dialogue.</h2>
            
            {formState === 'success' ? (
              <div className={styles.successMessage}>
                <h3 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '1.5rem' }}>Receipt Acknowledged.</h3>
                <p style={{ color: '#a8a29e', marginBottom: '2rem' }}>A Valente representative will contact you with the utmost discretion within 48 business hours.</p>
                <button onClick={() => setFormState('idle')} className={styles.cta} style={{ border: '1px solid #fff', color: '#fff' }}>New Inquiry</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleInquirySubmit}>
                <div className={styles.formRow}>
                  <input type="text" required placeholder="Full Name" />
                  <input type="email" required placeholder="Private Email" />
                </div>
                <div className={styles.formRow}>
                  <select style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '1rem 0', color: '#fff', outline: 'none', fontFamily: 'inherit' }}>
                    <option value="">SERVICE OF INTEREST</option>
                    <option>ARCHITECTURAL CURATION</option>
                    <option>INTERIOR COMPOSITION</option>
                    <option>MATERIAL SELECTION</option>
                    <option>FURNITURE ARCHIVE</option>
                  </select>
                  <input type="text" placeholder="Region" />
                </div>
                <textarea required placeholder="Vision and Objectives" />
                <button type="submit" className={styles.cta} disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? 'Acknowledging...' : 'Initiate Inquiry'}
                </button>
              </form>
            )}
          </div>
        </section>

        <section style={{ padding: '8rem 5%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4rem', textAlign: 'center', background: '#fff' }}>
          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1rem', marginBottom: '1.5rem' }}>MILAN</h3>
            <p style={{ fontSize: '0.875rem', color: '#78716c' }}>Via della Spiga, 14<br/>20121 Milano MI, Italy</p>
          </div>
          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1rem', marginBottom: '1.5rem' }}>PARIS</h3>
            <p style={{ fontSize: '0.875rem', color: '#78716c' }}>Rue du Faubourg Saint-Honoré, 25<br/>75008 Paris, France</p>
          </div>
          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1rem', marginBottom: '1.5rem' }}>NEW YORK</h3>
            <p style={{ fontSize: '0.875rem', color: '#78716c' }}>Fifth Avenue, 720<br/>New York, NY 10019</p>
          </div>
        </section>

        <footer style={{ padding: '8rem 5%', textAlign: 'center', borderTop: '1px solid #e7e5e4' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 300, letterSpacing: '0.5rem', marginBottom: '2rem' }}>VALENTE</div>
          <p style={{ fontSize: '0.7rem', color: '#a8a29e', letterSpacing: '0.2rem' }}>© 2026 VALENTE ATELIER // ALL RIGHTS RESERVED</p>
        </footer>
      </main>
    </div>
  );
}
