import orderSchema from "../../validation/orderSchema";
import Order from "../../models/order";
import Product from "../../models/product";
import CustomErrorHandler from "../../services/customErrorHandler";
import User from "../../models/user";
import Joi from "joi";
import { cancelled } from "../../config";


const orderController = {
    async placeOrder(req, res, next){   
      
        const {error}  = orderSchema.validate(req.body); 

        if(error){
            return next(error); 
        }

        const {item, color, size, quantity,paymentMode} = req.body; 


        let totalPrice;


        try{
            let product = await Product.exists({_id: item}); 

            if(!product){
                return next(CustomErrorHandler.invalidId("Invalid Product")); 
            }

            product = await Product.findOne({_id: item}); 
            totalPrice = parseInt(quantity) * parseInt(product.price); 
        }catch(e){
            return next(e); 
        }
        
       let order = new Order({
            productId: item,
            color,  
            size,
            quantity,
            totalPrice,
            paymentMode,
       });

       try{
        let result = await order.save();
        return res.status(200).json(result); 
       }catch(e){
         return next(e);     
       }
    },

    async cancelOrder(req, res, next){
        try{    
            let cancelOrderSchema = Joi.object({
                orderId: Joi.string().required()
            }); 


            let {error}  = cancelOrderSchema.validate(); 
            
            if(error){
                return next(error); 
            }

            // update the data
            const result = await Order.updateOne({_id: req.body.orderId}, {
                $set: {status: cancelled, isActive: false}
            });

            return res.status(200).json(result); 
        }catch(e){
            return next(e); 
        }
    }, 

    async cancelledOrders(req, res, next){
        try{
            let cancelledOrders = await Order.find({isActive: false, status: cancelled}); 
            return res.status(200).json(cancelledOrders); 
        }catch(e){
            return next(e); 
        }   
    }, 

    async getSingleOrder(req, res) {
        const {orderId} = req.params;  
        try{
            const order = await Order.findOne({_id: orderId}); 
            return res.status(200).json(order); 
        }catch(e){
            return next(e); 
        }
    }, 

    async incrementQuantity(req, res, next) {
        const {orderId} = req.body; 
        try {
            const order = await Order.findOne({_id: orderId}); 
            if(!order){ 
                return next(CustomErrorHandler.invalidUser("Invalid User")); 
            }
            let product = await Product.findOne({_id: order.item}); 
            await  Order.updateOne({_id: orderId}, {$set: {quantity: order.quantity + 1, totalPrice: order.totalPrice + product.price}}); 
            return res.status(200).json({success: true}); 
        }catch(e) { 

        }
    }, 

    async updateOrderAddress(req, res, next) { 
        
        
        const schema = Joi.object({
            addressId: Joi.required(), 
            orderId: Joi.required()
        }); 

        const {addressId} = req.body; 

        const {_id} = req.user; 
        const {error} = schema.validate(req.body);
        
        if(error) { 
            return next(error); 
        }

        let user; 
        let deliveryAddress = { 
        };

        try {
            user = await User.findOne({_id: _id}); 

            if(user.isDeleted){ 
                return next(CustomErrorHandler.invalidUser("Your Account has been deleted")); 
            }


            if(user.isDisabled){ 
                return next(CustomErrorHandler.invalidUser("Your Account Has Been Disabled")); 
            }

            
            let address = user.addresses[addressId]; 
            let addressLine = `${address.houseOrRoomNo} ${address.buildingOrArea}, ${address.landmark}, ${address.cityOrVillage}, ${address.pincode}, ${address.state} ${address.country}`; 

            
            deliveryAddress['full_name'] = `${address.firstName} ${address.lastName}`; 
            deliveryAddress['phone_no'] = `${address.phoneNo}`;
            deliveryAddress['address_line'] = `${addressLine}`;
            deliveryAddress['city'] = `${address.cityOrVillage}`;
            deliveryAddress['pincode'] = address.pincode;
            deliveryAddress['country'] = address.country;

        }catch(e) { 
            console.log('problem is here'); 
            return next(e); 
        }

        let order; 

        try{ 
            let userInfo = await User.findOne({_id: _id}); 

            order = await Order.findOneAndUpdate({_id: req.body.orderId}, {$set: {deliveryAddress: {
                addressId: addressId,
                address: deliveryAddress
            }, customerId: userInfo._id}});

            
            let userAddresses; 
            try{ 
                userAddresses = await User.findOne({_id: _id}); 

            }catch(e) { 
                return next(e); 
            }

            return res.status(200).json(userAddresses.addresses); 

        }catch(e){
            return next(e);
        }
    }, 


   async updateSizeAndColor(req, res, next){ 
        const inputSchema  = Joi.object({
            orderId: Joi.required(), 
            color: Joi.required(), 
            size: Joi.required()
        }); 

        console.log(req.body); 

        const {error} = inputSchema.validate(req.body); 

        if(error){
            return next(error); 
        }


        try {   
            const order = await Order.findOneAndUpdate({_id: req.body.orderId}, {$set: {size: req.body.size, color: req.body.color}}); 

            return res.status(200).json({success: true}); 
        }catch(e){
            return next(e); 
        }
    }
}

export default orderController; 