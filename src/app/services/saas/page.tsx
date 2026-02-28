"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "../services.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { Server, Globe, Cpu } from "lucide-react";

export default function SaasService() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <header className={styles.hero}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.title}
          >
            SaaS Infrastructure <br/> at Light Speed.
          </motion.h1>
          <p className={styles.subtitle}>Founders: Stop building your own boilerplate. Let Flux synthesize your core architecture in 72 hours.</p>
          <Link href="/intake" className={styles.cta}>Start Your Build</Link>
        </header>

        <section className={styles.details}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <Server className={styles.icon} size={40} />
              <h3>Core Boilerplate</h3>
              <p>Everything you need to launch: Auth, Database, API routes, and clean App Router architecture.</p>
            </div>
            <div className={styles.card}>
              <Globe className={styles.icon} size={40} />
              <h3>Global Edge</h3>
              <p>Deployment-ready infrastructure optimized for sub-10ms latency across the globe.</p>
            </div>
            <div className={styles.card}>
              <Cpu className={styles.icon} size={40} />
              <h3>AI-Augmented Code</h3>
              <p>High-performance TypeScript code synthesized by our engine, following strict modern patterns.</p>
            </div>
          </div>
        </section>

        <section className={styles.extended}>
          <h2>Synthesize Your Scale.</h2>
          <div className={styles.featureRow}>
            <div className={styles.featureBox}>
              <h4>Auth Architect</h4>
              <p>Automated setup of complex RBAC and multi-tenant authentication systems.</p>
            </div>
            <div className={styles.featureBox}>
              <h4>Database Schema</h4>
              <p>Optimized PostgreSQL migrations and types generated from your business requirements.</p>
            </div>
            <div className={styles.featureBox}>
              <h4>API Synthesis</h4>
              <p>REST or GraphQL architectures synthesized with full documentation and testing suites.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
