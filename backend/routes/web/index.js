import express from 'express'; 
import { adminHomeController, adminMessageController, adminOrderController, adminProductController, adminUserController, adminAuthController } from '../../controllers';
import webAuth from '../../middlewares/admin/auth';
import guest from '../../middlewares/admin/guest';




const  adminRouter = express.Router();
export const guestRouter  = express.Router(); 

// auth 
guestRouter.get('/login',adminAuthController.login);
guestRouter.post('/login',adminAuthController.postLogin);


adminRouter.get('/', adminHomeController.home);

adminRouter.get('/logout', adminAuthController.logout); 

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
adminRouter.post('/users/delete-user', adminUserController.deleteUser);
adminRouter.post('/users/disable-user', adminUserController.disableUser); 
adminRouter.get('/users/all-deleted-users', adminUserController.allDeletedUsers); 
adminRouter.get('/users/all-disabled-users', adminUserController.allDisabledUsers); 
adminRouter.post('/users/restore-user', adminUserController.restoreUser); 
adminRouter.post('/users/unblock-user', adminUserController.unblockUser); 

// enquiries
adminRouter.get('/messages/enquiries', adminMessageController.enquiries); 
adminRouter.post('/messages/delete-message', adminMessageController.deleteMessage); 


// orders
adminRouter.get('/order/get-all-orders', adminOrderController.getAllOrders); 
// adminRouter.post('/order/change-delivery-status', adminOrderController.changeDeliveryStatus); 


export default adminRouter;