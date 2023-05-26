import React from 'react'; 
import './register.css'; 
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/authSlice';



const Register = ({active, setActive}) => {

    const popUpRef = useRef(); 
    const [validationErrors, setValidationErrors] = useState({}); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "", 
        lastName: "", 
        email: "",  
        phoneNo: "", 
        password: "", 
        confirmPassword: ""
    }); 

    const [loading, setLoading] = useState(false); 
    const dispatch = useDispatch(); 

    const {firstName, lastName, email, phoneNo, password, confirmPassword} = formData; 


    useEffect(() => {
        function handleClickOutside(event) {
            setActive(false);
        }
        
        popUpRef.current.addEventListener('mousedown', handleClickOutside);
        
      }, [popUpRef]);

    let activeStyle = {
        display: active?"contents": "none"
    }


    // registerUser

    function registerUser(e, formData) { 
        e.preventDefault();
        setLoading(true); 
        axios.post("/register", formData).then((res) => { 
            
            dispatch(setUser(res.data));    
            setActive(false); 
            setLoading(false);
            navigate('/product');
        }).catch((e) => {
            if(e.response?.status === 422) { 
                setValidationErrors(e.response.data); 
                console.log('working'); 
            }
            setLoading(false); 
        });     
    }   

  return (
    <div className={`register`} style={activeStyle} >

       <div className='overlay' ref={popUpRef}></div>
            <div className='register-form'>
                    <form>
                    <div className='row'>
                            <div className='form-group'>
                                <label>First Name</label>
                                <input name='firstName' 
                                placeholder='First Name'  
                                value={firstName}
                                onChange={e => setFormData({...formData, [e.target.name]: e.target.value})}
                                required
                                />
                              { validationErrors.firstName?<p>{validationErrors.firstName}</p> : "" }
                            </div>

                            <div className='form-group'>
                                <label>Last Name</label>
                                <input name='lastName'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={e => setFormData({...formData, [e.target.name]: e.target.value})}
                                required
                                />

                              { validationErrors.lastName?<p>{validationErrors.lastName}</p> : "" }

                            </div>  
                    </div>


                        <div className='form-group'>
                            <label>Email</label>
                            <input name='email'  placeholder='email'  
                            value={email}
                            onChange={e => setFormData({...formData, [e.target.name]: e.target.value})}
                            required
                            />
                            { validationErrors.email?<p>{validationErrors.email}</p> : "" }
                        </div>  

                        <div className='form-group'>
                            <label>Phone No</label>
                            <input name='phoneNo'  placeholder='Phone'  
                                value={phoneNo}
                                onChange={e => setFormData({...formData, [e.target.name]: e.target.value})}
                                required
                            />

                            { validationErrors.phoneNo?<p>{validationErrors.phoneNo}</p> : "" }

                        </div>


                        <div className='form-group'>
                            <label>Password</label>
                            <input name='password'  
                                placeholder='Password'  
                                value={password}
                                onChange={e => setFormData({...formData, [e.target.name]: e.target.value})}
                                required
                            />

                            { validationErrors.password?<p>{validationErrors.password}</p> : "" }

                        </div>

                        <div className='form-group'>
                            <label>Confirm Password</label>
                            <input name='confirmPassword'  
                            placeholder='Confirm Password'  
                            value={confirmPassword}
                            onChange={e => setFormData({...formData, [e.target.name]: e.target.value})}
                            required
                            />

                        { validationErrors.confirmPassword?<p>{validationErrors.confirmPassword}</p> : "" }

                        </div>


                        <div className='buttons' style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            {
                                loading?  <img src='https://cdn.dribbble.com/users/3742211/screenshots/9195657/media/6796a544d6f9ef1293d8d8d9e60d38d5.gif' style={{width: "100px"}} /> : ""
                            }
                            
                            <button disabled={loading} className='btn btn-black' onClick={e => registerUser(e, formData)}
                            >Register</button>
                        </div>
                    </form>
            </div>

            <span><i className='fas fa-times'></i></span>
    </div>
  )
}

export default Register
