import { Container, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { RootState } from '../../store/store';
import { useSearchSoundsQuery } from '../../store/freesoundApi';
import { SearchBox } from '../SearchBox/SearchBox';
import { SearchResults } from '../SearchResults/SearchResults';
import {
  StyledHeaderContainer,
  StyledFavoritesButtonContainer,
} from './SoundSearch.styles';

export const SoundSearch = () => {
  const navigate = useNavigate();
  const { query: searchQuery } = useSelector(
    (state: RootState) => state.search,
  );
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const { isLoading } = useSearchSoundsQuery(
    { query: searchQuery, page: 1 },
    {
      skip: !searchQuery,
    },
  );

  const handleGoToFavorites = () => {
    navigate('/favorites');
  };

  return (
    <Container maxWidth="lg">
      <StyledHeaderContainer>
        <Typography variant="h3" gutterBottom>
          Free sound search app
        </Typography>
        {favorites.length > 0 && (
          <StyledFavoritesButtonContainer>
            <Button
              startIcon={<FavoriteIcon />}
              onClick={handleGoToFavorites}
              variant="outlined"
              color="primary"
            >
              Favorites ({favorites.length})
            </Button>
          </StyledFavoritesButtonContainer>
        )}
      </StyledHeaderContainer>

      <SearchBox isLoading={isLoading} />

      <SearchResults mode="search" />
    </Container>
  );
};
