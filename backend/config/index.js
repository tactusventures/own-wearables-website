import dotenv from 'dotenv'; 
dotenv.config();


export const {
    APP_PORT, DEBUG_MODE, JWT_SECRET, REFRESH_SECRET, STATIC_PATH, 
    PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY, SESSION_SECRET, MONGO_URL, 
    GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DOMAIN_NAME, GMAIL_APP_PASSWORD
} = process.env;



export const orderStatuses = {
    initialized: "INITIALIZED", 
    paymentInitialized: "PAYMENT_INITIALIZED",
    placed: "ORDER_PLACED", 
    shipped: "IN_TRANSIT", 
    delivered: "DELIVERED", 
    cancelled: "CANCELLED", 
    returned: "RETURNED", 
    settled: "SETTLED"
}