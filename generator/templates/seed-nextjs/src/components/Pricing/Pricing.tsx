import styles from "./Pricing.module.css";

interface PricingTier {
  name: string;
  price: string;
  features: string[];
  cta: string;
}

interface PricingProps {
  tiers: PricingTier[];
}

export default function Pricing({ tiers }: PricingProps) {
  return (
    <section className={styles.pricing}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {tiers.map((tier, index) => (
            <div key={index} className={styles.card}>
              <h3 className={styles.name}>{tier.name}</h3>
              <p className={styles.price}>{tier.price}</p>
              <ul className={styles.features}>
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex}>{feature}</li>
                ))}
              </ul>
              <button className={styles.cta}>{tier.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
