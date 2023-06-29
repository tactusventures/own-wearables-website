import Joi from 'joi'; 

const paypalOrder = Joi.object({
    orderId: Joi.string().required(), 
    
    price:  Joi.number().required()
});

export default paypalOrder;