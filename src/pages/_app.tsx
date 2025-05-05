import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/globals.css';

// Create a theme instance with spiritual focus colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#5c739d',
      light: '#7d94b8',
      dark: '#475b82',
    },
    secondary: {
      main: '#0ba5ec',
      light: '#36bffa',
      dark: '#0284c7',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter var", "system-ui", sans-serif',
    h1: {
      fontFamily: '"Crimson Pro", serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"Crimson Pro", serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Crimson Pro", serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  // Ensure theme is applied after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}