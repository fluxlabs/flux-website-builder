"use client";

import styles from "../restaurant.module.css";
import Link from "next/link";

export default function RestaurantServicesPage() {
  const menuItems = [
    { name: "Wild Hearth Bread", price: "$12", desc: "Ancient grains sourdough with fermented cultured butter." },
    { name: "Aura Garden Salad", price: "$18", desc: "Seasonal botanicals, toasted pine nuts, and wildflower vinaigrette." },
    { name: "Cinder Octopus", price: "$28", desc: "Coal-fired octopus, smoked potato foam, and preserved lemon." },
    { name: "Aged Wagyu Ribeye", price: "$95", desc: "45-day dry-aged wagyu with charred seasonal alliums." },
    { name: "Smoked Honey Duck", price: "$42", desc: "Confit duck leg, honey-glazed breast, and forest berry reduction." },
    { name: "Lichen Meringue", price: "$16", desc: "Yuzu curd, forest floor moss, and birch-infused meringue." }
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/templates/restaurant" className={styles.logo} style={{ color: '#fff', textDecoration: 'none' }}>AURA</Link>
        <div style={{ display: 'flex', gap: '3rem', fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2rem', alignItems: 'center' }}>
          <Link href="/templates/restaurant/about" style={{ color: '#fff', textDecoration: 'none' }}>Story</Link>
          <Link href="/templates/restaurant/services" style={{ color: '#eab308', textDecoration: 'none' }}>Menu</Link>
          <Link href="/templates/restaurant/gallery" style={{ color: '#fff', textDecoration: 'none' }}>Atmosphere</Link>
          <Link href="/templates/restaurant/private-dining" style={{ color: '#fff', textDecoration: 'none' }}>Private Events</Link>
          <Link href="/templates/restaurant/contact" className={styles.cta} style={{ padding: '0.5rem 1.5rem', fontSize: '0.7rem' }}>RESERVE</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero} style={{ height: '70vh', backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1550966842-28c2e2ca0435?auto=format&fit=crop&w=1600&q=80)' }}>
          <label className={styles.label}>TASTING MENU</label>
          <h1 style={{ fontSize: '5rem' }}>Seasonal <br/> Composition.</h1>
          <p>Our menu is a living thing, changing with the rhythms of the land. We offer both a curated tasting experience and an à la carte selection that celebrates the present moment.</p>
        </section>

        <section className={styles.menu}>
          <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
            <h2 style={{ fontSize: '4rem', marginBottom: '2rem' }}>Dinner Selection</h2>
            <p style={{ fontFamily: 'Inter', opacity: 0.5, letterSpacing: '0.1rem' }}>Sourcing globally, sourcing locally, serving visionary.</p>
          </div>
          <div className={styles.menuGrid}>
            {menuItems.map((item, i) => (
              <div key={i} className={styles.menuItem}>
                <div className={styles.itemInfo}>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className={styles.price}>{item.price}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.instagramSection}>
          <div className={styles.instaHeader}>
            <label>VISUALS FROM THE HEARTH</label>
            <h3>@aura_gastronomy</h3>
          </div>
          <div className={styles.instaGrid}>
            <div className={styles.instaItem} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80)' }} />
            <div className={styles.instaItem} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80)' }} />
            <div className={styles.instaItem} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550966842-28c2e2ca0435?auto=format&fit=crop&w=800&q=80)' }} />
            <div className={styles.instaItem} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80)' }} />
          </div>
        </section>

        <footer style={{ padding: '8rem 5%', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#050505' }}>
          <div style={{ fontSize: '2rem', letterSpacing: '0.5rem', marginBottom: '2rem' }}>AURA</div>
          <p style={{ fontSize: '0.7rem', color: '#444', letterSpacing: '0.2rem', fontFamily: 'Inter', fontWeight: 800 }}>© 2026 AURA DINING GROUP // ALL RIGHTS RESERVED</p>
        </footer>
      </main>
    </div>
  );
}
