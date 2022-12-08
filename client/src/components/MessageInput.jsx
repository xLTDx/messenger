import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/dialogSlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MessageInput = (props) => {

    const { socket, getMessage } = props


    const { dialogId } = useParams()

    const [textValue, setTextValue] = useState("")

    const user = useSelector((state) => state.user)

    const sendMessage = async (data) => {
        const { dialogId, sender, text } = data
        console.log("send")
        await axios.post("http://localhost:7153/addMessage", { dialogId, sender, text }).then(resp => console.log("sending"))
        console.log("sended")
        
    }

    const isMount = useRef(false)
    useEffect(() => {
        

            if (isMount.current == true) {
                socket.on('chat', function (data) {

                    getMessage()

                    // console.log("chat inp")

                    // let promise = new Promise(function (resolve, reject) {
                    //     resolve(sendMessage(data))
                    // });

                    // promise.then(function (result) {
                    //     getMessage()
                    // });


                });

            
        }


        isMount.current = true

    }, [])



    const submitHandler = () => {

        const data = {
            text: textValue,
            dialogId,
            sender: user.id
        }

        sendMessage(data)

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