import dotenv from 'dotenv'; 
dotenv.config();


export const {
    APP_PORT, DEBUG_MODE, JWT_SECRET, REFRESH_SECRET, STATIC_PATH, 
    PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY, SESSION_SECRET, MONGO_URL, 
    GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DOMAIN_NAME
} = process.env;