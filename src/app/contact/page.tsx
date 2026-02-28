"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./contact.module.css";
import Magnetic from "@/components/ui/Magnetic";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.grid}>
          <section className={styles.content}>
            <header className={styles.header}>
              <h1>Let's Scale Your Vision.</h1>
              <p>Have questions about a complex project? Need a custom quote? We're here to help you move fast.</p>
            </header>

            <div className={styles.info}>
              <div className={styles.infoItem}>
                <label>Email Us</label>
                <p>hello@fluxwebs.net</p>
              </div>
              <div className={styles.infoItem}>
                <label>Operation Hours</label>
                <p>24/7 AI Synthesis Pipeline</p>
                <p>Human Support: Mon-Fri 9am-6pm CST</p>
              </div>
            </div>
          </section>

          <section className={styles.formSection}>
            {submitted ? (
              <div className={styles.success}>
                <h2>Message Received.</h2>
                <p>We'll get back to you within 24 hours.</p>
                <button className={styles.resetBtn} onClick={() => setSubmitted(false)}>Send another</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input type="text" required placeholder="John Doe" />
                </div>
                <div className={styles.formGroup}>
                  <label>Email Address</label>
                  <input type="email" required placeholder="john@example.com" />
                </div>
                <div className={styles.formGroup}>
                  <label>Subject</label>
                  <select>
                    <option>General Inquiry</option>
                    <option>Custom Build Request</option>
                    <option>Partnership</option>
                    <option>Support</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Message</label>
                  <textarea required placeholder="How can we help?" />
                </div>
                
                <Magnetic intensity={0.1}>
                  <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </Magnetic>
              </form>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
