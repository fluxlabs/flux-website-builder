"use client";

import styles from "../medical.module.css";
import Link from "next/link";

export default function MedicalPatientsPage() {
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
          <Link href="/templates/medical/patients" style={{ color: '#0070f3', textDecoration: 'none' }}>Patients</Link>
          <Link href="/templates/medical/contact" className={styles.cta} style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem' }}>BOOK APPOINTMENT</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ padding: '6rem 5%', background: '#f8fbff' }}>
          <div className={styles.heroContent}>
            <h1>Patient <br/> Resources.</h1>
            <p>Access your medical records, fill out new patient forms, and learn what to expect during your visit.</p>
          </div>
        </section>

        <section style={{ padding: '8rem 5%', display: 'flex', gap: '4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ flex: '1 1 300px', background: '#fff', border: '1px solid #eee', borderRadius: '24px', padding: '3rem', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '50px', height: '50px', background: '#e6f0ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0070f3', marginBottom: '2rem', fontSize: '1.5rem' }}>📄</div>
            <h3 style={{ fontSize: '1.5rem', color: '#003366', marginBottom: '1rem' }}>New Patient Forms</h3>
            <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '2rem' }}>Download and complete your medical history forms before your first visit to save time.</p>
            <button style={{ background: 'transparent', border: '2px solid #0070f3', color: '#0070f3', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Download PDF</button>
          </div>

          <div style={{ flex: '1 1 300px', background: '#fff', border: '1px solid #eee', borderRadius: '24px', padding: '3rem', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '50px', height: '50px', background: '#e6f0ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0070f3', marginBottom: '2rem', fontSize: '1.5rem' }}>💻</div>
            <h3 style={{ fontSize: '1.5rem', color: '#003366', marginBottom: '1rem' }}>Secure Portal</h3>
            <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '2rem' }}>Access your test results, securely message your doctor, and request prescription refills.</p>
            <button style={{ background: '#0070f3', border: 'none', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Log In</button>
          </div>

          <div style={{ flex: '1 1 300px', background: '#fff', border: '1px solid #eee', borderRadius: '24px', padding: '3rem', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '50px', height: '50px', background: '#e6f0ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0070f3', marginBottom: '2rem', fontSize: '1.5rem' }}>💳</div>
            <h3 style={{ fontSize: '1.5rem', color: '#003366', marginBottom: '1rem' }}>Billing & Insurance</h3>
            <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '2rem' }}>View accepted insurance providers, understand your statements, and pay your bill online.</p>
            <button style={{ background: 'transparent', border: '2px solid #0070f3', color: '#0070f3', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Pay Bill</button>
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
