import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { SoundSearch } from './SoundSearch';

// Mock the API hook
vi.mock('../../store/freesoundApi', () => ({
  useSearchSoundsQuery: vi.fn(() => ({
    data: null,
    isFetching: false,
    error: null,
  })),
}));

// Mock store for testing
const createMockStore = (
  searchState: { query: string; currentPage: number } = {
    query: '',
    currentPage: 1,
  },
  favoritesState: { favorites: unknown[] } = { favorites: [] },
) => {
  return configureStore({
    reducer: {
      search: (state = searchState) => state,
      favorites: (state = favoritesState) => state,
    },
  });
};

describe('The SoundSearch component', () => {
  it('should render main title', () => {
    const store = createMockStore();

    const soundSearch = render(
      <BrowserRouter>
        <Provider store={store}>
          <SoundSearch />
        </Provider>
      </BrowserRouter>,
    );

    const title = soundSearch.getByText('Free sound search app');

    expect(title).toBeDefined();
  });

  it('should show favorites button when favorites exist', () => {
    const store = createMockStore(
      { query: '', currentPage: 1 },
      {
        favorites: [
          {
            id: 1,
            name: 'Test',
            previews: {
              'preview-hq-mp3': 'url',
              'preview-hq-ogg': 'url',
              'preview-lq-mp3': 'url',
              'preview-lq-ogg': 'url',
            },
          },
        ],
      },
    );

    const soundSearch = render(
      <BrowserRouter>
        <Provider store={store}>
          <SoundSearch />
        </Provider>
      </BrowserRouter>,
    );

    const favoritesButton = soundSearch.getByText('Favorites (1)');

    expect(favoritesButton).toBeDefined();
  });

  it('should not show favorites button when no favorites exist', () => {
    const store = createMockStore();

    const soundSearch = render(
      <BrowserRouter>
        <Provider store={store}>
          <SoundSearch />
        </Provider>
      </BrowserRouter>,
    );

    const favoritesButton = soundSearch.queryByText(/Favorites/);

    expect(favoritesButton).toBeNull();
  });
});
