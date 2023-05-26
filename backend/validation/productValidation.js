import Joi from 'joi'; 


const imageSchema = Joi.object({
    mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
    size: Joi.number().max(5 * 1024 * 1024).required() // maximum 5MB
  });


const productSchema = Joi.object({
    productName: Joi.string().required(), 
    price: Joi.number().required(),  
    color: Joi.string().required(), 
    sizes: Joi.array().required(), 
    quantity: Joi.number().required(), 
    description: Joi.string(), 
    images: Joi.array().min(1).max(10).required()
});

export default productSchema; 