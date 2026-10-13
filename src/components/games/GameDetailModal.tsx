import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Chip,
  IconButton,
  Button,
  Rating,
  Fade,
  Tooltip,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import { useTheme } from '@mui/material/styles';
import { Game } from '../../types/game.types';
import { getPlatformStyle, getStoreSearchUrl, getLauncherUri } from '../../utils/platformStyles';
import { getStatusStyle } from '../../utils/statusStyles';

interface GameDetailModalProps {
  open: boolean;
  game: Game | null;
  onClose: () => void;
  onEdit: (game: Game) => void;
  onDelete: (game: Game) => void;
  onToggleFavorite: (id: number, current: boolean) => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({
  open,
  game,
  onClose,
  onEdit,
  onDelete,
  onToggleFavorite,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!game) return null;

  const platformStyle = getPlatformStyle(game.platform, isDark);
  const statusStyle = getStatusStyle(game.status, isDark);

  const storeAction = getStoreSearchUrl(game.platform, game.title);
  const launcherAction = getLauncherUri(game.platform);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      TransitionComponent={Fade}
      transitionDuration={280}
      PaperProps={{
        sx: {
          borderRadius: { xs: '20px', md: '28px' },
          bgcolor: isDark ? 'rgba(11, 15, 25, 0.94)' : 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(36px)',
          WebkitBackdropFilter: 'blur(36px)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
          boxShadow: isDark
            ? '0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 50px -10px rgba(99, 102, 241, 0.25)'
            : '0 30px 60px -15px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
          position: 'relative',
        },
      }}
    >
      {/* Background Frosted Header Banner Art */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 240,
          backgroundImage: game.coverUrl ? `url(${game.coverUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(28px) brightness(0.4)',
          transform: 'scale(1.2)',
          opacity: 0.6,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Floating Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 18,
          right: 18,
          zIndex: 10,
          borderRadius: '12px',
          bgcolor: isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
          color: 'text.primary',
          '&:hover': {
            bgcolor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
            transform: 'scale(1.08)',
          },
        }}
      >
        <CloseRoundedIcon sx={{ fontSize: 20 }} />
      </IconButton>

      <DialogContent sx={{ p: { xs: 3, md: 4.5 }, position: 'relative', zIndex: 1 }}>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={{ xs: 3, md: 4 }}
          alignItems={{ xs: 'center', sm: 'flex-start' }}
        >
          {/* Left Column: High-Res Vertical Poster Art */}
          <Box
            sx={{
              width: { xs: 200, sm: 220, md: 240 },
              minWidth: { xs: 200, sm: 220, md: 240 },
              aspectRatio: '2/3',
              borderRadius: '20px',
              bgcolor: isDark ? '#080c16' : '#e2e8f0',
              overflow: 'hidden',
              boxShadow: isDark
                ? `0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 35px -5px ${platformStyle.color}50`
                : '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
              border: '2px solid',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.8)',
              position: 'relative',
            }}
          >
            {game.coverUrl ? (
              <img
                src={game.coverUrl}
                alt={game.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isDark
                    ? 'linear-gradient(135deg, #1e1b4b 0%, #080c16 100%)'
                    : 'linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 100%)',
                  p: 2,
                  textAlign: 'center',
                }}
              >
                <SportsEsportsRoundedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                <Typography variant="body2" fontWeight="800">
                  {game.title}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Right Column: Game Details, Metrics & Actions */}
          <Box sx={{ flex: 1, width: '100%' }}>
            {/* Badges Row */}
            <Box display="flex" alignItems="center" gap={1.2} flexWrap="wrap" mb={1.5}>
              {/* Status Badge */}
              <Chip
                label={statusStyle.label}
                sx={{
                  height: 28,
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  borderRadius: '9px',
                  color: statusStyle.color,
                  bgcolor: isDark ? 'rgba(11, 15, 25, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid',
                  borderColor: statusStyle.borderColor,
                }}
              />

              {/* Platform Chip */}
              <Chip
                label={platformStyle.label}
                sx={{
                  height: 28,
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  borderRadius: '9px',
                  color: platformStyle.color,
                  bgcolor: platformStyle.bgColor,
                  border: '1px solid',
                  borderColor: platformStyle.borderColor,
                }}
              />

              {/* Favorite Badge */}
              {game.isFavorite && (
                <Chip
                  icon={<StarRoundedIcon sx={{ fontSize: 16, color: '#eab308 !important' }} />}
                  label="Favorito"
                  sx={{
                    height: 28,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    borderRadius: '9px',
                    color: '#eab308',
                    bgcolor: isDark ? 'rgba(234, 179, 8, 0.15)' : 'rgba(234, 179, 8, 0.1)',
                    border: '1px solid rgba(234, 179, 8, 0.3)',
                  }}
                />
              )}
            </Box>

            {/* Game Title */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '1.8rem', md: '2.4rem' },
                fontFamily: '"Outfit", sans-serif',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                mb: 2,
                color: isDark ? '#ffffff' : '#0f172a',
              }}
            >
              {game.title}
            </Typography>

            {/* Rating & Hours Played Deck */}
            <Box
              display="flex"
              alignItems="center"
              gap={3}
              p={2}
              mb={2.5}
              borderRadius="16px"
              bgcolor={isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'}
              border="1px solid"
              borderColor={isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'}
              flexWrap="wrap"
            >
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ display: 'block', mb: 0.4 }}>
                  CALIFICACIÓN
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Rating
                    value={game.rating || 0}
                    readOnly
                    size="medium"
                    sx={{
                      '& .MuiRating-iconFilled': { color: '#f59e0b' },
                      '& .MuiRating-iconEmpty': { color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' },
                    }}
                  />
                  <Typography variant="body2" fontWeight="800" color="text.secondary">
                    {game.rating ? `${game.rating}/5` : 'Sin puntaje'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ width: '1px', height: 36, bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', display: { xs: 'none', sm: 'block' } }} />

              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ display: 'block', mb: 0.4 }}>
                  TIEMPO DE JUEGO
                </Typography>
                <Box display="flex" alignItems="center" gap={0.8}>
                  <AccessTimeRoundedIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                  <Typography variant="body1" fontWeight="800">
                    {game.hoursPlayed ? `${game.hoursPlayed} horas dedicadas` : '0 horas registradas'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Personal Notes / Review */}
            {game.notes && (
              <Box
                sx={{
                  p: 2.2,
                  mb: 3,
                  borderRadius: '16px',
                  bgcolor: isDark ? 'rgba(99, 102, 241, 0.06)' : 'rgba(99, 102, 241, 0.04)',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.15)',
                  position: 'relative',
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                  <FormatQuoteRoundedIcon sx={{ fontSize: 20, color: 'primary.main', transform: 'rotate(180deg)' }} />
                  <Typography variant="caption" fontWeight="800" color="primary.main" letterSpacing="0.05em">
                    RESEÑA Y NOTAS PERSONALES
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: isDark ? '#e2e8f0' : '#334155', lineHeight: 1.6 }}>
                  "{game.notes}"
                </Typography>
              </Box>
            )}

            {/* Bottom Actions Toolbar */}
            <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
              {/* Toggle Favorite */}
              <Button
                variant="outlined"
                onClick={() => onToggleFavorite(game.id, game.isFavorite)}
                startIcon={
                  game.isFavorite ? (
                    <StarRoundedIcon sx={{ color: '#eab308' }} />
                  ) : (
                    <StarBorderRoundedIcon />
                  )
                }
                sx={{
                  borderRadius: '12px',
                  borderColor: game.isFavorite ? '#eab308' : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                  color: game.isFavorite ? '#eab308' : 'text.primary',
                  fontWeight: 700,
                }}
              >
                {game.isFavorite ? 'En Favoritos' : 'Añadir a Favoritos'}
              </Button>

              {/* Edit Button */}
              <Button
                variant="contained"
                onClick={() => {
                  onClose();
                  onEdit(game);
                }}
                startIcon={<EditRoundedIcon />}
                sx={{
                  borderRadius: '12px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                  boxShadow: '0 6px 18px rgba(99, 102, 241, 0.35)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)',
                  },
                }}
              >
                Editar Juego
              </Button>

              {/* View in Platform Store */}
              <Button
                component="a"
                href={storeAction.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<OpenInNewRoundedIcon />}
                sx={{
                  borderRadius: '12px',
                  borderColor: isDark ? `${platformStyle.color}40` : `${platformStyle.color}60`,
                  color: platformStyle.color,
                  fontWeight: 700,
                  bgcolor: isDark ? `${platformStyle.color}10` : `${platformStyle.color}08`,
                  '&:hover': {
                    bgcolor: isDark ? `${platformStyle.color}20` : `${platformStyle.color}15`,
                    borderColor: platformStyle.color,
                  },
                }}
              >
                {storeAction.label}
              </Button>

              {/* Open Desktop Launcher if available */}
              {launcherAction && (
                <Tooltip title={`Abrir cliente de ${launcherAction.label}`} arrow>
                  <Button
                    component="a"
                    href={launcherAction.uri}
                    variant="outlined"
                    startIcon={<SportsEsportsRoundedIcon />}
                    sx={{
                      borderRadius: '12px',
                      borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                      color: 'text.secondary',
                      fontWeight: 700,
                      '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
                    }}
                  >
                    {launcherAction.label}
                  </Button>
                </Tooltip>
              )}

              {/* Delete Button */}
              <Tooltip title="Eliminar de la biblioteca" arrow>
                <IconButton
                  onClick={() => {
                    onClose();
                    onDelete(game);
                  }}
                  sx={{
                    borderRadius: '12px',
                    color: '#f87171',
                    bgcolor: isDark ? 'rgba(248, 113, 113, 0.1)' : 'rgba(248, 113, 113, 0.08)',
                    '&:hover': {
                      bgcolor: 'rgba(248, 113, 113, 0.2)',
                    },
                  }}
                >
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
