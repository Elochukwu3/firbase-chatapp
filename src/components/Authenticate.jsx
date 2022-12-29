import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';


const Authenticate = ({children}) => {
    const {currentUser} = useContext(AuthContext)
    if (!currentUser) {
        return (
            <Navigate to={"/login"}/>
          )
    }
 return children
}

export default Authenticate