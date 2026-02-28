import styles from "./medical.module.css";
import Link from "next/link";

export default function MedicalTemplate() {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <span>Emergency: 911</span>
        <span>Open 24/7 for Patient Care</span>
      </div>
      
      <nav className={styles.nav}>
        <div className={styles.logo}>PulseHealth</div>
        <div style={{ display: 'flex', gap: '2.5rem', fontWeight: 600 }}>
          <span>Specialties</span>
          <span>Patients</span>
          <span>Locations</span>
          <Link href="/intake" className={styles.cta} style={{ padding: '0.6rem 1.5rem', marginTop: '-0.2rem' }}>Book Now</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Modern Medicine, <br/> Compassionate Care.</h1>
            <p>Experience healthcare redefined. We combine cutting-edge medical technology with a patient-first approach to ensure your well-being.</p>
            <Link href="/intake" className={styles.cta}>Start Your Journey</Link>
          </div>
          <div className={styles.imagePlaceholder} />
        </section>

        <section className={styles.services}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem', color: '#003366' }}>Our Specializations</h2>
          <div className={styles.serviceGrid}>
            <div className={styles.serviceCard}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🫀</div>
              <h3>Cardiology</h3>
              <p>Advanced heart care with the latest diagnostic imaging.</p>
            </div>
            <div className={styles.serviceCard}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧠</div>
              <h3>Neurology</h3>
              <p>Comprehensive treatment for brain and nervous system health.</p>
            </div>
            <div className={styles.serviceCard}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🦷</div>
              <h3>Dental Care</h3>
              <p>Premium oral health services for the whole family.</p>
            </div>
            <div className={styles.serviceCard}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🦴</div>
              <h3>Orthopedics</h3>
              <p>Expert care for bones, joints, and sports injuries.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>PulseHealth</div>
        <p style={{ opacity: 0.6 }}>© 2026 Pulse Health Systems. A Flux Reference Build.</p>
      </footer>
    </div>
  );
}
