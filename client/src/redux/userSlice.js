import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    id: JSON.parse(localStorage.getItem('user'))?.id || "",
    name: JSON.parse(localStorage.getItem('user'))?.name || "",
    login: JSON.parse(localStorage.getItem('user'))?.login || "",
    token: JSON.parse(localStorage.getItem('user'))?.token || "",
    recepientId: "",
    selectedDialog: ""
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
        },
        logOut: (state) => {
            state.id = ""
            state.name = ""
            state.login = ""
            state.token = ""
            state.recepientId = ""
            state.selectedDialog = ""

        }
        
    }
})

export const { setUser, setRecepient, setSelectedDialog, setSocket, logOut } = userSlice.actions
export default userSlice.reducer