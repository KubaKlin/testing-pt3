import { Box, Container, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { RootState } from '../../store/store';
import { useSearchSoundsQuery } from '../../store/freesoundApi';
import { setCurrentPage } from '../../store/searchSlice';
import { SearchBox } from '../SearchBox/SearchBox';
import { SearchResults } from '../SearchResults/SearchResults';

export const SoundSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query: searchQuery, currentPage } = useSelector(
    (state: RootState) => state.search,
  );
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const { data, isLoading, error } = useSearchSoundsQuery(
    { query: searchQuery, page: currentPage },
    {
      skip: !searchQuery,
    },
  );

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleGoToFavorites = () => {
    navigate('/favorites');
  };

  return (
    <Container maxWidth="lg">
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>
          Free sound search app
        </Typography>
        {favorites.length > 0 && (
          <Box display="flex" justifyContent="center" mb={2}>
            <Button
              startIcon={<FavoriteIcon />}
              onClick={handleGoToFavorites}
              variant="outlined"
              color="primary"
            >
              Favorites ({favorites.length})
            </Button>
          </Box>
        )}
      </Box>

      <SearchBox isLoading={isLoading} />

      <SearchResults
        data={data}
        isLoading={isLoading}
        error={error}
        currentPage={currentPage}
        totalCount={data?.count || 0}
        onPageChange={handlePageChange}
        mode="search"
      />
    </Container>
  );
};
