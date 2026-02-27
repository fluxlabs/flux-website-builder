import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.logo}>
            Flux<span className={styles.logoHighlight}>Webs</span>
          </div>
          <p>© 2026 Flux Webs. All rights reserved.</p>
        </div>
        <div className={styles.links}>
          <div className={styles.column}>
            <h4>Services</h4>
            <ul>
              <li>Landing Pages</li>
              <li>E-commerce</li>
              <li>SaaS</li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Company</h4>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
