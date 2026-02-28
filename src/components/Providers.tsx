"use client";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

const elegantDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d6c5a5', // Refined Champagne Gold
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#000000', // Absolute Black
      paper: '#050505',   // Deep Charcoal
    },
    text: {
      primary: '#ffffff',
      secondary: '#888888',
    },
    divider: 'rgba(214, 197, 165, 0.1)',
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: { 
      fontFamily: playfair.style.fontFamily,
      letterSpacing: '-0.02em', 
      fontWeight: 400,
      fontSize: '5rem'
    },
    h2: { 
      fontFamily: playfair.style.fontFamily,
      letterSpacing: '-0.01em', 
      fontWeight: 400 
    },
    h3: { 
      fontFamily: playfair.style.fontFamily,
      letterSpacing: '-0.01em', 
      fontWeight: 400 
    },
    button: { 
      textTransform: 'uppercase', 
      fontWeight: 700,
      letterSpacing: '0.1rem',
      fontSize: '0.75rem'
    },
  },
  shape: {
    borderRadius: 0, // Shifting to sharp, elegant edges
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '12px 32px',
          transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 0 30px rgba(214, 197, 165, 0.2)',
          }
        }
      }
    }
  }
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={elegantDarkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
