export type GameStatus =
  | 'BACKLOG'
  | 'PLAYING'
  | 'COMPLETED'
  | 'ABANDONED'
  | 'WISHLIST';

export interface Game {
  id: number;
  title: string;
  platform: string;
  coverUrl?: string | null;
  status: GameStatus;
  rating?: number | null;
  isFavorite: boolean;
  hoursPlayed?: number | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGameData {
  title: string;
  platform: string;
  coverUrl?: string | null;
  status?: GameStatus;
  rating?: number | null;
  isFavorite?: boolean;
  hoursPlayed?: number | null;
  notes?: string | null;
}

export interface UpdateGameData {
  title?: string;
  platform?: string;
  coverUrl?: string | null;
  status?: GameStatus;
  rating?: number | null;
  isFavorite?: boolean;
  hoursPlayed?: number | null;
  notes?: string | null;
}

export interface GameStats {
  total: number;
  playing: number;
  completed: number;
  backlog: number;
  favorites: number;
  platforms: number;
}

export interface FilterOption {
  id: string;
  label: string;
  color: string;
}

export type PlatformSource =
  | 'steam'
  | 'epic'
  | 'nintendo'
  | 'riot'
  | 'battlenet'
  | 'ea'
  | 'ubisoft'
  | 'xbox'
  | 'playstation'
  | 'gog'
  | 'rawg'
  | 'all';

export interface GameSuggestion {
  id: string | number;
  title: string;
  platform: string;
  coverUrl: string;
  headerUrl?: string;
  tinyImage?: string;
  source: string;
  releaseDate?: string;
  storeUrl?: string;
  launcherUri?: string;
  platforms?: {
    windows?: boolean;
    mac?: boolean;
    linux?: boolean;
  };
}

// Backwards-compatible alias for existing imports
export type SteamSuggestion = GameSuggestion;
