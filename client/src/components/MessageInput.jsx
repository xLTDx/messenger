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
        if(isMount.current == true){
            socket.on('chat message', function(data) {
                
                dispatch(addMessage(data))
        
              });
        }
        isMount.current = true
    }, [])

    const submitHandler = () => {
        
        const data = {
            sender: user.id,
            text: textValue
        }

        socket.emit('chat message', data);

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