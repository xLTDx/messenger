import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { users } from "../DB";
import axios from 'axios'

const initialState = {
    id: "",
    name: "",
    login: "",
    token: "",
    recepientId: "",
    selectedDialog: "",
    socket: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {

            state.id = action.payload.id
            state.login = action.payload.login
            state.name = action.payload.name
            state.token = action.payload.token
            
            
        },
        setRecepient: (state, action) => {
            state.recepientId = action.payload.id
        },
        setSelectedDialog: (state, action) => {
            state.selectedDialog = action.payload
        },
        setSocket: (state, action) => {
            state.socket = action.payload
        }
        
    }
})

export const { setUser, setRecepient, setSelectedDialog, setSocket } = userSlice.actions
export default userSlice.reducer