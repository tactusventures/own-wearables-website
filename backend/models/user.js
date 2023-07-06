import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    firstName: {type: String, required: true}, 
    lastName: {type: String, required: true}, 
    houseOrRoomNo: { type: String, required: false}, 
    buildingOrArea: { type: String, required: false}, 
    landmark: { type: String, required: false}, 
    cityOrVillage: { type: String, required: false}, 
    state: { type: String, required: false}, 
    pincode: { type: String, required: false}, 
    country: { type: String, required: false},
    phoneNo: {type: String, required: true}, 
    markAs: {type: String, required: true}
});

const userSchema   = new mongoose.Schema({
    firstName: { type: String, required: true}, 
    lastName: { type: String, required: true}, 
    email: { type: String,unique: true,  required: true},
    phoneNo: { type: String, required: true},
    gender: { type: String, required: false},
    password: { type: String, required: true},    
    addresses:  { 
        type:  [addressSchema] , 
        default: []
    }, 
    isDeleted: { 
        type: Boolean, 
        default: false
    }, 

    isDisabled: { 
        type: Boolean, 
        default: false
    }
}, {timestamps: true}); 


export default mongoose.model('User', userSchema);