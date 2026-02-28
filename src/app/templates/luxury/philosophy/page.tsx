"use client";

import styles from "../luxury.module.css";
import Link from "next/link";

export default function LuxuryPhilosophyPage() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav} style={{ flexDirection: 'column', gap: '2rem' }}>
        <Link href="/templates/luxury" className={styles.logo} style={{ color: '#1c1917', textDecoration: 'none' }}>VALENTE</Link>
        <div style={{ display: 'flex', gap: '4rem', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2rem' }}>
          <Link href="/templates/luxury/about" style={{ color: '#1c1917', textDecoration: 'none' }}>Story</Link>
          <Link href="/templates/luxury/services" style={{ color: '#1c1917', textDecoration: 'none' }}>Atelier</Link>
          <Link href="/templates/luxury/collection" style={{ color: '#1c1917', textDecoration: 'none' }}>Collection</Link>
          <Link href="/templates/luxury/philosophy" style={{ color: '#1c1917', textDecoration: 'underline', textUnderlineOffset: '12px' }}>Philosophy</Link>
          <Link href="/templates/luxury/contact" style={{ color: '#1c1917', textDecoration: 'none' }}>Inquiry</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ height: '70vh' }}>
          <div className={styles.heroContent}>
            <span className={styles.label}>MANIFESTO</span>
            <h1 style={{ fontSize: '4rem', fontWeight: 300, lineHeight: 1.2, marginBottom: '2rem' }}>Space as <br/> Sanctuary.</h1>
            <p style={{ color: '#57534e', lineHeight: 1.8 }}>We design not just for the eye, but for the soul. A Valente property is a retreat from the noise of the world, defined by pure materials and silent luxury.</p>
          </div>
          <div className={styles.heroImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80)' }} />
        </section>

        <section className={styles.editorial} style={{ background: '#fff', padding: '10rem 5%' }}>
          <div className={styles.editorialContent} style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '3rem', marginTop: '1rem' }}>The Three Pillars.</h2>
            <p style={{ fontSize: '1.25rem', lineHeight: '2', color: '#57534e', marginBottom: '4rem' }}>
              True luxury does not shout; it whispers. Our approach is grounded in three immutable pillars that guide every sketch, every material selection, and every final polish.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4rem', maxWidth: '1200px', margin: '8rem auto 0 auto' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: '400px', backgroundImage: 'url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '2rem' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1rem', marginBottom: '1rem' }}>I. MATERIAL INTEGRITY</h3>
              <p style={{ fontSize: '0.875rem', color: '#78716c', lineHeight: 1.8 }}>We utilize only natural, uncompromised materials that age gracefully alongside the inhabitants of the space.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: '400px', backgroundImage: 'url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '2rem' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1rem', marginBottom: '1rem' }}>II. SPATIAL SILENCE</h3>
              <p style={{ fontSize: '0.875rem', color: '#78716c', lineHeight: 1.8 }}>The deliberate orchestration of negative space to allow the mind to rest and the architecture to breathe.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: '400px', backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '2rem' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1rem', marginBottom: '1rem' }}>III. LIGHT SCULPTING</h3>
              <p style={{ fontSize: '0.875rem', color: '#78716c', lineHeight: 1.8 }}>Harnessing natural luminosity as the primary architectural element, shifting dynamically throughout the day.</p>
            </div>
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
