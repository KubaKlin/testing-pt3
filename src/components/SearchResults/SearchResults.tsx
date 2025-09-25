import { ChangeEvent } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
  Stack,
} from '@mui/material';
import { FreesoundSearchResponse } from '../../store/freesoundApi';
import { SoundEffectCard } from '../SoundEffectCard/SoundEffectCard';

interface SearchResultsProps {
  data?: FreesoundSearchResponse;
  isLoading: boolean;
  error?: unknown;
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export const SearchResults = ({
  data,
  isLoading,
  error,
  currentPage,
  totalCount,
  onPageChange,
}: SearchResultsProps) => {
  const totalPages = Math.ceil(totalCount / 15);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    onPageChange(page);
  };

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

      {totalPages > 1 && (
        <Stack alignItems="center" sx={{ mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Page {currentPage} / {totalPages}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};
