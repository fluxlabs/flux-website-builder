"use client";

import { useState } from "react";
import styles from "./medical.module.css";
import Link from "next/link";

export default function MedicalTemplate() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <span>Emergency: 911</span>
        <span>Open 24/7 for Patient Care</span>
      </div>
      
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <div style={{ width: '30px', height: '30px', background: '#0070f3', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900 }}>+</div>
          PULSE MEDICAL
        </div>
        <div style={{ display: 'flex', gap: '2.5rem', fontWeight: 600, alignItems: 'center' }}>
          <Link href="/templates/medical/about" style={{ color: '#666', textDecoration: 'none' }}>About Us</Link>
          <Link href="/templates/medical/services" style={{ color: '#666', textDecoration: 'none' }}>Specialties</Link>
          <Link href="/templates/medical/contact" className={styles.cta} style={{ padding: '0.6rem 1.5rem' }}>Book Now</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Modern Medicine, <br/> Compassionate Care.</h1>
            <p>Experience healthcare redefined. We combine cutting-edge medical technology with a patient-first approach to ensure your well-being.</p>
            <a href="#book" className={styles.cta}>Start Your Journey</a>
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

        <section id="services" className={styles.services}>
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

        <section id="team" className={styles.teamSection}>
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

        <section id="book" className={styles.bookingSection}>
          <div className={styles.bookingCard}>
            <div className={styles.bookingInfo}>
              <h2>Book an Appointment</h2>
              <p>Schedule your visit with our specialists today. We offer flexible hours and remote consultations.</p>
            </div>
            
            {formState === 'success' ? (
              <div className={styles.successMessage}>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Booking Confirmed</h3>
                <p>We've sent a calendar invitation to your email.</p>
                <button onClick={() => setFormState('idle')} className={styles.cta} style={{ marginTop: '2rem', background: '#fff', color: '#003366', border: 'none' }}>Book Another</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleBookingSubmit}>
                <div className={styles.formGrid}>
                  <input type="text" required placeholder="Patient Name" />
                  <input type="tel" required placeholder="Phone Number" />
                  <select required>
                    <option value="">Select Specialty</option>
                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>Orthopedics</option>
                  </select>
                  <input type="date" required />
                </div>
                <button type="submit" className={styles.cta} style={{ width: '100%', marginTop: '2rem', border: 'none', cursor: 'pointer', background: '#0070f3', color: '#fff' }} disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? 'Processing...' : 'Schedule Visit'}
                </button>
              </form>
            )}
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
