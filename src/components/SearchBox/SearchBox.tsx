import { useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';

import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { setSearchQuery, clearSearch } from '../../store/searchSlice';
import { StyledSearchForm, StyledSearchButton } from './SearchBox.styles';

interface SearchBoxProps {
  isLoading?: boolean;
}

export const SearchBox = ({ isLoading = false }: SearchBoxProps) => {
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

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (localSearchQuery.trim()) {
        dispatch(setSearchQuery(localSearchQuery.trim()));
      }
    }
  };

  return (
    <StyledSearchForm onSubmit={handleSubmit}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for sound effects (e.g., dogs, rain, music)..."
        value={localSearchQuery}
        onChange={(event) => setLocalSearchQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        aria-label="Search for sound effects"
        InputProps={{
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
        }}
      />
      <StyledSearchButton
        type="submit"
        variant="contained"
        disabled={!localSearchQuery.trim() || isLoading}
        aria-label="Search"
        tabIndex={0}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </StyledSearchButton>
    </StyledSearchForm>
  );
};
