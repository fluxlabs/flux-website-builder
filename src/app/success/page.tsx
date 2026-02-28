import styles from "./success.module.css";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className={styles.container}>
      {/* Cinematic Grain Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        zIndex: 1
      }} />

      <header className={styles.header} style={{ position: 'relative', zIndex: 2 }}>
        <Link href="/" className={styles.logo}>
          Flux<span className={styles.logoHighlight}>.</span>
        </Link>
      </header>

      <main className={styles.main} style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.card}>
          <div className={styles.icon}>🚀</div>
          <h1>We're on it!</h1>
          <p className={styles.message}>
            Thanks for choosing Flux. Your build request for your business has been received. 
            Our team is already reviewing your details.
          </p>

          <div className={styles.countdownContainer}>
             <div className={styles.countdownItem}>
               <span className={styles.time}>48-72</span>
               <span className={styles.label}>Hours until first draft</span>
             </div>
          </div>

          <p className={styles.nextSteps}>
            We'll send you an email confirmation shortly. Check your inbox for updates!
          </p>

          <Link href="/" className={styles.homeBtn}>Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
