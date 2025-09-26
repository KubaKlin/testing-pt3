import { SoundEffect } from './freesoundApi';

export interface SearchState {
  query: string;
  currentPage: number;
}

export interface FavoritesState {
  favorites: SoundEffect[];
}

export interface RootState {
  search: SearchState;
  favorites: FavoritesState;
  freesoundApi: any;
}
