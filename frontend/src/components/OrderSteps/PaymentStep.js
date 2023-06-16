import React, {useEffect, useState,useRef} from 'react'; 
import axios from 'axios';
import Loader from '../../components/Spinner/Spinner'; 
const PaymentStep = ({product, orderId, loading, setStep}) => {
    let btnRef = useRef();
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        const proceedToOrder = ()  => { 
            
            if(btnRef.current){ 
                btnRef.current.addEventListener('click', (e) => {
                    setIsLoading(true); 
                    // create order
                    axios.post('/create-order', {orderId: orderId, customId: product._id, price: product.price}).then((res) => {
                        let orderId = res.data.id;  
                        setIsLoading(false); 
                        window.location = res.data.links[1].href; 
                    }).catch((e) => { 
                    }); 
                }); 
            }
        }

        proceedToOrder(); 
    }, [loading]); 



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
                <div className="section-title">
                    <div className="left">
                        <span className="section-number">3</span>
                        <h2>Order Summary</h2>
                    </div>

                    <div>
                        <button className="btn btn-primary" onClick={e => setStep(3)}>Change</button>
                    </div>
                </div>
                
            </div>


            {/* payment summary */}
            <div className="payment-wrapper">
                <div className="section-title active">
                    <div className="left">
                        <span className="section-number bg-white">4</span>
                        <h2>Payment Summary</h2>
                    </div>

                    <div>
                        {/* <button className="btn btn-primary">Change</button> */}
                    </div>
                </div>

                <div className='payment-expand'>
                    
                    { 
                        isLoading?<Loader />: 
                        <>
                            <span>Pay With Paypal</span>

                            <button style={{cursor: "pointer"}} ref={btnRef}>
                                <img src='https://cdn-icons-png.flaticon.com/512/174/174861.png' />                        
                                Checkout with Paypal
                            </button>
                        </>

                    }                        
                </div>  
            </div>
        </div>
    )
}

export default PaymentStep; 