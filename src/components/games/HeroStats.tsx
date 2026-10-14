import React from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';
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
  const hasActiveFilters = activeStatusFilter !== 'ALL' || activePlatformFilter !== 'ALL';

  return (
    <Box sx={{ mb: 3.5 }}>
      {/* 1. Header Minimalista: Título y métricas en línea */}
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
        gap={1.5}
        mb={2}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="900"
            sx={{
              fontSize: { xs: '1.65rem', sm: '1.9rem', md: '2.2rem' },
              fontFamily: '"Outfit", sans-serif',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: isDark ? '#f8fafc' : '#0f172a',
            }}
          >
            {searchTerm ? `Resultados: "${searchTerm}"` : 'Biblioteca'}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight="500"
            sx={{ mt: 0.4, fontSize: '0.88rem' }}
          >
            <Box component="span" fontWeight="700" sx={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
              {stats.total}
            </Box>{' '}
            {stats.total === 1 ? 'juego' : 'juegos'}
            {stats.playing > 0 && (
              <>
                {' '}
                ·{' '}
                <Box component="span" sx={{ color: isDark ? '#4ade80' : '#16a34a', fontWeight: 600 }}>
                  {stats.playing}
                </Box>{' '}
                jugando
              </>
            )}
            {stats.completed > 0 && (
              <>
                {' '}
                ·{' '}
                <Box component="span" sx={{ color: isDark ? '#fbbf24' : '#d97706', fontWeight: 600 }}>
                  {stats.completed}
                </Box>{' '}
                completos
              </>
            )}
            {stats.favorites > 0 && (
              <>
                {' '}
                ·{' '}
                <Box component="span" sx={{ color: isDark ? '#facc15' : '#ca8a04', fontWeight: 600 }}>
                  {stats.favorites}
                </Box>{' '}
                favoritos
              </>
            )}
          </Typography>
        </Box>

        {hasActiveFilters && (
          <Button
            size="small"
            onClick={() => {
              onSelectStatusFilter('ALL');
              onSelectPlatformFilter('ALL');
            }}
            sx={{
              color: 'text.secondary',
              fontSize: '0.74rem',
              fontWeight: 600,
              textTransform: 'none',
              px: 1.2,
              py: 0.35,
              borderRadius: '7px',
              bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
              '&:hover': {
                color: isDark ? '#ffffff' : '#0f172a',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Limpiar filtros
          </Button>
        )}
      </Box>

      {/* 2. Barra de Filtros Minimalista y Compacta */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.2,
          p: { xs: 1.2, sm: 1.4 },
          borderRadius: '14px',
          bgcolor: isDark ? 'rgba(16, 18, 24, 0.65)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
          boxShadow: isDark
            ? '0 4px 20px -5px rgba(0, 0, 0, 0.4)'
            : '0 4px 16px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Fila 1: Filtros de Estado */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.6,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            pb: 0.2,
          }}
        >
          {STATUS_FILTERS.map((f) => {
            const isActive = activeStatusFilter === f.id;
            return (
              <Chip
                key={f.id}
                label={f.label}
                onClick={() => onSelectStatusFilter(f.id)}
                clickable
                size="small"
                sx={{
                  height: 27,
                  fontSize: '0.73rem',
                  fontWeight: isActive ? 700 : 500,
                  borderRadius: '7px',
                  bgcolor: isActive
                    ? isDark
                      ? '#f4f4f5'
                      : '#0f172a'
                    : 'transparent',
                  color: isActive
                    ? isDark
                      ? '#090a0f'
                      : '#ffffff'
                    : 'text.secondary',
                  border: '1px solid',
                  borderColor: isActive
                    ? isDark
                      ? '#f4f4f5'
                      : '#0f172a'
                    : isDark
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.18s ease',
                  '&:hover': {
                    bgcolor: isActive
                      ? isDark
                        ? '#ffffff'
                        : '#1e293b'
                      : isDark
                      ? 'rgba(255, 255, 255, 0.06)'
                      : 'rgba(0, 0, 0, 0.04)',
                    color: isActive ? undefined : (isDark ? '#ffffff' : '#0f172a'),
                  },
                }}
              />
            );
          })}
        </Box>

        {/* Fila 2: Filtros de Plataforma */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.6,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            pt: 0.8,
            borderTop: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          }}
        >
          {PLATFORM_FILTERS.map((f) => {
            const isActive = activePlatformFilter === f.id;
            return (
              <Chip
                key={f.id}
                label={f.label}
                onClick={() => onSelectPlatformFilter(f.id)}
                clickable
                size="small"
                sx={{
                  height: 25,
                  fontSize: '0.7rem',
                  fontWeight: isActive ? 700 : 500,
                  borderRadius: '6px',
                  bgcolor: isActive
                    ? isDark
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(15, 23, 42, 0.08)'
                    : 'transparent',
                  color: isActive
                    ? isDark
                      ? '#ffffff'
                      : '#0f172a'
                    : 'text.secondary',
                  border: '1px solid',
                  borderColor: isActive
                    ? isDark
                      ? 'rgba(255, 255, 255, 0.22)'
                      : 'rgba(0, 0, 0, 0.2)'
                    : isDark
                    ? 'rgba(255, 255, 255, 0.04)'
                    : 'rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.18s ease',
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                    color: isDark ? '#ffffff' : '#0f172a',
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
