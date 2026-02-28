"use client";

import { useState } from "react";
import styles from "../saas.module.css";
import Link from "next/link";

export default function SaasContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/saas" className={styles.logo} style={{ textDecoration: 'none' }}>NovaSaaS</Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/templates/saas/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
          <Link href="/templates/saas/services" style={{ color: '#fff', textDecoration: 'none' }}>Platform</Link>
          <Link href="/templates/saas/contact" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 700 }}>Get Started</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ padding: '8rem 5%' }}>
          <h1>Connect with <br/> the Future.</h1>
          <p>Ready to scale your vision? Connect with our engineering and product teams to get a personalized demo of NovaSaaS.</p>
        </section>

        <section id="demo" className={styles.contactSection}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>Book a Demo.</h2>
              <p>We'll walk you through our global edge network and show you how to automate your entire infrastructure with NovaSaaS.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '4rem', color: '#666' }}>
                <p>
                  <strong>HEADQUARTERS</strong><br/>
                  100 Mission St.<br/>
                  San Francisco, CA 94105
                </p>
                <p>
                  <strong>SUPPORT</strong><br/>
                  24/7 Priority Support for Enterprise Clients
                </p>
              </div>
            </div>
            
            {formState === 'success' ? (
              <div className={styles.successMessage}>
                <h3>DEMO SCHEDULED</h3>
                <p>A product engineer will contact you shortly to confirm your time slot.</p>
                <button onClick={() => setFormState('idle')} className={styles.ctaSecondary} style={{ width: '100%' }}>New Request</button>
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
                <div className={styles.inputGroup}>
                  <label>Your Vision</label>
                  <textarea style={{ width: '100%', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '8px', color: '#fff', outline: 'none', height: '100px' }} placeholder="What are you building?" />
                </div>
                <button type="submit" className={styles.cta} style={{ width: '100%', border: 'none', cursor: 'pointer' }} disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? 'Submitting...' : 'Request Demo'}
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
