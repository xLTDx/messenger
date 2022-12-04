import { configureStore } from "@reduxjs/toolkit"
import userSlice from './userSlice';
import dialogSlice from './dialogSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        dialog: dialogSlice,
    }
})