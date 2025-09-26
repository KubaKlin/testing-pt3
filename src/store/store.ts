import { configureStore } from '@reduxjs/toolkit';
import { freesoundApi } from './freesoundApi';
import searchReducer from './searchSlice';
import favoritesReducer from './favoritesSlice';
import {
  favoritesMiddleware,
  loadFavoritesFromStorage,
} from './favoritesMiddleware';

// Load favorites from localStorage on store initialization
const preloadedState = {
  favorites: {
    favorites: loadFavoritesFromStorage(),
  },
};

export const store = configureStore({
  reducer: {
    search: searchReducer,
    favorites: favoritesReducer,
    [freesoundApi.reducerPath]: freesoundApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(freesoundApi.middleware)
      .concat(favoritesMiddleware),
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
