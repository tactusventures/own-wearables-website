import mongoose from 'mongoose'; 


const bookingSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true, 
    }, 

    lastName: { 
        type: String, 
        required: true
    }, 

    email: { 
        type: String, 
        required: true, 
    }, 

    country: { 
        type: String, required: true
    }, 
                
    phoneNo: { 
        type: String, 
        required: true
    }
}); 

export default mongoose.model('Booking', bookingSchema); 