import { createSlice } from "@reduxjs/toolkit";
import { dialogs, users } from "../DB";

const initialState = {
    selectedDialog: 0,
    recepient: 0,
    messages: []
}

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        setDialog: (state, action) => {
            
            state.selectedDialog = action.payload.dialogId
            state.messages = dialogs.find(obj => obj.dialogId === action.payload.dialogId).messages
            state.recepient = action.payload.userId
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        }
    }
})

export const {setDialog, addMessage} = dialogSlice.actions
export default dialogSlice.reducer