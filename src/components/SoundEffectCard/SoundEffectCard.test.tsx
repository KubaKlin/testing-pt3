import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SoundEffectCard } from './SoundEffectCard';
import { SoundEffect } from '../../store/freesoundApi';
import favoritesReducer from '../../store/favoritesSlice';

// Mock store for testing
const createMockStore = (favorites: SoundEffect[] = []) => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState: {
      favorites: { favorites },
    },
  });
};

// Mock HTMLAudioElement for native audio element
Object.defineProperty(HTMLAudioElement.prototype, 'play', {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(HTMLAudioElement.prototype, 'pause', {
  writable: true,
  value: vi.fn(),
});

describe('the SoundEffectCard component', () => {
  const createMockSoundEffect = (): SoundEffect => ({
    id: 1,
    name: 'Test Sound',
    previews: {
      'preview-hq-mp3': 'url1',
      'preview-hq-ogg': 'url2',
      'preview-lq-mp3': 'url3',
      'preview-lq-ogg': 'url4',
    },
  });

  it('should display sound effect name', () => {
    const mockSoundEffect = createMockSoundEffect();
    const store = createMockStore();

    const soundCard = render(
      <Provider store={store}>
        <SoundEffectCard soundEffect={mockSoundEffect} />
      </Provider>,
    );

    const soundName = soundCard.getByText('Test Sound');

    expect(soundName).toBeDefined();
  });

  it('should show audio element with controls', () => {
    const mockSoundEffect = createMockSoundEffect();
    const store = createMockStore();

    const soundCard = render(
      <Provider store={store}>
        <SoundEffectCard soundEffect={mockSoundEffect} />
      </Provider>,
    );

    const audioElement = soundCard.getByLabelText('Test Sound');

    expect(audioElement).toBeDefined();
    expect(audioElement.tagName).toBe('AUDIO');
    expect(audioElement).toHaveAttribute('controls');
    expect(audioElement).toHaveAttribute('preload', 'none');
  });

  it('should show `add to favorite` icon when not favorited', () => {
    const mockSoundEffect = createMockSoundEffect();
    const store = createMockStore();

    const soundCard = render(
      <Provider store={store}>
        <SoundEffectCard soundEffect={mockSoundEffect} />
      </Provider>,
    );

    const favoriteButton = soundCard.getByLabelText('Add to favorites');

    expect(favoriteButton).toBeDefined();
  });

  it('should show `remove from favorites` icon when favorited', () => {
    const mockSoundEffect = createMockSoundEffect();
    const store = createMockStore([mockSoundEffect]);

    const soundCard = render(
      <Provider store={store}>
        <SoundEffectCard soundEffect={mockSoundEffect} />
      </Provider>,
    );

    const favoriteButton = soundCard.getByLabelText('Remove from favorites');

    expect(favoriteButton).toBeDefined();
  });

  it('should have audio source with correct URL', () => {
    const mockSoundEffect = createMockSoundEffect();
    const store = createMockStore();

    const soundCard = render(
      <Provider store={store}>
        <SoundEffectCard soundEffect={mockSoundEffect} />
      </Provider>,
    );

    const audioElement = soundCard.getByLabelText('Test Sound');
    const sourceElement = audioElement.querySelector('source');

    expect(sourceElement).toBeDefined();
    expect(sourceElement).toHaveAttribute('src', 'url3');
    expect(sourceElement).toHaveAttribute('type', 'audio/mpeg');
  });

  it('should add sound effect to favorites when favorite button is clicked', () => {
    const mockSoundEffect = createMockSoundEffect();
    const store = createMockStore();

    const soundCard = render(
      <Provider store={store}>
        <SoundEffectCard soundEffect={mockSoundEffect} />
      </Provider>,
    );

    const favoriteButton = soundCard.getByLabelText('Add to favorites');
    fireEvent.click(favoriteButton);

    // Verify the sound effect was added to favorites
    const state = store.getState();
    expect(state.favorites.favorites).toHaveLength(1);
  });

  it('should remove sound effect from favorites when favorite button is clicked on favorited item', () => {
    const mockSoundEffect = createMockSoundEffect();
    const store = createMockStore([mockSoundEffect]);

    const soundCard = render(
      <Provider store={store}>
        <SoundEffectCard soundEffect={mockSoundEffect} />
      </Provider>,
    );

    const favoriteButton = soundCard.getByLabelText('Remove from favorites');
    fireEvent.click(favoriteButton);

    const state = store.getState();
    expect(state.favorites.favorites).toHaveLength(0);
  });
});
