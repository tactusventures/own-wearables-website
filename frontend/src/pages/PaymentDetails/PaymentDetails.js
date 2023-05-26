import React, {useState, useEffect} from 'react'; 
import "./paymentDetails.css"; 
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderData } from '../../store/orderSlice';



const PaymentDetails = () => {

    const selector = useSelector(state => state.order); 
    const [link, setLink] = useState(); 
    const dispatch  = useDispatch(); 


    useEffect(() => {
        axios.post('/create-order', {orderId: selector.orderId, customId: selector.id}).then((res) => { 
            let orderId = res.data.id; 
            dispatch(addOrderData({paypalOrderId: orderId})); 
           setLink(res.data.links[1].href); 
        }).catch((e) => {
            console.log(e); 
        }); 
    }, []); 

  return (
    <div>
        <a href={link}>Pay $200</a>
    </div>
  )
}

export default PaymentDetails
