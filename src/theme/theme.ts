import { createTheme, Theme } from '@mui/material/styles';

export const getAppTheme = (mode: 'light' | 'dark'): Theme =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#4f46e5' : '#6366f1',
      },
      secondary: {
        main: '#38bdf8',
      },
      background: {
        default: mode === 'light' ? '#f8fafc' : '#0b0f19',
        paper: mode === 'light' ? '#ffffff' : '#111827',
      },
      text: {
        primary: mode === 'light' ? '#0f172a' : '#f8fafc',
        secondary: mode === 'light' ? '#64748b' : '#94a3b8',
      },
    },
    typography: {
      fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h3: { fontWeight: 800 },
      h4: { fontWeight: 800 },
      h6: { fontWeight: 700 },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 600,
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
    },
  });

export const appTheme = getAppTheme('dark');
