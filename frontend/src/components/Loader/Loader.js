import React from 'react'
import './loader.css'; 
const Loader = ({height}) => {
  return (
    // <div className='loader-shimmer'>
    //   <img src='https://hackernoon.imgix.net/images/0*4Gzjgh9Y7Gu8KEtZ.gif' />
    // </div>
    <div class="loading-spinner" style={{height}}>
        <img src="images/loader.gif"/>
    </div>
  )
}

export default Loader
