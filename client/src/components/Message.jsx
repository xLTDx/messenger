import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { users } from '../DB'
import { getUserNameById } from './../utils/get'
import io from 'socket.io-client'
import MessageInput from './MessageInput'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { setSelectedDialog } from '../redux/userSlice'

const Message = ({ socket }) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch()

    const bottom = useRef()

    const userData = useSelector((state) => state.user)



    const [messagesList, setMessagesList] = useState(null)

    const [recepientData, setRecepientData] = useState()

    const getMessage = async () => {
        console.log("start getting")

        if (userData.selectedDialog != "" && userData.id != "") {
            await axios.post("http://localhost:7153/getMessage", { dialogId: userData.selectedDialog, userId: userData.id })
                .then(resp => { setMessagesList(resp.data.messages); console.log("get") })
            console.log("geted")
        }

    }

    const removeDialog = async () => {
        await axios.post("http://localhost:7153/removeDialog", { dialogId: userData.selectedDialog })
            .then(resp => setMessagesList(null))
            socket.emit("removeDialog", userData.selectedDialog)
            console.log("start delete")
    }



    const getRecepient = async () => {
        await axios.post("http://localhost:7153/getRecepient", { dialogId: userData.selectedDialog, userId: userData.id })
            .then(resp => setRecepientData(resp.data))
    }


    const isMounted = useRef(false)
    useEffect(() => {
        if (isMounted.current == true) {

            const query = searchParams.get("dialogId")
            console.log(query)
            if(query){
                console.log("set")
                dispatch(setSelectedDialog(query))
            }


            socket.on('chat', function (data) {

                getMessage()

            });

            socket.on('removeDialog', function (data) {

                setMessagesList()

            });

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

    return (

        <div className='message_wrap item'>
            <div className='recepient_info'>
                {

                    <Fragment>
                        <div>
                            {
                                recepientData?.user[0].name
                            }
                        </div>
                        {
                            messagesList != "" && (
                                <div onClick={() => removeDialog()}>
                                    Очистить
                                </div>
                                )
                        }

                    </Fragment>


                }

            </div>
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
            {
                userData.selectedDialog && (
                    <MessageInput getMessage={getMessage} socket={socket} />
                )
            }
            

        </div>
    )
}

export default Message