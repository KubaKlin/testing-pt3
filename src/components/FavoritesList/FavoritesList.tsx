import { Typography, Box } from '@mui/material';
import { SoundEffect } from '../../store/freesoundApi';
import { SoundEffectCard } from '../SoundEffectCard/SoundEffectCard';

interface FavoritesListProps {
  favoriteData: SoundEffect[];
}

export const FavoritesList = ({ favoriteData }: FavoritesListProps) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Your Favorites ({favoriteData.length} sound effects)
      </Typography>
      <Box>
        {favoriteData.map((soundEffect) => (
          <div key={soundEffect.id}>
            <SoundEffectCard soundEffect={soundEffect} />
          </div>
        ))}
      </Box>
    </Box>
  );
};
