import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="top">
                    {/* ----------footer column 1------------ */}

                </div>


                <div className='bottom'>

                    <div className='social_media'>
                        <p>Let's  <span>get Social</span></p> <br />
                        <div className='social_icons'><div><i class="fa-brands fa-facebook"></i></div>

                            {/*  */}

                            <div> <i class="fa-brands fa-instagram"></i></div>
                            <div><i class="fa-brands fa-linkedin"></i></div>
                            <div> <i class="fa-brands fa-twitter"></i></div>
                            <div> <i class="fa-brands fa-discord"></i></div>

                        </div>
                    </div>

                    <div className='copyright'>
                        <Link to='/pages/terms-of-use'>Terms Of Use</Link>
                        {/* &dot; */}
                        <i class="fa-solid fa-circle" ></i>
                        <Link to='/pages/data-protection'>Data Protection</Link>

                        <i class="fa-solid fa-circle" ></i>
                        <Link to="/pages/return-policy">Return Plicy</Link>
                    </div>
                    <div className='copyright_text'>
                        <p>© 2023 Imagine Marketing Limited. All Rights Reserved.</p>
                        <p>For queries contact us: Manager, Imagine Marketing Limited Unit no. 204 & 205, 2nd floor, D-wing & E-wing,
                            Corporate Avenue, Andheri Ghatkopar Link Road, Mumbai, Maharashtra-400093, India</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;