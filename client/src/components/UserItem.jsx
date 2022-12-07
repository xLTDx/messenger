import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setRecepient } from '../redux/userSlice';

const UserItem = ({ user }) => {

    const navigate = useNavigate();

    const userData = useSelector((state) => state.user)
    

    let isExist = 0
    let dialogId = ""

    

    const dialogExist = async (recepientId) => {
        const users = [userData.id, recepientId].sort()
        await axios.post("http://localhost:7153/dialogExists", { users }).then(resp => isExist = resp.data.status)
        
    }

    const changeDialog = async (recepientId) => {

        await dialogExist(recepientId)
        const users = [userData.id, recepientId].sort()

        if (isExist == 0) {
            await axios.post("http://localhost:7153/createDialog", { users })
            console.log("Dialog created")
        }

        await axios.post("http://localhost:7153/getDialogId", { users }).then(resp => dialogId = resp.data.id)
        console.log("id: " + dialogId)

        setRecepient(recepientId)

        navigate("/dialog/" + dialogId);



    }

    return (
        <div onClick={() => { changeDialog(user._id) }} key={user._id} to={"/dialog/" + dialogId}>
            {
                user.name
            }    
        </div>
    )
}

export default UserItem