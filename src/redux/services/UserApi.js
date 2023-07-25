import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const UserDataApi = createApi({
  reducerPath: 'UserDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
    prepareHeaders: (headers) => {
      headers.set('auth-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZDIwODlkNjkxMzVjODg1YTAyMjY0In0sImlhdCI6MTY5MDExNjI5OH0.0c7-D98-uCBKMas44waNR5WxnxTqSHGC3jxfhD8MQn8" );
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }), 
  endpoints: (builder) => ({
    getAllData: builder.query({ query: () => 'data/get-data' }),

    deleteAllFavSongs: builder.mutation({
      query: () => ({
        url: 'data/delete-all-favsong',
        method: 'DELETE',
      }),
    }),
    deleteFavSong: builder.mutation({
      query: (songId) => ({
        url: `data/delete-favsong/${songId}`,
        method: 'DELETE',
      }),
    }),
    deleteAllFavArtists: builder.mutation({
      query: () => ({
        url: 'data/delete-all-artist',
        method: 'DELETE',
      }),
    }),
    deleteFavArtist: builder.mutation({
      query: (artistId) => ({
        url: `data/delete-artist/${artistId}`,
        method: 'DELETE',
      }),
    }),
    deleteAllHistory: builder.mutation({
      query: () => ({
        url: 'data/delete-all-history',
        method: 'DELETE',
      }),
    }),
    deleteHistory: builder.mutation({
      query: (songId) => ({
        url: `data/delete-history/${songId}`,
        method: 'DELETE',
      }),
    }),
    addFavSong: builder.mutation({
      query: (newSong) => ({
        url: 'data/add-favsongs',
        method: 'POST',
        body: newSong,
      }),
    }),
    addFavArtist: builder.mutation({
      query: (newSong) => ({
        url: 'data/add-favArtist',
        method: 'POST',
        body: newSong,
      }),
    }),
    addHistory: builder.mutation({
      query: (newSong) => ({
        url: 'data/add-history',
        method: 'POST',
        body: newSong,
      }),
    }),
  }),
});

export const {
  useGetAllDataQuery,
  useDeleteAllFavSongsMutation,
  useDeleteFavSongMutation,
  useDeleteAllFavArtistsMutation,
  useDeleteFavArtistMutation,
  useDeleteAllHistoryMutation,
  useDeleteHistoryMutation,
  useAddFavSongMutation ,
  useAddFavArtistMutation ,
  useAddHistoryMutation ,
} = UserDataApi;