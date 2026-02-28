"use client";

import styles from "../luxury.module.css";
import Link from "next/link";

export default function LuxuryAboutPage() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav} style={{ flexDirection: 'column', gap: '2rem' }}>
        <Link href="/templates/luxury" className={styles.logo} style={{ color: '#1c1917', textDecoration: 'none' }}>VALENTE</Link>
        <div style={{ display: 'flex', gap: '4rem', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2rem' }}>
          <Link href="/templates/luxury/about" style={{ color: '#1c1917', textDecoration: 'underline', textUnderlineOffset: '12px' }}>Story</Link>
          <Link href="/templates/luxury/services" style={{ color: '#1c1917', textDecoration: 'none' }}>Atelier</Link>
          <Link href="/templates/luxury/collection" style={{ color: '#1c1917', textDecoration: 'none' }}>Collection</Link>
          <Link href="/templates/luxury/philosophy" style={{ color: '#1c1917', textDecoration: 'none' }}>Philosophy</Link>
          <Link href="/templates/luxury/contact" style={{ color: '#1c1917', textDecoration: 'none' }}>Inquiry</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ height: '70vh' }}>
          <div className={styles.heroImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80)' }} />
          <div className={styles.heroContent}>
            <span className={styles.label}>EST. 1912</span>
            <h1 style={{ fontSize: '4rem', fontWeight: 300, lineHeight: 1.2, marginBottom: '2rem' }}>A Century of <br/> Refined <br/> Elegance.</h1>
            <p style={{ color: '#57534e', lineHeight: 1.8 }}>The Valente legacy began with a single vision: to create spaces that transcend time. Today, we continue that tradition of excellence through meticulous craftsmanship and an unwavering eye for detail.</p>
          </div>
        </section>

        <section className={styles.editorial} style={{ background: '#fff' }}>
          <div className={styles.editorialContent}>
            <span className={styles.label}>OUR PHILOSOPHY</span>
            <h2 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '3rem', marginTop: '1rem' }}>The Art of Living.</h2>
            <p style={{ fontSize: '1.25rem', lineHeight: '2', color: '#57534e', marginBottom: '4rem' }}>
              We believe that luxury is not just about what you see, but how you feel. It's the subtle texture of a hand-woven silk, the warmth of reclaimed oak, and the way light dances across a room at dusk.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4rem', textAlign: 'left', marginTop: '8rem' }}>
              <div>
                <h3 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1rem', marginBottom: '1.5rem' }}>01 / DISCRETION</h3>
                <p style={{ fontSize: '0.875rem', color: '#78716c' }}>Protecting the privacy and vision of our most discerning clients.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1rem', marginBottom: '1.5rem' }}>02 / CURATION</h3>
                <p style={{ fontSize: '0.875rem', color: '#78716c' }}>Sourcing only the rarest materials from the world's finest artisans.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1rem', marginBottom: '1.5rem' }}>03 / LEGACY</h3>
                <p style={{ fontSize: '0.875rem', color: '#78716c' }}>Building environments that serve as the backdrop for generations.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.gallery} style={{ background: '#fafaf9' }}>
          <div className={styles.galleryGrid}>
            <div style={{ height: '600px', backgroundImage: 'url(https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ height: '600px', backgroundImage: 'url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', marginTop: '4rem' }} />
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
