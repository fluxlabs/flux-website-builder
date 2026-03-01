"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Drawer, 
  IconButton, 
  Stack, 
  Chip, 
  Divider,
  Avatar,
  Tab,
  Tabs,
  Select,
  MenuItem,
  FormControl
} from "@mui/material";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import {
  Rocket,
  Search,
  Trash2,
  ExternalLink,
  X,
  Activity,
  ArrowLeft,
  LogOut,
  Mail
} from "lucide-react";

const MotionCard = motion(Card);

const STATUSES = ["new", "ai_generating", "staging_ready", "client_review", "approved", "live"];
type View = 'pipeline' | 'clients' | 'analytics' | 'client-detail';

export default function AdminDashboard() {
  const router = useRouter();
  const [intakes, setIntakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [resending, setResending] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [selectedIntake, setSelectedIntake] = useState<any>(null);
  const [selectedClientEmail, setSelectedClientEmail] = useState<string | null>(null);
  const [liveLogs, setLiveLogs] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<View>('pipeline');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createSupabaseBrowser();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin/login");
        return;
      }
      setUser(user);
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const fetchIntakes = async () => {
    try {
      const res = await fetch("/api/admin/intakes");
      const data = await res.json();
      setIntakes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    const intakeId = currentView === 'analytics' ? '' : (selectedIntake?.id || '');
    try {
      const res = await fetch(`/api/admin/logs?intakeId=${intakeId}&limit=100`);
      const data = await res.json();
      setLiveLogs(data.logs || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (user) {
      fetchIntakes();
      interval = setInterval(fetchIntakes, 15000); // 15s is sufficient for pipeline view
    }
    return () => clearInterval(interval);
  }, [user]);

  // Only poll logs when actively needed: selected intake is building, or analytics view
  const isActivelyBuilding = selectedIntake?.status === 'ai_generating' || selectedIntake?.status === 'new';
  useEffect(() => {
    let logInterval: ReturnType<typeof setInterval>;
    if (currentView === 'analytics') {
      fetchLogs();
      logInterval = setInterval(fetchLogs, 10000); // Analytics: slower poll
    } else if (selectedIntake && isActivelyBuilding) {
      fetchLogs();
      logInterval = setInterval(fetchLogs, 5000); // Active build: moderate poll
    } else if (selectedIntake) {
      fetchLogs(); // Fetch once for non-building intakes, no polling
    } else {
      setLiveLogs([]);
    }
    return () => clearInterval(logInterval);
  }, [selectedIntake, currentView, isActivelyBuilding]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/admin/intakes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      fetchIntakes();
    } catch (err) { console.error(err); }
  };

  const deleteIntake = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/admin/intakes?id=${id}`, { method: "DELETE" });
      fetchIntakes();
      if (selectedIntake?.id === id) setSelectedIntake(null);
    } catch (err) { console.error(err); }
  };

  const triggerSynthesis = async (id: string, mode: 'full' | 'research' | 'design' = 'full') => {
    try {
      const modeLabel = mode === 'full' ? 'Full Synthesis' : mode === 'research' ? 'Market Research' : 'Design Rethink';
      alert(`Triggering ${modeLabel}...`);
      await fetch("/api/admin/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intakeId: id, mode }),
      });
      fetchIntakes();
    } catch (err) { console.error(err); }
  };

  const triggerSeed = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/seed", { method: "POST" });
      if (res.ok) {
        await fetchIntakes();
      } else {
        const err = await res.json();
        alert(`Seed failed: ${err.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to trigger seed.");
    } finally {
      setLoading(false);
    }
  };

  const resendEmail = async (id: string, type: string) => {
    try {
      setResending(type);
      const res = await fetch("/api/admin/resend-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intakeId: id, type }),
      });
      if (res.ok) {
        alert(`${type.toUpperCase()} email resent successfully.`);
      } else {
        const err = await res.json();
        alert(`Failed to resend email: ${err.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to resend email.");
    } finally {
      setResending(null);
    }
  };

  const getStatusLabel = (s: string) => s.replace("_", " ").toUpperCase();

  const clients = intakes.reduce((acc, intake) => {
    const email = intake.email || "no-email";
    if (!acc[email]) {
      acc[email] = { email, name: intake.name, business_name: intake.business_name, projects: [], total_projects: 0, live_projects: 0 };
    }
    acc[email].projects.push(intake);
    acc[email].total_projects++;
    if (intake.status === 'live') acc[email].live_projects++;
    return acc;
  }, {} as Record<string, any>);

  const clientList = Object.values(clients);
  const avgBuildTime = intakes.filter(i => i.build_time_ms).reduce((acc, i) => acc + i.build_time_ms, 0) / (intakes.filter(i => i.build_time_ms).length || 1);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#000', color: '#fff' }}>Loading CRM...</Box>;

  return (
    <Box sx={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Box component="header" sx={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)', py: 2 }}>
        <Container maxWidth="xl">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={6} alignItems="center">
              <Typography component={Link} href="/" variant="h6" sx={{ fontWeight: 900, textDecoration: 'none', color: '#fff', letterSpacing: '0.2rem', textTransform: 'uppercase', fontSize: '1rem' }}>Flux<Box component="span" sx={{ color: '#d6c5a5' }}>.</Box></Typography>
              <Tabs value={tabValue} onChange={(_, v) => { setTabValue(v); setCurrentView(v === 0 ? 'pipeline' : v === 1 ? 'clients' : 'analytics'); }} textColor="inherit" TabIndicatorProps={{ sx: { bgcolor: '#d6c5a5' } }}>
                <Tab label="Pipeline" sx={{ fontWeight: 700 }} />
                <Tab label="Clients" sx={{ fontWeight: 700 }} />
                <Tab label="Analytics" sx={{ fontWeight: 700 }} />
              </Tabs>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button variant="contained" onClick={triggerSeed} disabled={loading} sx={{ bgcolor: '#fff', color: '#000', fontWeight: 800, borderRadius: '8px', '&:hover': { bgcolor: '#eee' } }}>+ Seed Vision</Button>
              <IconButton onClick={handleLogout} sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#ef4444' } }}><LogOut size={20} /></IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 6 }}>
        {currentView === 'pipeline' && (
          <Box sx={{ display: 'flex', gap: 3, overflowX: 'auto', pb: 4 }}>
            {STATUSES.map(status => (
              <Box key={status} sx={{ minWidth: 320, width: 320 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#444', letterSpacing: '0.1rem' }}>{getStatusLabel(status)}</Typography>
                  <Chip label={intakes.filter(i => i.status === status).length} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.05)', fontWeight: 800 }} />
                </Stack>
                <Stack spacing={2}>
                  {intakes.filter(i => i.status === status).map(intake => (
                    <MotionCard key={intake.id} onClick={() => setSelectedIntake(intake)} sx={{ bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', borderRadius: '16px', '&:hover': { bgcolor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' } }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, fontSize: '1rem' }}>{intake.business_name}</Typography>
                        <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>{intake.name}</Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                          <Chip label={intake.goal} size="small" sx={{ fontSize: '0.6rem', fontWeight: 800, bgcolor: 'rgba(0,112,243,0.1)', color: '#0070f3' }} />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="caption" sx={{ color: '#333' }}>{new Date(intake.created_at).toLocaleDateString()}</Typography>
                          <IconButton size="small" onClick={(e) => { e.stopPropagation(); deleteIntake(intake.id); }} sx={{ color: 'rgba(255,255,255,0.2)', '&:hover': { color: '#ef4444' } }}><Trash2 size={16} /></IconButton>
                        </Stack>
                      </CardContent>
                    </MotionCard>
                  ))}
                </Stack>
              </Box>
            ))}
          </Box>
        )}

        {currentView === 'clients' && (
          <Grid container spacing={3}>
            {clientList.map((client: any) => (
              <Grid size={{ xs: 12, md: 4 }} key={client.email}>
                <Card 
                  onClick={() => { setSelectedClientEmail(client.email); setCurrentView('client-detail'); }}
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.05)', 
                    borderRadius: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 3 }}>
                      <Avatar sx={{ bgcolor: '#0070f3', fontWeight: 800 }}>{client.name?.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>{client.name}</Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>{client.email}</Typography>
                      </Box>
                    </Stack>
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 3 }} />
                    <Stack direction="row" justifyContent="space-between">
                      <Box>
                        <Typography variant="caption" sx={{ color: '#444', fontWeight: 800, display: 'block' }}>PROJECTS</Typography>
                        <Typography sx={{ fontWeight: 700 }}>{client.total_projects}</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" sx={{ color: '#444', fontWeight: 800, display: 'block' }}>LIVE SITES</Typography>
                        <Typography sx={{ fontWeight: 700, color: '#00ff41' }}>{client.live_projects}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {currentView === 'client-detail' && selectedClientEmail && (
          <Box>
            <Button 
              startIcon={<ArrowLeft size={16} />} 
              onClick={() => { setCurrentView('clients'); setTabValue(1); }}
              sx={{ mb: 4, color: '#666', '&:hover': { color: '#fff' } }}
            >
              Back to Clients
            </Button>
            
            <Box sx={{ mb: 6 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>{clients[selectedClientEmail].name}</Typography>
              <Typography sx={{ color: '#666' }}>{selectedClientEmail}</Typography>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Projects</Typography>
            <Grid container spacing={3}>
              {clients[selectedClientEmail].projects.map((project: any) => (
                <Grid size={{ xs: 12, md: 6 }} key={project.id}>
                  <Card sx={{ bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
                        <Box>
                          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>{project.business_name}</Typography>
                          <Typography variant="body2" sx={{ color: '#666' }}>Created {new Date(project.created_at).toLocaleDateString()}</Typography>
                        </Box>
                        <Chip 
                          label={getStatusLabel(project.status)} 
                          size="small" 
                          sx={{ 
                            fontWeight: 800, 
                            bgcolor: project.status === 'live' ? 'rgba(0,255,65,0.1)' : 'rgba(255,255,255,0.05)',
                            color: project.status === 'live' ? '#00ff41' : '#fff'
                          }} 
                        />
                      </Stack>
                      
                      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                        <Chip label={project.goal} variant="outlined" sx={{ color: '#888', borderColor: 'rgba(255,255,255,0.1)' }} />
                        <Chip label={project.vertical} variant="outlined" sx={{ color: '#888', borderColor: 'rgba(255,255,255,0.1)' }} />
                      </Stack>

                      <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 3 }} />

                      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1}>
                          <Button 
                            variant="outlined" 
                            size="small"
                            onClick={() => setSelectedIntake(project)}
                            sx={{ borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                          >
                            Manage
                          </Button>
                          {project.staging_url && (
                            <IconButton 
                              component="a" 
                              href={project.staging_url} 
                              target="_blank"
                              size="small"
                              sx={{ color: '#d6c5a5' }}
                            >
                              <ExternalLink size={18} />
                            </IconButton>
                          )}
                        </Stack>
                        <IconButton 
                          onClick={() => deleteIntake(project.id)}
                          sx={{ color: 'rgba(255,255,255,0.2)', '&:hover': { color: '#ef4444' } }}
                        >
                          <Trash2 size={20} />
                        </IconButton>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {currentView === 'analytics' && (
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 3 }}><Card sx={{ bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', textAlign: 'center', p: 4 }}><Typography variant="overline" sx={{ color: '#444', fontWeight: 800 }}>Avg Build Time</Typography><Typography variant="h3" sx={{ fontWeight: 800 }}>{(avgBuildTime / 1000).toFixed(1)}s</Typography></Card></Grid>
            <Grid size={{ xs: 12, md: 3 }}><Card sx={{ bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', textAlign: 'center', p: 4 }}><Typography variant="overline" sx={{ color: '#444', fontWeight: 800 }}>Live Projects</Typography><Typography variant="h3" sx={{ fontWeight: 800 }}>{intakes.filter(i => i.status === 'live').length}</Typography></Card></Grid>
            <Grid size={{ xs: 12, md: 3 }}><Card sx={{ bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', textAlign: 'center', p: 4 }}><Typography variant="overline" sx={{ color: '#444', fontWeight: 800 }}>Active Pipeline</Typography><Typography variant="h3" sx={{ fontWeight: 800 }}>{intakes.filter(i => i.status !== 'live').length}</Typography></Card></Grid>
            <Grid size={{ xs: 12, md: 3 }}><Card sx={{ bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', textAlign: 'center', p: 4 }}><Typography variant="overline" sx={{ color: '#444', fontWeight: 800 }}>Visionaries</Typography><Typography variant="h3" sx={{ fontWeight: 800 }}>{clientList.length}</Typography></Card></Grid>
            
            <Grid size={{ xs: 12 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Global System Logs</Typography>
              <Card sx={{ bgcolor: '#050505', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                <Box sx={{ p: 2, maxHeight: 600, overflowY: 'auto' }}>
                  {liveLogs.map(log => (
                    <Stack key={log.id} direction="row" spacing={4} sx={{ py: 1.5, px: 2, borderBottom: '1px solid rgba(255,255,255,0.02)', '&:hover': { bgcolor: 'rgba(255,255,255,0.01)' } }}>
                      <Typography sx={{ color: '#333', fontSize: '0.75rem', minWidth: 100 }}>{new Date(log.created_at).toLocaleTimeString()}</Typography>
                      <Typography sx={{ color: log.level === 'ERROR' ? '#ef4444' : '#0070f3', fontSize: '0.75rem', fontWeight: 900, minWidth: 80 }}>{log.category}</Typography>
                      <Typography sx={{ color: '#888', fontSize: '0.875rem' }}>{log.message}</Typography>
                    </Stack>
                  ))}
                </Box>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>

      <Drawer anchor="right" open={!!selectedIntake} onClose={() => setSelectedIntake(null)} PaperProps={{ sx: { width: { xs: '100%', md: 600 }, bgcolor: '#0a0a0a', color: '#fff', p: 4, borderLeft: '1px solid rgba(255,255,255,0.05)' } }}>
        {selectedIntake && (
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>Visionary Profile</Typography>
              <IconButton onClick={() => setSelectedIntake(null)} sx={{ color: '#fff' }}><X /></IconButton>
            </Stack>
            
            <Stack spacing={4}>
              <Box><Typography variant="overline" sx={{ color: '#444', fontWeight: 800 }}>Business</Typography><Typography variant="h4" sx={{ fontWeight: 800 }}>{selectedIntake.business_name}</Typography></Box>
              <Box><Typography variant="overline" sx={{ color: '#444', fontWeight: 800 }}>Client</Typography><Typography variant="h6">{selectedIntake.name} ({selectedIntake.email})</Typography></Box>
              
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 6 }}><Typography variant="overline" sx={{ color: '#444', fontWeight: 800 }}>Vertical</Typography><Typography sx={{ fontWeight: 700 }}>{selectedIntake.vertical}</Typography></Grid>
                <Grid size={{ xs: 6 }}><Typography variant="overline" sx={{ color: '#444', fontWeight: 800 }}>Layout</Typography><Typography sx={{ fontWeight: 700 }}>{selectedIntake.layout}</Typography></Grid>
              </Grid>

              <Box sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Typography variant="overline" sx={{ color: '#444', fontWeight: 800, mb: 1, display: 'block' }}>The Manifesto</Typography>
                <Typography sx={{ fontStyle: 'italic', color: '#ccc' }}>"{selectedIntake.hero_message}"</Typography>
              </Box>

              <Box>
                <Typography variant="overline" sx={{ color: '#444', fontWeight: 800, mb: 2, display: 'block' }}>Operations</Typography>
                <Stack direction="column" spacing={2}>
                  <Button fullWidth variant="contained" onClick={() => triggerSynthesis(selectedIntake.id, 'full')} startIcon={<Rocket size={18} />} sx={{ bgcolor: '#0070f3', fontWeight: 800, py: 2 }}>Build Site</Button>
                  <Stack direction="row" spacing={2}>
                    <Button fullWidth variant="outlined" onClick={() => triggerSynthesis(selectedIntake.id, 'research')} startIcon={<Search size={18} />} sx={{ borderColor: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 800 }}>Research Content</Button>
                    <Button fullWidth variant="outlined" onClick={() => triggerSynthesis(selectedIntake.id, 'design')} startIcon={<Activity size={18} />} sx={{ borderColor: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 800 }}>Rethink Design</Button>
                  </Stack>
                  <FormControl fullWidth variant="outlined">
                    <Select value={selectedIntake.status} onChange={(e) => updateStatus(selectedIntake.id, e.target.value)} sx={{ bgcolor: 'rgba(255,255,255,0.02)', color: '#fff' }}>
                      {STATUSES.map(s => <MenuItem key={s} value={s}>{getStatusLabel(s)}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Stack>
              </Box>

              <Box>
                <Typography variant="overline" sx={{ color: '#444', fontWeight: 800, mb: 2, display: 'block' }}>Email Communications</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      onClick={() => resendEmail(selectedIntake.id, 'welcome')} 
                      disabled={resending !== null}
                      startIcon={<Mail size={16} />} 
                      sx={{ borderColor: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem' }}
                    >
                      Resend Welcome
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      onClick={() => resendEmail(selectedIntake.id, 'review')} 
                      disabled={resending !== null || !selectedIntake.staging_url}
                      startIcon={<Mail size={16} />} 
                      sx={{ borderColor: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem' }}
                    >
                      Resend Review
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      onClick={() => resendEmail(selectedIntake.id, 'approved')} 
                      disabled={resending !== null}
                      startIcon={<Mail size={16} />} 
                      sx={{ borderColor: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem' }}
                    >
                      Send Approved
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      onClick={() => resendEmail(selectedIntake.id, 'live')} 
                      disabled={resending !== null}
                      startIcon={<Mail size={16} />} 
                      sx={{ borderColor: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem' }}
                    >
                      Send Live
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
