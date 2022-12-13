import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logHandler = async (e) => {
        e.preventDefault()

        setError("")

        const data = {
            login,
            password
        }

        console.log(data)

        await axios.post("http://localhost:7153/login", data)
            .then(resp => {
                
                if(resp.status === 200){
                    console.log(resp.data)
                }

                dispatch(setUser(resp.data))

                console.log(resp.data)

                localStorage.setItem("user", JSON.stringify(resp.data))

                navigate("/main")
                


            })
            .catch(err => {
                err.response.status == 401 && setError("Не верные данные")
            })

    }

    const [login, setLogin] = useState()
    const [password, setPass] = useState()
    const [userName, setUserName] = useState()
    const [error, setError] = useState()

    const isMount = useRef(false)
    useEffect(() => {
        if(isMount.current == true){
            if(JSON.parse(localStorage.getItem('user')) != null){
                navigate('/main')
            }
        }

        isMount.current = true
    })


    return (
        <div className='enter'>

            <form onSubmit={(e) => logHandler(e)}>

                <h3>Вход</h3>
                <input type="text" autoFocus required minLength="3" placeholder='Логин' value={login} onChange={(e) => setLogin(e.target.value)} />
                <input type="password" onInvalid="123123123" required minLength="5" placeholder='Пароль' value={password} onChange={(e) => setPass(e.target.value)} />
                <input type="submit" value="Войти" />
                <div className="error">{error}</div>
                <Link to="/registration">Регистрация</Link>
            </form>

        </div>
    )
}

export default Login