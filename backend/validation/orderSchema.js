import Joi from 'joi'; 

const orderSchema = Joi.object({
    customerId: Joi.string().required(), 
    item: Joi.required(), 
    color: Joi.string().required(), 
    size: Joi.required(), 
    quantity: Joi.number().required(), 
    totalPrice: Joi.number().required(), 
    paymentMode: Joi.string().required(), 
});

export default orderSchema;             