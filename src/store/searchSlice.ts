import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  currentPage: number;
}

const initialState: SearchState = {
  query: '',
  currentPage: 1,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.currentPage = 1; // Reset to first page when new search
    },
    clearSearch: (state) => {
      state.query = '';
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setSearchQuery, clearSearch, setCurrentPage } =
  searchSlice.actions;
export default searchSlice.reducer;
