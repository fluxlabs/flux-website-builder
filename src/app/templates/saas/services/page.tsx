"use client";

import styles from "../saas.module.css";
import Link from "next/link";

export default function SaasServicesPage() {
  const platformFeatures = [
    { title: "GLOBAL EDGE", desc: "Deploy to 300+ nodes globally for sub-10ms latency everywhere.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&w=800&q=80" },
    { title: "AUTONOMOUS CI", desc: "Your code builds itself with automated testing and security audits.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" },
    { title: "INFINITE SCALE", desc: "Serverless architecture that handles from 1 to 1 billion users.", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" },
    { title: "SMART ANALYTICS", desc: "Real-time insights into your application's performance and usage.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/saas" className={styles.logo} style={{ textDecoration: 'none' }}>NovaSaaS</Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/templates/saas/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
          <Link href="/templates/saas/services" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 700 }}>Platform</Link>
          <Link href="/templates/saas/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>Get Started</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ padding: '8rem 5%' }}>
          <h1>The NovaSaaS <br/> Platform.</h1>
          <p>We provide a comprehensive suite of cloud infrastructure tools designed to help startups ship faster and scale without limits.</p>
        </section>

        <section className={styles.integrations} style={{ background: '#0a0a0a' }}>
          <div className={styles.integrationsContent}>
            <h2>Core Platform Layers</h2>
            <div className={styles.integrationGrid} style={{ marginTop: '6rem' }}>
              {platformFeatures.map((feature, i) => (
                <div key={i} className={styles.integrationCard} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left', alignItems: 'flex-start' }}>
                  <div style={{ height: '150px', width: '100%', backgroundImage: `url(${feature.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '12px' }} />
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>{feature.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.6, fontWeight: 400 }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.pricing}>
          <h2 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 800, marginBottom: '6rem' }}>Pricing that Scales</h2>
          <div className={styles.pricingGrid}>
            <div className={styles.priceCard}>
              <h4>Developer</h4>
              <div className={styles.price}>$0<span>/mo</span></div>
              <ul>
                <li>100k Monthly Requests</li>
                <li>Global Edge Network</li>
                <li>Community Support</li>
              </ul>
              <Link href="/templates/saas/contact" className={styles.ctaSecondary} style={{ width: '100%', marginTop: '3rem', display: 'block' }}>Get Started</Link>
            </div>
            <div className={`${styles.priceCard} ${styles.popular}`}>
              <h4>Business</h4>
              <div className={styles.price}>$49<span>/mo</span></div>
              <ul>
                <li>Unlimited Requests</li>
                <li>Custom Domains</li>
                <li>99.9% SLA</li>
              </ul>
              <Link href="/templates/saas/contact" className={styles.cta} style={{ width: '100%', marginTop: '3rem', display: 'block' }}>Upgrade to Business</Link>
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
