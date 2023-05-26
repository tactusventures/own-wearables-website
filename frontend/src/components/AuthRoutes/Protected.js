import React from 'react'; 
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'


const Protected = ({children}) => {

  let isLoggedIn = useSelector(state => state.auth); 
  isLoggedIn = isLoggedIn.isLoggedIn; 

  if(!isLoggedIn){ 
     return  <Navigate to="/" replace />
  }

  return children; 
}

export default Protected; 
