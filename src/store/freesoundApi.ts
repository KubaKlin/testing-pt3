import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface SoundEffect {
  id: number;
  name: string;
  previews: {
    'preview-hq-mp3': string;
    'preview-hq-ogg': string;
    'preview-lq-mp3': string;
    'preview-lq-ogg': string;
  };
}

export interface FreesoundSearchResponse {
  count: number;
  results: SoundEffect[];
}

interface SearchParams {
  query: string;
  page: number;
}

const FREESOUND_API_KEY = import.meta.env.VITE_FREESOUND_API_KEY;

if (!FREESOUND_API_KEY) {
  throw new Error('environment variable is required');
}

export const freesoundApi = createApi({
  reducerPath: 'freesoundApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://freesound.org/apiv2/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Token ${FREESOUND_API_KEY}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchSounds: builder.query<FreesoundSearchResponse, SearchParams>({
      query: ({ query, page }) => ({
        url: 'search/text/',
        params: {
          query,
          fields: 'id,name,previews',
          page,
          page_size: 15,
        },
      }),
    }),
  }),
});

export const { useSearchSoundsQuery } = freesoundApi;
