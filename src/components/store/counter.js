
import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment(state, action) {
      state.counter += action.payload || 1; // Default to 1 if no payload
    },
    decrement(state, action) {
      state.counter -= action.payload || 1; // Default to 1 if no payload
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
export default counterSlice.reducer
export const counterActions = counterSlice.actions;