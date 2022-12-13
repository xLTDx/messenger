import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate()

    const regHandler = async (e) => {
        e.preventDefault()

        setExist("")

        const data = {
            login,
            password,
            name: userName
        }

        console.log(data)

        await axios.post("http://localhost:7153/registration", data)
            .then(resp => {
                console.log(resp.data)
                if (resp.data.status == 1) {
                    navigate("/login")
                }
                if (resp.data.status == 0) {
                    setExist("Пользователь уже существует")
                }
                if (resp.data.status == -1) {
                    setExist("Произошла ошибка")
                }

            })

    }

    const [login, setLogin] = useState()
    const [password, setPass] = useState()
    const [userName, setUserName] = useState()
    const [exist, setExist] = useState()

    return (
        <div className='enter'>

            <form onSubmit={(e) => regHandler(e)}>

                <h3>Регистрация</h3>
                <input type="text" autoFocus required minLength="3" placeholder='Логин' value={login} onChange={(e) => setLogin(e.target.value)} />
                <input type="password" onInvalid="123123123" required minLength="5" placeholder='Пароль' value={password} onChange={(e) => setPass(e.target.value)} />
                <input type="text" required minLength="2" placeholder='Имя' value={userName} onChange={(e) => setUserName(e.target.value)} />
                <input type="submit" value="Зарегестрироваться" />
                <div className="error">{exist}</div>
                <Link to="/login">Войти</Link>

            </form>

            

        </div>
    )
}

export default Register