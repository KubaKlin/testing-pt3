import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { PaginationWrapper } from './PaginationWrapper';

describe('the PaginationWrapper component', () => {
  it('should display current page and total pages', () => {
    const mockHandlePageChange = vi.fn();

    const pagination = render(
      <PaginationWrapper
        totalPages={10}
        currentPage={3}
        handlePageChange={mockHandlePageChange}
      />,
    );

    const pageInfo = pagination.getByText('Page 3 / 10');

    expect(pageInfo).toBeDefined();
  });

  it('should handle page change when pagination is clicked', () => {
    const mockHandlePageChange = vi.fn();

    const pagination = render(
      <PaginationWrapper
        totalPages={5}
        currentPage={1}
        handlePageChange={mockHandlePageChange}
      />,
    );

    const nextButton = pagination.getByLabelText('Go to next page');
    fireEvent.click(nextButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(expect.any(Object), 2);
  });

  it('should handle first page button click', () => {
    const mockHandlePageChange = vi.fn();

    const pagination = render(
      <PaginationWrapper
        totalPages={5}
        currentPage={3}
        handlePageChange={mockHandlePageChange}
      />,
    );

    const firstButton = pagination.getByLabelText('Go to first page');
    fireEvent.click(firstButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(expect.any(Object), 1);
  });

  it('should handle last page button click', () => {
    const mockHandlePageChange = vi.fn();

    const pagination = render(
      <PaginationWrapper
        totalPages={5}
        currentPage={2}
        handlePageChange={mockHandlePageChange}
      />,
    );

    const lastButton = pagination.getByLabelText('Go to last page');
    fireEvent.click(lastButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(expect.any(Object), 5);
  });

  it('should handle previous page button click', () => {
    const mockHandlePageChange = vi.fn();

    const pagination = render(
      <PaginationWrapper
        totalPages={5}
        currentPage={3}
        handlePageChange={mockHandlePageChange}
      />,
    );

    const prevButton = pagination.getByLabelText('Go to previous page');
    fireEvent.click(prevButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(expect.any(Object), 2);
  });
});
