import mongoose from 'mongoose'; 

const paymentSchema =  new mongoose.Schema({
    referenceId: {
        type: String, 
        required: true
    }, 

    paymentId: {
        type: String, 
        required: true
    }, 
    paymentStatus: {
        type: String, 
        required: true, 
    }, 

    payerId: {
        type: String, 

    }, 
    customerId: {
        type: String, 
        required: true
    }, 

    payerAccountId: {
        type: String, 
    }, 

    captureId: { 
        type: String, 
        default: null
    }
}); 


export default mongoose.model('Payment', paymentSchema);