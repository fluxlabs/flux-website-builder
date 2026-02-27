import styles from "./Portfolio.module.css";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Portfolio() {
  const items = [
    { name: "Coffee Roastery", category: "E-commerce" },
    { name: "SaaS Dashboard", category: "SaaS" },
    { name: "Creative Studio", category: "Portfolio" },
    { name: "Fitness App", category: "Mobile First" },
  ];

  return (
    <section id="portfolio" className={styles.portfolio}>
      <ScrollReveal className={styles.container}>
        <h2 className={styles.title}>Crafting Experiences</h2>
        <div className={styles.grid}>
          {items.map((item) => (
            <SpotlightCard key={item.name} className={styles.cardWrapper}>
              <div className={styles.placeholder}>
                <span>{item.name} Placeholder</span>
              </div>
              <div className={styles.info}>
                <h3>{item.name}</h3>
                <p>{item.category}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
