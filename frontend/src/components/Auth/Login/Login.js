import React from 'react';
import './login.css';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/authSlice';
import { login } from '../../../http';


const Login = ({ active, setActive }) => {

    const popUpRef = useRef();
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { email, password } = formData;


    useEffect(() => {
        function handleClickOutside(event) {
            setActive(false);
        }

        popUpRef.current.addEventListener('mousedown', handleClickOutside);

    }, [popUpRef]);

    let activeStyle = {
        display: active ? "contents" : "none"
    }


    // registerUser

    async function loginUser(e, formData) {

        e.preventDefault();
        setLoading(true);
        
        try {

            let res = await login(formData);
            dispatch(setUser(res.data));
            setActive(false);
            setLoading(false);
            navigate('/product');
        } catch (e) {
            if (e.response?.status === 422) {
                setValidationErrors(e.response.data);
            } else {
                setShowError(true);
            }
            setLoading(false);
        }
    }

    return (
        <div className={`login`} style={activeStyle} >

            <div className='overlay' ref={popUpRef}></div>
            {/* <div className='login-form'>
                    <form>
                        {
                            showError? 
                                <div className='error alert-danger'>
                                    <p>Something Went Wrong! Try Again</p>
                                </div> : ""
                        }
                    
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
                            <label>Password</label>
                            <input name='password'  
                                placeholder='Password'  
                                value={password}
                                onChange={e => setFormData({...formData, [e.target.name]: e.target.value})}
                                required
                            />

                            { validationErrors.password?<p>{validationErrors.password}</p> : "" }

                        </div>  

                        <div className='buttons' style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            {
                                loading?  <img src='https://cdn.dribbble.com/users/3742211/screenshots/9195657/media/6796a544d6f9ef1293d8d8d9e60d38d5.gif' style={{width: "100px"}} /> : ""
                            }
                            
                            <button disabled={loading} className='btn btn-black' onClick={e => loginUser(e, formData)}
                            >Login</button>
                        </div>
                    </form>
            </div> */}

            <div class="login-form">
                {/* <img src="./assets/icons/cancel.png" id="cancel-button" /> <br /> */}
                <p id="greet">Welcome Back</p>
                <h2>Log into your account</h2>
                <form>
                    <input name='email' placeholder='Email'
                        value={email}
                        onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        required
                    />
                    {validationErrors.email ? <p>{validationErrors.email}</p> : ""}


                    <input type='password' name='password'
                        placeholder='Password'
                        value={password}
                        onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        required
                    />
                    {validationErrors.email ? <p>{validationErrors.email}</p> : ""}
                    <a href="#" id="forgot-password">Forgot Password?</a>

                    <div className='buttons' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {
                            loading ? <img src='https://cdn.dribbble.com/users/3742211/screenshots/9195657/media/6796a544d6f9ef1293d8d8d9e60d38d5.gif' style={{ width: "100px" }} /> : ""
                        }

                        <button disabled={loading} type="submit" onClick={e => loginUser(e, formData)}
                        >Login</button>
                    </div>
                    <p id="link-to-register">Not registered yet? <a href="registration-page-link" id="registeration-page-link"> Then click here to Register </a></p>
                </form>
            </div>

            <span><i className='fas fa-times'></i></span>
        </div>
    )
}

export default Login; 
