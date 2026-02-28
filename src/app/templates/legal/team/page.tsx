"use client";

import styles from "../legal.module.css";
import Link from "next/link";

export default function LegalTeamPage() {
  const team = [
    { name: "Robert Sterling", role: "MANAGING PARTNER", bio: "Former federal prosecutor with 30 years of high-stakes corporate litigation experience.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" },
    { name: "Eleanor Vance", role: "SENIOR PARTNER", bio: "Leading expert in international mergers and intellectual property law.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
    { name: "Marcus Thorne", role: "PARTNER", bio: "Specializes in white-collar defense and global regulatory compliance.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/legal" className={styles.logo} style={{ color: '#fff', textDecoration: 'none' }}>JUSTICE & CO</Link>
        <div style={{ display: 'flex', gap: '3rem', fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1rem', alignItems: 'center' }}>
          <Link href="/templates/legal/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
          <Link href="/templates/legal/services" style={{ color: '#fff', textDecoration: 'none' }}>Expertise</Link>
          <Link href="/templates/legal/cases" style={{ color: '#fff', textDecoration: 'none' }}>Cases</Link>
          <Link href="/templates/legal/team" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '8px' }}>Partners</Link>
          <Link href="/templates/legal/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem' }}>Consultation</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ padding: '10rem 5%', backgroundImage: 'linear-gradient(to right, #111 40%, transparent 100%), url(https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&w=1950&q=80)' }}>
          <h1>The Minds <br/> Behind the <br/> Defense.</h1>
          <p>Our partners are recruited from the highest echelons of the legal profession. We demand excellence, and we deliver results.</p>
        </section>

        <section style={{ padding: '10rem 5%', background: '#0a0a0a' }}>
          <div className={styles.grid}>
            {team.map((member, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ backgroundImage: `url(${member.image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '400px', border: '1px solid rgba(255,255,255,0.1)' }} />
                <div>
                  <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{member.name}</h3>
                  <span style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '0.1rem', textTransform: 'uppercase', fontFamily: 'Inter' }}>{member.role}</span>
                  <p style={{ marginTop: '1.5rem', lineHeight: '1.6', opacity: 0.8 }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer style={{ padding: '5rem 5%', textAlign: 'center', background: '#000', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.2rem', marginBottom: '1.5rem' }}>JUSTICE & CO</div>
          <p style={{ opacity: 0.3, fontSize: '0.75rem', fontFamily: 'Inter' }}>ATTORNEY ADVERTISING // © 2026 JUSTICE & CO. GLOBAL LLP</p>
        </footer>
      </main>
    </div>
  );
}
