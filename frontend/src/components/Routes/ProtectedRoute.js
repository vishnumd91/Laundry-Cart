import React from 'react';
import { useState, useEffect } from 'react';
import { useUser } from '../../context/user';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

const ProtectedRoute = () => {
    const [ok, setOk] = useState(false);
    const [user, setUser] = useUser();

    useEffect(() => {
        const userCheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/auth-user`);
            if(res.data.ok){
              setOk(true);
            }else{
              setOk(false); 
            }
        }
        if(user?.token) userCheck();
    }, [user?.token]);

    return ok ? <Outlet/> : <Spinner/>;
}

export default ProtectedRoute
