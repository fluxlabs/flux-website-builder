"use client";

import styles from "../luxury.module.css";
import Link from "next/link";

export default function LuxuryServicesPage() {
  const ateliers = [
    { title: "ARCHITECTURAL CURATION", desc: "Crafting the foundational vision for spaces that command presence.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
    { title: "INTERIOR COMPOSITION", desc: "Developing a dialogue between material, light, and living.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" },
    { title: "MATERIAL SELECTION", desc: "Sourcing rare stones, woods, and textiles from the world's finest artisans.", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80" },
    { title: "FURNITURE ARCHIVE", desc: "Custom pieces designed specifically for the environments they inhabit.", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80" }
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav} style={{ flexDirection: 'column', gap: '2rem' }}>
        <Link href="/templates/luxury" className={styles.logo} style={{ color: '#1c1917', textDecoration: 'none' }}>VALENTE</Link>
        <div style={{ display: 'flex', gap: '4rem', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2rem' }}>
          <Link href="/templates/luxury/about" style={{ color: '#1c1917', textDecoration: 'none' }}>Story</Link>
          <Link href="/templates/luxury/services" style={{ color: '#1c1917', textDecoration: 'underline', textUnderlineOffset: '12px' }}>Atelier</Link>
          <Link href="/templates/luxury/contact" style={{ color: '#1c1917', textDecoration: 'none' }}>Inquiry</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ height: '70vh' }}>
          <div className={styles.heroContent}>
            <span className={styles.label}>SERVICES</span>
            <h1 style={{ fontSize: '4rem', fontWeight: 300, lineHeight: 1.2, marginBottom: '2rem' }}>The Valente <br/> Atelier.</h1>
            <p style={{ color: '#57534e', lineHeight: 1.8 }}>We offer a range of specialized services designed to create holistic and harmonious living environments. Each project is handled with the utmost discretion and care.</p>
          </div>
          <div className={styles.heroImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80)' }} />
        </section>

        <section className={styles.gallery} style={{ background: '#fff' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            {ateliers.map((atelier, i) => (
              <div key={i} style={{ marginBottom: '8rem' }}>
                <div style={{ height: '600px', backgroundImage: `url(${atelier.image})`, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '3rem' }} />
                <span className={styles.label}>0{i + 1}</span>
                <h3 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '1.5rem', marginTop: '1rem' }}>{atelier.title}</h3>
                <p style={{ color: '#57534e', maxWidth: '400px', lineHeight: 1.8 }}>{atelier.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.viewingSection} style={{ background: '#fafaf9', color: '#1c1917', padding: '10rem 5%' }}>
          <div className={styles.viewingContainer}>
            <h2 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '2rem' }}>Bespoke Craftsmanship.</h2>
            <p style={{ color: '#57534e', marginBottom: '4rem' }}>For those who seek the extraordinary, we offer custom design services that cater to your specific lifestyle and aesthetic preferences.</p>
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
