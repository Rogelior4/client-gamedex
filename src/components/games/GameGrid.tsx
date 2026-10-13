import React from 'react';
import { Grid } from '@mui/material';
import { Game } from '../../types/game.types';
import GameCard from './GameCard';

interface GameGridProps {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (game: Game) => void;
  onToggleFavorite: (id: number, current: boolean) => void;
}

export const GameGrid: React.FC<GameGridProps> = ({
  games,
  onEdit,
  onDelete,
  onToggleFavorite,
}) => {
  return (
    <Grid container spacing={{ xs: 2.5, sm: 3, md: 3.5 }}>
      {games.map((game) => (
        <Grid
          size={{ xs: 6, sm: 4, md: 3, lg: 2.4, xl: 2 }}
          key={game.id}
        >
          <GameCard
            title={game.title}
            platform={game.platform}
            coverUrl={game.coverUrl}
            status={game.status}
            rating={game.rating}
            isFavorite={game.isFavorite}
            hoursPlayed={game.hoursPlayed}
            notes={game.notes}
            onEdit={() => onEdit(game)}
            onDelete={() => onDelete(game)}
            onToggleFavorite={() => onToggleFavorite(game.id, game.isFavorite)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
