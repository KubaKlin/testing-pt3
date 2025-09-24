import { useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';

import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { setSearchQuery, clearSearch } from '../../store/searchSlice';

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
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
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
      <Button
        type="submit"
        variant="contained"
        disabled={!localSearchQuery.trim() || isLoading}
        aria-label="Search"
        tabIndex={0}
        sx={{ mt: 2, height: 56 }}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </Button>
    </Box>
  );
};
