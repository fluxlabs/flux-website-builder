"use client";

import styles from "../bold.module.css";
import Link from "next/link";

export default function BoldServicesPage() {
  const services = [
    { title: "STRUCTURAL STEEL", desc: "Heavy-duty steel fabrication and erection for skyscrapers and industrial complexes.", image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&q=80" },
    { title: "INFRASTRUCTURE", desc: "Bridges, tunnels, and large-scale transportation hubs built to last for generations.", image: "https://images.unsplash.com/photo-1541888087820-252f4c398df9?auto=format&fit=crop&w=1200&q=80" },
    { title: "ENERGY SECTOR", desc: "Power plants, grids, and renewable energy foundations for a sustainable future.", image: "https://images.unsplash.com/photo-1534398079543-7ae6d016b8be?auto=format&fit=crop&w=1200&q=80" },
    { title: "MARINE WORK", desc: "Specialized underwater construction and port expansions for global trade.", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80" }
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/bold" className={styles.logo} style={{ textDecoration: 'none' }}>FORGE</Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/templates/bold/about" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900 }}>ABOUT</Link>
          <Link href="/templates/bold/services" style={{ color: '#ffcc00', textDecoration: 'none', fontWeight: 900 }}>SERVICES</Link>
          <Link href="/templates/bold/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>QUOTE</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '6rem', marginBottom: '2rem' }}>HEAVY <br/> <span className={styles.highlight}>DUTY</span> <br/> SERVICES.</h1>
          <p style={{ fontSize: '1.5rem', maxWidth: '800px', marginBottom: '0', fontFamily: 'sans-serif', color: '#888' }}>
            We provide a comprehensive suite of industrial solutions designed to meet the most demanding requirements. From core fabrication to final assembly, we deliver power at every stage.
          </p>
        </section>

        <section className={styles.projects}>
          {services.map((service, i) => (
            <div key={i} className={styles.projectCard} style={{ backgroundImage: `url(${service.image})` }}>
              <div className={styles.projectInfo} style={{ width: '100%' }}>
                <h4 style={{ fontSize: '3rem', margin: '0' }}>{service.title}</h4>
                <p style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '2rem', marginTop: '1rem', fontFamily: 'sans-serif', maxWidth: '600px', textTransform: 'none' }}>
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section style={{ padding: '10rem 5%', background: '#ffcc00', color: '#000' }}>
          <div className={styles.quoteGrid}>
            <h2 style={{ fontSize: '5rem', color: '#000' }}>READY <br/> FOR <br/> <span style={{ color: '#fff', WebkitTextStroke: '2px #000' }}>SCALE?</span></h2>
            <div>
              <p style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '3rem', color: '#000' }}>
                We have the machinery, the manpower, and the expertise to handle projects of any magnitude.
              </p>
              <Link href="/templates/bold/contact" className={styles.cta} style={{ background: '#000', color: '#ffcc00' }}>GET A QUOTE</Link>
            </div>
          </div>
        </section>

        <footer style={{ padding: '5rem', background: '#000', color: '#ffcc00', textAlign: 'center', borderTop: '5px solid #ffcc00' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>FORGE INDUSTRIAL</div>
          <p>© 2026 FORGE INFRASTRUCTURE GRP.</p>
        </footer>
      </main>
    </div>
  );
}
