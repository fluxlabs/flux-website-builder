import styles from "./Pricing.module.css";
import Link from "next/link";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Magnetic from "@/components/ui/Magnetic";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for single landing pages.",
      price: "$1,499",
      features: [
        "3-Page Next.js Site", 
        "48-Hour Rapid Delivery", 
        "AI Content Synthesis", 
        "Interactive Launch Guide",
        "SSL & Hosting Setup",
        "Responsive Mobile Design"
      ],
    },
    {
      name: "Growth",
      description: "Scale your business with speed.",
      price: "$2,999",
      features: [
        "7-Page Custom Site", 
        "72-Hour Delivery Promise", 
        "Advanced SEO Strategy", 
        "Analytics Dashboard", 
        "Custom Contact Flows",
        "Priority AI Build Track",
        "CMS Integration Ready"
      ],
      isPopular: true,
    },
    {
      name: "Pro",
      description: "Custom solutions for innovators.",
      price: "$4,999",
      features: [
        "Custom Page Count", 
        "Full API Integrations", 
        "E-commerce Readiness", 
        "White-Labeling Options",
        "Premium Asset Generation",
        "VIP Implementation Support",
        "Custom Domain Management"
      ],
    },
  ];

  return (
    <section id="pricing" className={styles.pricing}>
      <ScrollReveal className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Simple, No-Guess Pricing</h2>
          <p className={styles.subtitle}>Pay once, own forever. No hidden monthly fees for building.</p>
        </div>
        
        <div className={styles.grid}>
          {plans.map((plan) => (
            <SpotlightCard key={plan.name} className={`${plan.isPopular ? styles.popular : ""}`}>
              <div className={styles.cardContent}>
                {plan.isPopular && <div className={styles.badge}>Most Popular</div>}
                
                <div className={styles.cardHeader}>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <p className={styles.planDesc}>{plan.description}</p>
                  <div className={styles.price}>{plan.price}<span className={styles.priceLabel}>/build</span></div>
                </div>

                <div className={styles.features}>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <span className={styles.check}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Magnetic intensity={0.1} style={{ display: "block" }}>
                  <Link href="/intake" className={styles.planCta}>
                    Choose {plan.name}
                    <div className={styles.ctaArrow}>→</div>
                  </Link>
                </Magnetic>
              </div>
            </SpotlightCard>
          ))}
        </div>
        
        <div className={styles.guarantee}>
          <p>
            <span className={styles.guaranteeIcon}>🛡️</span>
            100% Satisfaction Guarantee. We build until you love it.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
