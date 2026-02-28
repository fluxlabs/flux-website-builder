import styles from "./saas.module.css";
import Link from "next/link";

export default function SaaSTemplate() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>NovaSaaS</div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span>Features</span>
          <span>Pricing</span>
          <Link href="/intake" className={styles.cta}>Start Free</Link>
        </div>
      </nav>

      <main>
        <section className={styles.hero}>
          <h1>Ship your vision <br/> at the speed of light.</h1>
          <p>The ultimate engine for modern startups. Scale your infrastructure without the overhead of a traditional dev team.</p>
          <Link href="/intake" className={styles.cta}>Deploy Now</Link>
        </section>

        <section className={styles.features}>
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

        <section className={styles.pricing}>
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
            </div>
            <div className={`${styles.priceCard} ${styles.popular}`}>
              <h4>Business</h4>
              <div className={styles.price}>$49<span>/mo</span></div>
              <ul>
                <li>Unlimited Requests</li>
                <li>Custom Domains</li>
                <li>99.9% SLA</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.contactSection}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>Ready to ship?</h2>
              <p>Join over 2,000+ companies scaling their infrastructure on NovaSaaS. Get a personalized demo of our edge network.</p>
              <div className={styles.demoImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80)' }} />
            </div>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputGroup}>
                <label>Work Email</label>
                <input type="email" placeholder="name@company.com" />
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
              <button type="button" className={styles.cta} style={{ width: '100%', border: 'none', cursor: 'pointer' }}>Request Demo</button>
            </form>
          </div>
        </section>

        <footer className={styles.footer}>
          <div>© 2026 NovaSaaS. Built with Flux.</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Docs</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
