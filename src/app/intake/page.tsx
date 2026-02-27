"use client";

import { useState } from "react";
import styles from "./intake.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

export default function IntakePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    currentUrl: "",
    links: "",
    colors: "#0070f3",
    logoUrl: "",
    goal: "Generate Leads",
    brandVoice: "Modern & Professional",
    targetAudience: "",
    heroMessage: "",
    pages: [] as string[],
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageToggle = (page: string) => {
    setFormData((prev) => ({
      ...prev,
      pages: prev.pages.includes(page)
        ? prev.pages.filter((p) => p !== page)
        : [...prev.pages, page],
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, logoUrl: URL.createObjectURL(file) }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/success");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = formData.name && formData.email && formData.businessName;
  const isStep3Valid = formData.pages.length > 0;
  const isStep4Valid = formData.brandVoice && formData.targetAudience;

  return (
    <div className={styles.container}>
      <div className={styles.backgroundDecor} />
      
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          Flux<span className={styles.logoHighlight}>Webs</span>
        </Link>
        <div className={styles.progressContainer}>
          <div className={styles.stepCounter}>Step {step} of 5</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${(step / 5) * 100}%` }} />
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1" 
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              <h2>The Foundation</h2>
              <div className={styles.gridFields}>
                <div className={styles.formGroup}>
                  <label>Your Name</label>
                  <div className={styles.inputWrapper}>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Business Name</label>
                  <div className={styles.inputWrapper}>
                    <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Acme Inc" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Email Address</label>
                  <div className={styles.inputWrapper}>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@acme.com" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Current URL (if any)</label>
                  <div className={styles.inputWrapper}>
                    <input type="url" name="currentUrl" value={formData.currentUrl} onChange={handleChange} placeholder="https://acme.com" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2" 
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              <h2>The Aesthetic</h2>
              <div className={styles.gridFields}>
                <div className={styles.formGroup}>
                  <label>Inspiration Links</label>
                  <div className={styles.inputWrapper}>
                    <textarea name="links" value={formData.links} onChange={handleChange} placeholder="e.g. apple.com, stripe.com" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Brand Primary Color</label>
                  <div className={styles.inputWrapper}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                      <input type="color" name="colors" value={formData.colors} onChange={handleChange} />
                      <span style={{ fontSize: '2rem', fontWeight: 800 }}>{formData.colors}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3" 
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              <h2>The Architecture</h2>
              <div className={styles.formGroup}>
                <label>Primary Business Goal</label>
                <div className={styles.inputWrapper}>
                  <select name="goal" value={formData.goal} onChange={handleChange} className={styles.select}>
                    <option value="Generate Leads">Generate Leads</option>
                    <option value="Sell Products">Sell Products</option>
                    <option value="Portfolio Showcase">Portfolio Showcase</option>
                    <option value="Information / Blog">Information / Blog</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup} style={{ marginTop: '4rem' }}>
                <label>Desired Pages</label>
                <div className={styles.checkboxGrid}>
                  {["Home", "About", "Services", "Pricing", "Portfolio", "Contact", "Blog"].map((page) => (
                    <div 
                      key={page} 
                      className={`${styles.checkboxItem} ${formData.pages.includes(page) ? styles.checkboxActive : ""}`}
                      onClick={() => handlePageToggle(page)}
                    >
                      {page}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4" 
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              <h2>The Personality</h2>
              <div className={styles.gridFields}>
                <div className={styles.formGroup}>
                  <label>Brand Voice</label>
                  <div className={styles.inputWrapper}>
                    <select name="brandVoice" value={formData.brandVoice} onChange={handleChange} className={styles.select}>
                      <option value="Modern & Professional">Modern & Professional</option>
                      <option value="Bold & Playful">Bold & Playful</option>
                      <option value="Minimalist & Luxury">Minimalist & Luxury</option>
                      <option value="Technical & Precise">Technical & Precise</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Target Audience</label>
                  <div className={styles.inputWrapper}>
                    <input type="text" name="targetAudience" value={formData.targetAudience} onChange={handleChange} placeholder="e.g. Fortune 500 CEOs, Local Pet Owners" />
                  </div>
                </div>
              </div>
              <div className={styles.formGroup} style={{ marginTop: '3rem' }}>
                <label>The "Must-Have" Hero Message</label>
                <div className={styles.inputWrapper}>
                  <input type="text" name="heroMessage" value={formData.heroMessage} onChange={handleChange} placeholder="The one sentence that defines your business." />
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              key="step5" 
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              <h2>The Vision</h2>
              <div className={styles.summaryGrid}>
                <div className={styles.summaryItem}>
                  <label>Identity</label>
                  <div className={styles.summaryValue}>{formData.businessName}</div>
                  <div style={{ color: '#555', marginTop: '0.5rem' }}>{formData.name} • {formData.email}</div>
                </div>
                <div className={styles.summaryItem}>
                  <label>Aesthetic</label>
                  <div className={styles.summaryValue}>
                    <div className={styles.colorIndicator} style={{ backgroundColor: formData.colors }} />
                    {formData.colors}
                  </div>
                </div>
                <div className={styles.summaryItem}>
                  <label>Personality</label>
                  <div className={styles.summaryValue}>{formData.brandVoice}</div>
                  <div style={{ color: '#555', marginTop: '0.5rem' }}>Audience: {formData.targetAudience}</div>
                </div>
                <div className={styles.summaryItem}>
                  <label>Scale</label>
                  <div className={styles.summaryValue}>{formData.pages.length} Core Pages</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className={styles.footer}>
        <div className={styles.navButtons}>
          {step > 1 && (
            <button className={styles.backBtn} onClick={prevStep} disabled={isSubmitting}>Back</button>
          )}
          
          <Magnetic intensity={0.2}>
            {step < 5 ? (
              <button 
                className={styles.nextBtn} 
                onClick={nextStep} 
                disabled={(step === 1 && !isStep1Valid) || (step === 3 && !isStep3Valid) || (step === 4 && !isStep4Valid)}
              >
                Continue
              </button>
            ) : (
              <button 
                className={styles.nextBtn} 
                onClick={handleSubmit} 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Manifesting..." : "Launch Build"}
              </button>
            )}
          </Magnetic>
        </div>
      </footer>
    </div>
  );
}
