import { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } from "../config";
import axios from "axios";

const checkPaypalToken  = (req, res,next) => {
    let access_info = req.session.access_info; 

    
    if(!access_info){
        // generate token
        let data = generateToken(); 
        console.log(data); 
        return next(); 
    }

    let expires_in = authInfo.expires_in; 

    const expiresAt = new Date().getTime() + (expires_in * 1000);
    const isExpired = expiresAt < new Date().getTime(); 

    if(isExpired){
        // generate new token

        let data = generateToken(); 
        console.log(data); 
        return next(); 
    }

    else {
        return next(); 
    }
}


function generateToken(){
    let clientId; 
    let clientSecret; 
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64'); 
    
    const data = 'grant_type=client_credentials';
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${credentials}`
        }
    };


    axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", data, config).then((resp) => {
        return resp.data; 
    }).catch((e) => {
        return next(e); 
    })
}

export default checkPaypalToken; 