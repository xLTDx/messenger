import mongoose, { model, Schema } from "mongoose";
import {v4} from 'uuid'

const userShema = new Schema({
    name: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

export default model("User", userShema);
