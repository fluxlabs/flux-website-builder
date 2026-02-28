"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./technology.module.css";
import { motion } from "framer-motion";
import { Cpu, Layers, GitBranch, Shield } from "lucide-react";

export default function TechnologyPage() {
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
            The Synthesis <br/> Stack.
          </motion.h1>
          <p className={styles.subtitle}>Our proprietary engine transforms abstract brand concepts into optimized production code.</p>
        </header>

        <section className={styles.architecture}>
          <div className={styles.step}>
            <div className={styles.stepIcon}><Cpu size={32} /></div>
            <div className={styles.stepContent}>
              <h3>01. Identity Ingestion</h3>
              <p>The engine begins by analyzing your intake data—colors, layout preferences, and brand voice. It doesn't just copy inputs; it understands the "vibe" of your industry.</p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepIcon}><Layers size={32} /></div>
            <div className={styles.stepContent}>
              <h3>02. Neural Layout Generation</h3>
              <p>We use a specialized LLM pipeline to synthesize a bespoke digital architecture. This isn't a template selection—it's a custom-built Next.js App Router structure generated in real-time.</p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepIcon}><GitBranch size={32} /></div>
            <div className={styles.stepContent}>
              <h3>03. Automated Provisioning</h3>
              <p>Flux programmatically creates a GitHub repository, pushes the generated code, and triggers a Vercel deployment hook. Everything is version-controlled from the first second.</p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepIcon}><Shield size={32} /></div>
            <div className={styles.stepContent}>
              <h3>04. Compilation Guardrails</h3>
              <p>Before a site ever reaches your eyes, it must pass an automated "Synthesis Audit." We run full build checks, linting, and accessibility scans to ensure zero-error delivery.</p>
            </div>
          </div>
        </section>

        <section className={styles.stack}>
          <h2>Built on the Edge</h2>
          <div className={styles.stackGrid}>
            <div className={styles.stackItem}>Next.js 15</div>
            <div className={styles.stackItem}>TypeScript</div>
            <div className={styles.stackItem}>Tailwind CSS</div>
            <div className={styles.stackItem}>Supabase</div>
            <div className={styles.stackItem}>Vercel</div>
            <div className={styles.stackItem}>Octokit</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
