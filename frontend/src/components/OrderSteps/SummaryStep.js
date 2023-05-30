import axios from 'axios';
import React, { useEffect, useState } from 'react'; 

const SummaryStep = ({product, order, setStep, setPrice}) => {
    // user 
    const [user, setUser] = useState(); 
    const [count, setCount] = useState(order.quantity); 
    


    function inc() { 
        axios.post('/order/increment-quantity', {orderId: order._id}).then((res) => { 
            setCount((cnt) => cnt +1);   
            setPrice(product.price * (count + 1));          
        }).catch((e) => { 
            
        });
    }

    function dec() { 
        setCount((dec) => dec - 1); 
    }

    return (    
        <div className="left">
            {/* ---------------- Login -------------------- */}
            <div className="login-wrapper">
                <div className="login-title section-title">
                    <div className="left">
                        <span className="section-number">1</span>
                        <div>
                            <h4>LOGIN</h4>
                            <p>+91 8830194017</p>
                        </div>
                    </div>

                    <button className="btn btn-primary" onClick={e => setStep(1)}>Change</button>
                </div>

                </div>

            {/* ---------------- Adress select ----------- */}
            <div className="address-seletor-wrapper">
                <div className="section-title">
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
                        <button className="btn btn-primary" onClick={e => setStep(2)}>Change</button>
                    </div>
                </div>
            </div>
            {/* ---------------- order-summary ------------ */}
            <div className="order-summary-wrapper">
                <div className="section-title active">
                    <div className="left">
                        <span className="section-number">3</span>
                        <h2>Order Summary</h2>
                    </div>

                    <div>
                        {/* <button className="btn btn-primary">Change</button> */}
                    </div>
                </div>
                <div className="order-summary">
                    <div>
                        <div className="img">
                            <img src={`${product?.images[order.color][0]}`} />
                        </div>

                        <div className="counter">
                            <div>
                                <button onClick={e => dec(e)}   disabled={count == 1}> - </button>
                                <h4>{count}</h4>
                                <button onClick={e => inc(e)}> +  </button>
                            </div>
                        </div>
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

                        <div>
                            <button className='btn btn-primary' onClick={e => setStep((step) => step+1)}
                            >Continue To Checkout</button>
                        </div>
                    </div>
                </div>
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

export default SummaryStep; 