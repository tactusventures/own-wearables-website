import React from 'react'
import { useSelector } from 'react-redux'; 



const Guest = ({children}) => {

  let isLoggedIn = useSelector((state) => state.auth); 
  isLoggedIn = isLoggedIn.isLoggedIn; 
    
  if(!isLoggedIn){
      return Children;  
   }

   return  <Navigate to="/" replace />

}

export default Guest
