"use client";

import { useState } from "react";
import styles from "./legal.module.css";
import Link from "next/link";

export default function LegalTemplate() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleEvalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>JUSTICE & CO</div>
        <div style={{ display: 'flex', gap: '3rem', fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1rem', alignItems: 'center' }}>
          <a href="#expertise" style={{ color: '#fff', textDecoration: 'none' }}>Expertise</a>
          <a href="#partners" style={{ color: '#fff', textDecoration: 'none' }}>Partners</a>
          <a href="#consult" className={styles.cta} style={{ padding: '0.5rem 1.5rem' }}>Consultation</a>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ backgroundImage: 'linear-gradient(to right, #111 40%, transparent 100%), url(https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1950&q=80)' }}>
          <h1>Unwavering Defense. <br/> Exceptional Results.</h1>
          <p>We provide high-stakes legal representation for complex corporate and personal matters. Our legacy is built on precision and power.</p>
          <a href="#partners" className={styles.cta}>Meet Our Partners</a>
        </section>

        <section className={styles.results}>
          <div className={styles.resultItem}>
            <strong>$140M</strong>
            <span>Settlement for Tech IP Case</span>
          </div>
          <div className={styles.resultItem}>
            <strong>98%</strong>
            <span>Success Rate in Litigation</span>
          </div>
          <div className={styles.resultItem}>
            <strong>40+</strong>
            <span>Fortune 500 Clients</span>
          </div>
        </section>

        <section id="expertise" className={styles.practiceAreas}>
          <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '6rem' }}>Areas of Expertise</h2>
          <div className={styles.grid}>
            <div className={styles.areaCard}>
              <h3>Corporate Law</h3>
              <p>Navigating the complexities of global business, mergers, and high-value acquisitions.</p>
            </div>
            <div className={styles.areaCard}>
              <h3>Criminal Defense</h3>
              <p>Aggressive representation for white-collar crimes and sensitive personal litigation.</p>
            </div>
            <div className={styles.areaCard}>
              <h3>IP Litigation</h3>
              <p>Protecting your most valuable assets in an increasingly digital and competitive world.</p>
            </div>
          </div>
        </section>

        <section id="partners" className={styles.partnersSection}>
          <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '6rem' }}>Our Partners</h2>
          <div className={styles.partnersGrid}>
            <div className={styles.partnerCard}>
              <div className={styles.partnerPhoto} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80)' }} />
              <h4>Arthur Justice</h4>
              <p>Managing Partner</p>
            </div>
            <div className={styles.partnerCard}>
              <div className={styles.partnerPhoto} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80)' }} />
              <h4>Elena Thorne</h4>
              <p>Head of Litigation</p>
            </div>
          </div>
        </section>

        <section id="consult" className={styles.contactSection}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>Case Evaluation</h2>
              <p>Confidential and comprehensive legal strategy sessions for qualified cases. Contact our firm today to schedule a consultation with our senior partners.</p>
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
