import React from 'react';
import { Paper, Box, Typography, Chip, Button } from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { GameStats } from '../../types/game.types';
import { STATUS_FILTERS, PLATFORM_FILTERS } from '../../constants/game.constants';

interface HeroStatsProps {
  stats: GameStats;
  searchTerm: string;
  activeStatusFilter: string;
  activePlatformFilter: string;
  onSelectStatusFilter: (status: string) => void;
  onSelectPlatformFilter: (platform: string) => void;
  isDark: boolean;
}

export const HeroStats: React.FC<HeroStatsProps> = ({
  stats,
  searchTerm,
  activeStatusFilter,
  activePlatformFilter,
  onSelectStatusFilter,
  onSelectPlatformFilter,
  isDark,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5, md: 4 },
        mb: 4,
        borderRadius: { xs: '22px', md: '28px' },
        bgcolor: isDark ? 'rgba(14, 18, 29, 0.7)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
        boxShadow: isDark
          ? '0 25px 50px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.07)'
          : '0 20px 40px -15px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient Radial Lights */}
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Header & Real-time Live Counters */}
      <Box
        display="flex"
        flexDirection={{ xs: 'column', lg: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', lg: 'center' }}
        gap={3}
      >
        <Box>
          <Box display="flex" alignItems="center" gap={1.2} mb={1}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.8,
                px: 1.2,
                py: 0.4,
                borderRadius: '8px',
                bgcolor: isDark ? 'rgba(99, 102, 241, 0.12)' : 'rgba(99, 102, 241, 0.08)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.2)',
                color: isDark ? '#818cf8' : '#4f46e5',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <AutoAwesomeRoundedIcon sx={{ fontSize: 14 }} />
              <span>Bóveda Personal Gamer</span>
            </Box>
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.9rem', sm: '2.5rem', md: '2.9rem' },
              fontWeight: 900,
              fontFamily: '"Outfit", sans-serif',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              mb: 1,
              background: isDark
                ? 'linear-gradient(135deg, #ffffff 15%, #94a3b8 100%)'
                : 'linear-gradient(135deg, #0f172a 15%, #334155 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {searchTerm ? `Resultados: "${searchTerm}"` : 'Biblioteca de Videojuegos'}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 600, fontSize: '0.98rem', fontWeight: 500 }}>
            {searchTerm
              ? 'Filtrando títulos coincidentes en tu catálogo'
              : 'Controla tu progreso, horas dedicadas, calificaciones y carátulas sincronizadas.'}
          </Typography>
        </Box>

        {/* Minimalist Live Stat Counters */}
        <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
          {/* Total */}
          <Box
            sx={{
              px: 2.2,
              py: 1.2,
              borderRadius: '16px',
              bgcolor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
              minWidth: 80,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" fontWeight="900" sx={{ color: isDark ? '#f8fafc' : '#0f172a', lineHeight: 1 }}>
              {stats.total}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.68rem' }}>
              Juegos
            </Typography>
          </Box>

          {/* Playing (with pulse dot) */}
          <Box
            sx={{
              px: 2.2,
              py: 1.2,
              borderRadius: '16px',
              bgcolor: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.06)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.2)',
              minWidth: 80,
              textAlign: 'center',
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center" gap={0.8}>
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  bgcolor: '#10b981',
                  boxShadow: '0 0 10px #10b981',
                }}
              />
              <Typography variant="h5" fontWeight="900" sx={{ color: '#10b981', lineHeight: 1 }}>
                {stats.playing}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.68rem' }}>
              Jugando
            </Typography>
          </Box>

          {/* Completed */}
          <Box
            sx={{
              px: 2.2,
              py: 1.2,
              borderRadius: '16px',
              bgcolor: isDark ? 'rgba(245, 158, 11, 0.08)' : 'rgba(245, 158, 11, 0.06)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.2)',
              minWidth: 80,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" fontWeight="900" sx={{ color: '#f59e0b', lineHeight: 1 }}>
              {stats.completed}
            </Typography>
            <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.68rem' }}>
              Completos
            </Typography>
          </Box>

          {/* Favorites */}
          <Box
            sx={{
              px: 2.2,
              py: 1.2,
              borderRadius: '16px',
              bgcolor: isDark ? 'rgba(234, 179, 8, 0.08)' : 'rgba(234, 179, 8, 0.06)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(234, 179, 8, 0.25)' : 'rgba(234, 179, 8, 0.2)',
              minWidth: 80,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" fontWeight="900" sx={{ color: '#eab308', lineHeight: 1 }}>
              {stats.favorites}
            </Typography>
            <Typography variant="caption" sx={{ color: '#eab308', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.68rem' }}>
              Favoritos
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Segmented Filter Control Bar (Status Tabs) */}
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mt={3.5}
        pt={2.5}
        borderTop="1px solid"
        borderColor={isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)'}
        flexWrap="wrap"
      >
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight="800"
          sx={{ mr: 1, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}
        >
          Estado:
        </Typography>

        {STATUS_FILTERS.map((f) => {
          const isActive = activeStatusFilter === f.id;
          return (
            <Chip
              key={f.id}
              label={f.label}
              onClick={() => onSelectStatusFilter(f.id)}
              clickable
              sx={{
                height: 34,
                px: 1,
                borderRadius: '12px',
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.82rem',
                bgcolor: isActive
                  ? isDark
                    ? 'rgba(99, 102, 241, 0.25)'
                    : 'rgba(99, 102, 241, 0.15)'
                  : isDark
                  ? 'rgba(255, 255, 255, 0.04)'
                  : 'rgba(0, 0, 0, 0.03)',
                color: isActive ? (isDark ? '#a5b4fc' : '#4f46e5') : 'text.secondary',
                border: '1px solid',
                borderColor: isActive ? (isDark ? '#6366f1' : '#4f46e5') : 'transparent',
                boxShadow: isActive ? '0 0 15px rgba(99, 102, 241, 0.35)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:hover': {
                  bgcolor: isDark ? 'rgba(99, 102, 241, 0.18)' : 'rgba(99, 102, 241, 0.1)',
                  color: isDark ? '#ffffff' : '#4f46e5',
                },
              }}
            />
          );
        })}

        {activeStatusFilter !== 'ALL' && (
          <Button
            size="small"
            onClick={() => onSelectStatusFilter('ALL')}
            sx={{
              color: 'text.secondary',
              fontSize: '0.75rem',
              fontWeight: 700,
              minWidth: 'auto',
              px: 1.2,
              borderRadius: '8px',
              '&:hover': { color: 'primary.main' },
            }}
          >
            Limpiar filtro
          </Button>
        )}
      </Box>

      {/* Platform Filter Capsules */}
      <Box display="flex" alignItems="center" gap={1} mt={1.8} flexWrap="wrap">
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight="800"
          sx={{ mr: 1, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}
        >
          Plataforma:
        </Typography>

        {PLATFORM_FILTERS.map((f) => {
          const isActive = activePlatformFilter === f.id;
          return (
            <Chip
              key={f.id}
              label={f.label}
              onClick={() => onSelectPlatformFilter(f.id)}
              clickable
              sx={{
                height: 32,
                px: 0.8,
                borderRadius: '11px',
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.8rem',
                bgcolor: isActive
                  ? `${f.color}25`
                  : isDark
                  ? 'rgba(255, 255, 255, 0.03)'
                  : 'rgba(0, 0, 0, 0.03)',
                color: isActive ? f.color : 'text.secondary',
                border: '1px solid',
                borderColor: isActive ? f.color : 'transparent',
                boxShadow: isActive ? `0 0 14px ${f.color}40` : 'none',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:hover': {
                  bgcolor: `${f.color}18`,
                  color: f.color,
                },
              }}
            />
          );
        })}

        {activePlatformFilter !== 'ALL' && (
          <Button
            size="small"
            onClick={() => onSelectPlatformFilter('ALL')}
            sx={{
              color: 'text.secondary',
              fontSize: '0.75rem',
              fontWeight: 700,
              minWidth: 'auto',
              px: 1.2,
              borderRadius: '8px',
              '&:hover': { color: 'primary.main' },
            }}
          >
            Limpiar plataforma
          </Button>
        )}
      </Box>
    </Paper>
  );
};
