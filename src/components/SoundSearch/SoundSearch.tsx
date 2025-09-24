import { Box, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { useSearchSoundsQuery } from '../../store/freesoundApi';
import { SearchBox } from '../SearchBox/SearchBox';
import { SearchResults}  from '../SearchResults/SearchResults';

export const SoundSearch = () => {
  const { query: searchQuery } = useSelector(
    (state: RootState) => state.search,
  );

  const { data, isLoading, error } = useSearchSoundsQuery(searchQuery, {
    skip: !searchQuery,
  });

  return (
    <Container maxWidth="lg">
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>Free sound search app</Typography>
      </Box>

      <SearchBox isLoading={isLoading} />

      <SearchResults data={data} isLoading={isLoading} error={error} />
    </Container>
  );
};
