import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        isLoggedIn: false, 

        user: { }
    },  


    reducers: {
        setUser(state, action) { 
            let {payload} = action.payload; 
            state.isLoggedIn = true; 
            state.user = action.payload
        },

        clearUser(state, action) { 
            state.isLoggedIn = false; 
            state.user = {}; 
        }
    }
}) ;


export const {setUser, clearUser} = authSlice.actions;

export default authSlice.reducer; 