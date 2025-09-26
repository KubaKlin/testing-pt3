import { Middleware } from '@reduxjs/toolkit';
import { addFavorite, removeFavorite } from './favoritesSlice';

const FAVORITES_STORAGE_KEY = 'soundEffectFavorites';

export const favoritesMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    if (addFavorite.match(action) || removeFavorite.match(action)) {
      const state = store.getState();
      try {
        localStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(state.favorites.favorites),
        );
      } catch (error) {
        console.error('Failed to save favorites to localStorage:', error);
      }
    }

    return result;
  };

export const loadFavoritesFromStorage = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load favorites from localStorage:', error);
    return [];
  }
};
