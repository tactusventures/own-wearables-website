import { generateAccessToken } from "../../services/payment/paypal";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import paypalOrder from "../../validation/paypalOrder";
import checkPaypalToken from "../../utils/checkPaypalToken";
import Payment from "../../models/payment";
import Order from '../../models/order';
import CustomErrorHandler from '../../services/customErrorHandler'; 
import generateToken from "../../utils/generateToken";
import { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } from "../../config";



const paymentController = {
    async createCredentials(req, res, next){
        // generateAccessToken(req, res, next); 

        let clientId = PAYPAL_CLIENT_ID; 
        let clientSecret = PAYPAL_SECRET_KEY;   

        const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64'); 
        const data = 'grant_type=client_credentials';
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${credentials}`
            }
        };

        axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", data, config).then((resp) => {


            if (!req.session.access_info) {
                req.session.access_info = {}; 
            }
            
            let access_info = req.session.access_info; 

           
        
            access_info["access_token"] = resp.data.access_token;
            access_info["token_type"] = resp.data.token_type;
            access_info["app_id"] = resp.data.app_id;
            access_info["expires_in"] = resp.data.expires_in;
            access_info["token_generation_time"] = new Date(); 

            return res.status(200).json({working: 'fine'}); 
          
        }).catch((e) => {
            return next(e); 
        });
    },

    async createOrder(req, res, next){
      
      const {error} = paypalOrder.validate(req.body);
      if(error){
        return next(error); 
      }

      let {_id: customerId} = req.user; 


      let access_info = req.session.access_info; 


      if(!access_info){
        // generate 
        let tken =  await generateToken(); 
        if (!req.session.access_info) {
          req.session.access_info = {}; 
        }
      
        let access_info_session = req.session.access_info; 
  
        access_info_session["access_token"] = tken.access_token;
        access_info_session["token_type"] = tken.token_type;
        access_info_session["app_id"] = tken.app_id;
        access_info_session["expires_in"] = tken.expires_in;
        access_info_session["token_generation_time"] = new Date(); 
      }

 
      let expires_in = req.session.access_info.expires_in; 

      const expiresAt = new Date().getTime() + (expires_in * 1000); 
      const isExpired = expiresAt < new Date().getTime(); 

      if(isExpired){
        let tken =  await generateToken(); 

        let access_info_session = req.session.access_info; 
  
        access_info_session["access_token"] = tken.access_token;
        access_info_session["token_type"] = tken.token_type;
        access_info_session["app_id"] = tken.app_id;
        access_info_session["expires_in"] = tken.expires_in;
        access_info_session["token_generation_time"] = new Date(); 
      }


        
      
      let {orderId, customId, price} = req.body;

      req.session.orderId = orderId; 

      let access_token = req.session.access_info.access_token; 

      const uniqueId = uuidv4(); 
      
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
            'PayPal-Request-Id':uniqueId
        };  
          
        const data = {
            intent: 'CAPTURE',
            purchase_units: [
              {
                reference_id: `${orderId}`,
                custom_id: `${customId}`, 
                amount: {
                  currency_code: 'USD',
                  value: `${price + 50}`
                }, 
                shipping: { 
                  name: {
                    full_name: 'John Doe'
                  },
                  address: {
                    address_line_1: '123 Main St',
                    admin_area_2: 'San Jose',
                    admin_area_1: 'CA',
                    postal_code: '95131',
                    country_code: 'US'
                  }
                }
              }
            ],  
            payment_source: {
              paypal: {
                experience_context: {
                  payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
                  payment_method_selected: 'PAYPAL',
                  brand_name: 'Own Wearables',
                  locale: 'en-US',
                  landing_page: 'LOGIN',
                  shipping_preference: 'SET_PROVIDED_ADDRESS',
                  user_action: 'PAY_NOW',
                  return_url: 'http://localhost:3000/order/capture-payment',
                  cancel_url: 'http://localhost:3000/product'
                }
              }
            }
        };


        // getting customer Id
    
        try{  
          let order = await Order.findOne({id: req.body.orderId}); 
          if(!order){
            return next(CustomErrorHandler.recordNotFound("Order not found")); 
          }

          customerId = customerId;  
        }catch(e){
          return next(e); 
        }


        axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', data, { headers })
        .then( async (response) => {
            let payment = new Payment({
              paymentId: response.data.id, 
              paymentStatus: response.data.status,
              referenceId: req.body.orderId, 
              customerId
            }); 

            try{
              let result = await payment.save(); 
            }catch(e){
              return next(e);
            }
            return res.status(200).json(response.data);
        })
        .catch(error => { 
          // return res.status(500).json(error.data); 
           return next(error);  
        }); 
    }, 

    async capturePayment(req, res, next){

      const {orderId} = req.body; 

      let access_info = req.session.access_info; 

      if(!access_info){
        // generate 
        let tken =  await generateToken(); 
        if (!req.session.access_info) {
          req.session.access_info = {}; 
        }
      
        let access_info_session = req.session.access_info; 
  
        access_info_session["access_token"] = tken.access_token;
        access_info_session["token_type"] = tken.token_type;
        access_info_session["app_id"] = tken.app_id;
        access_info_session["expires_in"] = tken.expires_in;
        access_info_session["token_generation_time"] = new Date(); 
      }

      let expires_in = req.session.access_info.expires_in; 

      const expiresAt = new Date().getTime() + (expires_in * 1000); 
      const isExpired = expiresAt < new Date().getTime(); 

      if(isExpired){  
        let tken =  await generateToken();  

        let access_info_session = req.session.access_info; 
  
        access_info_session["access_token"] = tken.access_token;
        access_info_session["token_type"] = tken.token_type;
        access_info_session["app_id"] = tken.app_id;
        access_info_session["expires_in"] = tken.expires_in;
        access_info_session["token_generation_time"] = new Date(); 
      }
     
      let url  = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`;  
    
      let access_token = req.session.access_info.access_token;
      const uniqueId = uuidv4(); 
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
        'Paypal-Request-Id': `${uniqueId}`
      };

      let data = {
        name: "Raj"
      };
      console.log(data);
      axios.post(`${url}`,data, {headers}).then(async (resp) => { 
        let updatedPayment;
        try{ 
          updatedPayment = await Payment.findOneAndUpdate({paymentId: resp.data.id}, {paymentStatus: resp.data.status});

        }catch(e){
          console.log(e); 
        }
 

        try { 
          let result = await Order.updateOne({_id: orderId}, {status: "COMPLETED", isPaid: true}); 

        }catch(e) { 
            return next(e); 
        }
        return res.status(200).json(resp.data);
      }).catch((e) => {
        console.log(e); 
        return next(e); 
      }); 
    },

    getPaymentDetails(req, res, next){

      let url = "https://api.sandbox.paypal.com/v2/checkout/orders/79116895VM345634A"; 
      let access_token = req.session.access_info.access_token; 
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      }; 


        axios.get(`${url}`,{ headers })
        .then(response => {
           
          return res.status(200).json(response.data); 
        })
        .catch(error => {
           return next(error); 
        });
    }
}

export default paymentController;
