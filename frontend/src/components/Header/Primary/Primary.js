import React from 'react'
import './primary.css'; 

const Primary = () => {
  return (
    <div className='primary'>
        <div className='container flex justify-between'>
            <div className='left'>
                <a className='own-sub-logo'><img src='/images/own-logo.png'></img></a>
            </div>

            <div className='right flex align-center justify-between text-center'>
                <div className='app-btn'>
                    <p>To Know Your Feet Size</p>
                    <button className='btn btn-primary-circular'>Download Our App</button>   
                </div>

                <div className='buy-btn'>
                    <button className='btn btn-primary-circular'>Buy</button>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Primary
