import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface AddGameDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (title: string, platform: string) => void;
}

export default function AddGameDialog({
  open,
  onClose,
  onAdd,
}: AddGameDialogProps) {
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
    if (e.key === "Enter" && title && platform) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Nuevo Juego 🕹️</DialogTitle>

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
        <Button onClick={onClose} color="error">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!title.trim() || !platform.trim()}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
