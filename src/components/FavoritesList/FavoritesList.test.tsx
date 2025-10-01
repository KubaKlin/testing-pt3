import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { FavoritesList } from './FavoritesList';
import { SoundEffect } from '../../store/freesoundApi';

const createMockStore = () => {
  return configureStore({
    reducer: {
      search: () => ({ query: '', currentPage: 1 }),
      favorites: () => ({ favorites: [] }),
    },
  });
};

const mockSoundEffect: SoundEffect = {
  id: 1,
  name: 'Favorite 1',
  previews: {
    'preview-hq-mp3': 'url1',
    'preview-hq-ogg': 'url1',
    'preview-lq-mp3': 'url1',
    'preview-lq-ogg': 'url1',
  },
}

describe('FavoritesList', () => {
  it('renders favorites list with correct count', () => {
    const store = createMockStore();
    const favorites = [mockSoundEffect];

    render(
      <Provider store={store}>
        <FavoritesList favoriteData={favorites} />
      </Provider>
    );

    expect(screen.getByText('Your Favorites (1 sound effects)')).toBeInTheDocument();
  });

  it('renders empty favorites list', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <FavoritesList favoriteData={[]} />
      </Provider>
    );

    expect(screen.getByText('Your Favorites (0 sound effects)')).toBeInTheDocument();
  });

  it('renders multiple favorites', () => {
    const store = createMockStore();
    const favorites = [mockSoundEffect, { ...mockSoundEffect, id: 2, name: 'Test Sound 2' }];

    render(
      <Provider store={store}>
        <FavoritesList favoriteData={favorites} />
      </Provider>
    );

    expect(screen.getByText('Your Favorites (2 sound effects)')).toBeInTheDocument();
  });
});
