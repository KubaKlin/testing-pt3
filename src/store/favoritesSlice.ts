import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SoundEffect } from './freesoundApi';

interface FavoritesState {
  favorites: SoundEffect[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<SoundEffect>) => {
      const exists = state.favorites.find(
        (favorite) => favorite.id === action.payload.id,
      );
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.id !== action.payload,
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
