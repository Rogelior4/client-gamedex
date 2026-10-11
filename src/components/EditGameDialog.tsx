import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Game } from "../services/game.service";

interface EditGameDialogProps {
  open: boolean;
  game: Game | null;
  onClose: () => void;
  onSave: (id: number, title: string, platform: string) => void;
}

export default function EditGameDialog({
  open,
  game,
  onClose,
  onSave,
}: EditGameDialogProps) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    if (game && open) {
      setTitle(game.title);
      setPlatform(game.platform);
    }
  }, [game, open]);

  const handleSubmit = () => {
    if (game && title.trim() && platform.trim()) {
      onSave(game.id, title.trim(), platform.trim());
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && title && platform) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Editar Juego ✏️</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre del Juego"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        <TextField
          margin="dense"
          label="Plataforma (PC, Xbox, Switch...)"
          fullWidth
          variant="outlined"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!title.trim() || !platform.trim()}
        >
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
