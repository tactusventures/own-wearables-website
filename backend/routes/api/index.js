import express from 'express' 
import { loginController, registerController , productController,  orderController, paymentController, contactController } from '../../controllers'; 
import passport from 'passport';
import auth from '../../middlewares/api-auth-middleware';


const router  = express.Router();

// authentication
router.post('/register', registerController.register);
router.post('/login', loginController.login); 
router.get('/get-user/:id', auth,  registerController.getUser);
router.get('/refresh', registerController.refresh);
router.post('/logout', auth,  loginController.logout); 

// oAuth2
router.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']})); 
router.get('/redirect/google',  passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
}); 
  

// product
router.post('/create-product', productController.storeProduct);
router.post('/product/add-color', productController.addColor);
router.get('/prdocuts/all', auth,   productController.allProducts);
router.get('/product/get/:id', auth,   productController.getSingleProduct); 


// order
router.post('/order/place-order',orderController.placeOrder);
router.get('/orders/all', orderController.allOrders);
router.get('/orders/delivered/all', orderController.allDeliveredOrders); 
router.get('/orders/un-delivered/all', orderController.allUnDeliveredOrders); 
router.post('/orders/cancel-order', orderController.cancelOrder); 
router.get('/order/all-cancelled-orders', orderController.cancelledOrders); 
router.get('/order/get-order/:orderId', auth, orderController.getSingleOrder); 
router.post('/order/increment-quantity', orderController.incrementQuantity); 


// payment paypal
router.post('/generate-credentials', paymentController.createCredentials);
router.post('/create-order', paymentController.createOrder);
router.post('/capture-payment', paymentController.capturePayment);
router.get('/get-payment-details', paymentController.getPaymentDetails); 



// submit contact form 
router.post("/send-message", contactController.sendMessage);

export default router;