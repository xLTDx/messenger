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

    const bottom = useRef()

    const dialogData = useSelector((state) => state.dialog)
    const userData = useSelector((state) => state.user)

    const { dialogId } = useParams()

    const [messagesList, setMessagesList] = useState([])

    const [recepientData, setRecepientData] = useState()

    const getMessage = async () => {
        console.log("start getting")
        await axios.post("http://localhost:7153/getMessage", { dialogId })
            .then(resp => {setMessagesList(resp.data.messages); console.log("get")})
        console.log("geted")
    }

    const getLastMessage = async () => {
        await axios.post("http://localhost:7153/getLastMessage", { dialogId })
            .then(resp => {
                const arr = [...messagesList]
                console.log(arr)
                console.log("asdasdasd")
                //setMessagesList(messagesList.push(resp.data.message)) 

            })
    }

    const getRecepient = async () => {
        await axios.post("http://localhost:7153/getRecepient", { dialogId, userId: userData.id })
            .then(resp => setRecepientData(resp.data))
    }

    const isMounted = useRef(false)
    useEffect(() => {
        if (isMounted.current == true) {

            getMessage()
            getRecepient()

            socket.emit("dialogId", dialogId)

            

        }
        isMounted.current = true


    }, [])


    useEffect(() => {
        bottom.current.scrollIntoView({behavior: 'smooth'});
    }, [messagesList])

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
                                            recepientData?.user[0].name
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
                <div ref={bottom} ></div>
            </div>

            <MessageInput getMessage={getMessage} socket={socket} />

        </div>
    )
}

export default Message