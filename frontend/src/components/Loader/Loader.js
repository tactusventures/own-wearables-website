import React from 'react'
import './loader.css'; 
const Loader = ({height}) => {
  return (
   
    <div className="loading-spinner" style={{height}}>
        <img src="images/loader.gif"/>
    </div>
  )
}

export default Loader
