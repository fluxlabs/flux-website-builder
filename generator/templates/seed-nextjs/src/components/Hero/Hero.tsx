import styles from "./Hero.module.css";

interface HeroProps {
  headline: string;
  subtitle: string;
  ctaText: string;
}

export default function Hero({ headline, subtitle, ctaText }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>{headline}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <button className={styles.cta}>{ctaText}</button>
      </div>
    </section>
  );
}
