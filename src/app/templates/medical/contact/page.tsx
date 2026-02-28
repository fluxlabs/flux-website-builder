"use client";

import { useState } from "react";
import styles from "../medical.module.css";
import Link from "next/link";

export default function MedicalContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

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
          <Link href="/templates/medical/about" style={{ color: '#666', textDecoration: 'none' }}>About Us</Link>
          <Link href="/templates/medical/services" style={{ color: '#666', textDecoration: 'none' }}>Specialties</Link>
          <Link href="/templates/medical/doctors" style={{ color: '#666', textDecoration: 'none' }}>Physicians</Link>
          <Link href="/templates/medical/patients" style={{ color: '#666', textDecoration: 'none' }}>Patients</Link>
          <Link href="/templates/medical/contact" className={styles.cta} style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem' }}>BOOK APPOINTMENT</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ padding: '6rem 5%' }}>
          <div className={styles.heroContent}>
            <h1>Secure Your <br/> Consult. <br/> Feel Better.</h1>
            <p>Our patient care coordination team is ready to assist you in scheduling your next visit or diagnostic procedure.</p>
          </div>
          <div className={styles.imagePlaceholder} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </section>

        <section className={styles.bookingSection}>
          <div className={styles.bookingCard}>
            <div className={styles.bookingInfo}>
              <h2>Book Care.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '4rem', color: 'rgba(255,255,255,0.7)' }}>
                <p>
                  <strong>MAIN CAMPUS</strong><br/>
                  450 Medical Plaza<br/>
                  Chicago, IL 60611<br/>
                  T: 1-800-PULSE-MED
                </p>
                <p>
                  <strong>PATIENT PORTAL</strong><br/>
                  Access your records, test results, and secure messaging online via our patient portal.
                </p>
              </div>
            </div>
            
            {formState === 'success' ? (
              <div className={styles.successMessage}>
                <h3>APPOINTMENT REQUESTED</h3>
                <p>A CARE COORDINATOR WILL CONTACT YOU WITHIN 4 HOURS TO FINALIZE YOUR TIME.</p>
                <button onClick={() => setFormState('idle')} className={styles.cta} style={{ marginTop: '2rem', background: '#fff', color: '#003366' }}>NEW REQUEST</button>
              </div>
            ) : (
              <form className={styles.formGrid} onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input type="text" required placeholder="Full Name" />
                <input type="email" required placeholder="Email Address" />
                <input type="tel" required placeholder="Phone Number" />
                <select style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '1rem', borderRadius: '12px', color: '#fff', outline: 'none' }}>
                  <option value="">SELECT SPECIALTY</option>
                  <option>CARDIOLOGY</option>
                  <option>NEUROLOGY</option>
                  <option>PEDIATRICS</option>
                  <option>DIAGNOSTICS</option>
                  <option>SURGERY</option>
                </select>
                <input type="date" required style={{ color: 'rgba(255,255,255,0.5)' }} />
                <button type="submit" className={styles.cta} style={{ border: 'none', cursor: 'pointer', background: '#fff', color: '#003366', width: '100%' }} disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? 'PROCESSING...' : 'REQUEST APPOINTMENT'}
                </button>
              </form>
            )}
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
