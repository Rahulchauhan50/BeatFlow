import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  UserDetails: {},
  UserAuthToken:''
};

const UserSlice = createSlice({
  name: 'UserAuth',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
        state.UserDetails = action.payload?.user
        state.UserAuthToken = action.payload?.authToken
    }
}});

export const { setUserDetails } = UserSlice.actions;

export default UserSlice.reducer;
