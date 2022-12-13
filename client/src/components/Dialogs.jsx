import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import { dialogs, users } from '../DB'
import { setDialog } from '../redux/dialogSlice'
import LeftNav from './LeftNav'
import Users from './Users'
import { useNavigate } from 'react-router-dom';
import User from './User'

const Dialogs = () => {

    
    
    
    

    return (
        <div className='dialogs item'>
            
            <User />

            <Users />

            {/* <LeftNav />
            
            <Routes>
                <Route path="users" element={<Users />} />

            </Routes> */}


        </div>
    )
}

export default Dialogs