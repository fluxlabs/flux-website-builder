"use client";

import styles from "./restaurant.module.css";
import Link from "next/link";

export default function RestaurantTemplate() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>AURA</div>
        <div style={{ display: 'flex', gap: '3rem', fontSize: '0.8rem', letterSpacing: '0.1rem', textTransform: 'uppercase' }}>
          <span>Story</span>
          <span>Menu</span>
          <span>Private Dining</span>
          <Link href="/intake" className={styles.cta} style={{ padding: '0.5rem 1.5rem', marginTop: '-0.3rem' }}>Reserve</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero}>
          <h1>Dining, <br/> Redefined.</h1>
          <p>An immersive culinary journey through seasonal ingredients and artisanal craftsmanship.</p>
          <Link href="/intake" className={styles.cta}>The Experience</Link>
        </section>

        <section className={styles.menu}>
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

        <section className={styles.storySection}>
          <div className={styles.storyGrid}>
            <div className={styles.storyImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550966842-2862ba996344?auto=format&fit=crop&w=800&q=80)' }} />
            <div className={styles.storyContent}>
              <label>Our Story</label>
              <h2>From Farm to <br/> Moonlight.</h2>
              <p>Founded in 2012, Aura was born from a desire to reconnect diners with the origins of their food. Every ingredient is sourced from sustainable local farms, prepared with modern techniques that honor traditional flavors.</p>
            </div>
          </div>
        </section>

        <section className={styles.reservationSection}>
          <div className={styles.resCard}>
            <h2>Reserve Your Table</h2>
            <p>For parties larger than 6, please call us directly.</p>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formGrid}>
                <input type="date" />
                <select>
                  <option>7:00 PM</option>
                  <option>7:30 PM</option>
                  <option>8:00 PM</option>
                  <option>8:30 PM</option>
                  <option>9:00 PM</option>
                </select>
                <input type="number" placeholder="Guests" min="1" max="6" />
              </div>
              <button type="button" className={styles.cta} style={{ width: '100%', marginTop: '3rem', cursor: 'pointer' }}>Confirm Booking</button>
            </form>
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
