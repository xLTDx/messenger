import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import Dialogs from './components/Dialogs';
import Info from './components/Info';
import Message from './components/Message';
import { setSocket, setUser } from './redux/userSlice';
import axios from 'axios';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Enter from './components/Enter';
import Main from './components/Main';
import Register from './components/Register';
import Login from './components/Login';
import Auth from './components/Auth';
import io from 'socket.io-client'
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const App = ({socket}) => {

    
    // const getUser = async (id) => {
    //     await axios.post("http://localhost:7153/getOneUser", { id })
    //         .then(resp => { dispatch(setUser(resp.data.result[0])) })

    // }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const isMount = useRef(false)
    // useEffect(() => {
    //     if (isMount.current) {
    //         let id = prompt("Введите ID:")

    //         const res = getUser(id)

    //     }
    //     isMount.current = true
    // }, [])

    const user = useSelector((state) => state.user)

    // const isMounted = useRef(false)
    // useEffect(() => {
    //     if (isMounted.current == true) {

    //         const sk = io()

    //         console.log(sk)

    //         setSocket(sk)
            

    //     }
    //     isMounted.current = true

    // }, [])


    return (
        <Fragment>
            {/* 
        <Routes>
            <Route path="/" element={<Router />}/>
        </Routes> */}

            <div className='wrap'>
                <Routes>
                    <Route>

                        <Route path="/" element={<Auth />} />
                        <Route path="/registration" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/main/*" element={<Main socket={socket} />} />


                    </Route>
                </Routes>
            </div>
            {/* 
            <Fragment>
                
            </Fragment> */}

            {/* {
                auth == 0 && (
                    <Fragment>
                        <Enter />
                    </Fragment>
                    )
            } */}





        </Fragment>
    )

    // return (



    //     <div className="wrap">
    //         {

    //             user.id != 0 && (
    //                 <Fragment>
    //                     <Dialogs />
    //                     <Routes>
    //                         <Route path="/dialog/:dialogId" element={<Message />} />
    //                     </Routes>

    //                     <Info />
    //                 </Fragment>
    //             )
    //         }

    //     </div>
    // );
}

export default App;
