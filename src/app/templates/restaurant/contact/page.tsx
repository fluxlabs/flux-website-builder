"use client";

import { useState } from "react";
import styles from "../restaurant.module.css";
import Link from "next/link";

export default function RestaurantContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleResSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/restaurant" className={styles.logo} style={{ color: '#fff', textDecoration: 'none' }}>AURA</Link>
        <div style={{ display: 'flex', gap: '3rem', fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2rem', alignItems: 'center' }}>
          <Link href="/templates/restaurant/about" style={{ color: '#fff', textDecoration: 'none' }}>Story</Link>
          <Link href="/templates/restaurant/services" style={{ color: '#fff', textDecoration: 'none' }}>Menu</Link>
          <Link href="/templates/restaurant/gallery" style={{ color: '#fff', textDecoration: 'none' }}>Atmosphere</Link>
          <Link href="/templates/restaurant/private-dining" style={{ color: '#fff', textDecoration: 'none' }}>Private Events</Link>
          <Link href="/templates/restaurant/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem', fontSize: '0.7rem' }}>RESERVE</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ height: '70vh', backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1550966842-28c2e2ca0435?auto=format&fit=crop&w=1600&q=80)' }}>
          <label className={styles.label}>RESERVATIONS</label>
          <h1 style={{ fontSize: '5rem' }}>Secure Your <br/> Seat at <br/> the Hearth.</h1>
          <p>We accept reservations up to 60 days in advance. For larger parties or private events, please contact our hospitality director directly.</p>
        </section>

        <section className={styles.reservationSection}>
          <div className={styles.resCard}>
            <h2 style={{ fontSize: '3rem' }}>Reserve Aura.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', margin: '4rem 0', color: '#888', fontFamily: 'Inter', textAlign: 'center' }}>
              <p>
                <strong>ADDRESS</strong><br/>
                850 Hearth St.<br/>
                Austin, TX 78701<br/>
                T: +1 512 555 0122
              </p>
              <p>
                <strong>HOURS</strong><br/>
                Tues - Sun: 5pm - 11pm<br/>
                Closed Mondays
              </p>
            </div>
            
            {formState === 'success' ? (
              <div className={styles.successMessage}>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#eab308' }}>RESERVATION RECEIVED</h3>
                <p style={{ opacity: 0.6 }}>A confirmation has been sent to your email. We look forward to hosting you.</p>
                <button onClick={() => setFormState('idle')} className={styles.cta} style={{ marginTop: '2rem' }}>NEW BOOKING</button>
              </div>
            ) : (
              <form className={styles.formGrid} onSubmit={handleResSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input type="text" required placeholder="Full Name" />
                <input type="email" required placeholder="Email Address" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                  <input type="date" required style={{ color: 'rgba(255,255,255,0.5)' }} />
                  <select style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem', color: '#fff', outline: 'none' }}>
                    <option>2 GUESTS</option>
                    <option>3 GUESTS</option>
                    <option>4 GUESTS</option>
                    <option>5+ GUESTS</option>
                  </select>
                  <select style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem', color: '#fff', outline: 'none' }}>
                    <option>6:00 PM</option>
                    <option>7:00 PM</option>
                    <option>8:00 PM</option>
                    <option>9:00 PM</option>
                  </select>
                </div>
                <button type="submit" className={styles.cta} style={{ border: '1px solid #eab308', cursor: 'pointer', background: 'transparent', color: '#eab308', width: '100%', padding: '1.5rem' }} disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? 'PROCESSING...' : 'REQUEST RESERVATION'}
                </button>
              </form>
            )}
          </div>
        </section>

        <footer style={{ padding: '8rem 5%', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#050505' }}>
          <div style={{ fontSize: '2rem', letterSpacing: '0.5rem', marginBottom: '2rem' }}>AURA</div>
          <p style={{ fontSize: '0.7rem', color: '#444', letterSpacing: '0.2rem', fontFamily: 'Inter', fontWeight: 800 }}>© 2026 AURA DINING GROUP // ALL RIGHTS RESERVED</p>
        </footer>
      </main>
    </div>
  );
}
