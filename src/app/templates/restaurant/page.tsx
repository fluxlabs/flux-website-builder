"use client";

import { useState } from "react";
import styles from "./restaurant.module.css";
import Link from "next/link";

export default function RestaurantTemplate() {
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
        <section className={styles.hero} style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), #0a0a0a), url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1950&q=80)' }}>
          <label className={styles.label}>MICHELIN RECOMMENDED</label>
          <h1>Dining, <br/> Redefined.</h1>
          <p>An immersive culinary journey through seasonal ingredients and artisanal craftsmanship.</p>
          <a href="#reserve" className={styles.cta}>The Experience</a>
        </section>

        <section className={styles.instagramSection}>
          <div className={styles.instaHeader}>
            <label>Follow the Journey</label>
            <h3>@AURADINING</h3>
          </div>
          <div className={styles.instaGrid}>
            <div className={styles.instaItem} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80)' }} />
            <div className={styles.instaItem} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80)' }} />
            <div className={styles.instaItem} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=80)' }} />
            <div className={styles.instaItem} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550966842-2862ba996344?auto=format&fit=crop&w=400&q=80)' }} />
          </div>
        </section>

        <section id="menu" className={styles.menu}>
          <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '6rem' }}>Seasonal Highlights</h2>
          <div className={styles.menuGrid}>
            <div className={styles.menuItem}>
              <div className={styles.itemInfo}>
                <h3>Wild Mushroom Risotto</h3>
                <p>Black truffle, 24-month aged parmesan, chives</p>
              </div>
              <div className={styles.price}>$32</div>
            </div>
            <div className={styles.menuItem}>
              <div className={styles.itemInfo}>
                <h3>Pan Seared Scallops</h3>
                <p>Cauliflower purée, pancetta, lemon oil</p>
              </div>
              <div className={styles.price}>$28</div>
            </div>
            <div className={styles.menuItem}>
              <div className={styles.itemInfo}>
                <h3>Roasted Duck Breast</h3>
                <p>Cherry reduction, parsnip, wilted greens</p>
              </div>
              <div className={styles.price}>$45</div>
            </div>
            <div className={styles.menuItem}>
              <div className={styles.itemInfo}>
                <h3>Chocolate Fondant</h3>
                <p>Salted caramel, vanilla bean gelato</p>
              </div>
              <div className={styles.price}>$16</div>
            </div>
          </div>
        </section>

        <section id="story" className={styles.storySection}>
          <div className={styles.storyGrid}>
            <div className={styles.storyImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550966842-2862ba996344?auto=format&fit=crop&w=800&q=80)' }} />
            <div className={styles.storyContent}>
              <label>Our Story</label>
              <h2>From Farm to <br/> Moonlight.</h2>
              <p>Founded in 2012, Aura was born from a desire to reconnect diners with the origins of their food. Every ingredient is sourced from sustainable local farms, prepared with modern techniques that honor traditional flavors.</p>
            </div>
          </div>
        </section>

        <section id="reserve" className={styles.reservationSection}>
          <div className={styles.resCard}>
            <h2>Reserve Your Table</h2>
            <p>For parties larger than 6, please call us directly.</p>
            
            {formState === 'success' ? (
              <div className={styles.successMessage}>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#eab308' }}>Reservation Confirmed</h3>
                <p style={{ opacity: 0.6, fontFamily: 'Inter' }}>We look forward to hosting you. Details have been emailed.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleResSubmit}>
                <div className={styles.formGrid}>
                  <input type="date" required />
                  <select required>
                    <option value="">Time</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                  </select>
                  <input type="number" required placeholder="Guests" min="1" max="6" />
                </div>
                <button type="submit" className={styles.cta} style={{ width: '100%', marginTop: '3rem', cursor: 'pointer', background: 'transparent' }} disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? 'SECURING TABLE...' : 'CONFIRM BOOKING'}
                </button>
              </form>
            )}
          </div>
        </section>

        <footer style={{ padding: '5rem 10%', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '1.5rem', letterSpacing: '0.5rem', marginBottom: '2rem' }}>AURA</div>
          <p style={{ opacity: 0.4, fontFamily: 'Inter', fontSize: '0.8rem' }}>122 ARCH STREET, BOSTON // © 2026 AURA DINING GROUP</p>
        </footer>
      </main>
    </div>
  );
}
