import { Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { SoundEffect } from '../../store/freesoundApi';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';
import { RootState } from '../../store/store';
import {
  StyledCardContainer,
  StyledCardContent,
  StyledButtonContainer,
  StyledAudio,
} from './SoundEffectCard.styles';

interface SoundEffectCardProps {
  soundEffect: SoundEffect;
}

export const SoundEffectCard = ({ soundEffect }: SoundEffectCardProps) => {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const isFavorite = favorites.some(
    (favorite: SoundEffect) => favorite.id === soundEffect.id,
  );

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(soundEffect.id));
    } else {
      dispatch(addFavorite(soundEffect));
    }
  };

  return (
    <StyledCardContainer>
      <StyledCardContent>
        <Typography variant="body1">{soundEffect.name}</Typography>
        <StyledButtonContainer>
          <StyledAudio controls preload="none" aria-label={soundEffect.name}>
            <source
              src={soundEffect.previews['preview-lq-mp3']}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </StyledAudio>
          <IconButton
            onClick={handleToggleFavorite}
            aria-label={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
            color="primary"
            size="medium"
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </StyledButtonContainer>
      </StyledCardContent>
    </StyledCardContainer>
  );
};
