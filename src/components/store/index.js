import {  configureStore } from '@reduxjs/toolkit';
import counterReducer from "./counter";
import authReducer from "./auth";
import expensesReducer from "./expense"


const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer,expense:expensesReducer },
});



export default store;
