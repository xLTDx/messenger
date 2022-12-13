import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const User = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOutHandler = () => {
        dispatch(logOut)

        localStorage.removeItem('user')

        navigate('/login')
    }

    const user = useSelector((state) => state.user)

    return (
        <div className='user'>
            <div className='user_info'>
                <div className='name'>
                    {
                        user?.name
                    }
                </div>
                <div className="login">
                    {
                        user?.login
                    }
                </div>
            </div>
            <div onClick={() => logOutHandler()} className='logout'> 
                Выйти
            </div>
        </div>
    )
}

export default User