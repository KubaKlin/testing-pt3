import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Favorites } from './Favorites';
import { SoundEffect } from '../../store/freesoundApi';

const createMockStore = (favorites: SoundEffect[] = []) => {
  return configureStore({
    reducer: {
      favorites: (state = { favorites }) => state,
    },
  });
};

describe('The Favorites component', () => {
  let mockFavorites: SoundEffect[];
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    mockFavorites = [
      {
        id: 1,
        name: 'Favorite 1',
        previews: {
          'preview-hq-mp3': 'url1',
          'preview-hq-ogg': 'url1',
          'preview-lq-mp3': 'url1',
          'preview-lq-ogg': 'url1',
        },
      },
      {
        id: 2,
        name: 'Favorite 2',
        previews: {
          'preview-hq-mp3': 'url2',
          'preview-hq-ogg': 'url2',
          'preview-lq-mp3': 'url2',
          'preview-lq-ogg': 'url2',
        },
      },
    ];
    store = createMockStore(mockFavorites);
  });

  it('should render a back button', () => {
    store = createMockStore([]);
    const favorites = render(
      <BrowserRouter>
        <Provider store={store}>
          <Favorites />
        </Provider>
      </BrowserRouter>,
    );

    const backButton = favorites.getByText('Back to Search');
    expect(backButton).toBeDefined();
  });

  it('should handle the back button click', () => {
    store = createMockStore([]);
    const favorites = render(
      <BrowserRouter>
        <Provider store={store}>
          <Favorites />
        </Provider>
      </BrowserRouter>,
    );

    const backButton = favorites.getByText('Back to Search');
    fireEvent.click(backButton);
    expect(backButton).toBeDefined();
  });

  it('should display empty favorites when no favorites exist', () => {
    store = createMockStore([]);
    const favorites = render(
      <BrowserRouter>
        <Provider store={store}>
          <Favorites />
        </Provider>
      </BrowserRouter>,
    );

    const favoritesTitle = favorites.getByText('Your Favorites (0 sound effects)');
    expect(favoritesTitle).toBeInTheDocument();
  });

  it('should show the correct number of favorites', () => {
    const favorites = render(
      <BrowserRouter>
        <Provider store={store}>
          <Favorites />
        </Provider>
      </BrowserRouter>,
    );

    const favoritesTitle = favorites.getByText('Your Favorites (2 sound effects)');
    const favoriteCard1 = favorites.getByText('Favorite 1');
    const favoriteCard2 = favorites.getByText('Favorite 2');

    expect(favoritesTitle).toBeInTheDocument();
    expect(favoriteCard1).toBeInTheDocument();
    expect(favoriteCard2).toBeInTheDocument();
  });
});
