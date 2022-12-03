import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import Dialogs from './components/Dialogs';
import Info from './components/Info';
import Message from './components/Message';
import { setUser } from './redux/userSlice';

function App() {

    const dispatch = useDispatch()

    const [userId, setUserId] = useState(0)
    const [log, setLog] = useState(false)

    const isMount = useRef(false)
    useEffect(() => {
        if (isMount.current) {
            let id = prompt("Введите ID:")
            id = Number(id)
            setUserId(id)
            setLog(true)
            dispatch(setUser(id))
        }
        isMount.current = true
    }, [])

    return (

        <div className="wrap">
            {

                log && (
                    <Fragment>
                        <Dialogs />
                        <Message />
                        <Info />
                    </Fragment>
                )
            }

        </div>
    );
}

export default App;
