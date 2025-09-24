import { configureStore } from '@reduxjs/toolkit';
import { freesoundApi } from './freesoundApi';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [freesoundApi.reducerPath]: freesoundApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(freesoundApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
