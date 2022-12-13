import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { users } from '../DB'
import { getUserNameById } from './../utils/get'
import io from 'socket.io-client'
import MessageInput from './MessageInput'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Message = () => {

    const bottom = useRef()

    const userData = useSelector((state) => state.user)

    const socket = userData.socket


    const [messagesList, setMessagesList] = useState([])

    const [recepientData, setRecepientData] = useState()

    const getMessage = async () => {
            console.log("start getting")
    
            await axios.post("http://localhost:7153/getMessage", { dialogId: userData.selectedDialog, userId: userData.id })
                .then(resp => { setMessagesList(resp.data.messages); console.log("get") })
            console.log("geted")
            
        }

   

    const getRecepient = async () => {
        await axios.post("http://localhost:7153/getRecepient", { dialogId: userData.selectedDialog, userId: userData.id })
            .then(resp => setRecepientData(resp.data))
    }

    
    const isMounted = useRef(false)
    useEffect(() => {
        if (isMounted.current == true) {

            // setDialogId(searchParams.get("dialogId"))
            // console.log(dialogId)

            console.log("create")
            socket.on('chat', function (data) {

                console.log("get something")

                getMessage()

                // console.log("chat inp")

                // let promise = new Promise(function (resolve, reject) {
                //     resolve(sendMessage(data))
                // });

                // promise.then(function (result) {
                //     getMessage()
                // });


            });




            // socket.emit("leave", null)

            

        }
        isMounted.current = true

    }, [userData.selectedDialog])

    useEffect(() => {

        
        getRecepient()
        getMessage()

        socket.emit("dialogId", userData.selectedDialog)

    }, [userData.selectedDialog])



    useEffect(() => {
        bottom.current.scrollIntoView({ behavior: 'smooth' });
    }, [messagesList])

    // useEffect(() => {
    //     setDialogId(userData.selectedDialog)
    // }, [userData.selectedDialog])


     // const getLastMessage = async () => {
    //     await axios.post("http://localhost:7153/getLastMessage", { dialogId })
    //         .then(resp => {
    //             const arr = [...messagesList]
    //             console.log(arr)
    //             console.log("asdasdasd")
    //             //setMessagesList(messagesList.push(resp.data.message)) 

    //         })
    // }

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