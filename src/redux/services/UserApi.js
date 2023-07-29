import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// const BaseUrl = process.env.REACT_APP_BASE_URL

export const UserDataApi = createApi({
  reducerPath: 'UserDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://music-yevp.onrender.com/',
    prepareHeaders: (headers) => {
      headers.set('auth-token', localStorage.getItem("token")) 
      headers.set('Content-Type', 'application/json')

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
    isFavSong: builder.mutation({
      query: (uri) => ({
        url: `data/IsfavSong`,
        method: 'POST',
        body: uri
      }),

    }),
    isFavArtist: builder.mutation({
      query: (artistId) => ({
        url: `data/IsfavArtist`,
        method: 'POST',
        body: artistId
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

  export const UserAuthApi = createApi({
    reducerPath: 'UserAuthApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://music-yevp.onrender.com/',
      prepareHeaders: (headers) => {
        headers.set('auth-token', localStorage.getItem('token')) 
        headers.set('Content-Type', 'application/json')

        return headers;
      },
    }), 
    endpoints: (builder) => ({
      userAuthentication: builder.mutation({
        query: () => ({
          url: 'auth/getuser',
          method: 'POST',
        }),
      }),
      userLogin: builder.mutation({
        query: ({email,password}) => ({
          url: 'auth/login',
          method: 'POST',
          body:JSON.stringify({ email, password })
        }),
      }),
      userSignup: builder.mutation({
        query: ({phoneNumber,name,email,password}) => ({
          url: 'auth',
          method: 'POST',
          body:JSON.stringify({phoneNumber,name, email, password })
        }),
      }),
      
    }),
  });

export const {
  useGetAllDataQuery,
  useDeleteAllFavSongsMutation,
  useDeleteFavSongMutation,
  useIsFavSongMutation,
  useIsFavArtistMutation,
  useDeleteAllFavArtistsMutation,
  useDeleteFavArtistMutation,
  useDeleteAllHistoryMutation,
  useDeleteHistoryMutation,
  useAddFavSongMutation ,
  useAddFavArtistMutation ,
  useAddHistoryMutation ,
} = UserDataApi;

export const {
  useUserAuthenticationMutation,
  useUserLoginMutation,
  useUserSignupMutation,
} = UserAuthApi;