import { configureStore } from '@reduxjs/toolkit';
import { shazamCoreApi } from './services/shazamCore';
import { UserDataApi } from './services/UserApi'
import playerReducer from './features/playerSlice';
import AuthUserReducer from './features/UserAuthSlice'

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    [UserDataApi.reducerPath]: UserDataApi.reducer,
    player: playerReducer,
    UserAuth: AuthUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(shazamCoreApi.middleware, UserDataApi.middleware),
});