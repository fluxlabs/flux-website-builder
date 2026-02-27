"use client";

import { useState, useRef } from "react";
import styles from "./intake.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

export default function IntakePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [extractingColors, setExtractingColors] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hasWebsite: null as boolean | null,
    currentUrl: "",
    businessName: "",
    industry: "",
    location: "",
    employeeCount: "1-10",
    vertical: "Professional Services",
    layout: "Clean & Corporate",
    logo: null as File | null,
    logoPreview: "",
    logoQuality: "pending" as "high" | "low" | "pending",
    rebuildLogo: false,
    logoMetrics: { width: 0, height: 0, type: "" },
    extractedColors: [] as string[],
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

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = previewUrl;
    
    img.onload = async () => {
      const isLowRes = img.width < 512 || img.height < 512;
      const isVector = file.type === "image/svg+xml";
      const quality = (isVector || !isLowRes) ? "high" : "low";

      setFormData(prev => ({ 
        ...prev, 
        logo: file, 
        logoPreview: previewUrl,
        logoQuality: quality,
        logoMetrics: { width: img.width, height: img.height, type: file.type }
      }));

      setExtractingColors(true);
      try {
        const { Vibrant } = (await import("node-vibrant")) as any;
        const palette = await Vibrant.from(previewUrl).getPalette();
        const colors = Object.values(palette)
          .filter(swatch => swatch !== null)
          .map((swatch: any) => swatch.getHex());
        
        setFormData(prev => ({ 
          ...prev, 
          extractedColors: colors,
          colors: colors[0] || prev.colors 
        }));
      } catch (err) {
        console.error("Color extraction failed:", err);
      } finally {
        setExtractingColors(false);
      }
    };
  };

  const handlePageToggle = (page: string) => {
    setFormData((prev) => ({
      ...prev,
      pages: prev.pages.includes(page)
        ? prev.pages.filter((p) => p !== page)
        : [...prev.pages, page],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      let finalLogoUrl = "";
      
      // 1. If there's a logo, upload it to Cloudinary first
      if (formData.logo) {
        const uploadData = new FormData();
        uploadData.append("file", formData.logo);
        uploadData.append("quality", formData.logoQuality);
        
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        
        if (uploadRes.ok) {
          const uploadResult = await uploadRes.json();
          finalLogoUrl = uploadResult.url;
        }
      }

      // 2. Submit the full intake with the uploaded logo URL
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          logoUrl: finalLogoUrl // Set the real URL from Cloudinary
        }),
      });

      const data = await response.json();

      if (response.ok && data.id) {
        router.push(`/status/${data.id}`);
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

  const isStep1Valid = formData.name && formData.email && formData.phone && formData.hasWebsite !== null;
  const isStep2Valid = formData.hasWebsite 
    ? formData.currentUrl 
    : (formData.businessName && formData.industry && formData.location);
  const isStep3Valid = !!formData.vertical && !!formData.layout;
  const isStep4Valid = true; // Logo is optional
  const isStep5Valid = !!formData.colors;
  const isStep6Valid = formData.pages.length > 0;
  const isStep7Valid = formData.brandVoice && formData.targetAudience;

  const totalSteps = 8;

  const VERTICAL_OPTIONS = [
    "Professional Services",
    "Creative & Design",
    "Tech & SaaS",
    "Health & Wellness",
    "Home Services",
    "E-commerce",
    "Non-profit"
  ];

  const LAYOUT_OPTIONS = [
    { 
      id: "Clean & Corporate", 
      label: "Clean & Corporate", 
      desc: "Structured, trustworthy, and precise. Perfect for B2B and Law.",
      gradient: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
    },
    { 
      id: "Bold & Brutalist", 
      label: "Bold & Brutalist", 
      desc: "High contrast, big typography, and raw energy. For trendsetters.",
      gradient: "linear-gradient(135deg, #000000 0%, #333333 100%)"
    },
    { 
      id: "Luxury & Minimal", 
      label: "Luxury & Minimal", 
      desc: "Spacious, elegant, and understated. For high-end boutiques.",
      gradient: "linear-gradient(135deg, #fafaf9 0%, #d6d3d1 100%)"
    },
    { 
      id: "Playful & Vibrant", 
      label: "Playful & Vibrant", 
      desc: "Bright colors, soft edges, and friendly vibes. For startups.",
      gradient: "linear-gradient(135deg, #f472b6 0%, #fb923c 100%)"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.backgroundDecor} />
      
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          Flux<span className={styles.logoHighlight}>Webs</span>
        </Link>
        <div className={styles.progressContainer}>
          <div className={styles.stepCounter}>Step {step} of {totalSteps}</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${(step / totalSteps) * 100}%` }} />
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
                  <label>Email Address</label>
                  <div className={styles.inputWrapper}>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Phone Number</label>
                  <div className={styles.inputWrapper}>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup} style={{ marginTop: '3rem' }}>
                <label>Do you currently have a website?</label>
                <div className={styles.checkboxGrid}>
                  <div 
                    className={`${styles.checkboxItem} ${formData.hasWebsite === true ? styles.checkboxActive : ""}`}
                    onClick={() => setFormData(prev => ({ ...prev, hasWebsite: true }))}
                  >
                    Yes, I want to rebuild it
                  </div>
                  <div 
                    className={`${styles.checkboxItem} ${formData.hasWebsite === false ? styles.checkboxActive : ""}`}
                    onClick={() => setFormData(prev => ({ ...prev, hasWebsite: false }))}
                  >
                    No, I need a new one
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && formData.hasWebsite === true && (
            <motion.div 
              key="step2-has" 
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              <h2>The Current Setup</h2>
              <div className={styles.formGroup}>
                <label>Current URL</label>
                <div className={styles.inputWrapper}>
                  <input type="url" name="currentUrl" value={formData.currentUrl} onChange={handleChange} placeholder="https://acme.com" />
                </div>
              </div>
              <div className={styles.formGroup} style={{ marginTop: '2rem' }}>
                <label>Business Name (Optional, if different from domain)</label>
                <div className={styles.inputWrapper}>
                  <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Acme Inc" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && formData.hasWebsite === false && (
            <motion.div 
              key="step2-needs" 
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              <h2>Business Details</h2>
              <div className={styles.gridFields}>
                <div className={styles.formGroup}>
                  <label>Business Name</label>
                  <div className={styles.inputWrapper}>
                    <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Acme Inc" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Specific Niche</label>
                  <div className={styles.inputWrapper}>
                    <input type="text" name="industry" value={formData.industry} onChange={handleChange} placeholder="e.g. Luxury Real Estate, Solar Installation" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Location (City, State or Full Address)</label>
                  <div className={styles.inputWrapper}>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Austin, TX" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Company Size</label>
                  <div className={styles.inputWrapper}>
                    <select name="employeeCount" value={formData.employeeCount} onChange={handleChange} className={styles.select}>
                      <option value="Just Me (1)">Just Me (1)</option>
                      <option value="1-10">1-10 Employees</option>
                      <option value="11-50">11-50 Employees</option>
                      <option value="51-200">51-200 Employees</option>
                      <option value="200+">200+ Employees</option>
                    </select>
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
              <h2>The Blueprint</h2>
              <div className={styles.formGroup}>
                <label>Industry Vertical</label>
                <div className={styles.checkboxGrid}>
                  {VERTICAL_OPTIONS.map(v => (
                    <div 
                      key={v}
                      className={`${styles.checkboxItem} ${formData.vertical === v ? styles.checkboxActive : ""}`}
                      onClick={() => setFormData(prev => ({ ...prev, vertical: v }))}
                    >
                      {v}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup} style={{ marginTop: '4rem' }}>
                <label>Choose Your Layout Style</label>
                <div className={styles.layoutGrid}>
                  {LAYOUT_OPTIONS.map(l => (
                    <div 
                      key={l.id}
                      className={`${styles.layoutCard} ${formData.layout === l.id ? styles.layoutActive : ""}`}
                      onClick={() => setFormData(prev => ({ ...prev, layout: l.id }))}
                    >
                      <div className={styles.layoutPreview} style={{ background: l.gradient }} />
                      <div className={styles.layoutInfo}>
                        <div className={styles.layoutBadge}>Style</div>
                        <h3>{l.label}</h3>
                        <p>{l.desc}</p>
                      </div>
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
              <h2>The Brand</h2>
              <div className={styles.formGroup}>
                <label>Upload Your Logo (Optional)</label>
                <div 
                  className={styles.uploadZone} 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file) handleLogoUpload({ target: { files: [file] } } as any);
                  }}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleLogoUpload} 
                    accept="image/*" 
                    className={styles.hiddenInput} 
                  />
                  {formData.logoPreview ? (
                    <div className={styles.previewContainer}>
                      <img src={formData.logoPreview} alt="Logo Preview" className={styles.logoPreviewImg} />
                      <div className={styles.uploadOverlay}>Click to Change</div>
                    </div>
                  ) : (
                    <div className={styles.uploadPlaceholder}>
                      <div className={styles.uploadIcon}>↑</div>
                      <p>Drop your logo here or click to browse</p>
                      <span>Supports PNG, SVG, JPG</span>
                    </div>
                  )}
                </div>
              </div>

              {formData.logoPreview && (
                <motion.div 
                  className={styles.qualitySection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className={styles.qualityHeader}>
                    <label>Vision Grade</label>
                    <div className={`${styles.qualityBadge} ${styles[formData.logoQuality]}`}>
                      {formData.logoQuality === 'high' ? 'High Fidelity ✓' : 'Low Resolution ⚠'}
                    </div>
                  </div>
                  
                  {formData.logoQuality === 'high' ? (
                    <p className={styles.qualityText}>Your logo is production-ready. We will optimize and use it as-is.</p>
                  ) : (
                    <div className={styles.rebuildOffer}>
                      <div className={styles.offerContent}>
                        <h4>High-Resolution Transformation</h4>
                        <p>Your logo's resolution is below our manifestation standard. We can rebuild it as a high-fidelity vector for crystal clear display on all screens.</p>
                        <div className={styles.priceTag}>+$149.00</div>
                      </div>
                      <button 
                        className={`${styles.rebuildBtn} ${formData.rebuildLogo ? styles.rebuildActive : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, rebuildLogo: !prev.rebuildLogo }))}
                      >
                        {formData.rebuildLogo ? 'Rebuild Selected' : 'Rebuild My Logo'}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {formData.extractedColors.length > 0 && (
                <motion.div 
                  className={styles.paletteSection}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <label>Extracted Brand Palette</label>
                  <div className={styles.extractedPalette}>
                    {formData.extractedColors.map(color => (
                      <div 
                        key={color} 
                        className={`${styles.paletteColor} ${formData.colors === color ? styles.paletteActive : ""}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setFormData(prev => ({ ...prev, colors: color }))}
                        title={color}
                      />
                    ))}
                  </div>
                  <p className={styles.paletteHint}>We've grabbed these from your logo. Select the primary one.</p>
                </motion.div>
              )}
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
              <h2>The Aesthetic</h2>
              <div className={styles.gridFields}>
                <div className={styles.formGroup}>
                  <label>Inspiration Links (Optional)</label>
                  <div className={styles.inputWrapper}>
                    <textarea name="links" value={formData.links} onChange={handleChange} placeholder="e.g. apple.com, stripe.com" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Primary Manifestation Color</label>
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

          {step === 6 && (
            <motion.div 
              key="step6" 
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

          {step === 7 && (
            <motion.div 
              key="step7" 
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
                <label>The "Must-Have" Hero Message (Optional)</label>
                <div className={styles.inputWrapper}>
                  <input type="text" name="heroMessage" value={formData.heroMessage} onChange={handleChange} placeholder="The one sentence that defines your business." />
                </div>
              </div>
            </motion.div>
          )}

          {step === 8 && (
            <motion.div 
              key="step8" 
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
                  <div className={styles.summaryValue}>{formData.businessName || formData.currentUrl}</div>
                  <div style={{ color: '#555', marginTop: '0.5rem' }}>{formData.name} • {formData.email} • {formData.phone}</div>
                  {formData.logoPreview && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                      <img src={formData.logoPreview} alt="Logo" style={{ height: '40px', objectFit: 'contain' }} />
                      <div className={`${styles.statusBadge} ${styles[formData.logoQuality]}`} style={{ fontSize: '0.6rem' }}>
                        {formData.rebuildLogo ? 'REBUILD ORDERED' : 'AS-IS'}
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.summaryItem}>
                  <label>Blueprint</label>
                  <div className={styles.summaryValue}>{formData.vertical}</div>
                  <div style={{ color: '#0070f3', marginTop: '0.5rem', fontWeight: 800 }}>{formData.layout} Layout</div>
                </div>
                <div className={styles.summaryItem}>
                  <label>Personality</label>
                  <div className={styles.summaryValue}>{formData.brandVoice}</div>
                  <div style={{ color: '#555', marginTop: '0.5rem' }}>Audience: {formData.targetAudience}</div>
                </div>
                <div className={styles.summaryItem}>
                  <label>Architecture</label>
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
            {step < totalSteps ? (
              <button 
                className={styles.nextBtn} 
                onClick={nextStep} 
                disabled={
                  (step === 1 && !isStep1Valid) || 
                  (step === 2 && !isStep2Valid) || 
                  (step === 3 && !isStep3Valid) ||
                  (step === 5 && !isStep5Valid) || 
                  (step === 6 && !isStep6Valid)
                }
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
