import { styled } from '@mui/material/styles';
import { Alert } from '@mui/material';

export const StyledErrorAlert = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const StyledInfoAlert = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
