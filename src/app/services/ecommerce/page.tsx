"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "../services.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Rocket, ShieldCheck } from "lucide-react";

export default function EcommerceService() {
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
            Scale Your Sales <br/> with E-Commerce.
          </motion.h1>
          <p className={styles.subtitle}>Modern storefronts synthesized for speed, security, and seamless customer journeys.</p>
          <Link href="/intake" className={styles.cta}>Start Your Build</Link>
        </header>

        <section className={styles.details}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <ShoppingBag className={styles.icon} size={40} />
              <h3>Storefront Synthesis</h3>
              <p>Custom catalogs and product pages designed to showcase your inventory with premium aesthetics.</p>
            </div>
            <div className={styles.card}>
              <Rocket className={styles.icon} size={40} />
              <h3>Lightning Fast Checkout</h3>
              <p>Optimized checkout flows that reduce abandonment and maximize your average order value.</p>
            </div>
            <div className={styles.card}>
              <ShieldCheck className={styles.icon} size={40} />
              <h3>Secure & Reliable</h3>
              <p>Built-in security best practices and high-performance hosting to keep your business running 24/7.</p>
            </div>
          </div>
        </section>

        <section className={styles.extended}>
          <h2>The Commerce Engine.</h2>
          <div className={styles.featureRow}>
            <div className={styles.featureBox}>
              <h4>Inventory Sync</h4>
              <p>Connect your existing POS or ERP and let Flux handle the data architecture automatically.</p>
            </div>
            <div className={styles.featureBox}>
              <h4>Global Payments</h4>
              <p>Support for 135+ currencies and local payment methods via automated Stripe/Adyen integration.</p>
            </div>
            <div className={styles.featureBox}>
              <h4>SEO for Products</h4>
              <p>Structured data and rich snippets synthesized into every product page for maximum visibility.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
