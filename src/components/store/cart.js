import { createSlice } from "@reduxjs/toolkit";

 const initialCartState={showcart:false}
const cartSlice=createSlice({
    name:'showcart',
    initialState:initialCartState,
    reducers:{
        toggleCart(state){
            state.showcart=!state.showcart
        }
    }
})
 export default cartSlice.reducer;
 export const cartActions=cartSlice.actions