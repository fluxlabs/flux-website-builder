"use client";

import styles from "../luxury.module.css";
import Link from "next/link";

export default function LuxuryCollectionPage() {
  const collection = [
    { title: "THE BELVEDERE", location: "LAKE COMO", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" },
    { title: "RESIDENCE NO. 04", location: "ASPEN", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" },
    { title: "VILLA SERENE", location: "AMALFI COAST", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80" },
    { title: "THE GLASS HOUSE", location: "MALIBU", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80" }
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav} style={{ flexDirection: 'column', gap: '2rem' }}>
        <Link href="/templates/luxury" className={styles.logo} style={{ color: '#1c1917', textDecoration: 'none' }}>VALENTE</Link>
        <div style={{ display: 'flex', gap: '4rem', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2rem' }}>
          <Link href="/templates/luxury/about" style={{ color: '#1c1917', textDecoration: 'none' }}>Story</Link>
          <Link href="/templates/luxury/services" style={{ color: '#1c1917', textDecoration: 'none' }}>Atelier</Link>
          <Link href="/templates/luxury/collection" style={{ color: '#1c1917', textDecoration: 'underline', textUnderlineOffset: '12px' }}>Collection</Link>
          <Link href="/templates/luxury/philosophy" style={{ color: '#1c1917', textDecoration: 'none' }}>Philosophy</Link>
          <Link href="/templates/luxury/contact" style={{ color: '#1c1917', textDecoration: 'none' }}>Inquiry</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ height: '50vh' }}>
          <div className={styles.heroContent} style={{ margin: '0 auto', textAlign: 'center', padding: '0 5%' }}>
            <span className={styles.label}>ARCHIVES</span>
            <h1 style={{ fontSize: '4rem', fontWeight: 300, lineHeight: 1.2, marginBottom: '2rem' }}>The Curated <br/> Collection.</h1>
            <p style={{ color: '#57534e', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>A selection of our most distinguished residential and commercial commissions across the globe.</p>
          </div>
        </section>

        <section className={styles.gallery} style={{ background: '#fff', paddingTop: '0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8rem', maxWidth: '1400px', margin: '0 auto' }}>
            {collection.map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ height: '70vh', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '3rem' }} />
                <span className={styles.label}>{item.location}</span>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 300, marginTop: '1rem' }}>{item.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.viewingSection} style={{ background: '#fafaf9', color: '#1c1917', padding: '10rem 5%' }}>
          <div className={styles.viewingContainer} style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '2rem' }}>Request a Private Viewing.</h2>
            <p style={{ color: '#57534e', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>Certain properties within our collection remain entirely private. Please inquire to discuss exclusive access.</p>
            <Link href="/templates/luxury/contact" className={styles.cta}>Initiate Inquiry</Link>
          </div>
        </section>

        <footer style={{ padding: '8rem 5%', textAlign: 'center', borderTop: '1px solid #e7e5e4' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 300, letterSpacing: '0.5rem', marginBottom: '2rem' }}>VALENTE</div>
          <p style={{ fontSize: '0.7rem', color: '#a8a29e', letterSpacing: '0.2rem' }}>© 2026 VALENTE ATELIER // ALL RIGHTS RESERVED</p>
        </footer>
      </main>
    </div>
  );
}
