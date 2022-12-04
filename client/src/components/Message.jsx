import React from 'react'
import { useSelector } from 'react-redux';
import { users } from '../DB';
import { getUserNameById } from './../utils/get';

const Message = () => {
    
    const dialogData = useSelector((state) => state.dialog)
    const userData = useSelector((state) => state.user)
    
    return (

        <div className='message_wrap item'>
        
            <div className="message">
            {
                dialogData.messages.map((obj) => (
                    
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
                                    getUserNameById(dialogData.recepient)
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

            <div className="message_input">
           
                <textarea className='message_textarea'>

                </textarea>
                
                <button className='send_button'>
                    Отправить
                </button>
           
            </div>

        </div>
    )
}

export default Message