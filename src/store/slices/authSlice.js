/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: state => {
      state.isAuthenticated = true;
    },
    getUserDetails: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    onLogout: state => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export default authSlice.reducer;

export const { onLogin, getUserDetails, onLogout } = authSlice.actions;
