import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

export const StyledPaginationContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  marginTop: theme.spacing(4),
}));

export const StyledPageInfo = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
