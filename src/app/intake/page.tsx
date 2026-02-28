"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  LinearProgress, 
  Grid, 
  Card, 
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  IconButton,
  Chip
} from "@mui/material";
import { ArrowLeft, ArrowRight, Upload, CheckCircle2, AlertCircle, Target, ShoppingBag, Layout, FileText } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

const MotionBox = motion(Box);

function IntakeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    layout: "Modern & Clean",
    logo: null as File | null,
    logoPreview: "",
    logoQuality: "pending" as "high" | "low" | "pending",
    rebuildLogo: false,
    logoMetrics: { width: 0, height: 0, type: "" },
    extractedColors: [] as string[],
    links: "",
    socialLinks: "",
    servicesList: "",
    colors: "#0070f3",
    logoUrl: "",
    goal: "Get More Leads",
    brandVoice: "Modern & Professional",
    targetAudience: "",
    heroMessage: "",
    pages: [] as string[],
    plan: "Growth"
  });

  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam) {
      setFormData(prev => ({ ...prev, plan: planParam }));
    }
  }, [searchParams]);

  const totalSteps = 9;
  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e: any) => {
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
      if (formData.logo) {
        const uploadData = new FormData();
        uploadData.append("file", formData.logo);
        uploadData.append("quality", formData.logoQuality);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
        if (uploadRes.ok) {
          const uploadResult = await uploadRes.json();
          finalLogoUrl = uploadResult.url;
        }
      }

      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, logoUrl: finalLogoUrl }),
      });

      const data = await response.json();
      if (response.ok && data.id) router.push(`/status/${data.id}`);
      else alert("Something went wrong. Please try again.");
    } catch (error) {
      console.error(error);
      alert("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = !!formData.goal;
  const isStep2Valid = formData.name && formData.email && formData.phone && formData.hasWebsite !== null;
  const isStep3Valid = formData.hasWebsite ? formData.currentUrl : (formData.businessName && formData.industry && formData.location);
  const isStep4Valid = !!formData.vertical && !!formData.layout;
  const isStep7Valid = formData.pages.length > 0;

  const GOAL_OPTIONS = [
    { id: "Get More Leads", label: "Get More Customers", icon: <Target size={32} />, desc: "Focus on getting visitors to call or email you." },
    { id: "Sell Products", label: "Sell Online", icon: <ShoppingBag size={32} />, desc: "A beautiful store to sell your products online." },
    { id: "Showcase Work", label: "Portfolio", icon: <Layout size={32} />, desc: "Show off your previous work and projects." },
    { id: "Share News", label: "Blog / Articles", icon: <FileText size={32} />, desc: "A site focused on sharing news and expertise." }
  ];

  const VERTICAL_OPTIONS = ["Professional Services", "Contractor / Trades", "Tech & SaaS", "Health & Beauty", "Restaurant / Food", "Online Store", "Personal Brand"];

  const LAYOUT_OPTIONS = [
    { id: "Modern & Clean", label: "Modern & Clean", desc: "Professional, trust-worthy, and easy to read.", gradient: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" },
    { id: "Bold & Loud", label: "Bold & Exciting", desc: "Big titles and high contrast for a strong brand.", gradient: "linear-gradient(135deg, #000000 0%, #333333 100%)" },
    { id: "Soft & Elegant", label: "Elegant & Luxury", desc: "Classic, high-end feel for premium services.", gradient: "linear-gradient(135deg, #fafaf9 0%, #d6d3d1 100%)" },
    { id: "Fun & Colorful", label: "Playful & Bright", desc: "Friendly colors for a welcoming experience.", gradient: "linear-gradient(135deg, #f472b6 0%, #fb923c 100%)" }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: '#000', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'fixed', inset: 0, background: 'radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.03), transparent 40%), radial-gradient(circle at 90% 90%, rgba(255, 255, 255, 0.03), transparent 40%)', zIndex: 0 }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box component="header" sx={{ py: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component={Link} href="/" sx={{ fontWeight: 900, color: '#fff', textDecoration: 'none', letterSpacing: '-0.05rem' }}>
            Flux<Box component="span" sx={{ background: 'linear-gradient(45deg, #0070f3 0%, #ff0080 50%, #0070f3 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', ml: '2px' }}>Webs</Box>
          </Typography>
          <Box sx={{ width: 200 }}>
            <Typography variant="caption" sx={{ color: '#444', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1rem', mb: 1, display: 'block' }}>
              Progress {step} of {totalSteps}
            </Typography>
            <LinearProgress variant="determinate" value={(step / totalSteps) * 100} sx={{ height: 2, bgcolor: 'rgba(255,255,255,0.05)', '& .MuiLinearProgress-bar': { bgcolor: '#fff' } }} />
          </Box>
        </Box>

        <Box component="main" sx={{ py: 10, minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <MotionBox key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }} sx={{ width: '100%' }}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 6, textAlign: 'center', letterSpacing: '-0.15rem' }}>What is the main goal of your site?</Typography>
                <Grid container spacing={3}>
                  {GOAL_OPTIONS.map(g => (
                    <Grid size={{ xs: 12, sm: 6 }} key={g.id}>
                      <Card onClick={() => { setFormData(prev => ({ ...prev, goal: g.id })); setTimeout(nextStep, 400); }} sx={{ cursor: 'pointer', background: formData.goal === g.id ? '#fff' : 'rgba(255,255,255,0.02)', color: formData.goal === g.id ? '#000' : '#fff', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', background: formData.goal === g.id ? '#fff' : 'rgba(255,255,255,0.04)' } }}>
                        <CardContent sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Box sx={{ color: formData.goal === g.id ? '#0055ff' : '#d6c5a5' }}>{g.icon}</Box>
                          <Box><Typography variant="h5" sx={{ fontWeight: 800 }}>{g.label}</Typography><Typography variant="body2" sx={{ opacity: 0.6 }}>{g.desc}</Typography></Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </MotionBox>
            )}

            {step === 2 && (
              <MotionBox key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 6, textAlign: 'center' }}>Let's start with the basics</Typography>
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12 }}><TextField fullWidth label="Your Name" name="name" value={formData.name} onChange={handleChange} variant="standard" InputLabelProps={{ sx: { color: '#444' } }} inputProps={{ sx: { fontSize: '1.5rem', py: 2, color: '#fff' } }} sx={{ '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.1)' } }} /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} variant="standard" InputLabelProps={{ sx: { color: '#444' } }} inputProps={{ sx: { fontSize: '1.5rem', py: 2, color: '#fff' } }} sx={{ '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.1)' } }} /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} variant="standard" InputLabelProps={{ sx: { color: '#444' } }} inputProps={{ sx: { fontSize: '1.5rem', py: 2, color: '#fff' } }} sx={{ '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.1)' } }} /></Grid>
                </Grid>
                <Box sx={{ mt: 8 }}>
                  <Typography variant="overline" sx={{ color: '#444', fontWeight: 800, mb: 2, display: 'block' }}>Do you already have a website?</Typography>
                  <Stack direction="row" spacing={3}>
                    <Button fullWidth variant="outlined" onClick={() => setFormData(p => ({ ...p, hasWebsite: true }))} sx={{ py: 3, borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', color: formData.hasWebsite === true ? '#000' : '#fff', bgcolor: formData.hasWebsite === true ? '#fff' : 'transparent', '&:hover': { bgcolor: formData.hasWebsite === true ? '#fff' : 'rgba(255,255,255,0.05)' } }}>Yes, update it</Button>
                    <Button fullWidth variant="outlined" onClick={() => setFormData(p => ({ ...p, hasWebsite: false }))} sx={{ py: 3, borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', color: formData.hasWebsite === false ? '#000' : '#fff', bgcolor: formData.hasWebsite === false ? '#fff' : 'transparent', '&:hover': { bgcolor: formData.hasWebsite === false ? '#fff' : 'rgba(255,255,255,0.05)' } }}>No, build a new one</Button>
                  </Stack>
                </Box>
              </MotionBox>
            )}

            {step === 3 && (
              <MotionBox key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 6, textAlign: 'center' }}>{formData.hasWebsite ? "Your Current Website" : "About Your Business"}</Typography>
                {formData.hasWebsite ? (
                  <Stack spacing={4}>
                    <TextField fullWidth label="Website Address (URL)" name="currentUrl" value={formData.currentUrl} onChange={handleChange} variant="standard" inputProps={{ sx: { fontSize: '1.5rem', py: 2, color: '#fff' } }} />
                    <TextField fullWidth label="Business Name" name="businessName" value={formData.businessName} onChange={handleChange} variant="standard" inputProps={{ sx: { fontSize: '1.5rem', py: 2, color: '#fff' } }} />
                  </Stack>
                ) : (
                  <Grid container spacing={4}>
                    <Grid size={{ xs: 12 }}><TextField fullWidth label="Business Name" name="businessName" value={formData.businessName} onChange={handleChange} variant="standard" inputProps={{ sx: { fontSize: '1.5rem', py: 2, color: '#fff' } }} /></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="What kind of business?" name="industry" value={formData.industry} onChange={handleChange} variant="standard" inputProps={{ sx: { fontSize: '1.5rem', py: 2, color: '#fff' } }} /></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="City & State" name="location" value={formData.location} onChange={handleChange} variant="standard" inputProps={{ sx: { fontSize: '1.5rem', py: 2, color: '#fff' } }} /></Grid>
                  </Grid>
                )}
              </MotionBox>
            )}

            {step === 4 && (
              <MotionBox key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} sx={{ width: '100%', maxWidth: 900, mx: 'auto' }}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 6, textAlign: 'center' }}>Pick a style you love</Typography>
                <Box sx={{ mb: 6 }}>
                  <Typography variant="overline" sx={{ color: '#444', fontWeight: 800, mb: 2, display: 'block' }}>Business Category</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {VERTICAL_OPTIONS.map(v => (
                      <Chip key={v} label={v} onClick={() => setFormData(p => ({ ...p, vertical: v }))} sx={{ py: 3, px: 1, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', bgcolor: formData.vertical === v ? '#fff' : 'transparent', color: formData.vertical === v ? '#000' : '#888', fontWeight: 700, '&:hover': { bgcolor: formData.vertical === v ? '#fff' : 'rgba(255,255,255,0.05)' } }} />
                    ))}
                  </Box>
                </Box>
                <Grid container spacing={3}>
                  {LAYOUT_OPTIONS.map(l => (
                    <Grid size={{ xs: 12, sm: 6 }} key={l.id}>
                      <Card onClick={() => setFormData(p => ({ ...p, layout: l.id }))} sx={{ cursor: 'pointer', background: formData.layout === l.id ? 'rgba(255,255,255,0.05)' : 'transparent', border: formData.layout === l.id ? '1px solid #fff' : '1px solid rgba(255,255,255,0.05)', borderRadius: '24px' }}>
                        <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Box sx={{ width: 60, height: 60, borderRadius: '12px', background: l.gradient, flexShrink: 0 }} />
                          <Box><Typography sx={{ fontWeight: 800, color: '#fff' }}>{l.label}</Typography><Typography variant="caption" sx={{ color: '#666' }}>{l.desc}</Typography></Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </MotionBox>
            )}

            {step === 5 && (
              <MotionBox key="step5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 6, textAlign: 'center' }}>Do you have a logo?</Typography>
                <Box onClick={() => fileInputRef.current?.click()} sx={{ height: 300, border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s', '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.02)' } }}>
                  <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" style={{ display: 'none' }} />
                  {formData.logoPreview ? <img src={formData.logoPreview} style={{ height: 120, objectFit: 'contain' }} alt="Logo" /> : <Stack alignItems="center" spacing={2}><Upload size={48} color="#444" /><Typography sx={{ color: '#444', fontWeight: 700 }}>Click to upload your logo</Typography><Typography variant="caption" sx={{ color: '#333' }}>No logo? We can help you build one later.</Typography></Stack>}
                </Box>
                {formData.extractedColors.length > 0 && (
                  <Box sx={{ mt: 6, textAlign: 'center' }}>
                    <Typography variant="overline" sx={{ color: '#444', fontWeight: 800, mb: 2, display: 'block' }}>Pick a brand color</Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                      {formData.extractedColors.map(c => (
                        <Box key={c} onClick={() => setFormData(p => ({ ...p, colors: c }))} sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: c, cursor: 'pointer', border: formData.colors === c ? '3px solid #fff' : 'none', transform: formData.colors === c ? 'scale(1.2)' : 'none', transition: 'all 0.2s' }} />
                      ))}
                    </Stack>
                  </Box>
                )}
              </MotionBox>
            )}

            {step === 6 && (
              <MotionBox key="step6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 6, textAlign: 'center' }}>Inspiration</Typography>
                <Stack spacing={6}>
                  <TextField fullWidth multiline rows={2} label="List 2-3 websites you like" name="links" value={formData.links} onChange={handleChange} variant="standard" placeholder="e.g. apple.com, or a competitor's site" inputProps={{ sx: { fontSize: '1.25rem', color: '#fff' } }} />
                  <TextField fullWidth label="Your Social Media links" name="socialLinks" value={formData.socialLinks} onChange={handleChange} variant="standard" placeholder="Facebook, Instagram, LinkedIn" inputProps={{ sx: { fontSize: '1.25rem', color: '#fff' } }} />
                  <Box>
                    <Typography variant="overline" sx={{ color: '#444', fontWeight: 800, mb: 2, display: 'block' }}>Or pick a color you like</Typography>
                    <Stack direction="row" spacing={4} alignItems="center">
                      <input type="color" name="colors" value={formData.colors} onChange={handleChange} style={{ width: 80, height: 80, border: 'none', background: 'none', cursor: 'pointer' }} />
                      <Typography sx={{ fontSize: '3rem', fontWeight: 900 }}>{formData.colors}</Typography>
                    </Stack>
                  </Box>
                </Stack>
              </MotionBox>
            )}

            {step === 7 && (
              <MotionBox key="step7" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 6, textAlign: 'center' }}>What pages do you need?</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mb: 6 }}>
                  {["Home", "About Us", "Services", "Pricing", "Contact", "Blog", "FAQ"].map((p) => (
                    <Chip key={p} label={p} onClick={() => handlePageToggle(p)} sx={{ py: 4, px: 2, fontSize: '1.25rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', bgcolor: formData.pages.includes(p) ? '#fff' : 'transparent', color: formData.pages.includes(p) ? '#000' : '#888', fontWeight: 800, '&:hover': { bgcolor: formData.pages.includes(p) ? '#fff' : 'rgba(255,255,255,0.05)' } }} />
                  ))}
                </Box>
                <TextField fullWidth multiline rows={3} label="List your services or products" name="servicesList" value={formData.servicesList} onChange={handleChange} variant="standard" placeholder="Tell us exactly what you do or sell so we can write the text for you." inputProps={{ sx: { fontSize: '1.25rem', color: '#fff' } }} />
              </MotionBox>
            )}

            {step === 8 && (
              <MotionBox key="step8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 6, textAlign: 'center' }}>Voice & Tone</Typography>
                <Stack spacing={6}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{ color: '#444' }}>How should your site sound?</InputLabel>
                    <Select name="brandVoice" value={formData.brandVoice} onChange={handleChange} sx={{ fontSize: '1.5rem', color: '#fff', py: 1 }}>
                      <MenuItem value="Modern & Professional">Modern & Professional</MenuItem>
                      <MenuItem value="Friendly & Welcoming">Friendly & Welcoming</MenuItem>
                      <MenuItem value="High-End & Luxury">High-End & Luxury</MenuItem>
                      <MenuItem value="Simple & Direct">Simple & Direct</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField fullWidth label="Who are your customers?" name="targetAudience" value={formData.targetAudience} onChange={handleChange} variant="standard" placeholder="e.g. Local homeowners, busy parents, tech startups" inputProps={{ sx: { fontSize: '1.5rem', color: '#fff' } }} />
                  <TextField fullWidth label="What makes you special?" name="heroMessage" value={formData.heroMessage} onChange={handleChange} variant="standard" placeholder="The one thing people should know about your business." inputProps={{ sx: { fontSize: '1.5rem', color: '#fff' } }} />
                </Stack>
              </MotionBox>
            )}

            {step === 9 && (
              <MotionBox key="step9" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} sx={{ width: '100%', maxWidth: 1000, mx: 'auto' }}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 6, textAlign: 'center' }}>Ready to build?</Typography>
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <Typography variant="overline" sx={{ color: '#444' }}>Business</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>{formData.businessName || formData.currentUrl}</Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>{formData.name} • {formData.email}</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <Typography variant="overline" sx={{ color: '#444' }}>Plan</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>{formData.vertical}</Typography>
                      <Typography variant="body2" sx={{ color: '#0070f3', fontWeight: 800 }}>{formData.layout} Style • {formData.plan} Plan</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <Typography variant="overline" sx={{ color: '#444' }}>Details</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>{formData.brandVoice}</Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>Target Customers: {formData.targetAudience}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>

        <Box sx={{ py: 6, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4 }}>
          {step > 1 && <Button onClick={prevStep} sx={{ color: '#444', fontWeight: 800 }}>Back</Button>}
          <Magnetic intensity={0.2}>
            <Button 
              variant="contained" 
              onClick={step === totalSteps ? handleSubmit : nextStep} 
              disabled={isSubmitting || (step === 2 && !isStep2Valid) || (step === 3 && !isStep3Valid) || (step === 4 && !isStep4Valid) || (step === 7 && !isStep7Valid)}
              endIcon={step < totalSteps ? <ArrowRight /> : null}
              sx={{ bgcolor: '#fff', color: '#000', px: 6, py: 2, borderRadius: '60px', fontWeight: 800, '&:hover': { bgcolor: '#eee' } }}
            >
              {step === totalSteps ? (isSubmitting ? "Building..." : "Launch Website") : "Continue"}
            </Button>
          </Magnetic>
        </Box>
      </Container>
    </Box>
  );
}

export default function IntakePage() {
  return (
    <Suspense fallback={<Box sx={{ bgcolor: '#000', height: '100vh' }} />}>
      <IntakeContent />
    </Suspense>
  );
}
