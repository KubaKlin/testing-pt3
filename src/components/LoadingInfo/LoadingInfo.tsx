import { CircularProgress } from '@mui/material';
import {
  StyledLoadingContainer,
  StyledLoadingText,
} from './LoadingInfo.styles';

export const LoadingInfo = () => {
  return (
    <StyledLoadingContainer>
      <CircularProgress />
      <StyledLoadingText variant="body1">Loading...</StyledLoadingText>
    </StyledLoadingContainer>
  );
};
