import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dialogs, users } from '../DB'
import { setDialog } from '../redux/dialogSlice'
import axios from 'axios'

const Users = async () => {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.user)
    const dialog = useSelector((state) => state.dialog)

    // const userList = await (await axios.get("http://localhost:7153/getUsers")).data.result

    // console.log(userList)

    const userList = users.filter(obj => obj.id != user.id)

    const findDialog = (recipient) => {
        const arr = [user.id, recipient]
        const match = dialogs.find(obj => JSON.stringify(obj.users.sort()) == JSON.stringify(arr.sort()))

        return match.dialogId
    }

    const changeDialog = (userId, dialogId) => {
        dispatch(setDialog({ userId, dialogId }))
    }

    return (
        <Fragment>
            {
                userList?.map(user => (
                    <div key={user.id} onClick={() => { changeDialog(user.id, findDialog(user.id)) }} className={user.id == dialog.recepient ? "choosen dialog_item" : "dialog_item"}>
                        {
                            user.name
                        }
                    </div>
                ))
            }
        </Fragment>
    )
}

export default Users