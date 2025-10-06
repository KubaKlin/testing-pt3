import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledFavoritesContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: '800px',
  marginX: 'auto',
}));
