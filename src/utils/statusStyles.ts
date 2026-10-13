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
        color: "#22c55e",
        bgColor: isDark ? "rgba(34, 197, 94, 0.16)" : "rgba(34, 197, 94, 0.1)",
        borderColor: isDark ? "rgba(34, 197, 94, 0.35)" : "rgba(34, 197, 94, 0.25)",
      };
    case "COMPLETED":
      return {
        label: "Completado",
        color: "#f59e0b",
        bgColor: isDark ? "rgba(245, 158, 11, 0.16)" : "rgba(245, 158, 11, 0.1)",
        borderColor: isDark ? "rgba(245, 158, 11, 0.35)" : "rgba(245, 158, 11, 0.25)",
      };
    case "WISHLIST":
      return {
        label: "Deseados",
        color: "#ec4899",
        bgColor: isDark ? "rgba(236, 72, 153, 0.16)" : "rgba(236, 72, 153, 0.1)",
        borderColor: isDark ? "rgba(236, 72, 153, 0.35)" : "rgba(236, 72, 153, 0.25)",
      };
    case "ABANDONED":
      return {
        label: "Abandonado",
        color: isDark ? "#94a3b8" : "#64748b",
        bgColor: isDark ? "rgba(148, 163, 184, 0.14)" : "rgba(100, 116, 139, 0.1)",
        borderColor: isDark ? "rgba(148, 163, 184, 0.25)" : "rgba(100, 116, 139, 0.2)",
      };
    case "BACKLOG":
    default:
      return {
        label: "Pendiente",
        color: "#818cf8",
        bgColor: isDark ? "rgba(129, 140, 248, 0.16)" : "rgba(129, 140, 248, 0.1)",
        borderColor: isDark ? "rgba(129, 140, 248, 0.35)" : "rgba(129, 140, 248, 0.25)",
      };
  }
};
