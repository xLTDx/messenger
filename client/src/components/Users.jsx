import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dialogs, users } from '../DB'
import { setDialog } from '../redux/dialogSlice'
import axios from 'axios'
import UserItem from './UserItem';

const Users = () => {



    const dispatch = useDispatch()

    const user = useSelector((state) => state.user)

    const [userList, setUserList] = useState([])

    const isMounted = useRef(false)
    useEffect(() => {
        if (isMounted.current == true) {
            getUsers()
            console.log(userList)
        }
        isMounted.current = true


    }, [])

    const getUsers = async () => {
        const id = user.id
        await axios.post("http://localhost:7153/getUsers", {id}).then(resp => setUserList(resp.data.result))
    }

    return (
        <Fragment>
            {
                userList?.map(user => (
                    <UserItem user={user} />
                ))
            }
        </Fragment>
    )
}

export default Users