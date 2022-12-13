import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { setRecepient, setSelectedDialog } from '../redux/userSlice';

const UserItem = ({ user }) => {

    const navigate = useNavigate();

    const userData = useSelector((state) => state.user)

    const dispatch = useDispatch()
    
    let dialogId = ""

    const [dialog, sid] = useState()


    // const dialogExist = async (recepientId) => {
    //     const users = [userData.id, recepientId].sort()
    //     await axios.post("http://localhost:7153/dialogExists", { users }).then(resp => isExist = resp.data.status)

    // }

    const changeDialog = async (recepientId) => {

        // await dialogExist(recepientId)
        // const users = [userData.id, recepientId].sort()

        // if (isExist == 0) {
        //     await axios.post("http://localhost:7153/createDialog", { users })
        //     console.log("Dialog created")
        // }

        // await axios.post("http://localhost:7153/getDialogId", { users })
        // .then(resp => {dialogId = resp.data.id})

        // console.log("id: " + dialogId)

        // setRecepient(recepientId)

        // sid(dialogId)

        //navigate("/main/dialog/" + dialogId);


    }

    const isMount = useRef(false)
    useEffect(() => {

        const f = async () => {

            let isExist = 0

            if (isMount.current == true) {

                const users = [userData.id, user._id].sort()
                await axios.post("http://localhost:7153/dialogExists", { users }).then(resp => isExist = resp.data.status)

                
    
                if (isExist == 0) {
                    await axios.post("http://localhost:7153/createDialog", { users })
                    console.log("Dialog created")
                }
    
                await axios.post("http://localhost:7153/getDialogId", { users })
                    .then(resp => { dialogId = resp.data.id })
    
    
                setRecepient(user._id)
    
                sid(dialogId)
            }
    
            isMount.current = true
    

        }

        f()        

    }, [])


    return (
        <Link className='user_item' onClick={() => {dispatch(setSelectedDialog(dialog))}} key={user._id} to={"/main/dialog?dialogId=" + dialog}>
            {
                user.name
            }
        </Link>
    )
}

export default UserItem