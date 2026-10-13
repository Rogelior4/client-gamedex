import { FilterOption } from '../types/game.types';

export const STATUS_FILTERS: FilterOption[] = [
  { id: 'ALL', label: 'Todos', color: '#6366f1' },
  { id: 'FAVORITES', label: '⭐ Favoritos', color: '#f59e0b' },
  { id: 'PLAYING', label: 'Jugando', color: '#22c55e' },
  { id: 'COMPLETED', label: 'Completados', color: '#eab308' },
  { id: 'BACKLOG', label: 'Pendientes', color: '#818cf8' },
  { id: 'WISHLIST', label: 'Deseados', color: '#ec4899' },
];

export const PLATFORM_FILTERS: FilterOption[] = [
  { id: 'ALL', label: 'Todas', color: '#6366f1' },
  { id: 'PC', label: 'PC', color: '#38bdf8' },
  { id: 'PLAYSTATION', label: 'PlayStation', color: '#818cf8' },
  { id: 'XBOX', label: 'Xbox', color: '#4ade80' },
  { id: 'NINTENDO', label: 'Nintendo', color: '#fb7185' },
];

export const PLATFORM_PRESETS: string[] = [
  'PC',
  'PlayStation 5',
  'Nintendo Switch',
  'Xbox Series X',
  'Steam Deck',
];
