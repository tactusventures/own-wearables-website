import { useState, useEffect, useRef } from "react";
import "./orderSummary.css"; 
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { addOrderData } from "../../store/orderSlice";
import { useNavigate } from "react-router-dom";
import LoginStep from "../../components/OrderSteps/LoginStep";
import AddressStep from "../../components/OrderSteps/AddressStep";
import SummaryStep from "../../components/OrderSteps/SummaryStep";
import PaymentStep from "../../components/OrderSteps/PaymentStep";

 


const OrderSummary = () => {   
    let selector = useSelector((state) => state); 
    let [loading, setLoading] = useState(true); 
    let [loader, setLoader] = useState(false); 
    const [product, setProduct] = useState({}); 
    const [order, setOrder] = useState({}); 
    const [step, setStep] = useState(1);    
    const [price, setPrice] = useState(); 
    

     
    // step object
    const proceedStep = {
        1 : LoginStep, 
        2 : AddressStep, 
        3 : SummaryStep, 
        4 : PaymentStep
    }

    let Component = proceedStep[step]; 

    const {id} = useParams();   
    const btnRef = useRef(null); 


   


    useEffect(() => {
        const proceedToOrder = ()  => { 

            if(btnRef.current){ 
                btnRef.current.addEventListener('click', (e) => { 
                    //place an order
                    setLoader(true); 
 
                    // create order 
                    axios.post('/create-order', {orderId: order._id, customId: product._id}).then((res) => {
                        let orderId = res.data.id;
                        setLoader(false);
                        window.location = res.data.links[1].href; 
                    }).catch((e) => { 
                    }); 
                }); 
            }
        }

        proceedToOrder(); 
    }, [loading]); 


    useEffect(() => { 
        function loadProduct() { 
         
           axios.get(`/order/get-order/${id}`).then((res) => {
                setOrder(res.data); 
                let {item} = res.data; 
                setPrice(res.data.totalPrice); 
                axios.get(`/product/get/${item}`).then((res) => {
                    setProduct(res.data); 
                    setLoading(false); 
                })
            }).catch((e) => { 
                setProduct({}); 
            }); 
                
        }

        loadProduct(); 
    }, []); 

    
    
    
    useEffect(() =>{ 
        function getStep () { 
            if(!selector.auth.isLoggedIn){
                setStep(1); 
                Component = proceedStep[1];
                return; 
            }

           
            if(!true) {
                setStep(2); 
                Component = proceedStep[2]; 
                return; 
            }


            setStep(3); 
        }

        getStep(); 
        
    }, []); 
    
    return (

        <div className="order-summary-page">
            {
                loading? <h2>Loading....</h2>
                : 

                <div className="container">
                    {
                        loader?<img style={{position: 'relative', left: '50%', width: "200px", transform: 'translate(-50%, -50%)'}}  src={`https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif`} />: 
                        <>
                        
                       <Component product= {product} order= {order} step={step} setStep = {setStep} loading={loading}  setPrice = {setPrice}/>

                      <div className="right">
                        <h2>Price Details </h2>

                        <div className="price-details">
                            <div>
                                <h4>Price ( Item)</h4>
                                <p> $ {order.totalPrice}</p>
                            </div>

                            <div>
                                <h4>Delivery Charge:</h4>

                                <p>$50</p>
                            </div>

                            {/* total Amount */}
                            <div className="total-amount">
                                <h3>Total Amount</h3>

                                <h3>${price}</h3>
                            </div>

                        </div>
                       
                         </div>
                        </>
                    }
                </div>
            }
        </div> 

   
    // </div>

    )
}


export default OrderSummary; 