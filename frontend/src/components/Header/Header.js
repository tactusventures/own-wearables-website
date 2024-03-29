import React, { useRef, useEffect, useState } from 'react';
import './header.css';
import Register from '../Auth/Register/Register';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import Login from '../Auth/Login/Login';
import { Link } from 'react-router-dom';

const Header = () => {

  const selector = useSelector(state => state.auth);
  const [navbarClass, setNavbarClass] = useState('');

  const [activeNav, setActiveNav] = useState(false);
  const [active, setActive] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [authMenuActive, setAuthMenuActive] = useState(false);
  const barRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authPopup = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (!authPopup.current.contains(event.target)) {
        console.log('working here');
        setAuthMenuActive(false);
      };
    }

    document.addEventListener('mousedown', handleClickOutside);

  }, []);


  useEffect(() => {
    const navbar = document.getElementById('page-primary');
    const sticky = navbar.offsetTop;

    function handleScroll() {

      if (window.pageYOffset >= sticky) {

        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    }

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  let activeAuthMenu = authMenuActive ? "active" : ""

  function openMenu(e) {
    setActiveNav(!activeNav);
  }


  function logOut(e) {
    dispatch(clearUser());
    navigate("/");
  }

  const toggleCalss = activeNav ? "active" : "";





  return (
    <>
      <header>
        {/* <div className='top'>
            <div  className='container flex justify-between align-center'>
                <div  className='left'>
                    <a className='logo flex align-center' ><img src='/images/own-main-logo.png' />
                       <span> Wearables </span>
                    </a>

                </div>


                <div className='auth-section'>

                  {
                    selector.isLoggedIn? 
                    <button onClick={e => logOut(e) }>Log Out</button>
                    : 
                    <>
                      <button onClick={e => setActive(true)}>Sign Up</button>
                      <button onClick={e => setIsLoginActive(true)}>Login</button>
                    </>
                  }
                </div>                 
            </div>  
        </div> */}


        <div className='primary' id='page-primary'>
          <div className='container flex'>
            <div className='left'>

              <Link to="/" className='logo flex align-center' ><img src='/images/own-main-logo.png' /> </Link>

            </div>

            <div className={`right ${toggleCalss} flex align-center justify-between text-center`}>


              <div className='app-btn'>
                <button className='btn btn-primary-circular' onClick={e => { navigate('/buy-now') }}>Buy Now</button>
                <button className='btn btn-primary-circular'>Download App</button>
              </div>

              <div className='login-dropdown' ref={authPopup}>
                <div className='avatar'>
                  <i className='fas fa-user' onClick={e => setAuthMenuActive((prev) => !prev)}></i>
                  <ul className={`${activeAuthMenu}`}>
                    <h4>Account Setting</h4>
                    {
                      selector.isLoggedIn ?
                        <li>
                          <i class="fas fa-sign-out"></i>
                          <button onClick={e => logOut(e)}>Log Out</button>
                        </li>
                        :
                        <>
                          <li>
                            <button onClick={e => setActive(true)}>
                              {/* <i className='fas fa-sign-in'></i> */}
                              Sign Up</button>
                          </li>

                          <li>
                            <button onClick={e => setIsLoginActive(true)}>
                              Login</button>
                          </li>
                        </>
                    }
                  </ul>
                </div>
              </div>
            </div>

            {/* ------------------------------Responsive------------------------- */}

            <i onClick={openMenu} className='fas fa-bars bars-icon' ref={barRef}></i>


          </div>
        </div>
      </header>



      <Register active={active} setActive={setActive} />
      <Login active={isLoginActive} setActive={setIsLoginActive} />

    </>
  )
}


export default Header;