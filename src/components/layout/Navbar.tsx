import React, { useEffect, useRef } from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Tooltip,
} from '@mui/material';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloudSyncRoundedIcon from '@mui/icons-material/CloudSyncRounded';
import { ThemeToggle } from '../common/ThemeToggle';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  isSyncing: boolean;
  onSyncCovers: () => void;
  onOpenAddGame: () => void;
  onOpenBackup: () => void;
  isDark: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
  isSyncing,
  onSyncCovers,
  onOpenAddGame,
  onOpenBackup,
  isDark,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut: Press '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 1.5, md: 2 } }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          maxWidth: '1440px',
          mx: 'auto',
          borderRadius: { xs: '18px', md: '24px' },
          bgcolor: isDark ? 'rgba(11, 15, 25, 0.75)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
          boxShadow: isDark
            ? '0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
            : '0 20px 40px -15px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          color: 'text.primary',
        }}
      >
        <Container maxWidth="xl" disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
          <Toolbar sx={{ height: { xs: 70, md: 76 }, px: '0 !important', gap: 2 }}>
            {/* Logo & Brand */}
            <Box
              display="flex"
              alignItems="center"
              gap={1.5}
              sx={{
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'scale(1.02)' },
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: '13px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 8px 20px rgba(99, 102, 241, 0.45)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                  },
                }}
              >
                <SportsEsportsRoundedIcon sx={{ fontSize: 24, zIndex: 1 }} />
              </Box>

              <Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 900,
                      letterSpacing: '-0.03em',
                      fontFamily: '"Outfit", sans-serif',
                      background: isDark
                        ? 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)'
                        : 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    GameDex
                  </Typography>
                  <Chip
                    label="PRO VAULT"
                    size="small"
                    sx={{
                      height: 19,
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      bgcolor: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)',
                      color: isDark ? '#818cf8' : '#4f46e5',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.2)',
                      borderRadius: '6px',
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Command Search Bar */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
                borderRadius: '16px',
                px: 2,
                py: 0.6,
                width: { md: 360, lg: 420 },
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:focus-within': {
                  bgcolor: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 1)',
                  borderColor: 'primary.main',
                  boxShadow: isDark
                    ? '0 0 0 3px rgba(99, 102, 241, 0.25), 0 10px 25px -5px rgba(0,0,0,0.4)'
                    : '0 0 0 3px rgba(99, 102, 241, 0.15), 0 10px 25px -5px rgba(0,0,0,0.1)',
                  width: { md: 400, lg: 480 },
                },
              }}
            >
              <TextField
                inputRef={searchInputRef}
                fullWidth
                variant="standard"
                placeholder="Buscar por título, plataforma..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={onClearSearch}>
                        <CloseRoundedIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <Box
                        sx={{
                          px: 0.8,
                          py: 0.2,
                          borderRadius: '6px',
                          bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                          border: '1px solid',
                          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                          color: 'text.secondary',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          lineHeight: 1,
                        }}
                      >
                        /
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Header Right Actions */}
            <Box display="flex" alignItems="center" gap={1.2}>
              {/* Sync Covers from Multi-Store */}
              <Tooltip title="Sincronizar carátulas multitienda (Steam, Epic, Nintendo, etc.)" arrow>
                <span>
                  <IconButton
                    onClick={onSyncCovers}
                    disabled={isSyncing}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '13px',
                      bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
                      color: isDark ? '#38bdf8' : '#0284c7',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': {
                        bgcolor: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.1)',
                        borderColor: '#38bdf8',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    <SyncRoundedIcon
                      sx={{
                        fontSize: 20,
                        animation: isSyncing ? 'spin 1s linear infinite' : 'none',
                        '@keyframes spin': {
                          '0%': { transform: 'rotate(0deg)' },
                          '100%': { transform: 'rotate(360deg)' },
                        },
                      }}
                    />
                  </IconButton>
                </span>
              </Tooltip>

              {/* Backup & Restore */}
              <Tooltip title="Copia de seguridad y exportar/importar" arrow>
                <IconButton
                  onClick={onOpenBackup}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '13px',
                    bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
                    color: isDark ? '#818cf8' : '#4f46e5',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      bgcolor: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(79, 70, 229, 0.1)',
                      borderColor: '#818cf8',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  <CloudSyncRoundedIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>

              {/* Add Game Button */}
              <Button
                variant="contained"
                onClick={onOpenAddGame}
                startIcon={<AddRoundedIcon sx={{ fontSize: 20 }} />}
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                  boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
                  borderRadius: '14px',
                  px: 2.5,
                  py: 1,
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  letterSpacing: '0.01em',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)',
                    boxShadow: '0 12px 28px rgba(99, 102, 241, 0.6)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Añadir Juego
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />
            </Box>
          </Toolbar>

          {/* Mobile Search Bar */}
          <Box sx={{ display: { xs: 'block', md: 'none' }, pb: 2, pt: 0.5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar videojuegos..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={onClearSearch}>
                      <CloseRoundedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '14px',
                  bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
                },
              }}
            />
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
};
