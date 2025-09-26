import { useState, useRef } from 'react';
import { Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
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
} from './SoundEffectCard.styles';

interface SoundEffectCardProps {
  soundEffect: SoundEffect;
}

export const SoundEffectCard = ({ soundEffect }: SoundEffectCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const isFavorite = favorites.some(
    (favorite: SoundEffect) => favorite.id === soundEffect.id,
  );

  const handlePlayPause = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(soundEffect.previews['preview-lq-mp3']);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

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
          <IconButton
            onClick={handlePlayPause}
            aria-label={isPlaying ? 'Pause sound' : 'Play sound'}
            color="primary"
            size="medium"
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </StyledButtonContainer>
      </StyledCardContent>
    </StyledCardContainer>
  );
};
