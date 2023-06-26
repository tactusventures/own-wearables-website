import express from 'express'; 
import { adminHomeController, adminMessageController, adminOrderController, adminProductController, adminUserController } from '../../controllers';






const  adminRouter = express.Router();


adminRouter.get('/', adminHomeController.home); 

// products

adminRouter.get('/products/add-product', adminProductController.addProduct); 
adminRouter.get('/products/all-products', adminProductController.allProducts); 
adminRouter.get('/products/view-product/:id', adminProductController.viewProduct); 
adminRouter.post('/products/save-product', adminProductController.saveProduct); 
adminRouter.post('/products/delete-product', adminProductController.deleteProduct); 
adminRouter.post('/products/product/add-product', adminProductController.addColorToProduct); 
adminRouter.get('/products/edit-product/:id', adminProductController.editProduct); 
adminRouter.post('/products/edit-product', adminProductController.updateProduct); 

adminRouter.post('/products/delete-product-image', adminProductController.deleteProductImage); 
adminRouter.post('/products/add-color-image', adminProductController.addImageToProduct); 


// users
adminRouter.get('/users/all-users', adminUserController.allUsers); 
adminRouter.get('/users/view-user/:id', adminUserController.viewUser); 

// enquiries
adminRouter.get('/messages/enquiries', adminMessageController.enquiries); 
adminRouter.post('/messages/delete-message', adminMessageController.deleteMessage); 


// orders 
adminRouter.get('/order/get-all-orders', adminOrderController.getAllOrders); 
adminRouter.post('/order/change-delivery-status', adminOrderController.changeDeliveryStatus); 


export default adminRouter;