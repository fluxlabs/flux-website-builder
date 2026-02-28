"use client";

import styles from "../saas.module.css";
import Link from "next/link";

export default function SaasAboutPage() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/saas" className={styles.logo} style={{ textDecoration: 'none' }}>NovaSaaS</Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/templates/saas/about" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 700 }}>About</Link>
          <Link href="/templates/saas/features" style={{ color: '#fff', textDecoration: 'none' }}>Features</Link>
          <Link href="/templates/saas/services" style={{ color: '#fff', textDecoration: 'none' }}>Platform</Link>
          <Link href="/templates/saas/pricing" style={{ color: '#fff', textDecoration: 'none' }}>Pricing</Link>
          <Link href="/templates/saas/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>Get Started</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ padding: '8rem 5%' }}>
          <h1>The Team <br/> Behind the <br/> Engine.</h1>
          <p>NovaSaaS was founded by a group of engineers who were tired of the complexity of modern cloud infrastructure. We built the tool we always wanted.</p>
        </section>

        <section className={styles.marquee}>
          <div className={styles.marqueeContent}>
            <span>OUR CORE VALUES:</span>
            <strong>VELOCITY</strong>
            <strong>SIMPLICITY</strong>
            <strong>SCALE</strong>
            <strong>INTEGRITY</strong>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featureCard}>
            <h3>The Mission</h3>
            <p>To democratize high-performance infrastructure for every developer and startup, regardless of their size or budget.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>The Vision</h3>
            <p>A world where code deploys instantly, scales infinitely, and heals itself without human intervention.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>The Culture</h3>
            <p>We are a remote-first, engineering-led organization focused on building tools that solve real-world problems.</p>
          </div>
        </section>

        <section style={{ padding: '10rem 5%', background: '#000', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '6rem' }}>Our Leadership</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div>
              <div style={{ height: '300px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', fontWeight: 800, color: '#222' }}>AX</div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Alex Chen</h4>
              <p style={{ color: '#0070f3', fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase' }}>CEO & FOUNDER</p>
            </div>
            <div>
              <div style={{ height: '300px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', fontWeight: 800, color: '#222' }}>SR</div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Sarah Reed</h4>
              <p style={{ color: '#0070f3', fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase' }}>CTO</p>
            </div>
            <div>
              <div style={{ height: '300px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', fontWeight: 800, color: '#222' }}>MJ</div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Marcus Jung</h4>
              <p style={{ color: '#0070f3', fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase' }}>HEAD OF PRODUCT</p>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div>© 2026 NovaSaaS. Built with Flux.</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span style={{ cursor: 'pointer' }}>Privacy</span>
            <span style={{ cursor: 'pointer' }}>Terms</span>
            <span style={{ cursor: 'pointer' }}>Docs</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
