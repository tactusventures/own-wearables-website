
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import paypalOrder from "../../validation/paypalOrder";
import checkPaypalToken from "../../utils/checkPaypalToken";
import Payment from "../../models/payment";
import Order from '../../models/order';
import CustomErrorHandler from '../../services/customErrorHandler'; 
import generateToken from "../../utils/generateToken";
import { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY, orderPaymentInitialized, orderPlaced } from "../../config";
import createInvoice from "../../services/admin/pdfService";
import path from "path";
import Joi, { date } from "joi";  
import PaymentService from "../../services/payment/paymentService";

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


        
      
      let {orderId, price} = req.body;


      // getting order Id
      let order; 
      try{  
         order = await Order.findOne({id: req.body.orderId}); 
        if(!order){
          return next(CustomErrorHandler.recordNotFound("Order not found")); 
        }

      }catch(e){
        return next(e); 
      }

      req.session.orderId = orderId;

      let access_token = req.session.access_info.access_token;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
            'PayPal-Request-Id': orderId
        };  

        // pricing breakdown
        let deliveryFee = '50'; 

          
     


        // 
        const data = {
          intent: 'CAPTURE',
          purchase_units: [
            
            {
              reference_id: orderId,
              amount: {
                currency_code: 'USD',
                value: `${order.totalPrice}`,
                breakdown: {
                  item_total: { 
                    currency_code: 'USD',
                    value: `${price}`,
                  },
                },
              },
              items: [
                {
                  name: 'Own Shoe',
                  unit_amount: {
                    currency_code: 'USD',
                    value: `${order.totalPrice}`,
                  },
                  quantity: '1',
                },
              ],
              shipping: {
                name: {
                  full_name: `${order.deliveryAddress.address.full_name}`,
                },
                address: {
                  address_line_1: `${order.deliveryAddress.address.address_line}`,
                  admin_area_2: `${order.deliveryAddress.address.cityOrVillage}`,
                  postal_code: `${order.deliveryAddress.address.pincode}`,
                  country_code: 'US',
                },
              },
            },
          ],
          application_context: {
            brand_name: 'Own Wearables',
            locale: 'en-US',
            shipping_preference: 'SET_PROVIDED_ADDRESS',
            user_action: 'PAY_NOW',
            return_url: 'http://localhost:3000/order/capture-payment',
            cancel_url: 'http://localhost:3000/product',
          },
        };
        



        axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', data, { headers })
        .then( async (response) => {

              console.log("inside the response block"); 

              let payment = new Payment({
              paymentId: response.data.id, 
              paymentStatus: response.data.status,
              referenceId: req.body.orderId, 
              customerId
            }); 

            let result; 
             try{
               result = await payment.save(); 
               
              }catch(e){
                return next(e);
              }

              try {
                console.log(orderId); 
                await Order.updateOne({_id: orderId},{ $set: { status: orderPaymentInitialized, paymentId: result._id } }); 

              }catch(e){  
                console.log(e); 
                return next(e); 
              }
            return res.status(200).json(response.data);
        })
        .catch(error => { 
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
        brand_name: 'Own Wearables',
      };

      axios.post(`${url}`,data, {headers}).then(async (resp) => { 
       let updatedPayment;  
        try{ 
          updatedPayment = await Payment.findOneAndUpdate({paymentId: resp.data.id}, {$set: {paymentStatus: resp.data.status, captureId: resp.data.purchase_units[0].payments.captures[0].id
          }});
        }catch(e){
          return next(e);
        }

        let updatedOrder; 
        try { 
          updatedOrder = await Order.updateOne({_id: updatedPayment.referenceId}, {$set: {status: orderPlaced, isActive: true}});
        }catch(e) { 
          return next(e); 
        }

        console.log(resp.data.purchase_units[0].payments.captures[0].amount.value); 

   
         // generate the pdf
         const invoice = { 
          orderId: resp.data.purchase_units[0].reference_id,
          shipping: {
              name: resp.data.purchase_units[0].shipping.name.full_name,
              address: resp.data.purchase_units[0].shipping.address.address_line_1,
              city: resp.data.purchase_units[0].shipping.city,
              state: resp.data.purchase_units[0].shipping.state,
              country: 'US',
              postal_code: resp.data.purchase_units[0].shipping.address.pincode,
          },
          items: [
              { 
                  item: "OWn Shoe",
                  description: '-',
                  quantity: updatedOrder.quantity,
                  amount: resp.data.purchase_units[0].payments.captures[0].amount.value * 100,
              }
          ],
          subtotal: resp.data.purchase_units[0].payments.captures[0].amount.value * 100,
          paid: resp.data.purchase_units[0].payments.captures[0].amount.value * 100,
          invoice_nr: resp.data.id,
      };

        
        let pdfPath = path.join(__dirname + `../../../public/invoices/${invoice.invoice_nr}.pdf`); 
        let filePath = createInvoice(invoice, pdfPath);


        return res.status(200).json(resp.data);
      }).catch((e) => {
          return next(e); 
      }); 
    },

   async getPaymentDetails(req, res, next){

      console.log('hello, i am here....'); 
      const {paymentId} = req.params; 
      let url = `https://api.sandbox.paypal.com/v2/checkout/orders/${paymentId}`; 


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


      let access_token = req.session.access_info.access_token; 
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      };


        axios.get(`${url}`,{ headers })
        .then(response => {

          // generate the pdf
          const invoice = { 
            orderId: response.data.purchase_units[0].reference_id,
            shipping: {
                name: response.data.purchase_units[0].shipping.name.full_name,
                address: response.data.purchase_units[0].shipping.address.address_line_1,
                city: response.data.purchase_units[0].shipping.city,
                state: response.data.purchase_units[0].shipping.state,
                country: 'US',
                postal_code: response.data.purchase_units[0].shipping.address.pincode,
            },
            items: [
                {
                    item: response.data.purchase_units[0].items[0].name   ,
                    description: 'Toner Cartridge',
                    quantity: 1,
                    amount: response.data.purchase_units[0].items[0].unit_amount.value * 100,
                }
            ],
            subtotal: response.data.purchase_units[0].amount.value,
            paid: response.data.purchase_units[0].amount.value,
            invoice_nr: response.data.id,
        };

          
          let pdfPath = path.join(__dirname + "../../../public/invoices/invoice.pdf"); 
          let filePath = createInvoice(invoice, pdfPath);
          console.log(filePath);

          return res.status(200).json(response.data);
        })
        .catch(error => {
           return next(error);
        });
    },

    // refund 
    async refundPayment(req, res, next) { 

      let object = Joi.object({
        paymentId: Joi.string().required()
      });

      let {error} = object.validate(req.body);

      if(error) { 
        return next(error);
      }   
      
      const {paymentId} = req.body;
      let paymentData; 
      try { 
          paymentData  = await Payment.find({paymentId: paymentId}); 
      }catch(e)  
      {
        return next(e);
      }

      let resData = await PaymentService.refundPayment(paymentData.captureId, req);
    
      if(resData['error'])
      {
        return next(resData['error']);
      }

      return res.status(200).json({success: true, data: resData.data});

    }
}

export default paymentController;