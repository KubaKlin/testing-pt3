import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { RootState } from '../../store/store';
import { FavoritesList } from '../FavoritesList/FavoritesList';
import { StyledFavoritesContainer, StyledBackButton } from './Favorites.styles';

export const Favorites = () => {
  const navigate = useNavigate();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const handleBack = () => {
    navigate('/');
  };

  return (
    <StyledFavoritesContainer>
      <Typography variant="h3" gutterBottom>
        Free sound search app
      </Typography>
      <StyledBackButton
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        variant="outlined"
      >
        Back to Search
      </StyledBackButton>

      <FavoritesList favoriteData={favorites} />
    </StyledFavoritesContainer>
  );
};
