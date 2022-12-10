import mongoose, { model, Schema } from "mongoose";
import {v4} from 'uuid'

const userShema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

export default model("User", userShema);
