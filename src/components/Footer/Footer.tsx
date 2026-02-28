import styles from "./Footer.module.css";
import Link from "next/link";

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
              <li><Link href="/intake">Landing Pages</Link></li>
              <li><Link href="/intake">E-commerce</Link></li>
              <li><Link href="/intake">SaaS</Link></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Support</h4>
            <ul>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/legal">Legal</Link></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/legal">Privacy Policy</Link></li>
              <li><Link href="/legal">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
