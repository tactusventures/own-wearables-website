import axios from 'axios';
import React, { useEffect, useState, useSyncExternalStore } from 'react'; 
import { getOrder, updateSizeAndColor } from '../../http';

const SummaryStep = ({product, orderId, setStep, setPrice}) => {

    // user     
    const [order, setOrder] = useState({}); 
    const [user, setUser] = useState(); 
    const [orderLoading, setOrderLoading] = useState(true); 
    const [size, setSize] = useState(null); 
    const [activeColor, setActiveColor] = useState(null); 
    console.log(product); 
    
    useEffect(()  => {
        async function fetchOrder(){
            try{ 
                let orderData = await getOrder(orderId); 
                setOrderLoading(false);
               setOrder(orderData.data); 
               setSize(orderData.data.size); 
                setActiveColor(orderData.data.color); 
                
            }catch(e) 
            {   
                setOrderLoading(false); 
            }
        }

        fetchOrder();
    }, []);


    // update the color and the size 
    async function updateColorAndSize (e, color, size, orderId){ 
        try{
            await updateSizeAndColor({color: activeColor, size, orderId: orderId}); 
            setStep((step) => step+1); 
        }catch(e) {
            console.log(e); 
        }
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
                    {
                        orderLoading?<h2>Loading...</h2>
                        :

                        <>
                            <div>
                        <div className="img">
                           <img src={`${product?.images[order.color][0]}`} />
                        </div>
                    </div>

                    <div className="content">
                        <h2>Own shoe</h2>
                        <div className="colors">
                            <h4>Colors</h4>
                            <div className='color__wrapper'>
                                {
                                    product?.colors.map((clr) => (
                                        <div className='color_box'>
                                            <div className={`color__img ${clr === activeColor?'active': ''}`}
                                                onClick={e => setActiveColor(clr)}
                                            >
                                              <img src={`${product?.images[clr][0]}`} />
                                            </div>
                                            <h5>{clr}</h5>
                                        </div>
                                    ))
                                }   
                            </div>
                            
                        </div>

                        <div className="sizes">
                            <h4>Sizes</h4>

                            <div className='size-box-wrapper'>
                                    {
                                        product.sizes.map((s, ind) => (
                                            <div key={ind} className={`size-box ${s == size?'active':''}`}
                                             onClick={e => setSize(s)}
                                            >
                                                {s}
                                            </div>
                                        ))
                                    }
                            </div>
                            
                        </div>

                        <div className='buy-button'>
                            <button className='btn btn-primary' onClick={e => updateColorAndSize(e, activeColor, size, orderId)}
                            >Continue To Checkout</button>
                        </div>
                    </div>
                        
                        </>
                    }
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