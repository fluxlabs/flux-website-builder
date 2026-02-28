"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  FormControl,
  InputLabel
} from "@mui/material";
import { 
  Rocket, 
  Search, 
  Trash2, 
  RefreshCcw, 
  ExternalLink, 
  User, 
  Calendar,
  X,
  Plus,
  Activity
} from "lucide-react";

const MotionCard = motion(Card);

const STATUSES = ["new", "ai_generating", "staging_ready", "client_review", "approved", "live"];
type View = 'pipeline' | 'clients' | 'analytics' | 'client-detail';

export default function AdminDashboard() {
  const [intakes, setIntakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIntake, setSelectedIntake] = useState<any>(null);
  const [selectedClientEmail, setSelectedClientEmail] = useState<string | null>(null);
  const [liveLogs, setLiveLogs] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<View>('pipeline');
  const [tabValue, setTabValue] = useState(0);

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
    fetchIntakes();
    const interval = setInterval(fetchIntakes, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let logInterval: any;
    if (selectedIntake || currentView === 'analytics') {
      fetchLogs();
      logInterval = setInterval(fetchLogs, 3000);
    } else {
      setLiveLogs([]);
    }
    return () => clearInterval(logInterval);
  }, [selectedIntake, currentView]);

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

  const triggerSynthesis = async (id: string) => {
    try {
      alert("Triggering synthesis...");
      await fetch("/api/admin/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intakeId: id }),
      });
      fetchIntakes();
    } catch (err) { console.error(err); }
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
              <Typography component={Link} href="/" variant="h6" sx={{ fontWeight: 900, textDecoration: 'none', color: '#fff' }}>Flux<Box component="span" sx={{ color: '#0070f3' }}>Webs</Box></Typography>
              <Tabs value={tabValue} onChange={(_, v) => { setTabValue(v); setCurrentView(v === 0 ? 'pipeline' : v === 1 ? 'clients' : 'analytics'); }} textColor="inherit" TabIndicatorProps={{ sx: { bgcolor: '#0070f3' } }}>
                <Tab label="Pipeline" sx={{ fontWeight: 700 }} />
                <Tab label="Clients" sx={{ fontWeight: 700 }} />
                <Tab label="Analytics" sx={{ fontWeight: 700 }} />
              </Tabs>
            </Stack>
            <Button variant="contained" onClick={() => {}} sx={{ bgcolor: '#fff', color: '#000', fontWeight: 800, borderRadius: '8px', '&:hover': { bgcolor: '#eee' } }}>+ Seed Vision</Button>
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
                          <IconButton size="small" onClick={(e) => { e.stopPropagation(); deleteIntake(intake.id); }} sx={{ color: '#222', '&:hover': { color: '#ef4444' } }}><Trash2 size={16} /></IconButton>
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
                <Card sx={{ bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px' }}>
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
                <Stack direction="row" spacing={2}>
                  <Button fullWidth variant="contained" onClick={() => triggerSynthesis(selectedIntake.id)} sx={{ bgcolor: '#0070f3', fontWeight: 800, py: 1.5 }}>Rework AI Draft</Button>
                  <FormControl fullWidth variant="outlined">
                    <Select value={selectedIntake.status} onChange={(e) => updateStatus(selectedIntake.id, e.target.value)} sx={{ bgcolor: 'rgba(255,255,255,0.02)', color: '#fff' }}>
                      {STATUSES.map(s => <MenuItem key={s} value={s}>{getStatusLabel(s)}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Stack>
              </Box>
            </Stack>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
