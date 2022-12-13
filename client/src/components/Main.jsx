import React, { Fragment, useEffect, useRef, useState } from 'react'
import Dialogs from './Dialogs'
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import Message from './Message';
import { useSelector } from 'react-redux';
import Info from './Info';

const Main = () => {

    const [searchParams, setSearchParams] = useSearchParams();
        
    const [dialogId, setDialogId] = useState()

    
    useEffect(() => {
        setDialogId(searchParams.get("dialogId"))

        // console.log("redraw")
    })


    return (
        <Fragment>
            
            <Dialogs />
            <Message />
            {/* <Routes>
                <Route path="/main/dialog/*" element={<Message />} />
            </Routes> */}
        </Fragment>
    )
}

export default Main