import mongoose, { model, Schema } from "mongoose";
import {v4} from 'uuid'

const dialogSchema = new Schema({
    users: {
        type: Array,
        required: true
    },
    messages: {
        type: Array
    }
},
{
    timestamps: true
})

export default model("Dialog", dialogSchema);
