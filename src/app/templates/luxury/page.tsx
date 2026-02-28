"use client";

import styles from "./luxury.module.css";
import Link from "next/link";

export default function LuxuryTemplate() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>VALENTE</div>
      </nav>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <label className={styles.label}>EST. 1994</label>
            <h1>Architecture <br/> of Silence.</h1>
            <p>We believe in spaces that breathe. Our curated portfolio of luxury estates focuses on the intersection of modern minimalism and natural harmony.</p>
            <Link href="/intake" className={styles.cta}>View Collection</Link>
          </div>
          <div className={styles.heroImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80)' }} />
        </section>

        <section className={styles.services}>
          <div className={styles.serviceItem}>
            <h3>01</h3>
            <h4>Curated Search</h4>
            <p>Bespoke acquisition strategies for the world's most discerning collectors.</p>
          </div>
          <div className={styles.serviceItem}>
            <h3>02</h3>
            <h4>Architectural Review</h4>
            <p>Expert analysis of structural integrity and aesthetic longevity.</p>
          </div>
          <div className={styles.serviceItem}>
            <h3>03</h3>
            <h4>Global Concierge</h4>
            <p>Seamless relocation and lifestyle management across six continents.</p>
          </div>
        </section>

        <section className={styles.gallery}>
          <div className={styles.galleryGrid}>
            <div className={styles.galleryItem} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&w=1200&q=80)' }}>
              <div className={styles.itemLabel}>MODERNIST PENTHOUSE, NYC</div>
            </div>
            <div className={styles.galleryItem} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=1200&q=80)' }}>
              <div className={styles.itemLabel}>DESERT MIRROR, ARIZONA</div>
            </div>
            <div className={styles.galleryItem} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80)' }}>
              <div className={styles.itemLabel}>CLIFFSIDE RETREAT, AMALFI</div>
            </div>
            <div className={styles.galleryItem} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80)' }}>
              <div className={styles.itemLabel}>THE GLASS HOUSE, KYOTO</div>
            </div>
          </div>
        </section>

        <section className={styles.viewingSection}>
          <div className={styles.viewingContainer}>
            <header>
              <h2>Private Consultation</h2>
              <p>Request a private tour or portfolio review with our architectural curators.</p>
            </header>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formRow}>
                <input type="text" placeholder="FULL NAME" />
                <input type="email" placeholder="EMAIL ADDRESS" />
              </div>
              <textarea placeholder="MESSAGE (OPTIONAL)" />
              <button type="button" className={styles.cta}>Request Access</button>
            </form>
          </div>
        </section>

        <footer style={{ padding: '5rem', textAlign: 'center', borderTop: '1px solid #e7e5e4', color: '#a8a29e', fontSize: '0.7rem', letterSpacing: '0.2rem' }}>
          © 2026 VALENTE ARCHITECTURAL ESTATES. ALL RIGHTS RESERVED.
        </footer>
      </main>
    </div>
  );
}
