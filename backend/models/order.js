import { bool, number, string } from 'joi';
import mongoose from 'mongoose'; 

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    }, 
    status: {
        type: String, 
        default: "INITIATED"
    }
    , 
    productId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    }, 
    color: {
        type: String, 
        required: true
    }, 
    size: {
        type: String, 
        required: true
    },

    quantity: {
        type: Number,   
        required: true
    }, 

    totalPrice: {
        type: Number, 
        required: true
    }, 
 
    isPaid: {
        type: String, 
        default: false
    }
    , 
    paymentMode: {
        type: String, 
        required: true, 
    }, 

    deliveryAddress: {
        type: Object,  
        of: String, 
        required: false
    }, 

    phoneNo : {
        type: String, 
        required: false
    }, 

    deliveryStatus: { 
        type: String, 
        default: "INITIATED"
    }

    , 
    isDelivered: {
        type: Boolean, 
        default: false
    },
    isCancelled: {
        type: Boolean, 
        default: false
    }
}); 

export default mongoose.model('Order', orderSchema);

