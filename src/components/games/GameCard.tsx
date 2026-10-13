import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Chip,
  Box,
  IconButton,
  Skeleton,
  Tooltip,
  Rating,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { useTheme } from "@mui/material/styles";
import { getGameCover } from "../../services/game.service";
import { GameStatus } from "../../types/game.types";
import { getPlatformStyle } from "../../utils/platformStyles";
import { getStatusStyle } from "../../utils/statusStyles";

interface GameCardProps {
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
}

const smoothTransition = "cubic-bezier(0.2, 0.8, 0.2, 1)";

export default function GameCard({
  title,
  platform,
  coverUrl: initialCoverUrl,
  status = "BACKLOG",
  rating,
  isFavorite = false,
  hoursPlayed,
  notes,
  onEdit,
  onDelete,
  onToggleFavorite,
}: GameCardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [coverUrl, setCoverUrl] = useState<string | null>(initialCoverUrl ?? null);
  const [loadingImage, setLoadingImage] = useState(!initialCoverUrl);
  const [isHovered, setIsHovered] = useState(false);

  const platformStyle = getPlatformStyle(platform, isDark);
  const statusStyle = getStatusStyle(status, isDark);

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
        const url = await getGameCover(title);
        if (isMounted) {
          setCoverUrl(url);
        }
      } catch (e) {
        console.error("Cover fetch error for", title);
      } finally {
        if (isMounted) {
          setLoadingImage(false);
        }
      }
    }
    fetchCover();

    return () => {
      isMounted = false;
    };
  }, [initialCoverUrl, title]);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: isDark ? "rgba(19, 27, 46, 0.75)" : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
        borderRadius: "22px",
        p: 1.25,
        border: "1px solid",
        borderColor: isHovered
          ? platformStyle.color
          : isDark
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(0, 0, 0, 0.08)",
        boxShadow: isHovered
          ? `0 24px 40px -12px rgba(0,0,0,0.5), 0 0 25px -4px ${platformStyle.color}45`
          : isDark
          ? "0 6px 20px rgba(0, 0, 0, 0.35)"
          : "0 6px 18px rgba(0, 0, 0, 0.05)",
        transform: isHovered ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
        transition: `all 0.35s ${smoothTransition}`,
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* 1. PURE, UNOBSTRUCTED POSTER CONTAINER (2:3 Aspect Ratio) */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: "2/3",
          borderRadius: "16px",
          bgcolor: isDark ? "#080c16" : "#f1f5f9",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {loadingImage ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            sx={{
              bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)",
            }}
          />
        ) : coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            loading="lazy"
            onError={() => setCoverUrl(null)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: `transform 0.5s ${smoothTransition}, filter 0.35s ease`,
              transform: isHovered ? "scale(1.06)" : "scale(1.0)",
              filter: isHovered ? "contrast(1.04) brightness(1.04)" : "none",
            }}
          />
        ) : (
          /* Fallback Stylized Poster Art when no Steam image exists */
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: isDark
                ? "linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #030712 100%)"
                : "linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 50%, #cbd5e1 100%)",
              p: 2.5,
              textAlign: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "20px",
                bgcolor: isDark ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "primary.main",
                mb: 2,
              }}
            >
              <SportsEsportsRoundedIcon sx={{ fontSize: 36 }} />
            </Box>
            <Typography
              variant="subtitle2"
              fontWeight="800"
              sx={{
                color: isDark ? "#e2e8f0" : "#334155",
                lineHeight: 1.2,
                fontSize: "0.95rem",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              fontWeight="700"
              sx={{
                color: platformStyle.color,
                letterSpacing: 1,
                textTransform: "uppercase",
                mt: 1,
              }}
            >
              {platform}
            </Typography>
          </Box>
        )}

        {/* Top-Left Gamer Status Badge */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 4,
          }}
        >
          <Chip
            label={statusStyle.label}
            size="small"
            sx={{
              height: 24,
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: 0.5,
              borderRadius: "8px",
              color: statusStyle.color,
              bgcolor: isDark ? "rgba(11, 15, 25, 0.9)" : "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(12px)",
              border: "1px solid",
              borderColor: statusStyle.borderColor,
              boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
            }}
          />
        </Box>

        {/* Top-Right Quick Favorite & Action Pills */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            zIndex: 4,
          }}
        >
          {/* Quick Favorite Button */}
          {onToggleFavorite && (
            <Tooltip
              title={isFavorite ? "Quitar de favoritos" : "Marcar como favorito"}
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
                  width: 30,
                  height: 30,
                  borderRadius: "10px",
                  bgcolor: isDark ? "rgba(11, 15, 25, 0.9)" : "rgba(255, 255, 255, 0.92)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid",
                  borderColor: isFavorite
                    ? "rgba(245, 158, 11, 0.6)"
                    : isDark
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(0,0,0,0.1)",
                  color: isFavorite ? "#f59e0b" : isDark ? "#94a3b8" : "#64748b",
                  boxShadow: isFavorite
                    ? "0 0 14px rgba(245, 158, 11, 0.45)"
                    : "0 4px 12px rgba(0,0,0,0.25)",
                  opacity: isFavorite || isHovered ? 1 : 0,
                  transform: isFavorite || isHovered ? "scale(1)" : "scale(0.8)",
                  transition: `all 0.25s ${smoothTransition}`,
                  "&:hover": {
                    transform: "scale(1.12)",
                    color: "#f59e0b",
                  },
                }}
              >
                {isFavorite ? (
                  <StarRoundedIcon sx={{ fontSize: 18 }} />
                ) : (
                  <StarBorderRoundedIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
            </Tooltip>
          )}

          {/* Edit & Delete hover pill */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.4,
              p: "3px 5px",
              borderRadius: "11px",
              bgcolor: isDark ? "rgba(11, 15, 25, 0.9)" : "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(12px)",
              border: "1px solid",
              borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateY(0)" : "translateY(-6px)",
              transition: `all 0.25s ${smoothTransition}`,
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
                  color: isDark ? "#94a3b8" : "#64748b",
                  "&:hover": {
                    color: "#38bdf8",
                    bgcolor: "rgba(56, 189, 248, 0.15)",
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
                  color: isDark ? "#94a3b8" : "#64748b",
                  "&:hover": {
                    color: "#f87171",
                    bgcolor: "rgba(248, 113, 113, 0.15)",
                  },
                }}
              >
                <DeleteOutlineRoundedIcon sx={{ fontSize: 15 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* 2. DEDICATED CLEAN INFO FOOTER */}
      <Box sx={{ pt: 1.2, pb: 0.5, px: 0.5 }}>
        <Tooltip title={title} placement="top" arrow enterDelay={400}>
          <Typography
            variant="subtitle1"
            fontWeight="700"
            noWrap
            sx={{
              color: isDark ? "#f8fafc" : "#0f172a",
              fontSize: "0.95rem",
              lineHeight: 1.2,
              mb: 0.6,
              transition: `color 0.25s ease`,
              "&:hover": {
                color: platformStyle.color,
              },
            }}
          >
            {title}
          </Typography>
        </Tooltip>

        {/* Rating and Hours Played Row */}
        {(rating || (hoursPlayed && hoursPlayed > 0)) && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={0.8}
            sx={{ minHeight: 20 }}
          >
            {rating ? (
              <Rating
                value={rating}
                readOnly
                size="small"
                sx={{
                  fontSize: "0.9rem",
                  "& .MuiRating-iconFilled": {
                    color: "#f59e0b",
                  },
                }}
              />
            ) : (
              <Box />
            )}

            {hoursPlayed && hoursPlayed > 0 ? (
              <Box
                display="flex"
                alignItems="center"
                gap={0.3}
                sx={{
                  px: 0.8,
                  py: 0.2,
                  borderRadius: "6px",
                  bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                  color: "text.secondary",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                }}
              >
                <AccessTimeRoundedIcon sx={{ fontSize: 12 }} />
                <span>{hoursPlayed}h</span>
              </Box>
            ) : null}
          </Box>
        )}

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Chip
            label={platformStyle.label}
            size="small"
            sx={{
              height: 22,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: 0.3,
              borderRadius: "7px",
              color: platformStyle.color,
              bgcolor: platformStyle.bgColor,
              border: "1px solid",
              borderColor: platformStyle.borderColor,
            }}
          />

          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: platformStyle.color,
              boxShadow: `0 0 8px ${platformStyle.color}`,
              opacity: isHovered ? 1 : 0.4,
              transition: "opacity 0.25s ease",
            }}
          />
        </Box>
      </Box>
    </Card>
  );
}
