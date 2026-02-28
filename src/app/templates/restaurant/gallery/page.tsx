"use client";

import styles from "../restaurant.module.css";
import Link from "next/link";

export default function RestaurantGalleryPage() {
  const images = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1200&q=80"
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/restaurant" className={styles.logo} style={{ color: '#fff', textDecoration: 'none' }}>AURA</Link>
        <div style={{ display: 'flex', gap: '3rem', fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2rem', alignItems: 'center' }}>
          <Link href="/templates/restaurant/about" style={{ color: '#fff', textDecoration: 'none' }}>Story</Link>
          <Link href="/templates/restaurant/services" style={{ color: '#fff', textDecoration: 'none' }}>Menu</Link>
          <Link href="/templates/restaurant/gallery" style={{ color: '#eab308', textDecoration: 'none' }}>Atmosphere</Link>
          <Link href="/templates/restaurant/private-dining" style={{ color: '#fff', textDecoration: 'none' }}>Private Events</Link>
          <Link href="/templates/restaurant/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem', fontSize: '0.7rem' }}>RESERVE</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ height: '50vh', backgroundImage: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80)' }}>
          <label className={styles.label}>THE SPACE</label>
          <h1 style={{ fontSize: '5rem' }}>Atmosphere.</h1>
          <p>A glimpse into the elements that define the Aura experience.</p>
        </section>

        <section style={{ padding: '10rem 5%', background: '#0a0a0a' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {images.map((img, i) => (
              <div key={i} style={{ height: '500px', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s ease', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(0.98)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            ))}
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
