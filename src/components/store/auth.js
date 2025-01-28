 import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isAuthenticated: false,userId:null,token:null };

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state,action) {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userId = null;
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
