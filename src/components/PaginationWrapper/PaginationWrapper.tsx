import { ChangeEvent } from 'react';
import { Pagination } from '@mui/material';
import { StyledPaginationContainer, StyledPageInfo } from './PaginationWrapper.styles';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (event: ChangeEvent<unknown>, page: number) => void;
}

export const PaginationWrapper = ({ totalPages, currentPage, handlePageChange }: PaginationProps) => {
  return (
    <StyledPaginationContainer>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
      <StyledPageInfo variant="body2">
        Page {currentPage} / {totalPages}
      </StyledPageInfo>
    </StyledPaginationContainer>
  );
};