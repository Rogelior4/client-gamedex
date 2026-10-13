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
        p: { xs: 3, md: 5 },
        mb: 4,
        borderRadius: '28px',
        bgcolor: isDark ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
        boxShadow: isDark
          ? '0 20px 40px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
          : '0 20px 40px -15px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative radial glow */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        gap={3}
      >
        <Box>
          <Box display="flex" alignItems="center" gap={1.2} mb={1}>
            <Chip
              icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 16 }} />}
              label="LIBRERÍA PERSONAL"
              size="small"
              sx={{
                height: 26,
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: 1,
                bgcolor: isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(2, 132, 199, 0.08)',
                color: isDark ? '#38bdf8' : '#0284c7',
                border: '1px solid',
                borderColor: isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.2)',
                borderRadius: '8px',
              }}
            />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.4rem', md: '2.8rem' },
              fontWeight: 900,
              letterSpacing: '-0.5px',
              lineHeight: 1.15,
              mb: 1,
              background: isDark
                ? 'linear-gradient(135deg, #ffffff 20%, #94a3b8 100%)'
                : 'linear-gradient(135deg, #0f172a 20%, #475569 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {searchTerm ? 'Resultados de Búsqueda' : 'Tu Colección Gamer'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 650, fontSize: '1.05rem' }}>
            Catálogo centralizado de tus videojuegos con carátulas dinámicas sincronizadas en tiempo real desde Steam.
          </Typography>
        </Box>

        {/* Gamer stats badges */}
        <Box display="flex" alignItems="center" gap={1.2} flexWrap="wrap">
          <Paper
            elevation={0}
            sx={{
              px: 2,
              py: 1.2,
              borderRadius: '14px',
              bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
              textAlign: 'center',
              minWidth: 65,
            }}
          >
            <Typography variant="h5" fontWeight="900" color="primary.main" sx={{ lineHeight: 1 }}>
              {stats.total}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ letterSpacing: 0.5 }}>
              Total
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              px: 2,
              py: 1.2,
              borderRadius: '14px',
              bgcolor: isDark ? 'rgba(34, 197, 94, 0.08)' : 'rgba(34, 197, 94, 0.06)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.15)',
              textAlign: 'center',
              minWidth: 65,
            }}
          >
            <Typography variant="h5" fontWeight="900" sx={{ color: '#22c55e', lineHeight: 1 }}>
              {stats.playing}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ letterSpacing: 0.5 }}>
              Jugando
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              px: 2,
              py: 1.2,
              borderRadius: '14px',
              bgcolor: isDark ? 'rgba(245, 158, 11, 0.08)' : 'rgba(245, 158, 11, 0.06)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.15)',
              textAlign: 'center',
              minWidth: 65,
            }}
          >
            <Typography variant="h5" fontWeight="900" sx={{ color: '#f59e0b', lineHeight: 1 }}>
              {stats.completed}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ letterSpacing: 0.5 }}>
              Completados
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              px: 2,
              py: 1.2,
              borderRadius: '14px',
              bgcolor: isDark ? 'rgba(234, 179, 8, 0.08)' : 'rgba(234, 179, 8, 0.06)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.15)',
              textAlign: 'center',
              minWidth: 65,
            }}
          >
            <Typography variant="h5" fontWeight="900" sx={{ color: '#eab308', lineHeight: 1 }}>
              {stats.favorites}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ letterSpacing: 0.5 }}>
              Favoritos
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Quick Interactive Status Filters */}
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mt={3}
        pt={2.5}
        borderTop="1px solid"
        borderColor={isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'}
        flexWrap="wrap"
      >
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight="700"
          sx={{ mr: 1, textTransform: 'uppercase', letterSpacing: 1 }}
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
                height: 32,
                px: 0.8,
                borderRadius: '10px',
                fontWeight: isActive ? 800 : 500,
                fontSize: '0.85rem',
                bgcolor: isActive
                  ? `${f.color}25`
                  : isDark
                  ? 'rgba(255, 255, 255, 0.04)'
                  : 'rgba(0, 0, 0, 0.04)',
                color: isActive ? f.color : 'text.secondary',
                border: '1px solid',
                borderColor: isActive ? f.color : 'transparent',
                boxShadow: isActive ? `0 0 12px ${f.color}30` : 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: `${f.color}20`,
                  color: f.color,
                },
              }}
            />
          );
        })}

        {activeStatusFilter !== 'ALL' && (
          <Button
            size="small"
            onClick={() => onSelectStatusFilter('ALL')}
            sx={{ color: 'text.secondary', fontSize: '0.75rem', minWidth: 'auto', px: 1 }}
          >
            Limpiar estado
          </Button>
        )}
      </Box>

      {/* Quick Interactive Platform Filters */}
      <Box display="flex" alignItems="center" gap={1} mt={1.5} flexWrap="wrap">
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight="700"
          sx={{ mr: 1, textTransform: 'uppercase', letterSpacing: 1 }}
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
                borderRadius: '10px',
                fontWeight: isActive ? 800 : 500,
                fontSize: '0.85rem',
                bgcolor: isActive
                  ? `${f.color}25`
                  : isDark
                  ? 'rgba(255, 255, 255, 0.04)'
                  : 'rgba(0, 0, 0, 0.04)',
                color: isActive ? f.color : 'text.secondary',
                border: '1px solid',
                borderColor: isActive ? f.color : 'transparent',
                boxShadow: isActive ? `0 0 12px ${f.color}30` : 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: `${f.color}20`,
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
            sx={{ color: 'text.secondary', fontSize: '0.75rem', minWidth: 'auto', px: 1 }}
          >
            Limpiar plataforma
          </Button>
        )}
      </Box>
    </Paper>
  );
};
