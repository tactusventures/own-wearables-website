import Joi from "joi";

const loginSchema = Joi.object({

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .normalize()
        .required()
    .messages({
            'string.email': 'Please enter a valid email address',
            'string.empty': 'Email address is required',
            'any.required': 'Email address is required'
        }),


    
    password: Joi.string()
        .pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/)
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least one number, one special character, and one letter, and be at least 6 characters long',
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        }), 

}); 


export default loginSchema; 