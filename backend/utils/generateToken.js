import { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } from "../config";
import axios from 'axios'; 


async function generateToken(){
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
    let accessInfo; 
    accessInfo = await axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", data, config); 
    console.log(accessInfo.data); 
    return accessInfo.data; 

}



export default generateToken; 