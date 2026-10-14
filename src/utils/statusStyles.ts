import { GameStatus } from "../services/game.service";

export interface StatusStyle {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const STATUS_OPTIONS: { id: GameStatus; label: string }[] = [
  { id: "BACKLOG", label: "Pendiente" },
  { id: "PLAYING", label: "Jugando" },
  { id: "COMPLETED", label: "Completado" },
  { id: "WISHLIST", label: "Lista de Deseos" },
  { id: "ABANDONED", label: "Abandonado" },
];

export const getStatusStyle = (status: GameStatus | undefined, isDark: boolean): StatusStyle => {
  switch (status) {
    case "PLAYING":
      return {
        label: "Jugando",
        color: isDark ? "#4ade80" : "#16a34a",
        bgColor: isDark ? "rgba(74, 222, 128, 0.1)" : "rgba(22, 163, 74, 0.08)",
        borderColor: isDark ? "rgba(74, 222, 128, 0.22)" : "rgba(22, 163, 74, 0.18)",
      };
    case "COMPLETED":
      return {
        label: "Completado",
        color: isDark ? "#fbbf24" : "#d97706",
        bgColor: isDark ? "rgba(251, 191, 36, 0.1)" : "rgba(217, 119, 6, 0.08)",
        borderColor: isDark ? "rgba(251, 191, 36, 0.22)" : "rgba(217, 119, 6, 0.18)",
      };
    case "WISHLIST":
      return {
        label: "Deseados",
        color: isDark ? "#f472b6" : "#db2777",
        bgColor: isDark ? "rgba(244, 114, 182, 0.1)" : "rgba(219, 39, 119, 0.08)",
        borderColor: isDark ? "rgba(244, 114, 182, 0.22)" : "rgba(219, 39, 119, 0.18)",
      };
    case "ABANDONED":
      return {
        label: "Abandonado",
        color: isDark ? "#71717a" : "#94a3b8",
        bgColor: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
        borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
      };
    case "BACKLOG":
    default:
      return {
        label: "Pendiente",
        color: isDark ? "#a1a1aa" : "#64748b",
        bgColor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)",
        borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
      };
  }
};
