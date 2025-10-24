import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StyledLoadingContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  paddingY: 32,
}));

export const StyledLoadingText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));
