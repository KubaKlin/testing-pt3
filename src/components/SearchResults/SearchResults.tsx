import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { FreesoundSearchResponse } from '../../store/freesoundApi';
import { SoundEffectCard } from '../SoundEffectCard/SoundEffectCard';

interface SearchResultsProps {
  data?: FreesoundSearchResponse;
  isLoading: boolean;
  error?: unknown;
}

export const SearchResults = ({
  data,
  isLoading,
  error,
}: SearchResultsProps) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Searching for sound effects...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error searching for sound effects
      </Alert>
    );
  }

  if (data && data.results.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No sound effects found. Try different search terms.
      </Alert>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Found {data.count} sound effects
      </Typography>
      <Box>
        {data.results.map((soundEffect) => (
          <Box key={soundEffect.id}>
            <SoundEffectCard soundEffect={soundEffect} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
