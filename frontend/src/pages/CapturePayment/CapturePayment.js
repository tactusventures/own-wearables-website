import axios from 'axios';
import React,{useEffect, useState} from 'react'; 
import { useSelector } from 'react-redux';


const CapturePayment = () => {
    const [loading, setLoading] = useState(); 
    const selector  = useSelector(state  => state.order); 

    useEffect(() => { 
        const capture  = () => {
            const query = new URLSearchParams(window.location.search);
            const token = query.get('token');

            setLoading(true); 
            axios.post('/capture-payment', {orderId: token} ).then((res) => { 
                    setLoading(false);
                    console.log(res.data);
            }).catch((e) =>  {
                setLoading(false); 
            }); 
        }
        
        capture();
    }, []); 

  return (
    <div>  {
                loading? <h2>Loading....</h2>: <h2>Order Placed Successfully</h2> 
            }   
        
    </div>
  )
}

export default CapturePayment
