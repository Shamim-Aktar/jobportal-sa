import { confiureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';



const store = confiureStore({
    reducer: {
        auth: authSlice
    }
})

export default store 