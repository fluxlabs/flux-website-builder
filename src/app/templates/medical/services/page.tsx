"use client";

import styles from "../medical.module.css";
import Link from "next/link";

export default function MedicalServicesPage() {
  const specialties = [
    { title: "CARDIOLOGY", desc: "Advanced cardiac care and diagnostic imaging for heart health.", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" },
    { title: "NEUROLOGY", desc: "Specialized care for neurological disorders and brain health.", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80" },
    { title: "PEDIATRICS", desc: "Compassionate healthcare for children from birth through adolescence.", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80" },
    { title: "DIAGNOSTICS", desc: "State-of-the-art laboratory and imaging services for precise diagnosis.", image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&w=800&q=80" },
    { title: "SURGERY", desc: "Minimally invasive and complex surgical procedures by expert teams.", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" },
    { title: "THERAPY", desc: "Physical and rehabilitation therapies for recovery and mobility.", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80" }
  ];

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
          <Link href="/templates/medical/services" style={{ color: '#0070f3', textDecoration: 'none' }}>Specialties</Link>
          <Link href="/templates/medical/contact" className={styles.cta} style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem' }}>BOOK APPOINTMENT</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ padding: '6rem 5%' }}>
          <div className={styles.heroContent}>
            <h1>Visionary <br/> Specialties. <br/> Expert Care.</h1>
            <p>Our medical group provides comprehensive care across a wide range of specialties, ensuring every patient receives the precise treatment they need.</p>
          </div>
          <div className={styles.imagePlaceholder} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </section>

        <section className={styles.services}>
          <div className={styles.serviceGrid}>
            {specialties.map((specialty, i) => (
              <div key={i} className={styles.serviceCard}>
                <div style={{ height: '150px', backgroundImage: `url(${specialty.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '12px', marginBottom: '2rem' }} />
                <h3 style={{ fontSize: '1.25rem', color: '#003366', fontWeight: 800, marginBottom: '1rem' }}>{specialty.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.6 }}>{specialty.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bookingSection} style={{ background: '#f8fbff' }}>
          <div className={styles.bookingCard}>
            <div className={styles.bookingInfo}>
              <h2>Book Care.</h2>
              <p>Schedule a consultation with our specialized medical teams today. We prioritize rapid diagnostics and patient outcomes.</p>
              <Link href="/templates/medical/contact" className={styles.cta} style={{ marginTop: '3rem', background: '#fff', color: '#0070f3' }}>SCHEDULE NOW</Link>
            </div>
            <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100%', borderRadius: '30px' }} />
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
