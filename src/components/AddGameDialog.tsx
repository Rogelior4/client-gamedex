import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Chip,
  Fade,
  Rating,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { useTheme } from "@mui/material/styles";
import { GameStatus } from "../services/game.service";
import { STATUS_OPTIONS, getStatusStyle } from "../utils/statusStyles";

interface AddGameDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: {
    title: string;
    platform: string;
    coverUrl?: string;
    status: GameStatus;
    rating?: number | null;
    isFavorite: boolean;
    hoursPlayed?: number | null;
  }) => void;
}

const PLATFORM_PRESETS = ["PC", "PlayStation 5", "Xbox Series", "Nintendo Switch", "Steam Deck"];

export default function AddGameDialog({
  open,
  onClose,
  onAdd,
}: AddGameDialogProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [status, setStatus] = useState<GameStatus>("BACKLOG");
  const [rating, setRating] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hoursPlayed, setHoursPlayed] = useState<string>("");

  useEffect(() => {
    if (!open) {
      setTitle("");
      setPlatform("");
      setCoverUrl("");
      setStatus("BACKLOG");
      setRating(null);
      setIsFavorite(false);
      setHoursPlayed("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (title.trim() && platform.trim()) {
      onAdd({
        title: title.trim(),
        platform: platform.trim(),
        coverUrl: coverUrl.trim() ? coverUrl.trim() : undefined,
        status,
        rating: rating || null,
        isFavorite,
        hoursPlayed: hoursPlayed ? parseInt(hoursPlayed, 10) : null,
      });
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && title.trim() && platform.trim()) {
      handleSubmit();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      TransitionComponent={Fade}
      transitionDuration={250}
      PaperProps={{
        sx: {
          borderRadius: "24px",
          bgcolor: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid",
          borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)",
          boxShadow: isDark
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(99, 102, 241, 0.2)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1, pt: 2 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: "12px",
            background: "linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
          }}
        >
          <SportsEsportsRoundedIcon />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="800" sx={{ lineHeight: 1.2 }}>
            Añadir Juego
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Registra un nuevo título en tu catálogo
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: "16px !important", display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextField
          autoFocus
          label="Título del Videojuego"
          placeholder="ej. Elden Ring, Hollow Knight..."
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
            },
          }}
        />

        <Box>
          <TextField
            label="Plataforma"
            placeholder="ej. PC, PS5, Switch..."
            fullWidth
            variant="outlined"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              mb: 1.5,
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
              },
            }}
          />

          {/* Quick Platform Presets */}
          <Typography variant="caption" color="text.secondary" fontWeight="600" sx={{ display: "block", mb: 0.8 }}>
            Sugerencias rápidas:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={0.8}>
            {PLATFORM_PRESETS.map((p) => (
              <Chip
                key={p}
                label={p}
                size="small"
                onClick={() => setPlatform(p)}
                clickable
                sx={{
                  borderRadius: "8px",
                  fontWeight: platform === p ? "700" : "500",
                  bgcolor:
                    platform === p
                      ? "primary.main"
                      : isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.05)",
                  color: platform === p ? "white" : "text.primary",
                  border: "1px solid",
                  borderColor:
                    platform === p
                      ? "primary.main"
                      : isDark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.08)",
                  "&:hover": {
                    bgcolor: platform === p ? "primary.dark" : "rgba(99, 102, 241, 0.15)",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Status Selector */}
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight="700"
            sx={{ display: "block", mb: 0.8, textTransform: "uppercase", letterSpacing: 0.5 }}
          >
            Estado del Juego:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={0.8}>
            {STATUS_OPTIONS.map((opt) => {
              const isSelected = status === opt.id;
              const style = getStatusStyle(opt.id, isDark);
              return (
                <Chip
                  key={opt.id}
                  label={opt.label}
                  size="small"
                  onClick={() => setStatus(opt.id)}
                  clickable
                  sx={{
                    borderRadius: "8px",
                    fontWeight: isSelected ? 800 : 500,
                    bgcolor: isSelected
                      ? style.bgColor
                      : isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.04)",
                    color: isSelected ? style.color : "text.secondary",
                    border: "1px solid",
                    borderColor: isSelected ? style.borderColor : "transparent",
                    boxShadow: isSelected ? `0 0 10px ${style.color}35` : "none",
                    "&:hover": {
                      bgcolor: style.bgColor,
                      color: style.color,
                    },
                  }}
                />
              );
            })}
          </Box>
        </Box>

        {/* Rating & Favorite Row */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1.5}
          borderRadius="14px"
          sx={{
            bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            border: "1px solid",
            borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight="700" display="block" mb={0.3}>
              Calificación (Opcional):
            </Typography>
            <Rating
              value={rating}
              onChange={(e, newVal) => setRating(newVal)}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#f59e0b",
                },
              }}
            />
          </Box>

          <Tooltip title={isFavorite ? "Favorito" : "Marcar como favorito"} arrow>
            <IconButton
              onClick={() => setIsFavorite(!isFavorite)}
              sx={{
                borderRadius: "12px",
                border: "1px solid",
                borderColor: isFavorite
                  ? "rgba(245, 158, 11, 0.4)"
                  : isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
                color: isFavorite ? "#f59e0b" : "text.secondary",
                bgcolor: isFavorite
                  ? isDark
                    ? "rgba(245, 158, 11, 0.15)"
                    : "rgba(245, 158, 11, 0.1)"
                  : "transparent",
              }}
            >
              {isFavorite ? <StarRoundedIcon /> : <StarBorderRoundedIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Hours Played */}
        <TextField
          label="Horas Jugadas (Opcional)"
          placeholder="ej. 25"
          type="number"
          fullWidth
          variant="outlined"
          value={hoursPlayed}
          onChange={(e) => setHoursPlayed(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
            },
          }}
        />

        <TextField
          label="URL de Carátula (Opcional)"
          placeholder="https://... (deja vacío para autocompletar con Steam)"
          fullWidth
          variant="outlined"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          helperText="Si se deja vacío, GameDex buscará la carátula oficial automáticamente en Steam."
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
            },
            "& .MuiFormHelperText-root": {
              fontSize: "0.75rem",
              color: "text.secondary",
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: "12px",
            px: 2.5,
            color: "text.secondary",
            fontWeight: "600",
            textTransform: "none",
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!title.trim() || !platform.trim()}
          startIcon={<AddRoundedIcon />}
          sx={{
            borderRadius: "12px",
            px: 3,
            py: 1,
            fontWeight: "700",
            textTransform: "none",
            background: "linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)",
            boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #4f46e5 0%, #0284c7 100%)",
              boxShadow: "0 6px 20px rgba(99, 102, 241, 0.6)",
            },
            "&:disabled": {
              background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
            },
          }}
        >
          Guardar Juego
        </Button>
      </DialogActions>
    </Dialog>
  );
}
