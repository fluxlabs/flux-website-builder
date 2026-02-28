"use client";

import { useState } from "react";
import styles from "../restaurant.module.css";
import Link from "next/link";

export default function RestaurantPrivateDiningPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
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
          <Link href="/templates/restaurant/private-dining" style={{ color: '#eab308', textDecoration: 'none' }}>Private Events</Link>
          <Link href="/templates/restaurant/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem', fontSize: '0.7rem' }}>RESERVE</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ height: '70vh', backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80)' }}>
          <label className={styles.label}>EXCLUSIVE USE</label>
          <h1 style={{ fontSize: '5rem' }}>Private <br/> Dining.</h1>
          <p>For intimate gatherings, corporate events, and bespoke culinary journeys.</p>
        </section>

        <section className={styles.storySection} style={{ background: '#0a0a0a' }}>
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <label>THE WINE ROOM</label>
              <h2>Intimate & <br/> Immersive.</h2>
              <p style={{ marginBottom: '2rem' }}>
                Seating up to 14 guests, The Wine Room offers a completely private experience surrounded by our curated vintage collection. Includes a dedicated sommelier and a customized tasting menu.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontFamily: 'Inter', fontSize: '0.875rem', opacity: 0.7, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li>✓ Bespoke 7-Course Menu</li>
                <li>✓ Dedicated Sommelier</li>
                <li>✓ Custom Floral Arrangements</li>
              </ul>
            </div>
            <div className={styles.storyImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80)' }} />
          </div>
        </section>

        <section style={{ padding: '10rem 5%', background: '#050505', display: 'flex', justifyContent: 'center' }}>
          <div className={styles.resCard} style={{ width: '100%', maxWidth: '800px', margin: '0' }}>
            <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '4rem' }}>Inquire About <br/> an Event.</h2>
            {formState === 'success' ? (
              <div className={styles.successMessage}>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#eab308' }}>INQUIRY RECEIVED</h3>
                <p style={{ opacity: 0.6 }}>Our Events Director will contact you within 24 hours.</p>
              </div>
            ) : (
              <form className={styles.formGrid} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input type="text" required placeholder="Full Name / Company" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <input type="email" required placeholder="Email Address" />
                  <input type="tel" required placeholder="Phone Number" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <input type="date" required style={{ color: 'rgba(255,255,255,0.5)' }} />
                  <select style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem', color: '#fff', outline: 'none' }}>
                    <option value="">Expected Guests</option>
                    <option>10-20 Guests</option>
                    <option>20-50 Guests</option>
                    <option>Full Buyout (50+)</option>
                  </select>
                </div>
                <textarea placeholder="Tell us about the event..." style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem', color: '#fff', outline: 'none', height: '150px', fontFamily: 'inherit' }} />
                <button type="submit" className={styles.cta} style={{ border: '1px solid #eab308', cursor: 'pointer', background: 'transparent', color: '#eab308', width: '100%', padding: '1.5rem' }} disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? 'PROCESSING...' : 'SUBMIT INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </section>

        <footer style={{ padding: '8rem 5%', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#0a0a0a' }}>
          <div style={{ fontSize: '2rem', letterSpacing: '0.5rem', marginBottom: '2rem' }}>AURA</div>
          <p style={{ fontSize: '0.7rem', color: '#444', letterSpacing: '0.2rem', fontFamily: 'Inter', fontWeight: 800 }}>© 2026 AURA DINING GROUP // ALL RIGHTS RESERVED</p>
        </footer>
      </main>
    </div>
  );
}
