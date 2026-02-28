"use client";

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
          <div className={styles.imagePlaceholder} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </section>

        <section className={styles.stats}>
          <div className={styles.stat}>
            <strong>15k+</strong>
            <span>Patients Served</span>
          </div>
          <div className={styles.stat}>
            <strong>450+</strong>
            <span>Expert Doctors</span>
          </div>
          <div className={styles.stat}>
            <strong>12</strong>
            <span>Specialty Clinics</span>
          </div>
          <div className={styles.stat}>
            <strong>98%</strong>
            <span>Patient Satisfaction</span>
          </div>
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

        <section className={styles.teamSection}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem', color: '#003366' }}>Meet Our Experts</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80)' }} />
              <h4>Dr. James Wilson</h4>
              <p>Chief of Cardiology</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80)' }} />
              <h4>Dr. Sarah Chen</h4>
              <p>Senior Neurologist</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&w=400&q=80)' }} />
              <h4>Dr. Robert Miller</h4>
              <p>Orthopedic Surgeon</p>
            </div>
          </div>
        </section>

        <section className={styles.bookingSection}>
          <div className={styles.bookingCard}>
            <div className={styles.bookingInfo}>
              <h2>Book an Appointment</h2>
              <p>Schedule your visit with our specialists today. We offer flexible hours and remote consultations.</p>
            </div>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formGrid}>
                <input type="text" placeholder="Patient Name" />
                <input type="tel" placeholder="Phone Number" />
                <select>
                  <option>Select Specialty</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Orthopedics</option>
                </select>
                <input type="date" />
              </div>
              <button type="button" className={styles.cta} style={{ width: '100%', marginTop: '2rem', border: 'none', cursor: 'pointer' }}>Schedule Visit</button>
            </form>
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
