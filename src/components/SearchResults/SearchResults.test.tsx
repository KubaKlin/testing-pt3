import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SearchResults } from './SearchResults';
import { SoundEffect, useSearchSoundsQuery } from '../../store/freesoundApi';
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

// Mock the API hook
vi.mock('../../store/freesoundApi', () => ({
  useSearchSoundsQuery: vi.fn(),
}));

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

    return () => render(
      <Provider store={store}>
        <SearchResults />
      </Provider>,
    );
  };

  it('should show loading state when isLoading is true', () => {
    vi.mocked(useSearchSoundsQuery).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    } as any);

    const renderComponent = renderWithStore(1);
    const searchResults = renderComponent();

    const loadingInfo = searchResults.getByTestId('loading-info');

    expect(loadingInfo).toBeDefined();
  });

  it('should show error message when error occurs', () => {
    vi.mocked(useSearchSoundsQuery).mockReturnValue({
      data: null,
      isLoading: false,
      error: "Test error",
      refetch: vi.fn(),
    } as any);

    const renderComponent = renderWithStore(1);
    const searchResults = renderComponent();

    const errorMessage = searchResults.getByText('Error loading sound effects');

    expect(errorMessage).toBeDefined();
  });

  it('should show no results message when data is empty', () => {
    const mockData = { count: 0, results: [] };
    vi.mocked(useSearchSoundsQuery).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    } as any);

    const renderComponent = renderWithStore(1);
    const searchResults = renderComponent();

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

    vi.mocked(useSearchSoundsQuery).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    } as any);

    const renderComponent = renderWithStore(1);
    const searchResults = renderComponent();

    const resultsTitle = searchResults.getByText('Found 2 sound effects');
    const soundCard1 = searchResults.getByText('Test Sound 1');
    const soundCard2 = searchResults.getByText('Test Sound 2');

    expect(resultsTitle).toBeDefined();
    expect(soundCard1).toBeDefined();
    expect(soundCard2).toBeDefined();
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

    vi.mocked(useSearchSoundsQuery).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    } as any);

    const renderComponent = renderWithStore(1);
    const searchResults = renderComponent();

    const pagination = searchResults.getByTestId('pagination');

    expect(pagination).toBeDefined();
  });

  it('should return null when no data is provided', () => {
    vi.mocked(useSearchSoundsQuery).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    } as any);

    const renderComponent = renderWithStore(1);
    const searchResults = renderComponent();

    expect(searchResults.container.firstChild).toBeNull();
  });
});
