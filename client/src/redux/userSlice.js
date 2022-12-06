import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { users } from "../DB";
import axios from 'axios'

const initialState = {
    id: "",
    name: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {

            state.id = action.payload._id
            state.name = action.payload.name
            
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer