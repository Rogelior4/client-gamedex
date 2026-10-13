import axios from "axios";
import {
  Game,
  GameStatus,
  CreateGameData,
  UpdateGameData,
} from "../types/game.types";

export type { Game, GameStatus, CreateGameData, UpdateGameData };

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
