import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SearchBox } from './SearchBox';

const createMockStore = () => {
  return configureStore({
    reducer: {
      search: (state = { query: '', currentPage: 1 }) => state,
    },
  });
};

const store = createMockStore();

describe('the SearchBox component', () => {
  it('should render search input field', () => {
    const searchBox = render(
      <Provider store={store}>
        <SearchBox />
      </Provider>,
    );

    const input = searchBox.getByLabelText('Search for sound effects');

    expect(input).toBeDefined();
  });

  it('should display placeholder text', () => {
    const searchBox = render(
      <Provider store={store}>
        <SearchBox />
      </Provider>,
    );

    const input = searchBox.getByPlaceholderText(
      'Search for sound effects (e.g., dogs, rain, music)...',
    );

    expect(input).toBeDefined();
  });

  it('should render search button', () => {
    const searchBox = render(
      <Provider store={store}>
        <SearchBox />
      </Provider>,
    );

    const button = searchBox.getByLabelText('Search');

    expect(button).toBeDefined();
  });

  it('should update input value when typing', () => {
    const searchBox = render(
      <Provider store={store}>
        <SearchBox />
      </Provider>,
    );

    const input = searchBox.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test query' } });

    expect(input.value).toBe('test query');
  });

  it('should show clear button when input has value', () => {
    const searchBox = render(
      <Provider store={store}>
        <SearchBox />
      </Provider>,
    );

    const input = searchBox.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test query' } });

    const clearButton = searchBox.getByLabelText('Clear search');

    expect(clearButton).toBeDefined();
  });

  it('should clear input when clear button is clicked', () => {
    const searchBox = render(
      <Provider store={store}>
        <SearchBox />
      </Provider>,
    );

    const input = searchBox.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input.value).toBe('test query');

    const clearButton = searchBox.getByLabelText('Clear search');
    fireEvent.click(clearButton);

    expect(input.value).toBe('');
  });

  it('should disable search button when input is empty', () => {
    const searchBox = render(
      <Provider store={store}>
        <SearchBox />
      </Provider>,
    );

    const button = searchBox.getByLabelText('Search');

    expect(button).toBeDisabled();
  });

  it('should enable search button when input has value', () => {
    const searchBox = render(
      <Provider store={store}>
        <SearchBox />
      </Provider>,
    );

    const input = searchBox.getByRole('textbox');
    const button = searchBox.getByLabelText('Search');

    fireEvent.change(input, { target: { value: 'test query' } });

    expect(button).not.toBeDisabled();
  });
});
