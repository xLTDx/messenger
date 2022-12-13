import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice';

const Auth = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log('qweqweqweqwe')

    const isMounted = useRef(false)
    useEffect(() => {

        if (isMounted.current == true) {

            const user = JSON.parse(localStorage.getItem('user'))?.id

            console.log(user)

            if (user) {

                dispatch(setUser(user))
                navigate('/main')

            }


            else {

                navigate('/registration')

            }

        }

        isMounted.current = true


    }, [])

    return (
        <div>Auth</div>
    )
}

export default Auth