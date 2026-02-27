import styles from "./success.module.css";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          Flux<span className={styles.logoHighlight}>Webs</span>
        </Link>
      </header>

      <main className={styles.main}>
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
