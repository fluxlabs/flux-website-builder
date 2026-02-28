"use client";

import styles from "../restaurant.module.css";
import Link from "next/link";

export default function RestaurantAboutPage() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/restaurant" className={styles.logo} style={{ color: '#fff', textDecoration: 'none' }}>AURA</Link>
        <div style={{ display: 'flex', gap: '3rem', fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2rem', alignItems: 'center' }}>
          <Link href="/templates/restaurant/about" style={{ color: '#eab308', textDecoration: 'none' }}>Story</Link>
          <Link href="/templates/restaurant/services" style={{ color: '#fff', textDecoration: 'none' }}>Menu</Link>
          <Link href="/templates/restaurant/gallery" style={{ color: '#fff', textDecoration: 'none' }}>Atmosphere</Link>
          <Link href="/templates/restaurant/private-dining" style={{ color: '#fff', textDecoration: 'none' }}>Private Events</Link>
          <Link href="/templates/restaurant/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem', fontSize: '0.7rem' }}>RESERVE</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ height: '70vh', backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1600&q=80)' }}>
          <label className={styles.label}>EST. 2018</label>
          <h1 style={{ fontSize: '5rem' }}>Born from <br/> Fire and <br/> Earth.</h1>
          <p>Aura began with a simple belief: that dining should be a sensory journey that connects us to the elements. We source only the finest seasonal ingredients to create a menu that is both grounded and visionary.</p>
        </section>

        <section className={styles.storySection}>
          <div className={styles.storyGrid}>
            <div className={styles.storyImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550966842-28c2e2ca0435?auto=format&fit=crop&w=1200&q=80)' }} />
            <div className={styles.storyContent}>
              <label>OUR PHILOSOPHY</label>
              <h2>The Art of <br/> Seasonal <br/> Gastronomy.</h2>
              <p style={{ marginBottom: '2rem' }}>
                At Aura, we don't just cook; we compose. Our kitchen is a laboratory of flavor where traditional techniques meet modern innovation. We partner with local farmers and artisans to ensure every plate tells a story of the land.
              </p>
              <p>
                From our open-fire hearth to our botanical cocktail program, every element of Aura is designed to evoke a sense of place and time.
              </p>
            </div>
          </div>
        </section>

        <section style={{ padding: '10rem 10%', background: '#0a0a0a', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '6rem' }}>The Visionaries</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: '400px', backgroundImage: 'url(https://images.unsplash.com/photo-1577214495775-408191241bb3?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '2rem' }} />
              <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Chef Julian Vane</h4>
              <p style={{ fontFamily: 'Inter', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1rem', fontSize: '0.75rem' }}>EXECUTIVE CHEF</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: '400px', backgroundImage: 'url(https://images.unsplash.com/photo-1583394238560-2384c034424d?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '2rem' }} />
              <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Elena Thorne</h4>
              <p style={{ fontFamily: 'Inter', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1rem', fontSize: '0.75rem' }}>SOMMELIER</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: '400px', backgroundImage: 'url(https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '2rem' }} />
              <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Marcus Reed</h4>
              <p style={{ fontFamily: 'Inter', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1rem', fontSize: '0.75rem' }}>HOSPITALITY DIRECTOR</p>
            </div>
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
