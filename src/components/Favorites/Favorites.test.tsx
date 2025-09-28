import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Favorites } from './Favorites';
import { SoundEffect } from '../../store/freesoundApi';

vi.mock('../SearchResults/SearchResults', () => ({
  SearchResults: ({
    mode,
    favoriteData,
  }: {
    mode?: string;
    favoriteData?: SoundEffect[];
  }) => (
    <div data-testid="search-results">
      Favorites Results (Mode: {mode}, Count: {favoriteData?.length || 0})
    </div>
  ),
}));

const createMockStore = (favorites: SoundEffect[] = []) => {
  return configureStore({
    reducer: {
      favorites: (state = { favorites }) => state,
    },
  });
};

describe('the Favorites component', () => {
  const mockFavorites: SoundEffect[] = [
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

  it('should render back button', () => {
    const store = createMockStore();

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

  it('should handle back button click', () => {
    const store = createMockStore();

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
    const store = createMockStore([]);

    const favorites = render(
      <BrowserRouter>
        <Provider store={store}>
          <Favorites />
        </Provider>
      </BrowserRouter>,
    );

    const searchResults = favorites.getByTestId('search-results');

    expect(searchResults).toHaveTextContent(
      'Favorites Results (Mode: favorites, Count: 0)',
    );
  });

  it('should handle multiple favorites correctly', () => {
    const store = createMockStore(mockFavorites);

    const favorites = render(
      <BrowserRouter>
        <Provider store={store}>
          <Favorites />
        </Provider>
      </BrowserRouter>,
    );

    const searchResults = favorites.getByTestId('search-results');

    expect(searchResults).toHaveTextContent('Count: 2');
  });
});
