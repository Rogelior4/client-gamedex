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
