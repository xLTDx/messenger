import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const MessageInput = (props) => {

    const { getMessage, socket } = props

    // console.log(dialogId)

    const [textValue, setTextValue] = useState("")

    const user = useSelector((state) => state.user)

    

    // useEffect(() => {
    //     setDialogId(user.selectedDialog)
    // }, [user.selectedDialog])
    
    const sendMessage = async (data) => {
        // const { dialogId, sender, text } = data
        // console.log(data)
        console.log("send")
        await axios.post("http://localhost:7153/addMessage", { ...data }).then(resp => console.log("sending"))
        console.log("sended")
        

        socket.emit("chat", data)

    }

    const isMount = useRef(false)
    useEffect(() => {
        
            if (isMount.current == true) {

                // socket.on('chat', function (data) {

                //     console.log("get something")

                //     getMessage()

                //     // console.log("chat inp")

                //     // let promise = new Promise(function (resolve, reject) {
                //     //     resolve(sendMessage(data))
                //     // });

                //     // promise.then(function (result) {
                //     //     getMessage()
                //     // });


                // });

            
        }

        isMount.current = true

    }, [])



    const submitHandler = () => {

        

        const data = {
            text: textValue,
            dialogId: user.selectedDialog,
            sender: user.id
        }

        sendMessage(data)

        

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