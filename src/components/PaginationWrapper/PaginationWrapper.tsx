import { ChangeEvent } from 'react';
import { Pagination } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  StyledPaginationContainer,
  StyledPageInfo,
} from './PaginationWrapper.styles';
import { RootState } from '../../store/store';

interface PaginationProps {
  totalPages: number;
  handlePageChange: (event: ChangeEvent<unknown>, page: number) => void;
}

export const PaginationWrapper = ({
  totalPages,
  handlePageChange,
}: PaginationProps) => {
  const { currentPage } = useSelector((state: RootState) => state.search);
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
