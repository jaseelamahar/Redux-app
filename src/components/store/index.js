import {  configureStore } from '@reduxjs/toolkit';
import counterReducer from "./counter";
import authReducer from "./auth";
import expensesReducer from "./expense"
import themeReducer from "./theme"
import cartReducer from "./cart"


const store = configureStore({
  reducer: { counter: counterReducer,
     auth: authReducer,
     expense:expensesReducer,
     theme:themeReducer ,
    cart:cartReducer}
});



export default store;
