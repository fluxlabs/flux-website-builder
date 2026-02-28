import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const inter = Inter({ subsets: ["latin"] });

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0070f3',
    },
    secondary: {
      main: '#ff0080',
    },
    background: {
      default: '#000000',
      paper: '#0a0a0a',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export const metadata: Metadata = {
  title: "Flux | High-Performance AI Website Builder",
  description: "Get a professional, custom-built Next.js website in just 48-72 hours. Flux uses advanced AI to synthesize your business vision into a high-converting digital presence.",
  keywords: ["AI Website Builder", "Next.js Website", "Fast Web Design", "Small Business Website", "Autonomous Web Agency"],
  openGraph: {
    title: "Flux | High-Performance AI Website Builder",
    description: "Your business vision, synthesized into a live website in 48-72 hours.",
    url: "https://fluxwebs.net",
    siteName: "Flux Website Builder",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flux | AI Website Builder",
    description: "Professional Next.js websites in 48-72 hours.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
