import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/dialogSlice';



const MessageInput = ({ socket }) => {

    const dispatch = useDispatch()

    const [textValue, setTextValue] = useState("")
    const dialog = useSelector((state) => state.dialog)
    const user = useSelector((state) => state.user)

    const isMount = useRef(false)
    useEffect(() => {
    
        if (isMount.current == true) {
            socket.on('chat', function (data) {

                dispatch(addMessage(data))

            });

        }

        isMount.current = true
    
    }, [])

    useEffect(() => {
        socket.emit("room", dialog.selectedDialog)
    }, [dialog.selectedDialog])

    const submitHandler = () => {

        const messageData = {
            sender: user.id,
            text: textValue
        }

        const data = {
            message: messageData,
            room: dialog.selectedDialog
        }



        socket.emit("chat", data)

        //socket.emit('chat message', data);

        setTextValue("")

    }

    return (

        <div className="message_input">

            <textarea value={textValue} onChange={(e) => setTextValue(e.target.value)} className='message_textarea'>

            </textarea>

            <button onClick={() => submitHandler()} className='send_button'>
                Отправить
            </button>

        </div>

    )
}

export default MessageInput