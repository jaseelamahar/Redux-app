import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'light', // Default theme
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'; // Toggle between light and dark
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
