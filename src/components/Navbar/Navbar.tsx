import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Flux<span className={styles.logoHighlight}>Webs</span>
        </Link>
        <div className={styles.links}>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/#portfolio">Portfolio</Link>
          <Link href="/technology">Technology</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About</Link>
          <Link href="/intake" className={styles.stickyCta}>Start Your Build</Link>
        </div>
      </div>
    </nav>
  );
}
