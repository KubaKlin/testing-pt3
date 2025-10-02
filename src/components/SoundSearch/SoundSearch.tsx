import { Container, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
  const { query: searchQuery } = useSelector(
    (state: RootState) => state.search,
  );
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const { isFetching } = useSearchSoundsQuery(
    { query: searchQuery, page: 1 },
    {
      skip: !searchQuery,
    },
  );

  return (
    <Container maxWidth="lg">
      <StyledHeaderContainer>
        <Typography variant="h3" gutterBottom>
          Free sound search app
        </Typography>
        {favorites.length > 0 && (
          <StyledFavoritesButtonContainer>
            <Button
              component={Link}
              to="/favorites"
              startIcon={<FavoriteIcon />}
              variant="outlined"
              color="primary"
            >
              Favorites ({favorites.length})
            </Button>
          </StyledFavoritesButtonContainer>
        )}
      </StyledHeaderContainer>

      <SearchBox isFetching={isFetching} />

      <SearchResults />
    </Container>
  );
};
