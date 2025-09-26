import { ChangeEvent } from 'react';
import { Stack, Typography, Pagination } from '@mui/material';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (event: ChangeEvent<unknown>, page: number) => void;
}

export const PaginationWrapper = ({ totalPages, currentPage, handlePageChange }: PaginationProps) => {
  return (
    <Stack alignItems="center" sx={{ mt: 4 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Page {currentPage} / {totalPages}
      </Typography>
    </Stack>
  );
};