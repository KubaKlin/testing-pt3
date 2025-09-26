import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const StyledSearchForm = styled('form')(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const StyledSearchButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  height: 56,
}));
