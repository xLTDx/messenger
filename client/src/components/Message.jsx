import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { users } from '../DB'
import { getUserNameById } from './../utils/get'
import io from 'socket.io-client'
import MessageInput from './MessageInput'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const socket = io();

const Message = () => {

    const dialogData = useSelector((state) => state.dialog)
    const userData = useSelector((state) => state.user)

    const { dialogId } = useParams()

    const [messagesList, setMessagesList] = useState()

    const [usersList, setUsersList] = useState()
    
    // let usersList = []
    // let recepientId = ""

    const [recepientId, setRecepientId] = useState("")
    const [recepientName, setRecepientName] = useState("")

    const getMessage = async () => {
        await axios.post("http://localhost:7153/getMessage", { dialogId, userId: userData.id })
            .then(resp => setMessagesList(resp.data.messages))
    }

    // const getUsers = async () => {
    //     await axios.post("http://localhost:7153/getUsersFromDialog", { dialogId })
    //         .then(resp => setUsersList(resp.data.users))

    // }

    // const getRecepientId = () => {

    //     setRecepientId(usersList)

    // }

    // const getRecepientName = async () => {

    //     await axios.post("http://localhost:7153/getOneUser", { id: recepientId })
    //         .then(resp => console.log(resp.data))

    // }

    const isMounted = useRef(false)
    useEffect(() => {
        if (isMounted.current == true) {
            getMessage()

            // getUsers()
            
            // getRecepientId()

            // console.log(ri)
            // getRecepientName()
        }
        isMounted.current = true
        

    }, [])

    useEffect(() => {
        console.log(recepientId)
        
    }, [usersList, recepientId])




    return (

        <div className='message_wrap item'>

            <div className="message">
                {
                    messagesList?.map((obj) => (

                        obj.sender == userData.id ? (

                            <div className="message_item sender_message">
                                <p className='name'>
                                    {
                                        userData.name
                                    }
                                </p>
                                <p className='text_message'>
                                    {
                                        obj.text
                                    }
                                </p>
                            </div>

                        )

                            :

                            obj.sender != userData.id && (
                                <div className="message_item recepient_message">
                                    <p className='name'>
                                        {
                                            recepientName
                                        }
                                    </p>
                                    <p className='text_message'>
                                        {
                                            obj.text
                                        }
                                    </p>
                                </div>
                            )

                    ))
                }
            </div>

            <MessageInput socket={socket} />

        </div>
    )
}

export default Message