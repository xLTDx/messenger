import axios from 'axios'
import React, { Fragment, useRef, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';




const Enter = () => {

    return (
        <Fragment>
            asdasdas
            <Routes>

                <Route path="registration*" element={<Register />} />
                <Route path="login" element={<Login />} />

            </Routes>
        </Fragment>

    )
}

export default Enter