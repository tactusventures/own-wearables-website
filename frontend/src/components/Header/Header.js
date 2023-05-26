import React, {useRef, useEffect, useState} from 'react'; 
import './header.css';
import Register from '../Auth/Register/Register'; 
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  
  const selector = useSelector(state => state.auth); 
    const [navbarClass, setNavbarClass] = useState('');

    const [activeNav, setActiveNav] = useState(false); 
    const [active, setActive] = useState(false); 

    const barRef = useRef(null); 
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

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


      function openMenu(e) { 
        setActiveNav(!activeNav); 
      }


      function logOut(e){ 
        dispatch(clearUser()); 
        navigate("/"); 
      }

      const toggleCalss = activeNav?"active":"";





  return (
    <>
    <header>
        <div className='top'>
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
                      <button onClick={e => setActive(true)}>Login</button>
                      <button>Sign Up</button>
                    </>
                  }
                </div>

                  
            </div>  
        </div>


        <div className='primary' id='page-primary'>   
            <div className='container flex justify-between'>
                <div className='left'>
                    <a className='own-sub-logo'><img src='/images/own-logo.png'></img></a>
                </div>

                <div className={`right ${toggleCalss} flex align-center justify-between text-center`}>
                    <div className='app-btn'>
                        <p>Know Your Feet Size</p>
                        <button className='btn btn-primary-circular'>Download Our App</button>   
                    </div>

                    <div className='buy-btn'>
                        {/* <button className='btn btn-primary-circular' disabled>Buy</button> */}
                    </div>
                </div>

                <i onClick={openMenu} className='fas fa-bars bars-icon' ref={barRef}></i>
            </div>
        </div>
    </header>



    <Register active={active} setActive={setActive} />

    </>
  )
}


export default Header;