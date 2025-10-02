import { ChangeEvent } from 'react';
import { Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useSearchSoundsQuery } from '../../store/freesoundApi';
import { RootState } from '../../store/store';
import { setCurrentPage } from '../../store/searchSlice';
import { SoundEffectCard } from '../SoundEffectCard/SoundEffectCard';
import { LoadingInfo } from '../LoadingInfo/LoadingInfo';
import { PaginationWrapper } from '../PaginationWrapper/PaginationWrapper';
import { StyledErrorAlert, StyledInfoAlert } from './SearchResults.styles';


export const SearchResults = () => {
  const dispatch = useDispatch();
  const { query: searchQuery, currentPage } = useSelector(
    (state: RootState) => state.search,
  );

  const { data, isFetching, error } = useSearchSoundsQuery(
    { query: searchQuery, page: currentPage },
    {
      skip: !searchQuery,
    },
  );

  const RESULTS_PER_PAGE = 15;
  const totalPages = Math.ceil((data?.count || 0) / RESULTS_PER_PAGE);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isFetching) {
    return <LoadingInfo />;
  }

  if (error) {
    return (
      <StyledErrorAlert severity="error">
        Error loading sound effects
      </StyledErrorAlert>
    );
  }


  if (data && data.results.length === 0) {
    return (
      <StyledInfoAlert severity="info">
        No sound effects found. Try different search terms.
      </StyledInfoAlert>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Found {data.count} sound effects
      </Typography>
      <Box>
        {data.results.map((soundEffect) => (
          <div key={soundEffect.id}>
            <SoundEffectCard soundEffect={soundEffect} />
          </div>
        ))}
      </Box>

      {totalPages > 1 && (
        <PaginationWrapper
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </Box>
  );
};
