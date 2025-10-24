import { Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { RootState } from '../../store/store';
import { FavoritesList } from '../FavoritesList/FavoritesList';
import { StyledFavoritesContainer } from './Favorites.styles';

export const Favorites = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  return (
    <StyledFavoritesContainer>
      <Typography variant="h3" gutterBottom>
        Free sound search app
      </Typography>
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
        variant="outlined"
      >
        Back to Search
      </Button>

      <FavoritesList favoriteData={favorites} />
    </StyledFavoritesContainer>
  );
};
