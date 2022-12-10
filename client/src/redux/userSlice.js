import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { users } from "../DB";
import axios from 'axios'

const initialState = {
    id: "",
    name: "",
    login: "",
    token: "",
    recepientId: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {

            state.id = action.payload._id
            state.login = action.payload.login
            state.name = action.payload.name
            state.token = action.payload.token
            
            
        },
        setRecepient: (state, action) => {
            state.recepientId = action.payload.id
        }
    }
})

export const { setUser, setRecepient } = userSlice.actions
export default userSlice.reducer