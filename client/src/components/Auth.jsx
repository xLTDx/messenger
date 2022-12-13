import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

    const user = useSelector((state) => state.user)
    const navigate = useNavigate()


    console.log(user.id)

    useEffect(() => {
        if (user.id == "") {

            navigate('/registration')

        }
        else{

            

            navigate('/main')

        }
    }, [])

    return (
        <div>Auth</div>
    )
}

export default Auth