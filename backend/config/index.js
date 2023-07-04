import dotenv from 'dotenv'; 
dotenv.config();


export const {
    APP_PORT, DEBUG_MODE, JWT_SECRET, REFRESH_SECRET, STATIC_PATH, 
    PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY, SESSION_SECRET, MONGO_URL, 
    GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DOMAIN_NAME, GMAIL_APP_PASSWORD
} = process.env;


 const orderStatuses = { 
    orderInitiated: "ORDER_INITIATED", 
    orderPaymentInitialized: "ORDER_PAYMENT_INITIALIZED", 
    orderPlaced: 'ORDER_PLACED', 
    orderReadyToShip: 'ORDER_READY_TO_SHIP', 
    orderInTransit: 'ORDER_IN_TRANSIT', 
    orderDelivered: 'ORDER_DELIVERED', 
    cancelled: 'CANCELLED', 
    returnInitiated: 'RETURN_INITIATED', 
    returnProductPicked: 'RETURN_PRODUCT_PICKED', 
    returnSuccessfully: 'RETURN_SUCCESSFULLY'
};

export const { 
    orderInitiated, 
    orderPlaced, 
    orderPaymentInitialized,
    orderReadyToShip, 
    orderInTransit, 
    orderDelivered, 
    cancelled, 
    returnInitiated, 
    returnProductPicked, 
    returnSuccessfully
} = orderStatuses; 