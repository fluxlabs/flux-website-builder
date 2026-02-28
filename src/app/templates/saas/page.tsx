"use client";

import { useState } from "react";
import styles from "./saas.module.css";
import Link from "next/link";

export default function SaaSTemplate() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>NovaSaaS</div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#features" style={{ color: '#fff', textDecoration: 'none' }}>Features</a>
          <a href="#integrations" style={{ color: '#fff', textDecoration: 'none' }}>Integrations</a>
          <a href="#pricing" style={{ color: '#fff', textDecoration: 'none' }}>Pricing</a>
          <Link href="/intake" className={styles.cta} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>Start Free</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero}>
          <h1>Ship your vision <br/> at the speed of light.</h1>
          <p>The ultimate engine for modern startups. Scale your infrastructure without the overhead of a traditional dev team.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '5rem' }}>
            <Link href="/intake" className={styles.cta}>Deploy Now</Link>
            <a href="#demo" className={styles.ctaSecondary}>Watch Demo</a>
          </div>
          <div className={styles.dashboardPreview} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80)' }} />
        </section>

        <section className={styles.marquee}>
          <div className={styles.marqueeContent}>
            <span>TRUSTED BY INNOVATORS AT:</span>
            <strong>QUANTUM</strong>
            <strong>VERTEX</strong>
            <strong>NEXUS</strong>
            <strong>ORBIT</strong>
            <strong>PULSE</strong>
          </div>
        </section>

        <section id="features" className={styles.features}>
          <div className={styles.featureCard}>
            <h3>Global Edge</h3>
            <p>Deploy your application to 300+ nodes globally for sub-10ms latency everywhere.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Autonomous CI</h3>
            <p>Your code builds itself. Automated testing, linting, and security audits out of the box.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Infinite Scale</h3>
            <p>From 1 user to 1 billion. Our serverless architecture handles the load so you don't have to.</p>
          </div>
        </section>

        <section id="integrations" className={styles.integrations}>
          <div className={styles.integrationsContent}>
            <h2>Plays nicely with your stack.</h2>
            <p>Connect your favorite tools in one click. Webhooks, API keys, and OAuth flows are instantly synthesized.</p>
            <div className={styles.integrationGrid}>
              <div className={styles.integrationCard}>Stripe</div>
              <div className={styles.integrationCard}>GitHub</div>
              <div className={styles.integrationCard}>Supabase</div>
              <div className={styles.integrationCard}>Resend</div>
              <div className={styles.integrationCard}>Vercel</div>
              <div className={styles.integrationCard}>OpenAI</div>
            </div>
          </div>
        </section>

        <section id="pricing" className={styles.pricing}>
          <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '4rem' }}>Pricing that scales with you</h2>
          <div className={styles.pricingGrid}>
            <div className={styles.priceCard}>
              <h4>Developer</h4>
              <div className={styles.price}>$0<span>/mo</span></div>
              <ul>
                <li>100k Monthly Requests</li>
                <li>Global Edge Network</li>
                <li>Community Support</li>
              </ul>
              <button className={styles.ctaSecondary} style={{ width: '100%', marginTop: '2rem' }}>Get Started</button>
            </div>
            <div className={`${styles.priceCard} ${styles.popular}`}>
              <h4>Business</h4>
              <div className={styles.price}>$49<span>/mo</span></div>
              <ul>
                <li>Unlimited Requests</li>
                <li>Custom Domains</li>
                <li>99.9% SLA</li>
              </ul>
              <button className={styles.cta} style={{ width: '100%', marginTop: '2rem', border: 'none' }}>Upgrade to Business</button>
            </div>
          </div>
        </section>

        <section id="demo" className={styles.contactSection}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>Ready to ship?</h2>
              <p>Join over 2,000+ companies scaling their infrastructure on NovaSaaS. Get a personalized demo of our edge network.</p>
              <div className={styles.demoImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80)' }} />
            </div>
            
            {formState === 'success' ? (
              <div className={styles.successMessage}>
                <h3>Request Received!</h3>
                <p>One of our product engineers will be in touch shortly.</p>
                <button onClick={() => setFormState('idle')} className={styles.ctaSecondary}>Submit another</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleDemoSubmit}>
                <div className={styles.inputGroup}>
                  <label>Work Email</label>
                  <input type="email" required placeholder="name@company.com" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Company Size</label>
                  <select>
                    <option>1-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-1000 employees</option>
                    <option>1000+ employees</option>
                  </select>
                </div>
                <button type="submit" className={styles.cta} style={{ width: '100%', border: 'none', cursor: 'pointer' }} disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? 'Sending...' : 'Request Demo'}
                </button>
              </form>
            )}
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
