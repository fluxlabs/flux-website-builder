import styles from "./ContactForm.module.css";

export default function ContactForm() {
  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Get in Touch</h2>
          <p className={styles.subtitle}>We'll get back to you within 24 hours.</p>
          <form className={styles.form}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Name</label>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className={styles.field}>
                <label>Email</label>
                <input type="email" placeholder="john@example.com" />
              </div>
            </div>
            <div className={styles.field}>
              <label>Message</label>
              <textarea placeholder="Tell us more about your project" />
            </div>
            <button type="submit" className={styles.submit}>Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}
