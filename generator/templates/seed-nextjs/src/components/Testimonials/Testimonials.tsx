import styles from "./Testimonials.module.css";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <h2 className={styles.title}>Customer Stories</h2>
        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.card}>
              <p className={styles.quote}>"{testimonial.quote}"</p>
              <div className={styles.footer}>
                <span className={styles.name}>{testimonial.name}</span>
                <span className={styles.role}>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
