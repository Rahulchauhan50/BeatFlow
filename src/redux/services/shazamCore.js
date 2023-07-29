import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// const KeyArray = JSON.parse(process.env.REACT_APP_SPOTIFY_API.replace(/'/g, '"'))
// const BaseUrl1 = process.env.REACT_APP_SHAZAM_URL
// const BaseUrl2 = process.env.REACT_APP_SHAZAM_URL1

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', "30d0cc0ea5msh71416a73da8a666p1d918ejsn8cf27734f5a7");

      return headers;
    },
  }), 
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'charts/track' }),
    getSongsByCountry: builder.query({ query: () => `/charts/track?listId=ip-country-chart-IN&pageSize=20&startFrom=0` }),
    getArtistDetails: builder.query({ query: (artistId) => `artists/get-summary?id=${artistId}&l=en-US` }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `search?term=${searchTerm}` }),
    getSongDetails: builder.query({ query: (songid) => `https://shazam-core7.p.rapidapi.com/songs/get_details?id=${songid}`}),
    getSongRelated: builder.query({ query: (id ) => `artists/get-top-songs?id=${id}&l=en-US`}),

  }),
});


export const {
  useGetTopChartsQuery,
  useGetSongsByCountryQuery,
  useGetArtistDetailsQuery,
  useGetSongsBySearchQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;
