import React from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../store/authSlice';
import { logout as logOut } from '../../http';
import {useNavigate} from 'react-router-dom'; 

const LoginStep = ({product, order, setStep}) => {
    const dispatch = useDispatch(); 
    const auth = useSelector(state => state.auth); 
    const navigate = useNavigate(); 
    let isAuthenticated = auth.isLoggedIn; 


    async function logout(){ 
        try {
            let res = await logOut();
            dispatch(clearUser());
            navigate('/'); 
        }catch(e){ 
            console.log(e); 
        }
    }

    return (
        <div className="left">
            {/* ---------------- Login -------------------- */}
            <div className="login-wrapper">
                <div className="login-title section-title active">
                    <div className="left">
                        <span className="section-number">1</span>
                        <div>
                            <h4>LOGIN</h4>
                            <p>+91 8830194017</p>
                        </div>
                    </div>  
                </div>

                {
                    !isAuthenticated?
                    <div className="login-expand">
                        <div className="expand-left">
                            <input placeholder="Enter Mobile Number" required />
                            <p>by continuing you agree to terms and conditions of</p>
                            <button className="btn btn-primary">Login </button>
                        </div>

                        <div className="expand-right">
                            <p className="title">Advantages of Secure Login</p>

                            <ul>
                                <p>Easily Track Orders & hassle free return</p>
                                <p>Get Relevent Alerts & Recommendation</p>
                            </ul>
                        </div>
                    </div>:

                    <div className="login-expand">
                        <div className="expand-left">
                           <p>
                             <i className='fas fa-user'></i>  &nbsp; {auth.user.email}
                             &nbsp; &nbsp; <i className='fas fa-mobile-phone'></i>  &nbsp; {auth.user.phoneNo}
                           
                           </p>
                           <div className='btns'>
                             <button className='btn btn-primary' onClick={ logout} >Logout</button>
                             <button className='btn btn-primary' onClick={e => setStep((prev) => prev+1)}>Continue</button>
                           </div>

                           <p className='note'>By Logging out you may loose changed made to your order</p>
                        </div>

                        <div className="expand-right">

                        </div>
                    </div>

                }
                
            </div>

            {/* ---------------- Adress select ----------- */}
            <div className="address-seletor-wrapper">
                <div className="section-title inactive">
                    <div className="left">
                        <span className="section-number">2</span>
                        <div>
                            <h4>DELIVERY ADDRESS</h4>
                            <p className="address">
                                <span>Raj Pawar</span>
                                Plot 28, Marol Cooperative Industrial Estate Rd, Marol, Andheri East, Mumbai, Maharashtra 400059
                            </p>
                        </div>
                    </div>

                    <div>
                        {/* <button className="btn btn-primary">Change</button> */}
                    </div>
                </div>
            </div>
            {/* ---------------- order-summary ------------ */}
            <div className="order-summary-wrapper">
                <div className="section-title inactive">
                    <div className="left">
                        <span className="section-number">3</span>
                        <h2>Order Summary</h2>
                    </div>

                    <div>
                        {/* <button className="btn btn-primary">Change</button> */}
                    </div>
                </div>
                {/* <div className="order-summary">

                    <div className="img">
                        <img src={`${product?.images[order.color][0]}`} />
                    </div>

                    <div className="content">
                        <h2>Own shoe</h2>
                        <div className="colors">
                            <h4>Colors</h4>
                            <div className="color-images">
                                {
                                    product?.colors.map((clr) => (
                                        <div>
                                            <img src={`${product?.images[clr][0]}`} />
                                            <h5>{clr}</h5>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="sizes">
                            <h4>Sizes</h4>
                            <div className="product-sizes">
                                <ul>
                                    {
                                        product.sizes.map((s) => (
                                            <li>{s}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className="counter">
                            <h4>Quantity: </h4>
                            <div>
                                <button> - </button>
                                <h4>1</h4>
                                <button> +  </button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>


            {/* payment summary */}
            <div className="payment-wrapper ">
                <div className="section-title inactive">
                    <div className="left">
                        <span className="section-number active">4</span>
                        <h2>Payment Summary</h2>
                    </div>

                    <div>
                        {/* <button className="btn btn-primary">Change</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginStep; 