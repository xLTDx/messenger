import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const LeftNav = () => {
    return (
        <Fragment>
            <Link to={"dialogs"}>
                Диалоги
            </Link>
            <Link to={"/users"}>
                Пользователи
            </Link>
        </Fragment>
    )
}

export default LeftNav