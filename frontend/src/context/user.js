import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        currUser: null,
        token: ""
    });

    axios.defaults.headers.common['Authorization'] = user?.token;

    useEffect(() => {
        const data = localStorage.getItem("currUser");
        if(data){
            const parseData = JSON.parse(data);
            setUser({
                ...user,
                currUser: parseData.user,
                token: parseData.token
            })
        }
        //eslint-disable-next-line
    }, []);
    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => useContext(UserContext);

export {useUser, UserProvider};