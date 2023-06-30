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
    }
    , 
    paymentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Payment',
        default: null
    },
    isActive: { 
        type: Boolean, 
        default: false
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
    }
    , 
    paymentMode: {
        type: String, 
        required: true, 
    }, 
    
    deliveryAddress: {
        type: Object,  
        of: String, 
        default: null
    }
});

export default mongoose.model('Order', orderSchema);