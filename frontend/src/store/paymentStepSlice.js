import { createSlice } from "@reduxjs/toolkit";


const paymentStepSlice = createSlice({
    name: 'step', 
    initialState: {step: 0}, 
    reducers: { 
        changeStep(state, action){
            const {payload} = action; 
            return {...action.payload}; 
        }
    }
}); 


export const {changeStep}  = paymentStepSlice.actions; 
export default paymentStepSlice.reducer; 