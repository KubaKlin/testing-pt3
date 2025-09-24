import { useState, useRef } from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { SoundEffect } from '../../store/freesoundApi';

interface SoundEffectCardProps {
  soundEffect: SoundEffect;
}

export const SoundEffectCard = ({ soundEffect }: SoundEffectCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  return (
    <Box
      sx={{ mb: 2, px: 2, py: 1 }}
      style={{
        border: '1px solid #333',
        borderRadius: 8,
        maxWidth: '500px',
        textAlign: 'left',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body1">{soundEffect.name}</Typography>
        <IconButton
          onClick={handlePlayPause}
          aria-label={isPlaying ? 'Pause sound' : 'Play sound'}
          color="primary"
          size="medium"
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};
