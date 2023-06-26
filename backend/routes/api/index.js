import express from 'express' 
import { loginController, registerController , productController,  orderController, paymentController, contactController } from '../../controllers'; 
import passport from 'passport';
import auth from '../../middlewares/api-auth-middleware';
import { register } from '../../../frontend/src/http';
import userController from '../../controllers/admin/users/userController';


const router  = express.Router();

// authentication
router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/get-user/:id', auth,  registerController.getUser);
router.get('/refresh', registerController.refresh);
router.post('/logout', auth,  loginController.logout); 
router.post('/user/add-address', auth , registerController.addAddress)
router.get('/user/get-addresses', auth, registerController.getAddresses);  

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
router.get('/prdocuts/all',productController.allProducts);
router.get('/product/get/:id',productController.getSingleProduct);


// order
router.post('/order/place-order',orderController.placeOrder);
router.post('/orders/cancel-order', auth, orderController.cancelOrder);
router.get('/order/all-cancelled-orders', auth , orderController.cancelledOrders);
router.get('/order/get-order/:orderId', auth, orderController.getSingleOrder); 
router.post('/order/increment-quantity', orderController.incrementQuantity);
router.post('/order/update-address',auth, orderController.updateOrderAddress);
router.post('/order/update-color-and-size', auth, orderController.updateSizeAndColor);

// payment paypal
router.post('/generate-credentials', paymentController.createCredentials);
router.post('/create-order', auth , paymentController.createOrder);
router.post('/capture-payment', auth,paymentController.capturePayment);
router.get('/get-payment-details', auth , paymentController.getPaymentDetails); 



// submit contact form 
router.post("/send-message", contactController.sendMessage);

export default router;