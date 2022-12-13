import React, { Fragment, useEffect, useRef } from 'react'
import Dialogs from './Dialogs'
import Message from './Message';
import Info from './Info';
import { useNavigate } from 'react-router-dom';

const Main = ({socket}) => {

    const navigate = useNavigate()

    const isMount = useRef(false)
    useEffect(() => {
        if(isMount.current == true){
            if(JSON.parse(localStorage.getItem('user')) == null){
                navigate('/login')
            }
        }

        isMount.current = true
    })

    return (
        <Fragment>
            
            <Dialogs />
            <Message socket={socket} />
            {/* <Routes>
                <Route path="/main/dialog/*" element={<Message />} />
            </Routes> */}
            <Info />
        </Fragment>
    )
}

export default Main