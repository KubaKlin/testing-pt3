import { Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { RootState } from '../../store/store';
import { SearchResults } from '../SearchResults/SearchResults';

export const Favorites = () => {
  const navigate = useNavigate();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box sx={{ p: 2, maxWidth: '800px', mx: 'auto' }}>
      <Typography variant="h3" gutterBottom>
        Free sound search app
      </Typography>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        variant="outlined"
        sx={{ mb: 2 }}
      >
        Back to Search
      </Button>

      <SearchResults
        favoriteData={favorites}
        isLoading={false}
        currentPage={1}
        totalCount={favorites.length}
        onPageChange={() => {}}
        mode="favorites"
      />
    </Box>
  );
};
