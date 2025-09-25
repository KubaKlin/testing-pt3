import { Box, Container, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { useSearchSoundsQuery } from '../../store/freesoundApi';
import { setCurrentPage } from '../../store/searchSlice';
import { SearchBox } from '../SearchBox/SearchBox';
import { SearchResults } from '../SearchResults/SearchResults';

export const SoundSearch = () => {
  const dispatch = useDispatch();
  const { query: searchQuery, currentPage } = useSelector(
    (state: RootState) => state.search,
  );

  const { data, isLoading, error } = useSearchSoundsQuery(
    { query: searchQuery, page: currentPage },
    {
      skip: !searchQuery,
    },
  );

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <Container maxWidth="lg">
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>
          Free sound search app
        </Typography>
      </Box>

      <SearchBox isLoading={isLoading} />

      <SearchResults
        data={data}
        isLoading={isLoading}
        error={error}
        currentPage={currentPage}
        totalCount={data?.count || 0}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};
