import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
  artistId:null,
  alert:false,
  Alertmessage:null
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
      
      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      }
      else if (action.payload?.artistData?.data) {
        state.currentSongs = action.payload?.artistData?.data;
       
      } 
      else if (action.payload?.artistData) {
        state.currentSongs = action.payload?.artistData
      } 
      else if (action.payload.song.song) {
        state.activeSong = action.payload.song.song
        console.log("rahul")
        state.currentSongs = action.payload?.data[0].histories
      } 
      else if (action.payload?.data[0].FavSongs) {
        state.currentSongs = action.payload?.data[0].FavSongs
      } 
      else {
        state.currentSongs = action.payload.data;
      }
      
      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
    setArtistId: (state, action) => {
      state.artistId = action.payload?.data[0]?.id;
      console.log(action.payload)
    },
    setAlert: (state, action) => {
      state.alert = action.payload
    },
    setAlertMsg: (state, action) => {
      state.Alertmessage = action.payload
      console.log(state.alert)
    }
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId, setArtistId , setAlert, setAlertMsg} = playerSlice.actions;

export default playerSlice.reducer;
