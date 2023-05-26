import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order', 
    initialState: {}, 
    reducers: {
        addOrderData(state, action){ 
            const {payload} =action; 
           return {...state, ...action.payload}
        }       
    }
}); 
    

export const {addOrderData} = orderSlice.actions;  

export default orderSlice.reducer;