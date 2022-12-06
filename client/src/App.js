import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import Dialogs from './components/Dialogs';
import Info from './components/Info';
import Message from './components/Message';
import { setUser } from './redux/userSlice';
import axios from 'axios';

const App = () =>  {

    const getUser = async (id) => {
        await axios.post("http://localhost:7153/getOneUser", { id })
        .then(resp => {dispatch(setUser(resp.data.result[0]))})
        
    }

    const dispatch = useDispatch()

    const isMount = useRef(false)
    useEffect(() => {
        if (isMount.current) {
            let id = prompt("Введите ID:")

            const res = getUser(id)
            
            // console.log(res)

            // id = Number(id)
            // dispatch(setUser(id))
        }
        isMount.current = true
    }, [])

    const user = useSelector((state) => state.user)

    return (

        <div className="wrap">
            {

                user.id != 0 && (
                    <Fragment>
                        <Dialogs />
                        {/* <Message /> */}
                        <Info />
                    </Fragment>
                )
            }

        </div>
    );
}

export default App;
