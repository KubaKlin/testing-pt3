import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { PaginationWrapper } from './PaginationWrapper';
import searchReducer from '../../store/searchSlice';

describe('the PaginationWrapper component', () => {
  const mockHandlePageChange = vi.fn();

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

  it('should display current page and total pages', () => {
    const pagination = renderWithStore(3);

    const pageInfo = pagination.getByText('Page 3 / 10');

    expect(pageInfo).toBeDefined();
  });

  it('should handle page change when pagination is clicked', () => {
    const pagination = renderWithStore(1);

    const nextButton = pagination.getByLabelText('Go to next page');
    fireEvent.click(nextButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(expect.any(Object), 2);
  });

  it('should handle first page button click', () => {
    const pagination = renderWithStore(3);

    const firstButton = pagination.getByLabelText('Go to first page');
    fireEvent.click(firstButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(expect.any(Object), 1);
  });

  it('should handle last page button click', () => {
    const pagination = renderWithStore(2);

    const lastButton = pagination.getByLabelText('Go to last page');
    fireEvent.click(lastButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(expect.any(Object), 10);
  });

  it('should handle previous page button click', () => {
    const pagination = renderWithStore(3);

    const prevButton = pagination.getByLabelText('Go to previous page');
    fireEvent.click(prevButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(expect.any(Object), 2);
  });
});
