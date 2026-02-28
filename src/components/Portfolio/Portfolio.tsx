import styles from "./Portfolio.module.css";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";

export default function Portfolio() {
  const items = [
    { 
      name: "Pulse Medical", 
      category: "Healthcare", 
      style: "Clean & Trustworthy", 
      time: "48 Hours",
      link: "/templates/medical",
      color: "#0070f3"
    },
    { 
      name: "Valente Luxury", 
      category: "High-end Real Estate", 
      style: "Luxury & Minimal", 
      time: "41 Hours",
      link: "/templates/luxury",
      color: "#1c1917"
    },
    { 
      name: "Forge Industrial", 
      category: "Industrial Services", 
      style: "Bold & Brutalist", 
      time: "45 Hours",
      link: "/templates/bold",
      color: "#ffcc00"
    },
    { 
      name: "Nova SaaS", 
      category: "B2B Software", 
      style: "Clean & Professional", 
      time: "38 Hours",
      link: "/templates/saas",
      color: "#0070f3"
    },
    { 
      name: "Aura Dining", 
      category: "Hospitality", 
      style: "Moody & Visual", 
      time: "44 Hours",
      link: "/templates/restaurant",
      color: "#eab308"
    },
    { 
      name: "Justice & Co", 
      category: "Legal Services", 
      style: "Authoritative", 
      time: "50 Hours",
      link: "/templates/legal",
      color: "#1e293b"
    },
  ];

  return (
    <section id="portfolio" className={styles.portfolio}>
      <ScrollReveal className={styles.container}>
        <div className={styles.headerGroup}>
          <h2 className={styles.title}>Reference Architectures</h2>
          <p className={styles.subtitle}>Explore the high-fidelity frameworks our AI engine uses to synthesize your vision.</p>
        </div>
        <div className={styles.grid}>
          {items.map((item) => (
            <SpotlightCard key={item.name} className={styles.cardWrapper}>
              <Link href={item.link} className={styles.cardLink}>
                <div className={styles.placeholder} style={{ background: `linear-gradient(135deg, ${item.color}22, ${item.color}44)` }}>
                  <div className={styles.placeholderLogo} style={{ backgroundColor: item.color }}>{item.name.charAt(0)}</div>
                  <span style={{ color: '#fff' }}>View Live Demo →</span>
                </div>
                <div className={styles.info}>
                  <div className={styles.infoHeader}>
                    <h3>{item.name}</h3>
                    <span className={styles.timeBadge}>{item.time}</span>
                  </div>
                  <p>{item.category} • {item.style}</p>
                </div>
              </Link>
            </SpotlightCard>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
