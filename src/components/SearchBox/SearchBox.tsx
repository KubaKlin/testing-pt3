import { useState } from 'react';
import type { FormEvent } from 'react';

import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, clearSearch } from '../../store/searchSlice';
import { StyledSearchForm, StyledSearchButton } from './SearchBox.styles';
import { useSearchSoundsQuery } from '../../store/freesoundApi';
import { RootState } from '../../store/store';

export const SearchBox = () => {
  const { query: searchQuery } = useSelector((state: RootState) => state.search);
  const { isFetching } = useSearchSoundsQuery(
    { query: searchQuery, page: 1 },
    { skip: !searchQuery }
  );
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (localSearchQuery.trim()) {
      dispatch(setSearchQuery(localSearchQuery.trim()));
    }
  };

  const handleClear = () => {
    setLocalSearchQuery('');
    dispatch(clearSearch());
  };


  return (
    <StyledSearchForm onSubmit={handleSubmit}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for sound effects (e.g., dogs, rain, music)..."
        value={localSearchQuery}
        onChange={(event) => setLocalSearchQuery(event.target.value)}
        disabled={isFetching}
        aria-label="Search for sound effects"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: localSearchQuery && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClear}
                  onKeyDown={(e) => e.key === 'Enter' && handleClear()}
                  aria-label="Clear search"
                  tabIndex={0}
                  size="small"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <StyledSearchButton
        type="submit"
        variant="contained"
        disabled={!localSearchQuery.trim() || isFetching}
        aria-label="Search"
        tabIndex={0}
      >
        {isFetching ? 'Searching...' : 'Search'}
      </StyledSearchButton>
    </StyledSearchForm>
  );
};
