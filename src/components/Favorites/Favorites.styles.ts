import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

export const StyledFavoritesContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: '800px',
  marginX: 'auto',
}));

export const StyledBackButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));
