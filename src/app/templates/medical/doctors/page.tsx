"use client";

import styles from "../medical.module.css";
import Link from "next/link";

export default function MedicalDoctorsPage() {
  const doctors = [
    { name: "Dr. Elena Ross", title: "Chief Medical Officer", specialty: "Internal Medicine", image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&w=800&q=80" },
    { name: "Dr. James Chen", title: "Head of Diagnostics", specialty: "Radiology", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80" },
    { name: "Dr. Sarah Miller", title: "Patient Care Director", specialty: "Pediatrics", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80" },
    { name: "Dr. Robert Vance", title: "Lead Surgeon", specialty: "Cardiothoracic Surgery", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80" },
    { name: "Dr. Aisha Khan", title: "Attending Physician", specialty: "Neurology", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80" },
    { name: "Dr. Michael Torres", title: "Attending Physician", specialty: "Orthopedics", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80" }
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
          <Link href="/templates/medical/services" style={{ color: '#666', textDecoration: 'none' }}>Specialties</Link>
          <Link href="/templates/medical/doctors" style={{ color: '#0070f3', textDecoration: 'none' }}>Physicians</Link>
          <Link href="/templates/medical/patients" style={{ color: '#666', textDecoration: 'none' }}>Patients</Link>
          <Link href="/templates/medical/contact" className={styles.cta} style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem' }}>BOOK APPOINTMENT</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ padding: '6rem 5%' }}>
          <div className={styles.heroContent}>
            <h1>World-Class <br/> Physicians.</h1>
            <p>Meet the dedicated team of specialists committed to providing you with the highest standard of care.</p>
          </div>
        </section>

        <section style={{ padding: '4rem 5% 10rem 5%' }}>
          <div className={styles.teamGrid}>
            {doctors.map((doc, i) => (
              <div key={i} className={styles.teamMember}>
                <div className={styles.memberPhoto} style={{ backgroundImage: `url(${doc.image})` }} />
                <h4>{doc.name}</h4>
                <p style={{ color: '#0070f3', fontWeight: 700, marginBottom: '0.25rem' }}>{doc.title}</p>
                <p style={{ fontSize: '0.875rem' }}>{doc.specialty}</p>
              </div>
            ))}
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
