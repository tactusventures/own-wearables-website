import Joi from "joi";

const colorSchema  = Joi.object({
    qty: Joi.number().required(),  
    color: Joi.string().required(), 
    id: Joi.string().required(), 
    images: Joi.array().min(1).max(10).required()
}); 

export default colorSchema;