"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./legal.module.css";

type Tab = 'privacy' | 'terms';

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<Tab>('privacy');

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'privacy' ? styles.active : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy Policy
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'terms' ? styles.active : ''}`}
            onClick={() => setActiveTab('terms')}
          >
            Terms of Service
          </button>
        </div>

        <article className={styles.content}>
          {activeTab === 'privacy' ? (
            <div className={styles.section}>
              <h1>Privacy Policy</h1>
              <p className={styles.lastUpdated}>Last Updated: February 27, 2026</p>
              
              <section>
                <h2>1. Information We Collect</h2>
                <p>We collect information you provide directly to us via our intake form, including your name, email address, phone number, and business details. This data is used solely to synthesize and deploy your website.</p>
              </section>

              <section>
                <h2>2. How We Use Your Data</h2>
                <p>Your data is processed by our AI synthesis engine to generate source code and assets for your project. We do not sell your personal information to third parties.</p>
              </section>

              <section>
                <h2>3. Cookies & Tracking</h2>
                <p>We use essential cookies to maintain your session and improve our intake experience. We do not use invasive tracking pixels for advertising.</p>
              </section>
            </div>
          ) : (
            <div className={styles.section}>
              <h1>Terms of Service</h1>
              <p className={styles.lastUpdated}>Last Updated: February 27, 2026</p>

              <section>
                <h2>1. Service Delivery</h2>
                <p>Flux provides an AI-driven website generation service. The 48-72 hour delivery guarantee applies to the initial staging link after a successful intake submission.</p>
              </section>

              <section>
                <h2>2. Intellectual Property</h2>
                <p>Upon final approval and delivery, you own the generated code for your specific instance. Flux retains ownership of its underlying AI models, internal tooling, and template logic.</p>
              </section>

              <section>
                <h2>3. Hosting & DNS</h2>
                <p>While we provide a Launch Guide, the responsibility for pointing DNS records and maintaining domain ownership lies with the client.</p>
              </section>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
