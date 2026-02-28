"use client";

import { useState } from "react";
import styles from "../bold.module.css";
import Link from "next/link";

export default function BoldFAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "WHAT IS YOUR MAXIMUM TONNAGE CAPACITY?", a: "We operate multiple fabrication facilities capable of handling over 400,000 tons of structural steel annually, making us one of the largest independent fabricators in the Midwest." },
    { q: "DO YOU OPERATE NATIONWIDE?", a: "Yes. While headquartered in Detroit, our logistics network and field erection teams allow us to deploy to any major industrial site across the continental United States and parts of Canada." },
    { q: "WHAT SAFETY CERTIFICATIONS DO YOU HOLD?", a: "Safety is our core pillar. We are OSHA Diamond certified, ASME certified for pressure vessels, and maintain an Experience Modification Rate (EMR) consistently below 0.6." },
    { q: "CAN YOU HANDLE DESIGN-BUILD PROJECTS?", a: "Absolutely. Our in-house engineering and detailing teams work directly with your architects to provide seamless design-build solutions, reducing lead times by up to 30%." },
    { q: "WHAT IS YOUR TYPICAL LEAD TIME?", a: "Lead times vary drastically by scope. However, our rapid-response infrastructure division can mobilize for emergency structural repairs within 48 hours." }
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/bold" className={styles.logo} style={{ textDecoration: 'none' }}>FORGE</Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/templates/bold/about" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900 }}>ABOUT</Link>
          <Link href="/templates/bold/services" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900 }}>SERVICES</Link>
          <Link href="/templates/bold/projects" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900 }}>PROJECTS</Link>
          <Link href="/templates/bold/faq" style={{ color: '#ffcc00', textDecoration: 'none', fontWeight: 900 }}>FAQ</Link>
          <Link href="/templates/bold/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>QUOTE</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ background: '#111', minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '5rem', marginBottom: '1rem' }}>KNOWLEDGE <br/> <span className={styles.highlight}>BASE.</span></h1>
          <p style={{ fontSize: '1.5rem', maxWidth: '800px', marginBottom: '0', fontFamily: 'sans-serif', color: '#888' }}>
            Straight answers to complex industrial questions. No runarounds.
          </p>
        </section>

        <section style={{ padding: '8rem 5%', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: '#1a1a1a', border: '2px solid #333', padding: '2rem', cursor: 'pointer' }} onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.5rem', margin: '0', color: openIndex === i ? '#ffcc00' : '#fff' }}>{faq.q}</h3>
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: '#ffcc00' }}>{openIndex === i ? '-' : '+'}</span>
                </div>
                {openIndex === i && (
                  <p style={{ fontSize: '1.2rem', fontFamily: 'sans-serif', color: '#aaa', marginTop: '2rem', lineHeight: '1.6' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '8rem 5%', background: '#ffcc00', color: '#000', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', color: '#000', marginBottom: '2rem' }}>STILL HAVE QUESTIONS?</h2>
          <Link href="/templates/bold/contact" className={styles.cta} style={{ background: '#000', color: '#ffcc00', fontSize: '1.25rem', padding: '1rem 3rem' }}>CONTACT OUR TEAM</Link>
        </section>

        <footer style={{ padding: '5rem', background: '#000', color: '#ffcc00', textAlign: 'center', borderTop: '5px solid #ffcc00' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>FORGE INDUSTRIAL</div>
          <p>© 2026 FORGE INFRASTRUCTURE GRP.</p>
        </footer>
      </main>
    </div>
  );
}
