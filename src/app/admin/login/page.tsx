"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent,
  Alert,
  CircularProgress
} from "@mui/material";
import { Lock, LogIn } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowser();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Successful login
      router.push("/admin/dashboard");
      router.refresh(); // Refresh to ensure server components/middleware pick up the session
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Cinematic Grain Overlay */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        zIndex: 1
      }} />

      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            component={Link} 
            href="/" 
            variant="h4" 
            sx={{ 
              fontWeight: 900, 
              color: '#fff', 
              textDecoration: 'none',
              letterSpacing: '0.4rem',
              textTransform: 'uppercase'
            }}
          >
            Flux<Box component="span" sx={{ color: '#d6c5a5' }}>.</Box>
          </Typography>
          <Typography variant="overline" sx={{ display: 'block', color: '#666', mt: 2, letterSpacing: '0.2rem' }}>
            Mission Control
          </Typography>
        </Box>

        <Card sx={{ bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px' }}>
          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
              <Stack direction="column" spacing={3}>
                {error && <Alert severity="error" sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</Alert>}
                
                <TextField
                  fullWidth
                  label="Admin Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="standard"
                  required
                  InputLabelProps={{ sx: { color: '#444' } }}
                  inputProps={{ sx: { color: '#fff', py: 1.5 } }}
                  sx={{ 
                    '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.1)' },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: '#d6c5a5' },
                    '& .MuiInput-underline:after': { borderBottomColor: '#d6c5a5' }
                  }}
                />

                <TextField
                  fullWidth
                  label="Access Key"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="standard"
                  required
                  InputLabelProps={{ sx: { color: '#444' } }}
                  inputProps={{ sx: { color: '#fff', py: 1.5 } }}
                  sx={{ 
                    '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.1)' },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: '#d6c5a5' },
                    '& .MuiInput-underline:after': { borderBottomColor: '#d6c5a5' }
                  }}
                />

                <Button
                  fullWidth
                  type="submit"
                  disabled={loading}
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Lock size={20} />}
                  sx={{ 
                    bgcolor: '#fff', 
                    color: '#000', 
                    py: 2, 
                    mt: 2,
                    borderRadius: '12px',
                    fontWeight: 800,
                    '&:hover': { bgcolor: '#eee' }
                  }}
                >
                  {loading ? 'Authenticating...' : 'Enter Dashboard'}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

// Add Stack import which was missed
import { Stack } from "@mui/material";
