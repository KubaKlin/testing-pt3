import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SearchResults } from './SearchResults';
import { SoundEffect, FreesoundSearchResponse } from '../../store/freesoundApi';
import searchReducer from '../../store/searchSlice';

// Mock the child components
vi.mock('../SoundEffectCard/SoundEffectCard', () => ({
  SoundEffectCard: ({ soundEffect }: { soundEffect: SoundEffect }) => (
    <div data-testid="sound-effect-card">{soundEffect.name}</div>
  ),
}));

vi.mock('../LoadingInfo/LoadingInfo', () => ({
  LoadingInfo: () => <div data-testid="loading-info">Loading...</div>,
}));

vi.mock('../PaginationWrapper/PaginationWrapper', () => ({
  PaginationWrapper: ({
    totalPages,
  }: {
    totalPages: number;
  }) => (
    <div data-testid="pagination">
      Page 1 of {totalPages}
    </div>
  ),
}));

interface SearchResultsTestProps {
  data?: FreesoundSearchResponse;
  favoriteData?: SoundEffect[];
  isLoading: boolean;
  error?: unknown;
  totalCount: number;
  onPageChange: (page: number) => void;
  mode?: 'search' | 'favorites';
}

describe('the SearchResults component', () => {
  const renderWithStore = (currentPage: number = 1) => {
    const store = configureStore({
      reducer: {
        search: searchReducer,
      },
      preloadedState: {
        search: {
          query: 'test',
          currentPage,
        },
      },
    });

    return (props: SearchResultsTestProps) => render(
      <Provider store={store}>
        <SearchResults {...props} />
      </Provider>,
    );
  };

  it('should show loading state when isLoading is true', () => {
    const renderComponent = renderWithStore(1);
    const searchResults = renderComponent({
      isLoading: true,
      totalCount: 0,
      onPageChange: vi.fn(),
    });

    const loadingInfo = searchResults.getByTestId('loading-info');

    expect(loadingInfo).toBeDefined();
  });

  it('should show error message when error occurs', () => {
    const renderComponent = renderWithStore(1);
    const searchResults = renderComponent({
      isLoading: false,
      error: "Test error",
      totalCount: 0,
      onPageChange: vi.fn(),
    });

    const errorMessage = searchResults.getByText('Error loading sound effects');

    expect(errorMessage).toBeDefined();
  });

  it('should show no results message when data is empty', () => {
    const mockData = { count: 0, results: [] };
    const renderComponent = renderWithStore(1);
    const searchResults = renderComponent({
      data: mockData,
      isLoading: false,
      totalCount: 0,
      onPageChange: vi.fn(),
    });

    const noResultsMessage = searchResults.getByText(
      'No sound effects found. Try different search terms.',
    );

    expect(noResultsMessage).toBeDefined();
  });

  it('should display search results when data is provided', () => {
    const mockData = {
      count: 2,
      results: [
        {
          id: 1,
          name: 'Test Sound 1',
          previews: {
            'preview-hq-mp3': 'url1',
            'preview-hq-ogg': 'url1',
            'preview-lq-mp3': 'url1',
            'preview-lq-ogg': 'url1',
          },
        },
        {
          id: 2,
          name: 'Test Sound 2',
          previews: {
            'preview-hq-mp3': 'url2',
            'preview-hq-ogg': 'url2',
            'preview-lq-mp3': 'url2',
            'preview-lq-ogg': 'url2',
          },
        },
      ],
    };

    const renderComponent = renderWithStore(1);
    const searchResults = renderComponent({
      data: mockData,
      isLoading: false,
      totalCount: 2,
      onPageChange: vi.fn(),
    });

    const resultsTitle = searchResults.getByText('Found 2 sound effects');
    const soundCard1 = searchResults.getByText('Test Sound 1');
    const soundCard2 = searchResults.getByText('Test Sound 2');

    expect(resultsTitle).toBeDefined();
    expect(soundCard1).toBeDefined();
    expect(soundCard2).toBeDefined();
  });

  it('should show favorites when mode is favorites', () => {
    const mockFavorites = [
      {
        id: 1,
        name: 'Favorite Sound 1',
        previews: {
          'preview-hq-mp3': 'url1',
          'preview-hq-ogg': 'url1',
          'preview-lq-mp3': 'url1',
          'preview-lq-ogg': 'url1',
        },
      },
      {
        id: 2,
        name: 'Favorite Sound 2',
        previews: {
          'preview-hq-mp3': 'url2',
          'preview-hq-ogg': 'url2',
          'preview-lq-mp3': 'url2',
          'preview-lq-ogg': 'url2',
        },
      },
    ];

    const renderComponent = renderWithStore(1);
    const searchResults = renderComponent({
      favoriteData: mockFavorites,
      isLoading: false,
      totalCount: 2,
      onPageChange: vi.fn(),
      mode: "favorites",
    });

    const favoritesTitle = searchResults.getByText(
      'Your Favorites (2 sound effects)',
    );
    const favoriteCard1 = searchResults.getByText('Favorite Sound 1');
    const favoriteCard2 = searchResults.getByText('Favorite Sound 2');

    expect(favoritesTitle).toBeDefined();
    expect(favoriteCard1).toBeDefined();
    expect(favoriteCard2).toBeDefined();
  });

  it('should show pagination when totalPages is greater than 1', () => {
    const mockData = {
      count: 30,
      results: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: `Sound ${i + 1}`,
        previews: {
          'preview-hq-mp3': `url${i + 1}`,
          'preview-hq-ogg': `url${i + 1}`,
          'preview-lq-mp3': `url${i + 1}`,
          'preview-lq-ogg': `url${i + 1}`,
        },
      })),
    };

    const renderComponent = renderWithStore(1);
    const searchResults = renderComponent({
      data: mockData,
      isLoading: false,
      totalCount: 30,
      onPageChange: vi.fn(),
    });

    const pagination = searchResults.getByTestId('pagination');

    expect(pagination).toBeDefined();
  });

  it('should return null when no data is provided', () => {
    const renderComponent = renderWithStore(1);
    const searchResults = renderComponent({
      isLoading: false,
      totalCount: 0,
      onPageChange: vi.fn(),
    });

    expect(searchResults.container.firstChild).toBeNull();
  });
});
