"use client";

import styles from "../bold.module.css";
import Link from "next/link";

export default function BoldProjectsPage() {
  const projects = [
    { title: "SKYLINE REFORGE", desc: "STRUCTURAL STEEL // CHICAGO, IL", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80" },
    { title: "MEGA-GRID PHASE 2", desc: "INFRASTRUCTURE // NEVADA", image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&q=80" },
    { title: "PORT EXPANSION", desc: "MARINE // SEATTLE, WA", image: "https://images.unsplash.com/photo-1541888087820-252f4c398df9?auto=format&fit=crop&w=1200&q=80" },
    { title: "FOUNDRY ZERO", desc: "MANUFACTURING // DETROIT, MI", image: "https://images.unsplash.com/photo-1534398079543-7ae6d016b8be?auto=format&fit=crop&w=1200&q=80" },
    { title: "SOLAR FARM X", desc: "ENERGY // ARIZONA", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80" },
    { title: "RIVER BRIDGE", desc: "INFRASTRUCTURE // PORTLAND, OR", image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80" }
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/bold" className={styles.logo} style={{ textDecoration: 'none' }}>FORGE</Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/templates/bold/about" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900 }}>ABOUT</Link>
          <Link href="/templates/bold/services" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900 }}>SERVICES</Link>
          <Link href="/templates/bold/projects" style={{ color: '#ffcc00', textDecoration: 'none', fontWeight: 900 }}>PROJECTS</Link>
          <Link href="/templates/bold/faq" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900 }}>FAQ</Link>
          <Link href="/templates/bold/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>QUOTE</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '5rem', marginBottom: '2rem' }}>MONUMENTAL <br/> <span className={styles.highlight}>PROJECTS.</span></h1>
          <p style={{ fontSize: '1.5rem', maxWidth: '800px', marginBottom: '0', fontFamily: 'sans-serif', color: '#888' }}>
            A selection of our most demanding and iconic builds. We deliver on time, on budget, and beyond expectations.
          </p>
        </section>

        <section className={styles.projects}>
          {projects.map((project, i) => (
            <div key={i} className={styles.projectCard} style={{ backgroundImage: `url(${project.image})` }}>
              <div className={styles.projectInfo} style={{ width: '100%' }}>
                <h4 style={{ fontSize: '2.5rem', margin: '0' }}>{project.title}</h4>
                <p style={{ fontSize: '1rem', color: '#ffcc00', marginTop: '0.5rem', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section style={{ padding: '8rem 5%', background: '#ffcc00', color: '#000', textAlign: 'center' }}>
          <h2 style={{ fontSize: '4rem', color: '#000', marginBottom: '2rem' }}>READY TO BUILD?</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '3rem', color: '#000' }}>
            Bring us your most challenging plans. We have the steel to back it up.
          </p>
          <Link href="/templates/bold/contact" className={styles.cta} style={{ background: '#000', color: '#ffcc00', fontSize: '1.5rem', padding: '1rem 3rem' }}>GET A QUOTE</Link>
        </section>

        <footer style={{ padding: '5rem', background: '#000', color: '#ffcc00', textAlign: 'center', borderTop: '5px solid #ffcc00' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>FORGE INDUSTRIAL</div>
          <p>© 2026 FORGE INFRASTRUCTURE GRP.</p>
        </footer>
      </main>
    </div>
  );
}
