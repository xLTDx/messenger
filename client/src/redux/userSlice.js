import { createSlice } from "@reduxjs/toolkit";
import { users } from "../DB";

const initialState = {
    id: 0,
    name: ""
}

const findUser = (id) => {
    const userData = users.find(obj => obj.id === id)
    return userData
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            
            const user = findUser(action.payload)
            state.id = user.id
            state.name = user.name
            
        }
    }
})

export const {setUser} = userSlice.actions
export default userSlice.reducer