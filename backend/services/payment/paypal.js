import axios from 'axios'; 
import { response } from 'express';
import { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } from '../../config';

// Genereate access token
export const generateAccessToken = (req, res, next) => {
   
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

        console.log(resp.data); 
    
        access_info["access_token"] = resp.data.access_token;
        access_info["token_type"] = resp.data.token_type;
        access_info["app_id"] = resp.data.app_id;
        access_info["expires_in"] = resp.data.expires_in;
        access_info["token_generation_time"] = new Date(); 

        return res.status(200).json({working: 'fine'}); 
       
    }).catch((e) => {
      console.log('going into an error'); 
        return next(e); 
    });
}