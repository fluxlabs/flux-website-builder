"use client";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0055ff', // Vibrant Electric Blue
    },
    secondary: {
      main: '#ff4500', // Crisp Coral/Orange
    },
    background: {
      default: '#fafafa', // Soft Off-White
      paper: '#ffffff',
    },
    text: {
      primary: '#111111',
      secondary: '#555555',
    },
    divider: 'rgba(0,0,0,0.08)',
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: { letterSpacing: '-0.04em', fontWeight: 800 },
    h2: { letterSpacing: '-0.03em', fontWeight: 700 },
    h3: { letterSpacing: '-0.02em', fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
          }
        },
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.04)',
        }
      }
    }
  }
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
