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
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import { useTheme } from "@mui/material/styles";

interface AddGameDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (title: string, platform: string) => void;
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

  useEffect(() => {
    if (!open) {
      setTitle("");
      setPlatform("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (title.trim() && platform.trim()) {
      onAdd(title.trim(), platform.trim());
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
