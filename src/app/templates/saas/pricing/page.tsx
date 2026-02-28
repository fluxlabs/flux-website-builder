"use client";

import styles from "../saas.module.css";
import Link from "next/link";

export default function SaasPricingPage() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/saas" className={styles.logo} style={{ textDecoration: 'none' }}>NovaSaaS</Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/templates/saas/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
          <Link href="/templates/saas/features" style={{ color: '#fff', textDecoration: 'none' }}>Features</Link>
          <Link href="/templates/saas/services" style={{ color: '#fff', textDecoration: 'none' }}>Platform</Link>
          <Link href="/templates/saas/pricing" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 700 }}>Pricing</Link>
          <Link href="/templates/saas/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>Get Started</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ padding: '8rem 5%', textAlign: 'center' }}>
          <h1>Predictable <br/> Pricing.</h1>
          <p style={{ margin: '0 auto' }}>No hidden fees. Scale your infrastructure dynamically while keeping costs strictly linear.</p>
        </section>

        <section className={styles.pricing} style={{ padding: '0 5% 15rem 5%' }}>
          <div className={styles.pricingGrid}>
            <div className={styles.priceCard}>
              <h4>Developer</h4>
              <div className={styles.price}>$0<span>/mo</span></div>
              <ul style={{ textAlign: 'left', margin: '2rem auto', display: 'inline-block', padding: 0 }}>
                <li>✓ 100k Monthly Requests</li>
                <li>✓ Global Edge Network</li>
                <li>✓ Community Support</li>
                <li>✓ Shared Database</li>
              </ul>
              <Link href="/templates/saas/contact" className={styles.ctaSecondary} style={{ width: '100%', marginTop: '3rem', display: 'block', textAlign: 'center' }}>Start Building</Link>
            </div>
            <div className={`${styles.priceCard} ${styles.popular}`}>
              <div style={{ position: 'absolute', top: '-15px', background: '#0070f3', color: '#fff', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, left: '50%', transform: 'translateX(-50%)' }}>MOST POPULAR</div>
              <h4>Pro</h4>
              <div className={styles.price}>$49<span>/mo</span></div>
              <ul style={{ textAlign: 'left', margin: '2rem auto', display: 'inline-block', padding: 0 }}>
                <li>✓ Unlimited Requests</li>
                <li>✓ Custom Domains</li>
                <li>✓ 99.9% SLA Guarantee</li>
                <li>✓ Dedicated Database Cluster</li>
              </ul>
              <Link href="/templates/saas/contact" className={styles.cta} style={{ width: '100%', marginTop: '3rem', display: 'block', textAlign: 'center' }}>Upgrade to Pro</Link>
            </div>
            <div className={styles.priceCard}>
              <h4>Enterprise</h4>
              <div className={styles.price}>Custom</div>
              <ul style={{ textAlign: 'left', margin: '2rem auto', display: 'inline-block', padding: 0 }}>
                <li>✓ SOC2 & HIPAA Compliance</li>
                <li>✓ Private Network Instances</li>
                <li>✓ 24/7 Dedicated Support</li>
                <li>✓ Custom Integrations</li>
              </ul>
              <Link href="/templates/saas/contact" className={styles.ctaSecondary} style={{ width: '100%', marginTop: '3rem', display: 'block', textAlign: 'center' }}>Contact Sales</Link>
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
