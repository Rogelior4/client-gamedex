import { createTheme, Theme } from '@mui/material/styles';

export const getAppTheme = (mode: 'light' | 'dark'): Theme =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#4f46e5' : '#6366f1',
        light: mode === 'light' ? '#6366f1' : '#818cf8',
        dark: mode === 'light' ? '#3730a3' : '#4f46e5',
        contrastText: '#ffffff',
      },
      secondary: {
        main: mode === 'light' ? '#0284c7' : '#06b6d4',
        light: '#38bdf8',
        dark: '#0369a1',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'light' ? '#f8fafc' : '#07090e',
        paper: mode === 'light' ? '#ffffff' : '#0e121d',
      },
      text: {
        primary: mode === 'light' ? '#0f172a' : '#f8fafc',
        secondary: mode === 'light' ? '#64748b' : '#94a3b8',
      },
      divider: mode === 'light' ? 'rgba(0, 0, 0, 0.07)' : 'rgba(255, 255, 255, 0.08)',
    },
    typography: {
      fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: { fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif', fontWeight: 900, letterSpacing: '-0.03em' },
      h2: { fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif', fontWeight: 900, letterSpacing: '-0.025em' },
      h3: { fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif', fontWeight: 800, letterSpacing: '-0.02em' },
      h4: { fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif', fontWeight: 800, letterSpacing: '-0.02em' },
      h5: { fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.015em' },
      h6: { fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.01em' },
      subtitle1: { fontWeight: 700, letterSpacing: '-0.01em' },
      subtitle2: { fontWeight: 700 },
      button: { fontWeight: 700, textTransform: 'none', letterSpacing: '0.01em' },
    },
    shape: {
      borderRadius: 18,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '0.9rem',
            padding: '8px 18px',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: 20,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 24,
            backgroundImage: 'none',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 10,
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '6px 12px',
            backgroundColor: mode === 'light' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(2, 6, 23, 0.95)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${mode === 'light' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`,
          },
        },
      },
    },
  });

export const appTheme = getAppTheme('dark');
