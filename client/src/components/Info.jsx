import React from 'react'
import { useSelector } from 'react-redux';
import { getUserNameById } from './../utils/get';

const Info = () => {

    const user = useSelector((state) => state.user)
    const dialog = useSelector((state) => state.dialog)

    return (
        <div className='info item'>

            <p>
                Статус:
            </p>
            <p>
                {
                    "ID:" + user.id
                }
            </p>
            <p>
                {
                    "Name:" + user.name
                }
            </p>
            <p>
                {
                    "selected dialog:" + user.selectedDialog
                }
            </p>
            <p>
                {
                    "recepient id:" + user.recepientId
                }
            </p>
            <p>
                {
                    "recepient name:" + getUserNameById(dialog.recepient)
                }
            </p>


        </div>
    )
}

export default Info