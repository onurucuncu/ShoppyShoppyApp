import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"
import { STATUS } from './status';

const ProtectedRoute = ({children}) => {
    const usersTokenStatus = useSelector((state) => state.usersToken.usersTokenStatus);
    let location = useLocation();

    if(usersTokenStatus !== STATUS.SUCCESS) {
      return <Navigate to="/login" state={{ from: location}} replace />
  }
return children
};

export default ProtectedRoute;