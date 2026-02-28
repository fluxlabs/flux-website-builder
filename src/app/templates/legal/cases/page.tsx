"use client";

import styles from "../legal.module.css";
import Link from "next/link";

export default function LegalCasesPage() {
  const cases = [
    { title: "Vanguard Tech vs. The State", result: "Dismissed with Prejudice", desc: "Successfully defended a multi-billion dollar technology firm against unprecedented antitrust allegations.", category: "Corporate Defense" },
    { title: "Estate of M. Sterling", result: "$450M Settlement", desc: "Secured a landmark settlement in a highly publicized international probate dispute involving complex offshore assets.", category: "Probate Litigation" },
    { title: "Global Pharma Inc.", result: "Acquisition Approved", desc: "Navigated complex FTC regulations to finalize a $12B merger between two leading pharmaceutical giants.", category: "Mergers & Acquisitions" },
    { title: "Project Horizon", result: "IP Rights Secured", desc: "Defended core intellectual property rights for a renewable energy startup against a hostile corporate takeover attempt.", category: "IP Litigation" }
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/legal" className={styles.logo} style={{ color: '#fff', textDecoration: 'none' }}>JUSTICE & CO</Link>
        <div style={{ display: 'flex', gap: '3rem', fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1rem', alignItems: 'center' }}>
          <Link href="/templates/legal/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
          <Link href="/templates/legal/services" style={{ color: '#fff', textDecoration: 'none' }}>Expertise</Link>
          <Link href="/templates/legal/cases" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '8px' }}>Cases</Link>
          <Link href="/templates/legal/team" style={{ color: '#fff', textDecoration: 'none' }}>Partners</Link>
          <Link href="/templates/legal/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem' }}>Consultation</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ padding: '10rem 5%', backgroundImage: 'linear-gradient(to right, #111 40%, transparent 100%), url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1950&q=80)' }}>
          <h1>A Record of <br/> Unprecedented <br/> Victories.</h1>
          <p>We do not measure success by hours billed, but by the magnitude of the results we deliver for our clients. Review our landmark decisions.</p>
        </section>

        <section style={{ padding: '10rem 5%', background: '#0a0a0a' }}>
          <div className={styles.grid}>
            {cases.map((c, i) => (
              <div key={i} className={styles.areaCard} style={{ borderTop: '2px solid #333', paddingTop: '2rem' }}>
                <span style={{ fontSize: '0.75rem', opacity: 0.5, letterSpacing: '0.1rem', textTransform: 'uppercase' }}>{c.category}</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>{c.title}</h3>
                <p style={{ color: '#fff', fontWeight: 'bold', marginBottom: '1rem' }}>RESULT: {c.result}</p>
                <p style={{ opacity: 0.7 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '8rem 5%', background: '#111', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Your Case is Next.</h2>
          <Link href="/templates/legal/contact" className={styles.cta} style={{ background: '#fff', color: '#000', fontSize: '1.25rem', padding: '1rem 3rem', display: 'inline-block' }}>CONFIDENTIAL INQUIRY</Link>
        </section>

        <footer style={{ padding: '5rem 5%', textAlign: 'center', background: '#000', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.2rem', marginBottom: '1.5rem' }}>JUSTICE & CO</div>
          <p style={{ opacity: 0.3, fontSize: '0.75rem', fontFamily: 'Inter' }}>ATTORNEY ADVERTISING // © 2026 JUSTICE & CO. GLOBAL LLP</p>
        </footer>
      </main>
    </div>
  );
}
