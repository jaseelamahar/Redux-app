import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],
    totalAmount: 0,
    isPremium: false, // Default value for isPremium
  },
  reducers: {
    setExpenses(state, action) {
      state.items = action.payload;
      state.totalAmount = action.payload.reduce((sum, expense) => sum + expense.amount, 0);
      state.isPremium = state.totalAmount > 10000;
    },
    addExpense(state, action) {
      state.items.push(action.payload);
      state.totalAmount += action.payload.amount;
      state.isPremium = state.totalAmount > 10000;
    },
    togglePremium(state) {
      state.isPremium = !state.isPremium; // Explicitly toggle premium status
    },
  },
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
