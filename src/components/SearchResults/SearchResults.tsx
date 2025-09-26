import { ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Alert,
} from '@mui/material';
import { FreesoundSearchResponse, SoundEffect } from '../../store/freesoundApi';
import { SoundEffectCard } from '../SoundEffectCard/SoundEffectCard';
import { LoadingInfo } from '../LoadingInfo/LoadingInfo';
import { PaginationWrapper } from '../PaginationWrapper/PaginationWrapper';

interface SearchResultsProps {
  data?: FreesoundSearchResponse;
  favoriteData?: SoundEffect[];
  isLoading: boolean;
  error?: unknown;
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  mode?: 'search' | 'favorites';
}

export const SearchResults = ({
  data,
  favoriteData,
  isLoading,
  error,
  currentPage,
  totalCount,
  onPageChange,
  mode = 'search',
}: SearchResultsProps) => {
  const totalPages = Math.ceil(totalCount / 15);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <LoadingInfo/>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error loading sound effects
      </Alert>
    );
  }

  if (mode === 'favorites') {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Your Favorites ({favoriteData?.length} sound effects)
        </Typography>
        <Box>
          {favoriteData?.map((soundEffect) => (
            <Box key={soundEffect.id}>
              <SoundEffectCard soundEffect={soundEffect} />
            </Box>
          ))}
        </Box>
      </Box>
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
        <PaginationWrapper
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </Box>
  );
};
