import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { PaginationWrapper } from './PaginationWrapper';
import searchReducer from '../../store/searchSlice';

describe('The PaginationWrapper component', () => {
  let mockHandlePageChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockHandlePageChange = vi.fn();
  });

  const renderWithStore = (currentPage: number) => {
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

    return render(
      <Provider store={store}>
        <PaginationWrapper
          totalPages={10}
          handlePageChange={mockHandlePageChange}
        />
      </Provider>,
    );
  };

  it('should display the current page and the number of total pages', () => {
    const pagination = renderWithStore(3);

    const pageInfo = pagination.getByText('Page 3 / 10');

    expect(pageInfo).toBeDefined();
  });

  it('should handle the page change when pagination is clicked', () => {
    const pagination = renderWithStore(1);

    const nextButton = pagination.getByLabelText('Go to next page');
    fireEvent.click(nextButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(expect.any(Object), 2);
  });

  it('should handle the `first page` button click and redirect to the first page', () => {
    const pagination = renderWithStore(3);

    const firstButton = pagination.getByLabelText('Go to first page');
    fireEvent.click(firstButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(expect.any(Object), 1);
  });

  it('should handle the `last page` button click and redirect to the last age', () => {
    const pagination = renderWithStore(2);

    const lastButton = pagination.getByLabelText('Go to last page');
    fireEvent.click(lastButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(expect.any(Object), 10);
  });

  it('should handle the `previous page` button click and redirect to the previous page', () => {
    const pagination = renderWithStore(3);

    const prevButton = pagination.getByLabelText('Go to previous page');
    fireEvent.click(prevButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(expect.any(Object), 2);
  });
});
