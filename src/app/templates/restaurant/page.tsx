import styles from "./restaurant.module.css";
import Link from "next/link";

export default function RestaurantTemplate() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>AURA</div>
        <div style={{ display: 'flex', gap: '3rem', fontSize: '0.8rem', letterSpacing: '0.1rem', textTransform: 'uppercase' }}>
          <span>Story</span>
          <span>Menu</span>
          <span>Private Dining</span>
          <Link href="/intake" className={styles.cta} style={{ padding: '0.5rem 1.5rem', marginTop: '-0.3rem' }}>Reserve</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero}>
          <h1>Dining, <br/> Redefined.</h1>
          <p>An immersive culinary journey through seasonal ingredients and artisanal craftsmanship.</p>
          <Link href="/intake" className={styles.cta}>The Experience</Link>
        </section>

        <section className={styles.menu}>
          <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '6rem' }}>Seasonal Highlights</h2>
          <div className={styles.menuGrid}>
            <div className={styles.menuItem}>
              <div className={styles.itemInfo}>
                <h3>Wild Mushroom Risotto</h3>
                <p>Black truffle, 24-month aged parmesan, chives</p>
              </div>
              <div className={styles.price}>$32</div>
            </div>
            <div className={styles.menuItem}>
              <div className={styles.itemInfo}>
                <h3>Pan Seared Scallops</h3>
                <p>Cauliflower purée, pancetta, lemon oil</p>
              </div>
              <div className={styles.price}>$28</div>
            </div>
            <div className={styles.menuItem}>
              <div className={styles.itemInfo}>
                <h3>Roasted Duck Breast</h3>
                <p>Cherry reduction, parsnip, wilted greens</p>
              </div>
              <div className={styles.price}>$45</div>
            </div>
            <div className={styles.menuItem}>
              <div className={styles.itemInfo}>
                <h3>Chocolate Fondant</h3>
                <p>Salted caramel, vanilla bean gelato</p>
              </div>
              <div className={styles.price}>$16</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
