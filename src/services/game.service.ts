import axios from "axios";
import {
  Game,
  GameStatus,
  CreateGameData,
  UpdateGameData,
  SteamSuggestion,
  GameSuggestion,
  SteamProfileSummary,
  SteamOwnedGame,
  SteamImportResult,
} from "../types/game.types";

export type {
  Game,
  GameStatus,
  CreateGameData,
  UpdateGameData,
  SteamSuggestion,
  GameSuggestion,
  SteamProfileSummary,
  SteamOwnedGame,
  SteamImportResult,
};

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

export const getGameCover = async (
  title: string,
  platform?: string,
): Promise<string | null> => {
  try {
    const { data } = await api.get<{ url: string }>(`/games/cover/${encodeURIComponent(title)}`, {
      params: platform ? { platform } : undefined,
    });
    return data.url;
  } catch (error) {
    return null;
  }
};

/**
 * Búsqueda universal compatible con múltiples plataformas:
 * Steam, Epic Games, Nintendo, Riot Games, Battle.net, EA App, Ubisoft Connect, Xbox, PlayStation, etc.
 */
export const searchGames = async (
  term: string,
  platform?: string,
): Promise<GameSuggestion[]> => {
  if (!term || term.trim().length === 0) return [];
  try {
    const { data } = await api.get<GameSuggestion[]>("/games/search", {
      params: {
        term: term.trim(),
        ...(platform && platform !== "all" ? { platform } : {}),
      },
    });
    return data;
  } catch (error) {
    // Si falla /games/search por alguna razón de red, fallback a search-steam
    return searchSteamGames(term);
  }
};

/**
 * Retrocompatible: Búsqueda específica en Steam
 */
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
    version: "2.0",
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

/**
 * Consulta y resuelve el perfil público de Steam
 */
export const getSteamProfile = async (
  identifier: string,
  apiKey?: string,
): Promise<SteamProfileSummary> => {
  const { data } = await api.get<SteamProfileSummary>("/games/steam/profile", {
    params: {
      identifier: identifier.trim(),
      ...(apiKey?.trim() ? { apiKey: apiKey.trim() } : {}),
    },
  });
  return data;
};

/**
 * Obtiene la lista completa de videojuegos de la cuenta de Steam
 */
export const getSteamOwnedGames = async (
  steamId: string,
  apiKey?: string,
): Promise<{ totalCount: number; isPublic: boolean; games: SteamOwnedGame[] }> => {
  const { data } = await api.get<{
    totalCount: number;
    isPublic: boolean;
    games: SteamOwnedGame[];
  }>("/games/steam/owned-games", {
    params: {
      steamId: steamId.trim(),
      ...(apiKey?.trim() ? { apiKey: apiKey.trim() } : {}),
    },
  });
  return data;
};

/**
 * Importa títulos seleccionados de Steam a la base de datos de GameDex
 */
export const importSteamGames = async (
  games: Array<{
    title: string;
    appId?: number;
    coverUrl?: string | null;
    hoursPlayed?: number | null;
    status?: GameStatus;
  }>,
  updateExistingHours = true,
): Promise<SteamImportResult> => {
  const { data } = await api.post<SteamImportResult>("/games/steam/import", {
    games,
    updateExistingHours,
  });
  return data;
};

