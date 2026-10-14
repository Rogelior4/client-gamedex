import { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  Box,
  IconButton,
  Skeleton,
  Tooltip,
} from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import { useTheme } from '@mui/material/styles';
import { getGameCover } from '../../services/game.service';
import { GameStatus } from '../../types/game.types';
import { getPlatformStyle } from '../../utils/platformStyles';
import { getStatusStyle } from '../../utils/statusStyles';

interface GameCardProps {
  id?: number;
  title: string;
  platform: string;
  coverUrl?: string | null;
  status?: GameStatus;
  rating?: number | null;
  isFavorite?: boolean;
  hoursPlayed?: number | null;
  notes?: string | null;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite?: () => void;
  onClick?: () => void;
}

const springEasing = 'cubic-bezier(0.16, 1, 0.3, 1)';

export default function GameCard({
  title,
  platform,
  coverUrl: initialCoverUrl,
  status = 'BACKLOG',
  rating,
  isFavorite = false,
  hoursPlayed,
  notes,
  onEdit,
  onDelete,
  onToggleFavorite,
  onClick,
}: GameCardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [coverUrl, setCoverUrl] = useState<string | null>(initialCoverUrl ?? null);
  const [loadingImage, setLoadingImage] = useState(!initialCoverUrl);
  const [isHovered, setIsHovered] = useState(false);

  const platformStyle = getPlatformStyle(platform, isDark);
  const statusStyle = getStatusStyle(status, isDark);
  const hasRating = typeof rating === 'number' && rating > 0;
  const hasHours = typeof hoursPlayed === 'number' && hoursPlayed > 0;

  useEffect(() => {
    if (initialCoverUrl) {
      setCoverUrl(initialCoverUrl);
      setLoadingImage(false);
      return;
    }

    let isMounted = true;
    async function fetchCover() {
      try {
        setLoadingImage(true);
        const url = await getGameCover(title, platform);
        if (isMounted) setCoverUrl(url);
      } catch (e) {
        console.error('Cover fetch error for', title);
      } finally {
        if (isMounted) setLoadingImage(false);
      }
    }
    fetchCover();

    return () => {
      isMounted = false;
    };
  }, [initialCoverUrl, title]);

  return (
    <Card
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="animate-card-fade"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: isDark ? '#1b202c' : '#ffffff',
        borderRadius: '14px',
        p: 1,
        border: '1px solid',
        borderColor: isHovered
          ? (isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)')
          : (isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'),
        boxShadow: isHovered
          ? (isDark ? '0 10px 24px -5px rgba(0, 0, 0, 0.45)' : '0 8px 20px -5px rgba(0, 0, 0, 0.07)')
          : (isDark ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.03)'),
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: `all 0.2s ${springEasing}`,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* 1. CINEMATIC POSTER (2:3 Aspect Ratio) */}
      <Box
        sx={{
          width: '100%',
          aspectRatio: '2/3',
          borderRadius: '12px',
          bgcolor: isDark ? '#12151e' : '#e2e8f0',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {loadingImage ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)' }}
          />
        ) : coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            loading="lazy"
            onError={() => {
              if (coverUrl && coverUrl.includes('library_600x900.jpg')) {
                setCoverUrl(coverUrl.replace('library_600x900.jpg', 'header.jpg'));
              } else {
                setCoverUrl(null);
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: `transform 0.4s ${springEasing}, filter 0.3s ease`,
              transform: isHovered ? 'scale(1.04)' : 'scale(1.0)',
              filter: isHovered ? 'brightness(1)' : 'brightness(0.93)',
            }}
          />
        ) : (
          /* Fallback Stylized Poster Art */
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: isDark
                ? 'linear-gradient(145deg, #181a22 0%, #0e1015 100%)'
                : 'linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 100%)',
              p: 2.5,
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: '14px',
                bgcolor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDark ? '#94a3b8' : '#64748b',
                mb: 1.5,
              }}
            >
              <SportsEsportsRoundedIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography
              variant="subtitle2"
              fontWeight="800"
              sx={{
                color: isDark ? '#f8fafc' : '#1e293b',
                lineHeight: 1.25,
                fontSize: '0.92rem',
                fontFamily: '"Outfit", sans-serif',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              fontWeight="800"
              sx={{
                color: platformStyle.color,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                mt: 0.8,
                fontSize: '0.68rem',
              }}
            >
              {platform}
            </Typography>
          </Box>
        )}

        {/* Poster Bottom Dark Gradient Overlay for Seamless Legibility */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'linear-gradient(to top, rgba(7, 9, 14, 0.9) 0%, rgba(7, 9, 14, 0.4) 60%, transparent 100%)',
            pointerEvents: 'none',
            opacity: isDark ? 0.9 : 0.6,
          }}
        />

        {/* Top Header Bar: Status Capsule (Left) & Actions (Right) */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            right: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 0.6,
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          {/* Status Capsule */}
          <Box
            sx={{
              pointerEvents: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.6,
              px: 1,
              py: 0.35,
              borderRadius: '20px',
              bgcolor: 'rgba(8, 12, 22, 0.82)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid',
              borderColor: statusStyle.borderColor,
              boxShadow: '0 4px 14px rgba(0,0,0,0.45)',
              minWidth: 0,
              maxWidth: isHovered
                ? 'calc(100% - 94px)'
                : isFavorite
                ? 'calc(100% - 36px)'
                : '100%',
              transition: `all 0.25s ${springEasing}`,
            }}
          >
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                bgcolor: statusStyle.color,
                flexShrink: 0,
              }}
            />
            <Typography
              noWrap
              sx={{
                fontSize: '0.64rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                color: '#f8fafc',
                lineHeight: 1,
                textTransform: 'uppercase',
              }}
            >
              {statusStyle.label}
            </Typography>
          </Box>

          {/* Quick Actions Container */}
          <Box
            sx={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 0.4,
              flexShrink: 0,
            }}
          >
            {/* Quick Actions Hover Capsule (Edit & Delete) */}
            {isHovered && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.3,
                  p: '2px 4px',
                  borderRadius: '9px',
                  bgcolor: 'rgba(8, 12, 22, 0.85)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                  animation: 'fadeIn 0.2s ease',
                  '@keyframes fadeIn': {
                    from: { opacity: 0, transform: 'scale(0.85)' },
                    to: { opacity: 1, transform: 'scale(1)' },
                  },
                }}
              >
                <Tooltip title="Editar juego" arrow placement="top">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                    }}
                    size="small"
                    sx={{
                      width: 24,
                      height: 24,
                      color: '#94a3b8',
                      transition: 'all 0.18s ease',
                      '&:hover': {
                        color: '#38bdf8',
                        bgcolor: 'rgba(56, 189, 248, 0.2)',
                      },
                    }}
                  >
                    <EditRoundedIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Eliminar juego" arrow placement="top">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                    size="small"
                    sx={{
                      width: 24,
                      height: 24,
                      color: '#94a3b8',
                      transition: 'all 0.18s ease',
                      '&:hover': {
                        color: '#f87171',
                        bgcolor: 'rgba(248, 113, 113, 0.2)',
                      },
                    }}
                  >
                    <DeleteOutlineRoundedIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            )}

            {/* Quick Favorite Star Button */}
            {onToggleFavorite && (isFavorite || isHovered) && (
              <Tooltip
                title={isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
                arrow
                placement="top"
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite();
                  }}
                  size="small"
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: 'rgba(10, 12, 16, 0.85)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid',
                    borderColor: isFavorite
                      ? 'rgba(234, 179, 8, 0.4)'
                      : 'rgba(255, 255, 255, 0.12)',
                    color: isFavorite ? '#fbbf24' : '#94a3b8',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    transition: `all 0.18s ease`,
                    '&:hover': {
                      transform: 'scale(1.08)',
                      color: '#fbbf24',
                      borderColor: '#fbbf24',
                      bgcolor: 'rgba(10, 12, 16, 0.95)',
                    },
                  }}
                >
                  {isFavorite ? (
                    <StarRoundedIcon sx={{ fontSize: 17 }} />
                  ) : (
                    <StarBorderRoundedIcon sx={{ fontSize: 17 }} />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>

      </Box>

      {/* 2. MINIMALIST UNIFIED FOOTER */}
      <Box sx={{ pt: 1.1, pb: 0.3, px: 0.4 }}>
        {/* Game Title */}
        <Tooltip title={title} placement="top" arrow enterDelay={400}>
          <Typography
            variant="subtitle2"
            fontWeight="600"
            noWrap
            sx={{
              color: isDark ? '#c8d3df' : '#0f172a',
              fontFamily: '"Outfit", sans-serif',
              fontSize: '0.92rem',
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
              mb: 0.8,
              transition: 'color 0.18s ease',
              '&:hover': { color: platformStyle.color },
            }}
          >
            {title}
          </Typography>
        </Tooltip>

        {/* Single Row: Platform on Left, Metrics & Notes on Right */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ minHeight: 22 }}
        >
          {/* Platform Tag */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              px: 0.8,
              py: 0.2,
              borderRadius: '6px',
              bgcolor: platformStyle.bgColor,
              border: '1px solid',
              borderColor: platformStyle.borderColor,
              color: platformStyle.color,
            }}
          >
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                bgcolor: platformStyle.color,
              }}
            />
            <Typography
              sx={{
                fontSize: '0.66rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                lineHeight: 1,
              }}
            >
              {platformStyle.label}
            </Typography>
          </Box>

          {/* Metrics: Rating, Hours, Notes */}
          <Box display="flex" alignItems="center" gap={0.8}>
            {hasRating && (
              <Box display="flex" alignItems="center" gap={0.3}>
                <StarRoundedIcon sx={{ fontSize: 13, color: '#f59e0b' }} />
                <Typography
                  sx={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: isDark ? '#e2e8f0' : '#334155',
                    lineHeight: 1,
                  }}
                >
                  {rating}
                </Typography>
              </Box>
            )}

            {hasHours && (
              <Box
                display="flex"
                alignItems="center"
                gap={0.3}
                sx={{
                  color: isDark ? '#94a3b8' : '#64748b',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                <AccessTimeRoundedIcon sx={{ fontSize: 11, opacity: 0.7 }} />
                <span>{hoursPlayed}h</span>
              </Box>
            )}

            {notes && (
              <Tooltip title={notes} arrow placement="top">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: isDark ? '#64748b' : '#94a3b8',
                    cursor: 'help',
                    '&:hover': { color: platformStyle.color },
                  }}
                >
                  <NotesRoundedIcon sx={{ fontSize: 13 }} />
                </Box>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
