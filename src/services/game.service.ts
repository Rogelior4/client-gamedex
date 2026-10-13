import axios from "axios";
import {
  Game,
  GameStatus,
  CreateGameData,
  UpdateGameData,
  SteamSuggestion,
} from "../types/game.types";

export type { Game, GameStatus, CreateGameData, UpdateGameData, SteamSuggestion };

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la API:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export const getGames = async (): Promise<Game[]> => {
  const { data } = await api.get<Game[]>("/games");
  return data;
};

export const createGame = async (
  input: CreateGameData | string,
  platform?: string,
  coverUrl?: string | null,
): Promise<Game> => {
  const payload =
    typeof input === "string"
      ? { title: input, platform: platform || "PC", coverUrl }
      : input;
  const { data } = await api.post<Game>("/games", payload);
  return data;
};

export const updateGame = async (
  id: number,
  data: UpdateGameData,
): Promise<Game> => {
  const { data: updated } = await api.patch<Game>(`/games/${id}`, data);
  return updated;
};

export const toggleFavorite = async (
  id: number,
  currentFavorite: boolean,
): Promise<Game> => {
  return updateGame(id, { isFavorite: !currentFavorite });
};

export const deleteGame = async (id: number): Promise<void> => {
  await api.delete(`/games/${id}`);
};

export const syncMissingCovers = async (): Promise<{ total: number; updated: number }> => {
  const { data } = await api.post<{ total: number; updated: number }>("/games/sync-covers");
  return data;
};

export const getGameCover = async (title: string): Promise<string | null> => {
  try {
    const { data } = await api.get<{ url: string }>(`/games/cover/${title}`);
    return data.url;
  } catch (error) {
    return null;
  }
};

export const searchSteamGames = async (term: string): Promise<SteamSuggestion[]> => {
  if (!term || term.trim().length === 0) return [];
  try {
    const { data } = await api.get<SteamSuggestion[]>("/games/search-steam", {
      params: { term: term.trim() },
    });
    return data;
  } catch (error) {
    return [];
  }
};

export const importGames = async (
  games: CreateGameData[],
): Promise<{ count: number; games: Game[] }> => {
  const { data } = await api.post<{ count: number; games: Game[] }>("/games/import", {
    games,
  });
  return data;
};

export const exportCollectionJSON = (games: Game[]) => {
  const exportData = {
    app: "GameDex",
    version: "1.0",
    exportedAt: new Date().toISOString(),
    totalGames: games.length,
    games: games.map((g) => ({
      title: g.title,
      platform: g.platform,
      coverUrl: g.coverUrl,
      status: g.status,
      rating: g.rating,
      isFavorite: g.isFavorite,
      hoursPlayed: g.hoursPlayed,
      notes: g.notes,
    })),
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dateStr = new Date().toISOString().split("T")[0];
  link.href = url;
  link.download = `gamedex-collection-${dateStr}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportCollectionCSV = (games: Game[]) => {
  const headers = ["Title", "Platform", "Status", "Rating", "Favorite", "HoursPlayed", "CoverUrl", "Notes"];
  const rows = games.map((g) => [
    `"${(g.title || "").replace(/"/g, '""')}"`,
    `"${(g.platform || "").replace(/"/g, '""')}"`,
    `"${g.status || "BACKLOG"}"`,
    g.rating ?? "",
    g.isFavorite ? "Yes" : "No",
    g.hoursPlayed ?? 0,
    `"${(g.coverUrl || "").replace(/"/g, '""')}"`,
    `"${(g.notes || "").replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dateStr = new Date().toISOString().split("T")[0];
  link.href = url;
  link.download = `gamedex-collection-${dateStr}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};


