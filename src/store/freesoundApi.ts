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

const FREESOUND_API_KEY = 'M80wfthcPGELZtZRI0vUKoU8aVEtwAum5raYonBg';

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
    searchSounds: builder.query<FreesoundSearchResponse, string>({
      query: (searchQuery) => ({
        url: 'search/text/',
        params: {
          query: searchQuery,
          fields: 'id,name,previews',
        },
      }),
    }),
  }),
});

export const { useSearchSoundsQuery } = freesoundApi;
