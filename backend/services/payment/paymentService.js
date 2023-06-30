import generateToken from "../../utils/generateToken";
import axios from "axios";

class PaymentService  { 
    static async refundPayment(captureId, req) { 
        let response = {};

        try {
            let url = `https://api-m.sandbox.paypal.com/v2/payments/captures/${captureId}/refund`; 
            let access_info = req.session.access_info;

            // if not access token generate ones
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


            // calling the refund api
            let data  = { 
                amount: {
                    currency_code: "USD",
                    value: "300.00"   // Replace with the actual full   
                },

                note_to_paymer: "DefectiveProduct", 
                   payment_instruction: {           
                }
            }

            let  responseData  = await axios.post(`${url}`,data , { headers }); 

            response["data"] = responseData.data;
            return response;

        }catch(e) {
            response['error'] = e;
            return response; 
        }
    }
}

export  default PaymentService;