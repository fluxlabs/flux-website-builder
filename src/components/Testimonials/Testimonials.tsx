import styles from "./Testimonials.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function Testimonials() {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Boutique Owner",
      content: "I went from a rough idea to a live, beautiful site in under 48 hours. The AI captured my brand voice perfectly.",
      avatar: "SJ"
    },
    {
      name: "Mark Thompson",
      role: "Tech Startup Founder",
      content: "The speed is unmatched. We needed a landing page for our seed round and Flux delivered a pro-level site overnight.",
      avatar: "MT"
    },
    {
      name: "Elena Rodriguez",
      role: "Real Estate Agent",
      content: "I've worked with agencies before that took months. Flux did better work in 3 days. Simply incredible.",
      avatar: "ER"
    }
  ];

  return (
    <section id="testimonials" className={styles.testimonials}>
      <ScrollReveal className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>What Visionaries Say</h2>
          <p className={styles.subtitle}>Join the hundreds of businesses launched with Flux speed.</p>
        </div>

        <div className={styles.grid}>
          {reviews.map((review) => (
            <SpotlightCard key={review.name} className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.rating}>★★★★★</div>
                <p className={styles.text}>"{review.content}"</p>
                <div className={styles.author}>
                  <div className={styles.avatar}>{review.avatar}</div>
                  <div className={styles.info}>
                    <div className={styles.name}>{review.name}</div>
                    <div className={styles.role}>{review.role}</div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
