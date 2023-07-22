import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const KeyArray = JSON.parse(process.env.REACT_APP_SPOTIFY_API.replace(/'/g, '"'))
export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', KeyArray[Math.floor(Math.random() * 11)] );

      return headers;
    },
  }), 
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'charts/track' }),
    getSongsByCountry: builder.query({ query: () => `/charts/track?listId=ip-country-chart-IN&pageSize=20&startFrom=0` }),
    getArtistDetails: builder.query({ query: (artistId) => `artists/get-summary?id=${artistId}&l=en-US` }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `search?term=${searchTerm}` }),
    getSongDetails: builder.query({ query: (songid) => `https://shazam-core7.p.rapidapi.com/songs/get_details?id=${songid}` }),
    getSongRelated: builder.query({ query: (id ) => `artists/get-top-songs?id=${id}&l=en-US`}),

  }),
});
console.log()
export const {
  useGetTopChartsQuery,
  useGetSongsByCountryQuery,
  useGetArtistDetailsQuery,
  useGetSongsBySearchQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;