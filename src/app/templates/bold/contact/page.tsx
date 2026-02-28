"use client";

import { useState } from "react";
import styles from "../bold.module.css";
import Link from "next/link";

export default function BoldContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/bold" className={styles.logo} style={{ textDecoration: 'none' }}>FORGE</Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/templates/bold/about" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900 }}>ABOUT</Link>
          <Link href="/templates/bold/services" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900 }}>SERVICES</Link>
          <Link href="/templates/bold/contact" style={{ color: '#ffcc00', textDecoration: 'none', fontWeight: 900 }}>CONTACT</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1541888087820-252f4c398df9?auto=format&fit=crop&w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '6rem', marginBottom: '2rem' }}>LEAVE <br/> YOUR <br/> <span className={styles.highlight}>MARK.</span></h1>
          <p style={{ fontSize: '1.5rem', maxWidth: '800px', marginBottom: '0', fontFamily: 'sans-serif', color: '#888' }}>
            Ready to initiate a project that will stand for centuries? Connect with our project management team and let's discuss your industrial requirements.
          </p>
        </section>

        <section id="quote" className={styles.quoteSection}>
          <div className={styles.quoteGrid}>
            <div>
              <h2 style={{ fontSize: '4rem', marginBottom: '4rem' }}>CONNECT <br/> WITH <br/> <span className={styles.highlight}>FORGE.</span></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: '#888', fontFamily: 'sans-serif' }}>
                <p>
                  <strong>HEADQUARTERS:</strong><br/>
                  1200 Industrial Dr.<br/>
                  Detroit, MI 48226
                </p>
                <p>
                  <strong>PHONE:</strong><br/>
                  1-800-STEEL-00
                </p>
                <p>
                  <strong>EMAIL:</strong><br/>
                  projects@forge-infrastructure.com
                </p>
              </div>
            </div>
            
            {formState === 'success' ? (
              <div className={styles.successMessage}>
                <h3>QUOTE INITIATED</h3>
                <p>A FOREMAN WILL BE IN TOUCH WITHIN 12 HOURS.</p>
                <button onClick={() => setFormState('idle')} className={styles.cta} style={{ marginTop: '2rem' }}>NEW REQUEST</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleQuoteSubmit}>
                <input type="text" required placeholder="COMPANY NAME" />
                <input type="email" required placeholder="CONTACT EMAIL" />
                <select style={{ background: 'transparent', border: '5px solid rgba(255,255,255,0.1)', padding: '1.5rem', fontSize: '1.25rem', color: '#fff', fontFamily: 'inherit', outline: 'none' }}>
                  <option value="">SERVICE INTEREST</option>
                  <option>STRUCTURAL STEEL</option>
                  <option>INFRASTRUCTURE</option>
                  <option>ENERGY SECTOR</option>
                  <option>MARINE WORK</option>
                </select>
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
