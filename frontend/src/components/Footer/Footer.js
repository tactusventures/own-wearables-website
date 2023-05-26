import React from 'react'
import './footer.css';

const Footer = () => {
    return (
        <footer>
            <div className='container'>
                <div className='top'>
                    <div className="feature">
                        <i className='fas fa-truck'></i>
                        <h3>Free Delivery</h3>
                        <p>Get free delivery direct to your door.</p>
                        {/* <a href='#'>Learn more > </a> */}
                    </div>
                </div>


                
                <div className='bottom'>
                    <div className='bottom-bottom'>
                        <div className='left'>
                            <p>Copyright © 2023 tactus ventures pvt Ltd. All rights reserved.</p>

                            <ul>
                                <li>Privacy Policy</li>
                                <li>Terms of Use</li>
                                <li>Sales Policy</li>
                                <li>Legal</li>
                                <li>Site Map</li>


                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
