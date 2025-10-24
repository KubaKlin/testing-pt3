import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledCardContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(0.4),
  border: '1px solid #333',
  borderRadius: 8,
  maxWidth: '500px',
  textAlign: 'left',
}));

export const StyledCardContent = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'column',
  textAlign: 'center',
}));

export const StyledButtonContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

export const StyledAudio = styled('audio')(({ theme }) => ({
  height: '40px',
  '&::-webkit-media-controls-panel': {
    backgroundColor: theme.palette.background.paper,
  },
  '&::-webkit-media-controls-play-button': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
  },
}));
