import { createTheme, Theme } from '@mui/material/styles';

export const getAppTheme = (mode: 'light' | 'dark'): Theme =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#0f172a' : '#c8d3df',
        light: mode === 'light' ? '#334155' : '#e2e8f0',
        dark: mode === 'light' ? '#020617' : '#94a3b8',
        contrastText: mode === 'light' ? '#ffffff' : '#141721',
      },
      secondary: {
        main: mode === 'light' ? '#475569' : '#8592a3',
        light: mode === 'light' ? '#64748b' : '#a8b5c4',
        dark: mode === 'light' ? '#334155' : '#626f80',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'light' ? '#eceef2' : '#141721',
        paper: mode === 'light' ? '#ffffff' : '#1b202c',
      },
      text: {
        primary: mode === 'light' ? '#0f172a' : '#c8d3df',
        secondary: mode === 'light' ? '#64748b' : '#8592a3',
      },
      divider: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.06)',
    },
    typography: {
      fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: { fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.025em' },
      h2: { fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
      h3: { fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.015em' },
      h4: { fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.015em' },
      h5: { fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif', fontWeight: 600, letterSpacing: '-0.01em' },
      h6: { fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif', fontWeight: 600, letterSpacing: '-0.01em' },
      subtitle1: { fontWeight: 600, letterSpacing: '-0.01em' },
      subtitle2: { fontWeight: 600 },
      button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
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
