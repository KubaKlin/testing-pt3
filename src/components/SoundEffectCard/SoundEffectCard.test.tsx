import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SoundEffectCard } from './SoundEffectCard';
import { SoundEffect } from '../../store/freesoundApi';

// Mock store for testing
const createMockStore = (favorites: SoundEffect[] = []) => {
  return configureStore({
    reducer: {
      favorites: (state = { favorites }) => state,
    },
  });
};

// Mock the Redux actions
vi.mock('../../store/favoritesSlice', () => ({
  addFavorite: vi.fn(() => ({ type: 'favorites/addFavorite' })),
  removeFavorite: vi.fn(() => ({ type: 'favorites/removeFavorite' })),
}));

// Mock HTMLAudioElement
Object.defineProperty(window, 'Audio', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    play: vi.fn(),
    pause: vi.fn(),
    addEventListener: vi.fn(),
  })),
});

describe('the SoundEffectCard component', () => {
  const mockSoundEffect: SoundEffect = {
    id: 1,
    name: 'Test Sound',
    previews: {
      'preview-hq-mp3': 'url1',
      'preview-hq-ogg': 'url2',
      'preview-lq-mp3': 'url3',
      'preview-lq-ogg': 'url4',
    },
  };

  it('should display sound effect name', () => {
    const store = createMockStore();

    const soundCard = render(
      <Provider store={store}>
        <SoundEffectCard soundEffect={mockSoundEffect} />
      </Provider>,
    );

    const soundName = soundCard.getByText('Test Sound');

    expect(soundName).toBeDefined();
  });

  it('should show play button when not playing', () => {
    const store = createMockStore();

    const soundCard = render(
      <Provider store={store}>
        <SoundEffectCard soundEffect={mockSoundEffect} />
      </Provider>,
    );

    const playButton = soundCard.getByLabelText('Play sound');

    expect(playButton).toBeDefined();
  });

  it('should show favorite border icon when not favorited', () => {
    const store = createMockStore();

    const soundCard = render(
      <Provider store={store}>
        <SoundEffectCard soundEffect={mockSoundEffect} />
      </Provider>,
    );

    const favoriteButton = soundCard.getByLabelText('Add to favorites');

    expect(favoriteButton).toBeDefined();
  });

  it('should show favorite icon when favorited', () => {
    const store = createMockStore([mockSoundEffect]);

    const soundCard = render(
      <Provider store={store}>
        <SoundEffectCard soundEffect={mockSoundEffect} />
      </Provider>,
    );

    const favoriteButton = soundCard.getByLabelText('Remove from favorites');

    expect(favoriteButton).toBeDefined();
  });

  it('should handle play button click', () => {
    const store = createMockStore();

    const soundCard = render(
      <Provider store={store}>
        <SoundEffectCard soundEffect={mockSoundEffect} />
      </Provider>,
    );

    const playButton = soundCard.getByLabelText('Play sound');
    fireEvent.click(playButton);

    // After clicking, it should show pause button
    const pauseButton = soundCard.getByLabelText('Pause sound');

    expect(pauseButton).toBeDefined();
  });

  it('should handle favorite button click', () => {
    const store = createMockStore();

    const soundCard = render(
      <Provider store={store}>
        <SoundEffectCard soundEffect={mockSoundEffect} />
      </Provider>,
    );

    const favoriteButton = soundCard.getByLabelText('Add to favorites');
    fireEvent.click(favoriteButton);

    expect(favoriteButton).toBeDefined();
  });
});
