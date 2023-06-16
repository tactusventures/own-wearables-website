import { bool, number } from 'joi';
import mongoose from 'mongoose'; 

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }, 
    status: {
        type: String, 
        default: "INITIATED"
    }
    , 
    item: {
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
        required: true
    }, 

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

