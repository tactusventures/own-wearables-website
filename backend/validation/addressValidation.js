import Joi from "joi";

const addressSchema = new Joi.object({
    firstName: Joi.string().min(3).required(), 
    lastName: Joi.string().min(3).required(), 
    houseOrRoomNo: Joi.string().required(), 
    buildingOrArea: Joi.string().required(), 
    cityOrVillage: Joi.string().required(), 
    landmark: Joi.optional(), 
    state: Joi.string().required(), 
    pincode: Joi.string().required(), 
    country: Joi.string().required(), 
    phoneNo: Joi.string().required(), 
    markAs: Joi.string().required()
});

export default addressSchema;