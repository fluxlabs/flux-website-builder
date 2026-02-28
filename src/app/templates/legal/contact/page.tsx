"use client";

import { useState } from "react";
import styles from "../legal.module.css";
import Link from "next/link";

export default function LegalContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleEvalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/legal" className={styles.logo} style={{ color: '#fff', textDecoration: 'none' }}>JUSTICE & CO</Link>
        <div style={{ display: 'flex', gap: '3rem', fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1rem', alignItems: 'center' }}>
          <Link href="/templates/legal/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
          <Link href="/templates/legal/services" style={{ color: '#fff', textDecoration: 'none' }}>Expertise</Link>
          <Link href="/templates/legal/contact" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '8px' }}>Consultation</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ padding: '10rem 5%', backgroundImage: 'linear-gradient(to right, #111 40%, transparent 100%), url(https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1950&q=80)' }}>
          <h1>Secure Your <br/> Confidential <br/> Evaluation.</h1>
          <p>Contact our global headquarters or any of our regional offices to schedule a secure consultation with our partners.</p>
        </section>

        <section id="consult" className={styles.contactSection}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2 style={{ fontSize: '3rem' }}>Global Inquiries</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', color: '#888', fontFamily: 'Inter', marginTop: '4rem' }}>
                <p>
                  <strong>NEW YORK HEADQUARTERS</strong><br/>
                  7 World Trade Center<br/>
                  New York, NY 10007<br/>
                  T: +1 212 555 0199
                </p>
                <p>
                  <strong>LONDON OFFICE</strong><br/>
                  The Shard, Level 24<br/>
                  32 London Bridge St.<br/>
                  T: +44 20 7946 0000
                </p>
                <p>
                  <strong>SINGAPORE OFFICE</strong><br/>
                  Marina Bay Financial Centre<br/>
                  10 Marina Blvd.<br/>
                  T: +65 6789 0000
                </p>
              </div>
            </div>
            
            {formState === 'success' ? (
              <div className={styles.successMessage}>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Inquiry Received</h3>
                <p style={{ opacity: 0.6, fontFamily: 'Inter' }}>Our office will contact you within 24 business hours to arrange a confidential discussion.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleEvalSubmit}>
                <div className={styles.formRow}>
                  <input type="text" required placeholder="Full Name" />
                  <input type="email" required placeholder="Email" />
                </div>
                <select required>
                  <option value="">Practice Area</option>
                  <option>Corporate</option>
                  <option>Criminal</option>
                  <option>IP Litigation</option>
                  <option>Global Compliance</option>
                </select>
                <textarea required placeholder="Brief Case Summary" />
                <button type="submit" className={styles.cta} style={{ border: 'none', cursor: 'pointer', background: '#fff', color: '#000' }} disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? 'Submitting...' : 'Request Consultation'}
                </button>
              </form>
            )}
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
